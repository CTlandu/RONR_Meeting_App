import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import socket from "./socket-manage"; // 单例 socket 实例
import "./DiscussionPage.css";
import microphoneIcon from "./microphone-solid.svg";
import videoIcon from "./video-solid.svg";
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

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  //const [isTimeUp, setIsTimeUp] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isDecisionMade, setIsDecisionMade] = useState(false);
  const [votes, setVotes] = useState({ option1: 0, option2: 0 });
  const [button1Color, setButton1Color] = useState("#007bff");
  const [button2Color, setButton2Color] = useState("#007bff");

  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft === 0) {
      //setIsTimeUp(true);
      setIsPanelOpen(false);
      return;
    }

    // 每秒更新一次倒计时
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // 清除定时器
    return () => clearInterval(timer);
  }, [timeLeft]); // 依赖于 timeLeft，当它改变时重新运行 effect

  const [messages, setMessages] = useState([]); // 聊天消息
  const [members, setMembers] = useState([]); // 房间成员

  // 更新消息列表
  const handleMessage = (type, text, isChairMessage = false) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type, text, isChairMessage },
    ]);
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
      setMembers(
        data.members.map((member) => ({
          userID: member.userID,
          username: member.username,
          role: member.role,
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
        { userID: data.userID, username: data.username, role: data.role },
      ]);
      handleMessage("system", `${data.username} joined the room.`);
    });

    // 监听用户离开
    socket.on("userLeft", (data) => {
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.userID !== data.userID)
      );
      handleMessage("system", `${data.username} left the room.`);
    });

    socket.on("messageSend", (data) => {
      handleMessage("system", data.message);
    });

    return () => {
      // 清理 Socket 监听器
      socket.off("roomInfo");
      socket.off("userJoined");
      socket.off("userLeft");
    };
  }, [roomId, username]);

  const handleVote = (option) => {
    if (option == "option1") {
      setIsAgreed(true);
      setButton1Color("#808080");
      setButton2Color("#007bff");
    } else if (option == "option2") {
      setIsAgreed(false);
      setButton1Color("#007bff");
      setButton2Color("#808080");
    }
    setIsDecisionMade(true);
  };

  const submitVote = (option) => {
    const updatedVotes = { ...votes, [option]: votes[option] + 1 };
    setVotes(updatedVotes);
  };

  return (
    <div className="main-container bg-gray-100 min-h-screen p-4 flex flex-col">
      <header className="flex items-center justify-between bg-blue-600 text-white p-4 rounded-md shadow-md mb-4">
        <div className="flex items-center">
          <span className="portrait w-12 h-12 bg-gray-500 rounded-full mr-4"></span>
          <div className="username font-bold text-lg">{username}</div>
        </div>
        <div className="meeting-title text-xl font-bold">Room: {roomId}</div>
        <div className="time text-sm">Time: 12:00 PM</div>
      </header>

      <div className="flex flex-1">
        <MotionPendingPop roomId={roomId} />{" "}
        {/* 渲染 motion 弹窗给chair来approve */}
        <MotionApprovedPop roomId={roomId} />{" "}
        {/* 渲染 motion approved 弹窗给所有用户 */}
        <MotionDeniedPop /> {/* 渲染 motion denied 弹窗给motion发起者 */}
        <MotionDiscardedPop /> {/* 渲染 motion discarded 弹窗给所有人 */}
        <MotionActivatedPop /> {/* 渲染 motion activated 弹窗给所有人 */}
        <div className="content flex flex-col space-y-4 w-2/3">
          <div className="horizontal-seats grid grid-cols-2 gap-4">
            {members.map((member, index) => (
              <div
                key={index}
                className="h-seat w-32 h-32 bg-blue-300 rounded-lg shadow-md flex items-center justify-center"
              >
                <div className="text-white font-bold">{member.username}</div>
                {member.role === "chair" && (
                  <span className="chair-badge">Chair</span>
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
            <div className="motion-container">
              <RaiseMotionButton roomId={roomId} username={username} />
            </div>
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
            <button
              onClick={handleExitMeeting}
              className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Exit Meeting
            </button>

            {/* Chair Buttons */}
            <button
              onClick={() =>
                handleMessage("#fff", "The chair announced MOTION #001!", true)
              }
              className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Announce Motion
            </button>
            <button
              onClick={() =>
                handleMessage(
                  "#fff",
                  "The chair granted user0827 the floor",
                  true
                )
              }
              className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Grant Floor
            </button>
            <button
              onClick={() =>
                handleMessage(
                  "#fff",
                  "The chair resolved Point of Order!",
                  true
                )
              }
              className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Resolve Point
            </button>
            <button
              disabled={isPanelOpen}
              onClick={() => {
                handleMessage("#fff", "The chair initiate voting!", true);
                setIsPanelOpen(true);
              }}
              className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Initiate Voting
            </button>

            {/*Voting Panel*/}
            {isPanelOpen && (
              <div className="vote-panel">
                <h2>Vote for Motion</h2>
                <button
                  className="vote-button"
                  onClick={() => handleVote("option1")}
                  style={{
                    backgroundColor: button1Color,
                  }}
                  //disabled={isTimeUp}
                >
                  Agree
                </button>
                <button
                  className="vote-button"
                  onClick={() => handleVote("option2")}
                  style={{
                    backgroundColor: button2Color,
                  }}
                  //disabled={isTimeUp}
                >
                  Disagree
                </button>
                <div className="close-vote">
                  <button
                    className="submit-button"
                    disabled={!isDecisionMade}
                    style={{
                      backgroundColor: isDecisionMade ? "white" : "grey",
                      color: isDecisionMade ? "black" : "white",
                    }}
                    onClick={() => {
                      setIsPanelOpen(false);
                      {
                        isDecisionMade &&
                          submitVote(isAgreed ? "option1" : "option2");
                      }
                    }}
                  >
                    Submit
                  </button>
                </div>
                <div className="countdown">
                  <h1>Countdown: {timeLeft} seconds</h1>
                  {timeLeft === 0 && <h2>Time's up!</h2>}
                </div>
              </div>
            )}

            {/*<div className="results">*/}
            {/*  <h3>Current Results:</h3>*/}
            {/*  <p>Option 1: {votes.option1}</p>*/}
            {/*  <p>Option 2: {votes.option2}</p>*/}
            {/*</div>*/}
            <button
              onClick={() => handleMessage("#fff", "Meeting ends.", true)}
              className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Conclude Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscussionPage;
