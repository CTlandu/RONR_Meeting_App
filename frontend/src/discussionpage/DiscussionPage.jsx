import React, { useState } from "react";
import "./DiscussionPage.css";
import microphoneIcon from "./microphone-solid.svg";
import videoIcon from "./video-solid.svg";

function DiscussionPage() {
  const [messages, setMessages] = useState([]);

  const handleMessage = (type, text, isChairMessage = false) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type, text, isChairMessage },
    ]);
  };

  return (
    <div className="main-container bg-gray-100 min-h-screen p-4 flex flex-col">
      <header className="flex items-center justify-between bg-blue-600 text-white p-4 rounded-md shadow-md mb-4">
        <div className="flex items-center">
          <span className="portrait w-12 h-12 bg-gray-500 rounded-full mr-4"></span>
          <div className="username font-bold text-lg">user0827</div>
        </div>
        <div className="meeting-title text-xl font-bold">MEETING TITLE</div>
        <div className="time text-sm">Time: 12:00 PM</div>
      </header>

      <div className="flex flex-1">
        <div className="content flex flex-col space-y-4 w-2/3">
          <div className="horizontal-seats grid grid-cols-2 gap-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-seat w-32 h-32 bg-blue-300 rounded-lg shadow-md"
              ></div>
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
            {/* Member Buttons */}
            <button
              onClick={() =>
                handleMessage(
                  "yellow",
                  "user0827 raised a Point of Order!",
                  false
                )
              }
              className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Point of Order
            </button>
            <button
              onClick={() =>
                handleMessage("red", "user0827 Second MOTION #001!", false)
              }
              className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Second Motion
            </button>
            <button
              onClick={() =>
                handleMessage("green", "user5308 raised MOTION #001!", false)
              }
              className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Make Motion
            </button>
            <button
              onClick={() =>
                handleMessage("blue", "user0827 request to speak", false)
              }
              className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Request to Speak
            </button>
            <button className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200">
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
              onClick={() =>
                handleMessage("#fff", "The chair initiate voting!", true)
              }
              className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Initiate Voting
            </button>
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
