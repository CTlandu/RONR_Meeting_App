import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { io } from "socket.io-client";
import socket from "./socket-manage"; // 单例 socket 实例
import "./DiscussionPage.css";
import microphoneIcon from "./microphone-solid.svg";
import videoIcon from "./video-solid.svg";

function DiscussionPage() {
  const location = useLocation();
  const { meetingNumber, username } = location.state || {}; // 从路由中获取会议号和用户名

  const [messages, setMessages] = useState([]); // 聊天消息
  const [members, setMembers] = useState([]); // 房间成员


  // 更新消息列表
  const handleMessage = (type, text, isChairMessage = false) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type, text, isChairMessage },
    ]);
  };

  useEffect(() => {
    socket.connect();
    

    if (!meetingNumber || !username) {
      alert("Invalid meeting details!");
      return;
    }

    // 向服务器发送加入房间的请求
    socket.emit("joinRoom", { username, roomId: meetingNumber });

    // 监听房间成员列表更新
    socket.on("roomInfo", (data) => {
        setMembers(
          data.members.map((member) => ({
            id: member.userID, // 转换 userID 为 id
            username: member.username,
          }))
        );
        handleMessage(
          "system",
          `You joined room ${data.roomId}. Members: ${data.members
            .map((member) => member.username)
            .join(", ")}`
        );
      });

    // 监听其他用户加入
    socket.on("userJoined", (data) => {
        setMembers((prevMembers) => [
          ...prevMembers,
          { id: data.userID, username: data.username }, // 转换 userID 为 id
        ]);
        handleMessage("system", `${data.username} joined the room.`);
      });

    // 监听用户离开
    socket.on("userLeft", (data) => {
        setMembers((prevMembers) =>
          prevMembers.filter((member) => member.id !== data.userID) // 转换 userID 为 id
        );
        handleMessage("system", `${data.username} left the room.`);
      });

    return () => {
      // 清理 Socket 监听器
      socket.off("roomInfo");
      socket.off("userJoined");
      socket.off("userLeft");
    };
  }, [meetingNumber, username]);

  return (
    <div className="main-container bg-gray-100 min-h-screen p-4 flex flex-col">
      <header className="flex items-center justify-between bg-blue-600 text-white p-4 rounded-md shadow-md mb-4">
        <div className="flex items-center">
          <span className="portrait w-12 h-12 bg-gray-500 rounded-full mr-4"></span>
          <div className="username font-bold text-lg">{username}</div>
        </div>
        <div className="meeting-title text-xl font-bold">
          Room: {meetingNumber}
        </div>
        <div className="time text-sm">Time: 12:00 PM</div>
      </header>

      <div className="flex flex-1">
        <div className="content flex flex-col space-y-4 w-2/3">
          <div className="horizontal-seats grid grid-cols-2 gap-4">
            {members.map((member, index) => (
              <div
                key={index}
                className="h-seat w-32 h-32 bg-blue-300 rounded-lg shadow-md flex items-center justify-center"
              >
                <div className="text-white font-bold">{member.username}</div>
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
                  className={`message p-2 rounded-md text-white font-semibold ${
                    message.isChairMessage ? "bg-gray-700" : "bg-gray-500"
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
          {/* Icons */}
          <div className="icon flex space-x-4">
            <img
              src={microphoneIcon}
              alt="Microphone Icon"
              width="32"
              height="32"
              className="hover:scale-110 transition-transform duration-200"
            />
            <img
              src={videoIcon}
              alt="Video Icon"
              width="32"
              height="32"
              className="hover:scale-110 transition-transform duration-200"
            />
          </div>

          {/* Buttons */}
          <div className="buttons flex flex-wrap justify-center gap-4">
            <button
              onClick={() =>
                handleMessage("yellow", `${username} raised a Point of Order!`)
              }
              className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Point of Order
            </button>
            <button
              onClick={() =>
                handleMessage("red", `${username} Second MOTION #001!`)
              }
              className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Second Motion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscussionPage;
