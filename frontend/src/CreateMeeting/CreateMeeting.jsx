import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 用于页面跳转

const CreateMeeting = () => {
  const navigate = useNavigate(); // 初始化路由跳转
  const [meetingNumber, setMeetingNumber] = useState(""); // 存储会议号
  const [username, setUsername] = useState(""); // 存储用户名

  // 处理加入会议逻辑
  const handleJoinMeeting = () => {
    if (meetingNumber && username) {
      // 跳转到会议室页面，并传递会议号和用户名
      navigate(`/discussion`, { state: { roomId: meetingNumber, username } });
    } else {
      alert("Please enter a username and meeting number!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      {/* Main container */}
      <div className="w-2/5 bg-gray-400 p-10 rounded-lg border-4 border-gray-300">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black">JOIN MEETING</h1>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* 用户名 */}
          <div className="flex items-center">
            <label className="font-bold text-lg mr-4 w-40">Your Name:</label>
            <input
              type="text"
              className="flex-1 p-2 border border-gray-400 rounded bg-gray-200"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          {/* 会议号 */}
          <div className="flex items-center">
            <label className="font-bold text-lg mr-4 w-40">Meeting Number:</label>
            <input
              type="text"
              className="flex-1 p-2 border border-gray-400 rounded bg-gray-200"
              value={meetingNumber}
              onChange={(e) => setMeetingNumber(e.target.value)}
              placeholder="Enter meeting number"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-8 space-x-8">
          <button
            onClick={handleJoinMeeting}
            className="bg-green-500 text-black font-bold py-2 px-10 hover:bg-green-600 transition duration-200 rounded-lg"
          >
            JOIN MEETING
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="bg-red-400 text-black font-bold py-2 px-10 hover:bg-red-500 transition duration-200 rounded-lg"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateMeeting;
