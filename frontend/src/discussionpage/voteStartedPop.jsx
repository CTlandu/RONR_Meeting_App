import React, { useState, useEffect } from "react";
import socket from "./socket-manage";
import "./pop-window.css"; // 引入弹窗样式

function VoteStartedPop({ roomId }) {
    const [vote, setVote] = useState(null); // 当前投票信息
    const [votedCount, setVotedCount] = useState(0); // 已投票人数
    const [countdown, setCountdown] = useState(10); // 倒计时时间（单位：秒）
    const [hasVoted, setHasVoted] = useState(false); // 用户是否已投票

    useEffect(() => {
        // 监听服务器广播的投票信息
        socket.on("voteStarted", (voteData) => {
            setVote(voteData); // 显示投票弹窗
            setVotedCount(0); // 重置已投票人数
            setCountdown(10); // 重置倒计时
            setHasVoted(false); // 重置投票状态
        });

        // 监听投票更新事件
        socket.on("voteUpdated", (voteData) => {
            if (voteData.voteId === vote?.voteId) {
                setVotedCount(voteData.votedCount); // 更新已投票人数
            }
        });

        return () => {
            socket.off("voteStarted");
            socket.off("voteUpdated");
        };
    }, [vote]);

    // 倒计时逻辑
    useEffect(() => {
        if (!vote || countdown <= 0) return;

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer); // 清除定时器
    }, [vote, countdown]);

    // 在倒计时结束时关闭弹窗
    useEffect(() => {
        if (countdown === 0) {
            if (!hasVoted) {
                socket.emit("castVote", { roomId, voteChoice: "abstain" }); // 投弃票
            }
            setVote(null); // 倒计时结束后关闭弹窗
        }
    }, [countdown]);

    const handleVote = (voteChoice) => {
        if (!vote) return;
        socket.emit("castVote", { roomId, voteChoice: voteChoice });
        setHasVoted(true); // 标记为已投票
    };

    if (!vote) return null; // 如果没有投票信息，则不显示弹窗

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Vote: {vote.title}</h2>
                <p className="modal-description">
                    <strong>Description:</strong> {vote.description}
                </p>
                <p className="modal-voted">
                    <strong>Voted:</strong> {votedCount}
                </p>
                <div className="modal-actions">
                    {!hasVoted ? ( // 显示投票按钮
                        <>
                            <button
                                onClick={() => handleVote("yes")}
                                className="btn btn-primary"
                            >
                                In Favor
                            </button>
                            <button
                                onClick={() => handleVote("no")}
                                className="btn btn-secondary"
                            >
                                Against
                            </button>
                            <button
                                onClick={() => handleVote("abstain")}
                                className="btn btn-abstain"
                            >
                                Abstain ({countdown}s)
                            </button>
                        </>
                    ) : (
                        // 显示提示文字并显示倒计时
                        <p className="text-success">
                            Your choice has been recorded. The window will close after the timer ends ({countdown}s).
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VoteStartedPop;
