import React, { useState } from 'react';
import './DiscussionPage.css';
import microphoneIcon from './microphone-solid.svg';
import videoIcon from './video-solid.svg';

function DiscussionPage() {
    const [messages, setMessages] = useState([]);

    /*const handleMakeMotion = () => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { type: 'green', text: 'user5308 raised a MOTION #001!' },
        ]);
    };*/
    const handleMessage = (type, text, isChairMessage = false) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { type, text, isChairMessage },
        ]);
    };

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
                                {messages.map((message, index) => (
                                    <div
                                    key={index}
                                    className={`message ${message.type} ${
                                        message.isChairMessage ? 'chair-message' : 'member-message'
                                    }`}
                                    >
                                    {message.text}
                                    </div>
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
                        <button onClick={() => handleMessage('yellow', 'user0827 raised a Point of Order!',false)}>Raise a Point of Order</button>
                        <button onClick={() => handleMessage('red', 'user0827 Second MOTION #001!',false)}>Second a Motion</button>
                        <button onClick={() => handleMessage('green', 'user5308 raised MOTION #001!',false)}> Make a Motion</button>
                        <button onClick={() => handleMessage('blue', 'user0827 request to speak',false)}>Request to Speak</button>
                        <button>Exit the Meeting</button>
                    </div>

                    <div className="chair-buttons">
                        <button onClick={() => handleMessage('#fff', 'The chair announced MOTION #001!',true)}>Announce Motion</button>
                        <button onClick={() => handleMessage('#fff', 'The chair granted user0827 the floor',true)}>Grant the Floor</button>
                        <button onClick={() => handleMessage('#fff', 'The chair resolved Point of Order!',true)}>Resolve Point of Order</button>
                        <button onClick={() => handleMessage('#fff', 'The chair initiate voting!',true)}>Initiate Voting</button>
                        <button onClick={() => handleMessage('#fff', 'Meeting ends.',true)}>Conclude the Meeting</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiscussionPage;
