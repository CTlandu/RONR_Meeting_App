import React from "react";

const MeetingHistory = () => {
  const meetings = [
    { id: "001", date: "2023-11-01 14:00" },
    { id: "002", date: "2023-11-05 10:30" },
    { id: "003", date: "2023-11-10 09:00" },
    { id: "004", date: "2023-11-15 16:45" },
  ];

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
          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              className="flex justify-between items-center p-4 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200"
            >
              <span className="font-semibold text-lg text-gray-700">Meeting ID: {meeting.id}</span>
              <span className="text-gray-600">Date: {meeting.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetingHistory;
