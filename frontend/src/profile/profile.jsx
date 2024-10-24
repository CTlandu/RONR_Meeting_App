// src/pages/profile.jsx
import React from "react";

const Profile = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-gray-100 p-6 flex flex-col justify-between">
        <div className="flex flex-col items-center">
          {/* User Profile */}
          <div className="bg-gray-500 rounded-full h-24 w-24 mb-6"></div>
          {/* Username and ID */}
          <div className="w-full mb-4">
            <div className="bg-gray-600 text-lg font-bold p-2 mb-1">Username</div>
            <div className="bg-gray-700 p-2">ID</div>
          </div>
        </div>
        {/* Sidebar Options at Bottom */}
        <div className="mt-4">
          <ul className="space-y-2">
            <li className="cursor-pointer">CHECK RONR</li>
            <li className="cursor-pointer">HELP</li>
          </ul>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 flex justify-center items-center">
        <div className="grid grid-cols-2 gap-8">
          {/* Create a Meeting */}
          <div className="bg-gray-300 w-40 h-40 flex justify-center items-center font-bold text-lg text-center">
            CREATE A MEETING
          </div>
          {/* Join a Meeting */}
          <div className="bg-gray-300 w-40 h-40 flex justify-center items-center font-bold text-lg text-center">
            JOIN A MEETING
          </div>
          {/* Review My Meetings */}
          <div className="bg-gray-300 w-40 h-40 flex justify-center items-center font-bold text-lg text-center">
            REVIEW MY MEETINGS
          </div>
          {/* Placeholder Box */}
          <div className="bg-gray-300 w-40 h-40 flex justify-center items-center font-bold text-lg text-center">
            ...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;