import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const MeetingHistory = () => {
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userID");
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get(`/api/reviews/${userId}`);
        setMeetings(response.data); // Set the meetings data in state
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };

    if (userId) {
      fetchMeetings();
    } else {
      console.error("User ID not found in localStorage.");
    }
  }, [userId]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* Main container */}
      <div className="w-3/5 bg-white p-10 rounded-lg shadow-lg border-2 border-gray-300">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Meeting History</h1>
        </div>
        {/* Meeting List */}
        <div className="space-y-4">
          {meetings.length > 0 ? (
            meetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex justify-between items-center p-4 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200"
              >
                <span className="font-semibold text-lg text-gray-700">
                  Meeting ID: {meeting.reviewId}
                </span>
                <div className="meeting-item">
                  <button
                    className="text-blue-500 underline"
                    onClick={() =>
                      navigate("/review", { state: { meetingId: meeting.reviewId, isLastMeeting: false } })
                    }
                  >
                    View Review
                  </button>
                </div>
                <span className="text-gray-600">Date: {meeting.date}</span>
              </div>
            ))
          ) : (
            <p>No meetings available for this user.</p>
          )}
        </div>
        <div className="absolute bottom-1 left-10">
          <Link
            to="/profile"
            className="text-blue-600 font-bold hover:underline flex items-center space-x-2"
          >
            <span>&larr;</span> <span>Back to Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MeetingHistory;