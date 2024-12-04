import React, { useState } from "react";
import socket from "./socket-manage";
import "./raise-motion.css"; // 引入样式文件

function StartVoteButton({ roomId, username, role }) {
  const [showForm, setShowForm] = useState(false); // 控制弹窗显示
  const [title, setTitle] = useState(""); // vote 的标题
  const [description, setDescription] = useState(""); // vote 的描述

  const handleStartVote = () => {
    if (!title.trim() || !description.trim()) {
      alert("Both title and description are required.");
      return;
    }
    socket.emit(
        "StartVote",
        { roomId, title, description },
        (response) => {
          if (response.success) {
            setTitle(""); // 清空标题
            setDescription(""); // 清空描述
            setShowForm(false); // 关闭表单
          } else {
            alert(response.message); // 显示失败消息
          }
        }
      );
  };

  return (
    <>
      {/* Start a Vote 按钮 */}
      <button
        onClick={() => setShowForm(true)} // 打开弹窗
        className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
      >
        End Motion & Start a Vote
      </button>

      {/* 弹窗部分 */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Start a Vote</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="modal-input"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="modal-textarea"
            />
            <div className="modal-actions">
              <button onClick={handleStartVote} className="btn btn-primary">
                Start Vote
              </button>
              <button
                onClick={() => {
                    setShowForm(false); // 关闭表单
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default StartVoteButton;
