import React from 'react';
import './DiscussionPage.css';
import microphoneIcon from './microphone-solid.svg';
import videoIcon from './video-solid.svg';

function DiscussionPage() {
    return (
        <div className="main-container">
            <header>
                <span className="portrait"></span>
                <div className="username">user0827</div>
                <div className="meeting-title">MEETING TITLE</div>
                <div className="time">time:</div>
            </header>

            <div className="all-contents">
                <div className="horizontal-seats">
                    {[...Array(10)].map((_, index) => (
                        <div key={index} className="h-seat"></div>
                    ))}
                </div>

                <div className="content">
                    <div className="vertical-seats">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="seat"></div>
                        ))}
                    </div>

                    <div className="flow-board">
                        <div className="board-title">flow board</div>
                        <div className="board">
                            <div className="messages">
                                <div className="message green">user5308 raised a MOTION #001!</div>
                                <div className="message red">user9109 debates the MOTION #001!</div>
                                <div className="message yellow">Vote on MOTION #001!</div>
                                {[...Array(15)].map((_, index) => (
                                    <div key={index} className="message red">user9109 debates the MOTION #001!</div>
                                ))}
                                <div className="last-child"></div>
                            </div>
                        </div>
                    </div>

                    <div className="vertical-seats">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="seat"></div>
                        ))}
                    </div>
                </div>

                <div className="horizontal-seats">
                    {[...Array(10)].map((_, index) => (
                        <div key={index} className="h-seat"></div>
                    ))}
                </div>
            </div>

            <div className="toolkit-container">
                <div className="toolkit">
                    <div className="icon">
                        <img src={microphoneIcon} alt="Microphone Icon" width="24" height="24" />
                        <img src={videoIcon} alt="Video Icon" width="24" height="24" />
                    </div>

                    <div className="member-buttons">
                        <button>Raise a Point of Order</button>
                        <button>Second a Motion</button>
                        <button>Make a Motion</button>
                        <button>Request to Speak</button>
                        <button>Exit the Meeting</button>
                    </div>

                    <div className="chair-buttons">
                        <button>Announce Motion</button>
                        <button>Grant the Floor</button>
                        <button>Resolve Point of Order</button>
                        <button>Initiate Voting</button>
                        <button>Conclude the Meeting</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiscussionPage;
