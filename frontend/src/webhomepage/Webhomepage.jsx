import React from "react";

const Webhomepage = () => {
  return (
    <body className="flex flex-col relative m-0 p-0 box-border font-sans min-h-screen">
      {/* 背景部分 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 relative w-full h-[55%] min-h-[400px]">
        <div className="bg-gradient-to-r from-blue-400 to-purple-400 absolute w-[85%] min-w-[800px] h-[120px] top-[10%] left-0 z-30 rounded-br-[20px] rounded-tr-[20px]">
          <p className="text-[70px] font-bold absolute left-[5%] top-[10%] bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300 drop-shadow-md animate-fade-in">
            EON RONR: Start Now
          </p>
        </div>
        <div className="bg-gradient-to-r from-blue-400 to-purple-400 absolute w-[60%] min-w-[600px] h-[30px] top-[50%] left-0 z-30 rounded-br-[20px] rounded-tr-[20px]"></div>
        <div className="bg-gradient-to-r from-blue-400 to-purple-400 absolute w-[45%] min-w-[400px] h-[30px] top-[105%] left-0 rounded-br-[20px] rounded-tr-[20px]"></div>
        <div className="bg-gradient-to-b from-blue-400 to-purple-300 absolute w-[9%] min-w-[50px] h-screen top-0 left-[5%] z-20"></div>
        <div className="bg-gradient-to-b from-blue-400 to-purple-300 absolute w-[3%] min-w-[10px] h-[80vh] top-0 left-[15%] rounded-br-[20px] rounded-bl-[20px]"></div>
      </div>

      {/* Login 和 Sign Up 按钮 */}
      <div className="flex flex-col justify-between items-center fixed bottom-0 right-0 h-[40%] w-[40%] p-8 space-y-6">
        {/* LOGIN Button */}
        <button
          onClick={() => (window.location.href = "/login?mode=login")}
          className="w-full h-[45%] bg-gradient-to-br from-blue-500 to-purple-600 text-[30px] font-bold text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-100"
        >
          LOGIN
        </button>
        {/* SIGN UP Button */}
        <button
          onClick={() => (window.location.href = "/login?mode=register")}
          className="w-full h-[45%] bg-gradient-to-br from-blue-500 to-purple-600 text-[30px] font-bold text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-100"
        >
          SIGN UP
        </button>
      </div>

      {/* About Us Section */}
      <div className="absolute left-0 bottom-10 w-[36%] bg-gradient-to-r from-blue-400 to-purple-400 h-[60px] rounded-br-[20px] rounded-tr-[20px]">
        <a
          href="/about"
          className="text-[35px] font-bold absolute right-[10%] top-[10%] text-white hover:underline"
        >
          About US
        </a>
      </div>
    </body>
  );
};

export default Webhomepage;
