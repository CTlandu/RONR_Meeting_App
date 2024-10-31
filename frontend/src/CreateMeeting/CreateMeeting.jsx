import React from "react";

const CreateMeeting = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      {/* Main container */}
      <div className="w-2/5 bg-gray-400 p-10 rounded-lg border-4 border-gray-300">
        {/* Header */}
        <div className="text-left mb-8">
          <button className="bg-gray-600 text-black font-bold py-2 px-4 rounded">CREATE A MEETING</button>
        </div>
        {/* Form Fields */}
        <div className="space-y-6">
          <div className="flex items-center">
            <label className="font-bold text-lg mr-4 w-40">Meeting Name:</label>
            <input type="text" className="flex-1 p-2 border border-gray-400 rounded bg-gray-200" />
          </div>
          <div className="flex items-center">
            <label className="font-bold text-lg mr-4 w-40">Meeting Time:</label>
            <input type="text" className="flex-1 p-2 border border-gray-400 rounded bg-gray-200" />
          </div>
          <div className="flex items-center">
            <label className="font-bold text-lg mr-4 w-40">Meeting Number:</label>
            <input type="text" className="flex-1 p-2 border border-gray-400 rounded bg-gray-200" />
          </div>
        </div>
        {/* Buttons */}
        <div className="flex justify-center mt-8 space-x-8">
          <button className="bg-green-500 text-black font-bold py-2 px-10 rounded-lg">CONFIRM</button>
          <button className="bg-red-400 text-black font-bold py-2 px-10 rounded-lg">CANCEL</button>
        </div>
      </div>
    </div>
  );
}

export default CreateMeeting;
