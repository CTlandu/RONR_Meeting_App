// server.js
const { Server } = require("socket.io");

module.exports = (server) => {
  // 初始化 Socket.IO
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // 替换为你的前端地址
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // 存储会议房间信息
const rooms = {};
// 存储用户所在房间以及其连接状态
const userConnections = {};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  const { userID } = socket.handshake.auth;

  // 初始化用户连接信息
  if (!userConnections[userID]) {
    userConnections[userID] = { roomId: null, socketID: null, timer: null, username: null };
  }

  // 监听加入房间事件
  socket.on("joinRoom", ({ username, roomId }) => {
    if (!rooms[roomId]) {
      rooms[roomId] = {};
    }

    // 用户加入房间
    socket.join(roomId);
    userConnections[userID].roomId = roomId;
    userConnections[userID].socketID = socket.id;
    userConnections[userID].username = username;

    // 检查用户是否已经存在于房间
    if (rooms[roomId][userID]) {
      console.log(`${username} reconnected to room ${roomId}`);
      rooms[roomId][userID].socketID = socket.id; // 更新 socketID
    } else {
      console.log(`${username} joined room ${roomId}`);
      rooms[roomId][userID] = { username, socketID: socket.id };
    }

    // 清除之前的断开定时器（如果存在）
    if (userConnections[userID].timer) {
      clearTimeout(userConnections[userID].timer);
      userConnections[userID].timer = null;
    }

    // 通知当前用户房间信息
    io.to(socket.id).emit("roomInfo", {
      roomId,
      members: Object.values(rooms[roomId]).map((user) => ({
        username: user.username,
        userID,
      })),
    });

    // 通知其他用户有新用户加入（仅在首次加入时）
    if (!rooms[roomId][userID].reconnected) {
      socket.to(roomId).emit("userJoined", { username, userID });
      rooms[roomId][userID].reconnected = true; // 标记为已加入
    }
  });

  // 监听用户离开房间
  socket.on("leaveRoom", (callback) => {
    const { roomId } = userConnections[userID]; // 获取用户所在房间
    if (!roomId) {
      return callback({ success: false, message: "User is not in any room" });
    }
    const { username } = userConnections[userID];
    // 从房间中移除用户
    delete rooms[roomId][userID];
    delete userConnections[userID];
  
    // 通知其他用户该用户离开
    socket.to(roomId).emit("userLeft", { username, userID });
  
    console.log(`User ${username} left room ${roomId}`);

    console.log("房间信息: ", rooms[roomId])
    console.log("用户连接信息: ", userConnections)
    callback({ success: true });
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
        socket.to(roomId).emit("userLeft", { username, userID });
        console.log(`User ${userID} left room ${roomId}`);
      }
    }, 5000); // 延迟 5 秒检查是否重新连接
  });
});
};
