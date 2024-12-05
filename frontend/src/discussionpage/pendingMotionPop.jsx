import React, { useState, useEffect } from "react";
import socket from "./socket-manage";
import "./pop-window.css"; // 引入弹窗样式

function MotionPendingPop({ roomId }) {
  const [motion, setMotion] = useState(null); // 当前待处理的 motion

  useEffect(() => {
    // 监听服务器发送的新 Motion
    socket.on("newPendingMotion", (newMotion) => {
      setMotion(newMotion); // 显示 Motion 弹窗
    });

    return () => {
      socket.off("newPendingMotion");
    };
  }, []);

  const handleApprove = () => {
    socket.emit("pendingMotionDecision", { roomId, motion, decision: "approved" });
    setMotion(null); // 关闭弹窗
  };

  const handleDeny = () => {
    socket.emit("pendingMotionDecision", { roomId, motion, decision: "denied" });
    setMotion(null); // 关闭弹窗
  };

  if (!motion) return null; // 如果没有 motion，则不显示弹窗

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Motion Approval</h2>
        <p><strong>Title:</strong> {motion.title}</p>
        <p><strong>Description:</strong> {motion.description}</p>
        <p><strong>Raised By:</strong> {motion.raisedBy}</p>
        <div className="modal-actions">
          <button onClick={handleApprove} className="btn btn-primary">
            Approve
          </button>
          <button onClick={handleDeny} className="btn btn-secondary">
            Deny
          </button>
        </div>
      </div>
    </div>
  );
}

export default MotionPendingPop;
