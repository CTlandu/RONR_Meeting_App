import React, { useState, useEffect } from "react";
import socket from "./socket-manage";
import "./pop-window.css"; // 引入弹窗样式

function MotionActivatedPop() {
  const [motion, setMotion] = useState(null); // 当前被激活的 motion

  useEffect(() => {
    // 监听服务器广播的 Motion Activated 事件
    socket.on("motionActivated", (motionData) => {
      setMotion(motionData); // 显示弹窗，保存 Motion 数据
    });

    return () => {
      socket.off("motionActivated"); // 清除事件监听
    };
  }, []);

  const handleClose = () => {
    setMotion(null); // 关闭弹窗
  };

  if (!motion) return null; // 如果没有 motion 数据，不显示弹窗

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Motion Activated</h2>
        <p><strong>Title:</strong> {motion.title}</p>
        <p><strong>Description:</strong> {motion.description}</p>
        <p><strong>Number of Seconds:</strong> {motion.seconds}</p>
        <p>The motion is now open for discussion.</p>
        <div className="modal-actions">
          <button onClick={handleClose} className="btn btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default MotionActivatedPop;
