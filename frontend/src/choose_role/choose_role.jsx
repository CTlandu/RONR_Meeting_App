import React, { useState } from "react";

const ChooseRole = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleClick = (role) => {
    setSelectedRole(selectedRole === role ? null : role);
  };

  const handleJoinClick = () => {
    if (!selectedRole) {
      alert("Please select a role before joining.");
    } else {
      alert(`You have selected the role: ${selectedRole}`);
      // Add your logic to proceed further here
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Page Header */}
        <h1 className="text-3xl font-bold text-center mb-6">Choose Your Role</h1>
        {/* Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => handleRoleClick("Chair")}
            className={`w-full py-2 rounded-lg font-bold transition duration-200 ${
              selectedRole === "Chair"
                ? "bg-blue-500 text-white"
                : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
          >
            Chair
          </button>
          <button
            onClick={() => handleRoleClick("Secretary")}
            className={`w-full py-2 rounded-lg font-bold transition duration-200 ${
              selectedRole === "Secretary"
                ? "bg-blue-500 text-white"
                : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
          >
            Secretary
          </button>
          <button
            onClick={() => handleRoleClick("Member")}
            className={`w-full py-2 rounded-lg font-bold transition duration-200 ${
              selectedRole === "Member"
                ? "bg-blue-500 text-white"
                : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
          >
            Member
          </button>
          <button
            onClick={handleJoinClick}
            className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseRole;
