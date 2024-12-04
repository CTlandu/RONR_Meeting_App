import React, { useState } from "react";
import socket from "./socket-manage";
import "./raise-motion.css"; // 引入样式文件

function RaiseMotionButton({ roomId, username }) {
  const [showForm, setShowForm] = useState(false); // 控制弹窗显示
  const [title, setTitle] = useState(""); // motion 的标题
  const [description, setDescription] = useState(""); // motion 的描述

  const handleRaiseMotion = () => {
    if (!title.trim() || !description.trim()) {
      alert("Both title and description are required.");
      return;
    }

    // 向服务器发送 motion
    // socket.emit("raiseMotion", { roomId, title, description, username });
    // alert("Motion raised successfully!");
    // setShowForm(false); // 关闭表单
    // setTitle(""); // 清空标题
    // setDescription(""); // 清空描述
    // const message = username + " raised a motion: " + title + ", waiting the chair's approval";
    // socket.emit("messageRequest", { roomId,  message})  // 通知所有成员有人raise motion

    socket.emit(
      "raiseMotion",
      { roomId, title, description, username },
      (response) => {
        if (response.success) {
          alert(response.message); // 显示成功消息
          setShowForm(false); // 关闭表单
          setTitle(""); // 清空标题
          setDescription(""); // 清空描述
        } else {
          alert(response.message); // 显示失败消息
        }
      }
    );
  };

  return (
    <>
      {/* Raise Motion 按钮 */}
      <button
        onClick={() => setShowForm(true)} // 打开弹窗
        className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
      >
        Raise Motion
      </button>

      {/* 弹窗部分 */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Raise a Motion</h2>
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
              <button onClick={handleRaiseMotion} className="btn btn-primary">
                Submit
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

export default RaiseMotionButton;
