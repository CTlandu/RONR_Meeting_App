import React from "react";

const ChooseRole = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Page Header */}
        <h1 className="text-3xl font-bold text-center mb-6">Choose Your Role</h1>
        {/* Buttons */}
        <div className="space-y-4">
          <button className="w-full bg-gray-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-200">Chair</button>
          <button className="w-full bg-gray-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-200">Secretary</button>
          <button className="w-full bg-gray-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-200">Member</button>
          <button className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition duration-200">Join</button>
        </div>
      </div>
    </div>
  );
}

export default ChooseRole;
