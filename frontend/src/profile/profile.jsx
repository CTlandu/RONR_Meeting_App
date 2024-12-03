import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gradient-to-b from-gray-800 to-gray-900 text-gray-100 p-6 flex flex-col justify-between shadow-lg">
        <div className="flex flex-col items-center">
          {/* User Profile */}
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full h-24 w-24 mb-6 shadow-md"></div>
          {/* Username and ID */}
          <div className="w-full mb-4">
            <div className="bg-gray-700 text-lg font-bold p-2 mb-1 text-center rounded shadow-md">
              Username
            </div>
            <div className="bg-gray-800 p-2 text-center rounded shadow-md">
              ID
            </div>
          </div>
        </div>
        {/* Sidebar Options at Bottom */}
        <div className="mt-4">
          <ul className="space-y-4">
            <li>
              <a
                href="https://www.ulm.edu/staffsenate/documents/roberts-rules-of-order.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:text-yellow-400 transition duration-300 font-semibold tracking-wide"
              >
                CHECK RONR
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 flex justify-center items-center p-10">
        <div className="grid grid-cols-2 gap-10">
          {/* Start a Meeting Button */}
          <button
            onClick={() =>
              navigate("/createmeeting", { state: { from: "join" } })
            }
            className="bg-gradient-to-br from-blue-500 to-purple-600 text-white w-48 h-48 flex justify-center items-center font-bold text-xl text-center rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            START A MEETING
          </button>
          {/* Meeting History Button */}
          <button
            onClick={() => navigate("/meetinghistory")}
            className="bg-gradient-to-br from-blue-500 to-green-500 text-white w-48 h-48 flex justify-center items-center font-bold text-xl text-center rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            MEETING HISTORY
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
