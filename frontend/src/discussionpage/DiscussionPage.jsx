import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import socket from "./socket-manage"; // 单例 socket 实例
import "./DiscussionPage.css";
import { useNavigate } from "react-router-dom";
import RaiseMotionButton from "./raise-motion";
import MotionPendingPop from "./pendingMotionPop";
import MotionApprovedPop from "./motionApprovedPop";
import MotionDeniedPop from "./motionDeniedPop";
import MotionDiscardedPop from "./motionDiscardedPop";
import MotionActivatedPop from "./motionActivatedPop";

function DiscussionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId, username } = location.state || {}; // 从路由中获取会议号和用户名
  const [messages, setMessages] = useState([]); // 聊天消息
  const [members, setMembers] = useState([]); // 房间成员
  const [hands, setHands] = useState({}); // 存储举手状态，键为 username，值为举手类型（pro/con）


  // 更新消息列表
  const handleMessage = (type, text, isChairMessage = false) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type, text, isChairMessage },
    ]);
  };

  // 举手处理
  const handleRaiseHand = (handType) => {
    socket.emit("raiseHand", { roomId, username, handType });
  };

  // chair approve 举手请求
  const handleHandClick = ({ clickerUserName, approvedUserName, roomId }) => {
    // 自由chair有权限approve举手请求
    if (members[clickerUserName].role === "chair") {
      socket.emit("allowSpeak", { roomId: roomId, username: approvedUserName });
    }
  };

  // 退出会议
  const handleExitMeeting = () => {
    socket.disconnect();
    navigate("/");
  };

  useEffect(() => {
    socket.connect();

    if (!roomId || !username) {
      alert("Invalid meeting details!");
      return;
    }

    // 向服务器发送加入房间的请求
    socket.emit("joinRoom", { username, roomId: roomId });

    // 监听房间成员列表更新
    socket.on("roomInfo", (data) => {
      const newMembers = {};
      data.members.forEach((member) => {
        newMembers[member.username] = { userID: member.userID, role: member.role };
      });
      setMembers(newMembers);
      handleMessage(
        "system",
        `You joined room ${data.roomId}. Members: ${Object.keys(newMembers).join(", ")}`
      );
    });

    // 监听其他用户加入
    socket.on("userJoined", (data) => {
      setMembers((prevMembers) => ({
        ...prevMembers,
        [data.username]: { userID: data.userID, role: data.role },
      }));
      handleMessage("system", `${data.username} joined the room.`);
    });

    // 监听用户离开
    socket.on("userLeft", (data) => {
      setMembers((prevMembers) => {
        const updatedMembers = { ...prevMembers };
        delete updatedMembers[data.username];
        return updatedMembers;
      });
      handleMessage("system", `${data.username} left the room.`);
    });

    socket.on("messageSend", (data) => {
      handleMessage("system", data.message);
    });

    // 监听 chairChange 事件
    socket.on("chairChange", (data) => {
      setMembers((prevMembers) => {
        const updatedMembers = { ...prevMembers };
        Object.keys(updatedMembers).forEach((username) => {
          if (username === data.newChairUsername) {
            updatedMembers[username].role = "chair"; // 更新为 chair
          } else if (updatedMembers[username].role === "chair") {
            updatedMembers[username].role = "member"; // 取消其他用户的 chair 角色
          }
        });
        return updatedMembers;
      });
    });

    // 监听用户举手事件
    socket.on("handRaised", ({ username, handType }) => {
      setHands((prevHands) => ({
        ...prevHands,
        [username]: handType,
      }));
    });

    // 监听用户发言事件（Chair 同意发言）
    socket.on("handLowered", ({ username }) => {
      setHands((prevHands) => {
        const updatedHands = { ...prevHands };
        delete updatedHands[username];
        return updatedHands;
      });
    });

    return () => {
      // 清理 Socket 监听器
      socket.off("roomInfo");
      socket.off("userJoined");
      socket.off("userLeft");
    };
  }, [roomId, username]);

  return (
    <div className="main-container bg-gray-100 min-h-screen p-4 flex flex-col">
      <header className="flex items-center justify-between bg-blue-600 text-white p-4 rounded-md shadow-md mb-4">
        <div className="flex items-center">
          <span className="portrait w-12 h-12 bg-gray-500 rounded-full mr-4"></span>
          <div className="username font-bold text-lg">{username}</div>
        </div>
        <div className="meeting-title text-xl font-bold">
          Room: {roomId}
        </div>
        <div className="time text-sm">Time: 12:00 PM</div>
      </header>

      <div className="flex flex-1">
        <MotionPendingPop roomId={roomId} /> {/* 渲染 motion 弹窗给chair来approve */}
        <MotionApprovedPop roomId={roomId} /> {/* 渲染 motion approved 弹窗给所有用户 */}
        <MotionDeniedPop /> {/* 渲染 motion denied 弹窗给motion发起者 */}
        <MotionDiscardedPop /> {/* 渲染 motion discarded 弹窗给所有人 */}
        <MotionActivatedPop /> {/* 渲染 motion activated 弹窗给所有人 */}
        <div className="content flex flex-col space-y-4 w-2/3">
          <div className="horizontal-seats grid grid-cols-2 gap-4">
            {Object.entries(members).map(([memberName, memberInfo]) => (
              <div
                key={memberName}
                className="h-seat w-32 h-32 bg-blue-300 rounded-lg shadow-md flex flex-col items-center justify-center relative"
              >
                <div className="text-white font-bold">{memberName}</div>
                {memberInfo.role === "chair" && (
                  <span className="chair-badge">Chair</span>
                )}
                {hands[memberName] && (
                  <span
                    className={`hand-badge ${hands[memberName]}`}
                    onClick={() =>
                      handleHandClick({
                        clickerUserName: username,
                        approvedUserName: memberName,
                        roomId: roomId
                      })
                    }
                  >
                    {hands[memberName] === "pro" ? "👍" : "👎"}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flow-board flex-1 bg-white p-4 ml-4 rounded-lg shadow-md">
          <div className="board-title font-bold text-xl mb-4">Flow Board</div>
          <div className="board h-64 overflow-y-auto p-2 bg-gray-50 rounded-md border border-gray-300">
            <div className="messages space-y-2">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message p-2 rounded-md text-white font-semibold ${message.isChairMessage ? "bg-gray-700" : "bg-gray-500"
                    }`}
                >
                  {message.text}
                </div>
              ))}
              <div className="last-child"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="toolkit-container mt-8">
        <div className="toolkit flex justify-between items-center p-4 bg-white rounded-lg shadow-md">
          {/* Buttons */}
          <div className="buttons flex flex-wrap justify-center gap-4">
            <div className="motion-container">
              <RaiseMotionButton roomId={roomId} username={username} />
            </div>
            <button onClick={() => handleRaiseHand("pro")}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
            >Raise Hand (Pro)</button>
            <button onClick={() => handleRaiseHand("con")}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
            >Raise Hand (Con)</button>
            <button
              onClick={handleExitMeeting}
              className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Exit Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscussionPage;