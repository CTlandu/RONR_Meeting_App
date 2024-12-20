import React, { useState } from "react";
import socket from "./socket-manage";
import "./raise-motion.css"; // 引入样式文件

function DismissMeetingButton({ roomId }) {
  const [showForm, setShowForm] = useState(false); // 控制弹窗显示

  const handleDismissMeeting = () => {
    setShowForm(false); // 关闭表单
    socket.emit("dismissMeeting", roomId);
  };

  return (
    <>
      {/* Dimiss Meeting 按钮 */}
      <button
        onClick={() => setShowForm(true)} // 打开弹窗
        className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
      >
        Dismiss Meeting
      </button>

      {/* 弹窗部分 */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Dismiss Meeting</h2>
            <div className="modal-actions">
              <button onClick={handleDismissMeeting} className="btn btn-primary">
                Confirm
              </button>
              <button
                onClick={() => {
                    setShowForm(false); // 关闭表单
                }}
                className="btn btn-secondary"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DismissMeetingButton;
