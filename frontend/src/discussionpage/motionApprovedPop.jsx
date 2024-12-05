import React, { useState, useEffect } from "react";
import socket from "./socket-manage";
import "./pop-window.css"; // 引入弹窗样式

function MotionApprovedPop({ roomId }) {
  const [motion, setMotion] = useState(null); // 当前待 Second 的 motion
  const [countdown, setCountdown] = useState(30); // 倒计时时间（单位：秒）

  useEffect(() => {
    // 监听服务器广播的 Motion 数据
    socket.on("motionApproved", (motionData) => {
      setMotion(motionData); // 显示 Motion 弹窗
      setCountdown(10); // 重置倒计时
    });

    return () => {
      socket.off("motionApproved");
    };
  }, []);

  // 倒计时逻辑
  useEffect(() => {
    if (!motion || countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // 清除定时器
  }, [motion, countdown]);

  // 自动 Decline 当倒计时结束
  useEffect(() => {
    if (countdown === 0 && motion) {
      handleDecline();
    }
  }, [countdown, motion]);

  const handleSecond = () => {
    socket.emit("secondMotion", { roomId, motion });
    setMotion(null); // 关闭弹窗
  };

  const handleDecline = () => {
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
          <button onClick={handleSecond} className="btn btn-primary">
            Second Motion
          </button>
          <button onClick={handleDecline} className="btn btn-secondary">
            Decline ({countdown}s)
          </button>
        </div>
      </div>
    </div>
  );
}

export default MotionApprovedPop;
