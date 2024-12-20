// ReviewPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Review() {
  const navigate = useNavigate();
  const location = useLocation();
  const { meetingId, isLastMeeting, messages: passedMessages } = location.state || {}; // Data passed when navigating to this page
  const [messages, setMessages] = useState([]);


  const saveReview = async (reviewId, reviewData) => {
    const userId = localStorage.getItem("userID");
  
    if (!userId) {
      console.error("No userID found in localStorage.");
      return;
    }
  
    try {
      const response = await axios.post("/api/reviews", {
          userId, // Include userId in the request body
          reviewId,
          reviewData,
      });
  
      console.log("Review saved:", response.data);
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };
  
  // Example: Fetching reviews for the logged-in user
  const fetchMeetingReviews = async (meetingId) => {
    const userId = localStorage.getItem("userID");
  
    if (!userId) {
      console.error("No userID found in localStorage.");
      return;
    }
  
    try {
        const response = await axios.get(`/api/reviews/${userId}/${meetingId}`);
        console.log(response);
        setMessages(response.data[0].reviewData); // Update messages with fetched reviews
        console.log("Fetched meeting reviews:", response.data[0].reviewData);
        messages.forEach((message) => {
            console.log(message); // Log the text of each message
          });
        console.log(messages);
      } catch (error) {
        console.error("Error fetching meeting reviews:", error);
      }
  };


  useEffect(() => {
    // let userID = localStorage.getItem("userID");
    // console.log(userID)
    if (!meetingId) {
      alert("Invalid meeting details!");
      return;
    }
  
    if (passedMessages) {
      setMessages(passedMessages); 
      saveReview(meetingId, passedMessages);
      
    } else {
        // Otherwise, fetch existing reviews for this meeting
        fetchMeetingReviews(meetingId);
      }
  }, [meetingId, isLastMeeting, passedMessages]);


  const handleExitReview = () => {
    // socket.disconnect();  
    navigate("/meetinghistory");
  };

  return (
    <div className="review-page bg-gray-100 min-h-screen flex flex-col">
      <header className="flex items-center justify-between bg-blue-600 text-white p-4 rounded-md shadow-md mx-20">
        <h1 className="text-lg font-bold">
          Review Page: {isLastMeeting ? "Last Meeting" : `Meeting ID ${meetingId}`}
        </h1>
        <button
          className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
          onClick={handleExitReview}
        >
          Back to History
        </button>
      </header>
  
      <div className="messages-container bg-white p-4 rounded-md shadow-md flex-grow overflow-y-auto mx-20 mt-4">
        <h2 className="text-xl font-bold mb-4">Flow Board Messages</h2>
        <div className="messages space-y-2">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div
                key={index}
                className={`message p-2 rounded-md text-white font-semibold ${
                  message.isChairMessage ? "bg-gray-700" : "bg-gray-500"
                }`}
              >
                {message.text}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No messages to display.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Review;
