// server.js
const { Server } = require("socket.io");

module.exports = (server) => {
  // 初始化 Socket.IO
  const io = new Server(server, {
    cors: {
      // 这里的Frontend.env.FRONTEND_URL是前端部署环境下的地址，localhost:5173是本地地址
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // 存储会议房间信息
  const rooms = {};
  // 存储用户所在房间以及其连接状态
  const userConnections = {};
  // 存储各个房间motion状态
  const motions = {};
  // 存储各个房间chair状态
  const chairs = {};
  // 存储各个房间voting状态
  const votes = {}

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    const { userID } = socket.handshake.auth;

    // 初始化用户连接信息
    if (!userConnections[userID]) {
      userConnections[userID] = {
        roomId: null,
        socketID: null,
        timer: null,
        username: null,
        role: null,
      };
    }

    // 监听加入房间事件
    socket.on("joinRoom", ({ username, roomId }) => {
      // 创建房间
      if (!rooms[roomId]) {
        rooms[roomId] = {};
        motions[roomId] = null;
        chairs[roomId] = userID;
        votes[roomId] = null;
      }

      const role = Object.keys(rooms[roomId]).length === 0 ? "chair" : "member";

      // 用户加入房间
      socket.join(roomId);
      userConnections[userID].roomId = roomId;
      userConnections[userID].socketID = socket.id;
      userConnections[userID].username = username;
      userConnections[userID].role = role;

      // 检查用户是否已经存在于房间
      if (rooms[roomId][userID]) {
        console.log(`${username} reconnected to room ${roomId}`);
        rooms[roomId][userID].socketID = socket.id; // 更新 socketID
      } else {
        console.log(`${username} joined room ${roomId}`);
        rooms[roomId][userID] = { username, socketID: socket.id, role: role };
      }

      // 清除之前的断开定时器（如果存在）
      if (userConnections[userID].timer) {
        clearTimeout(userConnections[userID].timer);
        userConnections[userID].timer = null;
      }

      // 通知当前用户房间信息
      io.to(socket.id).emit("roomInfo", {
        roomId,
        members: Object.entries(rooms[roomId]).map(([userID, user]) => ({
          username: user.username,
          userID: userID,
          role: user.role,
        })),
      });

      // 通知其他用户有新用户加入（仅在首次加入时）
      if (!rooms[roomId][userID].reconnected) {
        socket.to(roomId).emit("userJoined", {
          username,
          userID,
          role: userConnections[userID].role,
        });
        rooms[roomId][userID].reconnected = true; // 标记为已加入
      }
    });

    // 发消息中间件
    socket.on("messageRequest", ({ roomId, message }) => {
      io.to(roomId).emit("messageSend", { message });
    });

    // Member 提交 Motion
    socket.on(
      "raiseMotion",
      ({ roomId, title, description, username }, callback) => {
        if (motions[roomId]) {
          // 如果当前房间有 motion 在处理, 拒绝新的 motion
          return callback({
            success: false,
            message:
              "There is already a motion in progress. Please wait until it is resolved.",
          });
        }

        const motion = {
          id: `${Date.now()}`, // Motion 唯一标识符
          title,
          description,
          raisedBy: username,
          raisedBySocketId: socket.id,
          status: "pending", // 状态：pending、approved、denied、activated、discarded
          seconds: 0, // Second 的成员数
        };

        motions[roomId] = motion;

        // 通知 Chair 审批
        const chair = userConnections[chairs[roomId]];
        if (chair) {
          io.to(chair.socketID).emit("newPendingMotion", motion);
        }

        // 通知发起人成功创建 motion
        callback({
          success: true,
          message: "Motion raised successfully. Waiting for chair's approval.",
        });

        // 通知所有成员有人  motion raised
        io.to(roomId).emit("messageSend", {
          message: `${username} raised a motion: "${title}", waiting for chair's approval.`,
        });
      }
    );

    // Chair Approve Motion
    socket.on("pendingMotionDecision", ({ roomId, motion, decision }) => {
      if (decision === "approved") {
        motions[roomId].status = "approved";
        io.sockets.adapter.rooms.get(roomId).forEach((s) => {
          // 弹窗通知除chair外所有人motion approved
          if (s !== userConnections[chairs[roomId]].socketID) {
            io.sockets.sockets.get(s).emit("motionApproved", motions[roomId]);
          }
          // 消息通知所有成员motion approved
          io.to(roomId).emit("messageSend", {
            message: `${motions[roomId].raisedBy}'s motion: "${motions[roomId].title}", was approved by the chair.`,
          });
        });
        // 等待10秒后, 检查是否有人second
        setTimeout(() => {
          if (motions[roomId].seconds === 0) {
            motions[roomId].status = "discarded";
            io.to(roomId).emit("motionDiscarded", motions[roomId]);
            const discardMessage =
              motions[roomId].raisedBy +
              "'s motion: " +
              motions[roomId].title +
              ", was discarded as no one seconds.";
            io.to(roomId).emit("messageSend", { message: discardMessage });
            motions[roomId] = null;
          } else {
            motions[roomId].status = "activated";
            io.to(roomId).emit("motionActivated", motions[roomId]);
            // 消息通知所有成员motion open for discussion
            io.to(roomId).emit("messageSend", {
              message: `${motions[roomId].raisedBy}'s motion: "${motions[roomId].title}", is now open for discussion.`,
            });
          }
        }, 10 * 1000);
      } else {
        motions[roomId].status = "denied";
        io.to(motions[roomId].raisedBySocketId).emit("motionDenied", motions[roomId]);
        const denyMessage =
          motions[roomId].raisedBy +
          "'s motion: " +
          motions[roomId].title +
          ", was denied by the chair.";
        io.to(roomId).emit("messageSend", { message: denyMessage });
        motions[roomId] = null;
      }
      console.log("房间motion状态", motions[roomId])
    });

    // Member Second Motion
    socket.on("secondMotion", ({ roomId, motion }) => {
      motions[roomId].seconds += 1;
    });

    // 用户举手
    socket.on("raiseHand", ({ roomId, username, handType }) => {
      // 通知房间内所有成员
      io.to(roomId).emit("handRaised", { username, handType });
      io.to(roomId).emit("messageSend", { message: `${username} raised hand (${handType})` });
    });

    // chair approve 发言(举手)请求
    socket.on("allowSpeak", ({ roomId, username }) => {
      io.to(roomId).emit("messageSend", { message: `${username} is allowed to speak.` });
      io.to(roomId).emit("handLowered", { username })
    });

    socket.on(
      "StartVote",
      ({ roomId, title, description }, callback) => {
        if (votes[roomId]) {
          // 如果当前房间有 vote 在处理, 拒绝新的 vote
          return callback({
            success: false,
            message:
              "There is already a vote in progress. Please wait until it is resolved.",
          });
        } else if (!motions[roomId] || !motions[roomId].status === "activated") {
          return callback({
            success: false,
            message:
              "No motion is in discussion, can't start a vote now.",
          });
        }

        const vote = {
          id: `${Date.now()}`, // vote 唯一标识符
          title,
          description,
          yes: 0,
          no: 0,
          abstain: 0,
          status: "pending", // 状态：pending, passed, failed, tie
        };

        votes[roomId] = vote;

        // callback 通知chair 成功已创建 vote
        callback({
          success: true,
          message: "Vote started successfully.",
        });
        io.to(roomId).emit("messageSend", { message: `Vote Started: ${title}` });
        socket.to(roomId).emit("voteStarted", votes[roomId]);
        io.to(socket.id).emit("voteStarted", votes[roomId], true);   // 广播给chair投票开始

        // 11秒后结束投票并广播结果
        setTimeout(() => {
          votes[roomId].status = vote.yes > vote.no
            ? "passed"
            : vote.no > vote.yes
              ? "failed"
              : "tie";
          io.to(roomId).emit("voteResult", votes[roomId]);
          io.to(roomId).emit("messageSend", { message: `Vote Result of ${votes[roomId].title}: ${votes[roomId].status}` });
          votes[roomId] = null;
          motions[roomId] = null;
        }, 11 * 1000);
      }
    );

    socket.on("castVote", ({ roomId, voteChoice }) => {
      if (voteChoice === "yes") {
        votes[roomId].yes += 1;
      } else if (voteChoice === "no") {
        votes[roomId].no += 1;
      } else {
        votes[roomId].abstain += 1;
      }
      io.to(roomId).emit("voteUpdated", votes[roomId])
    });

    socket.on("dismissMeeting", (roomId) => {
      io.to(roomId).emit("meetingDismissed");
    });

    // 监听用户断开连接
    socket.on("disconnect", () => {
      const { roomId } = userConnections[userID];
      if (!roomId) return;

      const currentSocketID = userConnections[userID].socketID;

      // 设置延迟清理
      userConnections[userID].timer = setTimeout(() => {
        // 检查是否仍然是同一个 socketID
        if (userConnections[userID].socketID === currentSocketID) {
          const username = userConnections[userID].username;
          // 从房间中移除用户
          delete rooms[roomId][userID];
          delete userConnections[userID];
          console.log(`User ${userID} left room ${roomId}`);
          // 如果退出房间的是chair, 需要指定新chair
          if (chairs[roomId] === userID) {
            // 检查房间是否还有其他用户
            const roomUsers = Object.keys(rooms[roomId]); // 获取当前房间用户列表
            if (roomUsers.length > 0) {
              // 随机选择一个用户作为新的 Chair
              const newChair =
                roomUsers[Math.floor(Math.random() * roomUsers.length)];
              chairs[roomId] = newChair; // 设置新的 Chair
              userConnections[newChair].role = "chair";
              rooms[roomId][newChair].role = "chair"; // 设置新的 Chair
              socket.to(roomId).emit("chairChange", { newChairUsername: userConnections[newChair].username });
              const newChairMessage =
                "The chair has been changed to: " +
                userConnections[newChair].username;
              io.to(roomId).emit("messageSend", { message: newChairMessage });
            }
          }
          socket.to(roomId).emit("userLeft", { username, userID });  // 广播message用户离开并更新前端用户列表
          // 检查房间还有没有人
          if (!rooms[roomId] || Object.keys(rooms[roomId]).length === 0) {
            delete rooms[roomId];
            delete motions[roomId];
            delete chairs[roomId];
            delete votes[roomId];
          }
        }
      }, 3000); // 延迟 3 秒检查是否重新连接
    });
  });
};
