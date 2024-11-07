import React from "react";

const AboutUs = () => {
  return (
    <div className="flex h-screen bg-gray-200">
      {/* Left Panel */}
      <div className="w-1/3 bg-gray-400 flex items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-black">Some Portraits</h1>
      </div>

      {/* Right Panel */}
      <div className="flex-1 bg-white p-10 relative">
        {/* Header */}
        <div className="absolute top-8 right-0 transform bg-gray-400 p-4 rounded-tl-lg rounded-bl-lg">
          <h2 className="text-2xl font-bold text-black">About Us - RONR</h2>
        </div>

        {/* Footer Link */}
        <div className="absolute bottom-8 left-10">
          <a href="/prelogin" className="text-black font-bold hover:underline">&larr; back to home page</a>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
