import React, { useState, useEffect } from "react";
import socket from "./socket-manage";
import "./pop-window.css"; // 引入弹窗样式

function VoteResultPop() {
  const [voteResult, setVoteResult] = useState(null); // 当前投票结果数据

  useEffect(() => {
    // 监听服务器广播的投票结果事件
    socket.on("voteResult", (resultData) => {
      setVoteResult(resultData); // 显示弹窗，保存投票结果数据
    });

    return () => {
      socket.off("voteResult"); // 清除事件监听
    };
  }, []);

  const handleClose = () => {
    setVoteResult(null); // 关闭弹窗
  };

  if (!voteResult) return null; // 如果没有投票结果数据，不显示弹窗

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Vote Result</h2>
        <p><strong>Title:</strong> {voteResult.title}</p>
        <p><strong>Description:</strong> {voteResult.description}</p>
        <p><strong>Total Voted:</strong> {voteResult.yes + voteResult.no + voteResult.abstain}</p>
        <p><strong>In Favor:</strong> {voteResult.yes}</p>
        <p><strong>Against:</strong> {voteResult.no}</p>
        <p><strong>Abstain:</strong> {voteResult.abstain}</p>
        <p><strong>Result:</strong> {voteResult.status}</p>
        <div className="modal-actions">
          <button onClick={handleClose} className="btn btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default VoteResultPop;
