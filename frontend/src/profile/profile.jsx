import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-gray-100 p-6 flex flex-col justify-between">
        <div className="flex flex-col items-center">
          {/* User Profile */}
          <div className="bg-gray-500 rounded-full h-24 w-24 mb-6"></div>
          {/* Username and ID */}
          <div className="w-full mb-4">
            <div className="bg-gray-600 text-lg font-bold p-2 mb-1 text-center rounded">Username</div>
            <div className="bg-gray-700 p-2 text-center rounded">ID</div>
          </div>
        </div>
        {/* Sidebar Options at Bottom */}
        <div className="mt-4">
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-yellow-400 transition duration-200">CHECK RONR</li>
            <li className="cursor-pointer hover:text-yellow-400 transition duration-200">HELP</li>
          </ul>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 flex justify-center items-center">
        <div className="grid grid-cols-2 gap-8">
          {/* Create a Meeting Button */}
          <button
            onClick={() => navigate('/createmeeting', { state: { from: 'create' } })}
            className="bg-gray-500 hover:bg-gray-600 text-white w-40 h-40 flex justify-center items-center font-bold text-lg text-center rounded-lg shadow-md transition duration-300"
          >
            CREATE A MEETING
          </button>
          {/* Join a Meeting Button */}
          <button
            onClick={() => navigate('/createmeeting', { state: { from: 'join' } })}
            className="bg-gray-500 hover:bg-gray-600 text-white w-40 h-40 flex justify-center items-center font-bold text-lg text-center rounded-lg shadow-md transition duration-300"
          >
            JOIN A MEETING
          </button>
          {/* Review My Meetings Button */}
          <button className="bg-gray-500 hover:bg-gray-600 text-white w-40 h-40 flex justify-center items-center font-bold text-lg text-center rounded-lg shadow-md transition duration-300">
            MEETING HISTORY
          </button>
          {/* Placeholder Button */}
          <button className="bg-gray-400 hover:bg-gray-500 text-white w-40 h-40 flex justify-center items-center font-bold text-lg text-center rounded-lg shadow-md transition duration-300">
            ...
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
