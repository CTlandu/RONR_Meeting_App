// src/pages/Webhomepage.jsx
import React from "react";

const Webhomepage = () => {
  return (
    <body className="flex flex-col relative m-0 p-0 box-border font-sans">
        <div className="bg-[#606060] relative w-full h-[55%] min-h-[400px]">
            <div className="bg-[#9EA5AD] absolute w-[85%] min-w-[800px] h-[120px] top-[10%] left-0 z-30 rounded-br-[20px] rounded-tr-[20px]">
                <p className="text-[70px] font-bold absolute left-[5%] top-[10%]">
                    Prototype Login Page
                </p>
            </div>
            <div className="bg-[#9EA5AD] absolute w-[60%] min-w-[600px] h-[30px] top-[50%] left-0 z-30 rounded-br-[20px] rounded-tr-[20px]"></div>
            <div className="bg-[#9EA5AD] absolute w-[45%] min-w-[400px] h-[30px] top-[105%] left-0 rounded-br-[20px] rounded-tr-[20px]"></div>
            <div className="bg-[#D9D9D9] absolute w-[9%] min-w-[50px] h-screen top-0 left-[5%] z-20"></div>
            <div className="bg-[#D9D9D9] absolute w-[3%] min-w-[10px] h-[80vh] top-0 left-[15%] rounded-br-[20px] rounded-bl-[20px]"></div>
        </div>

        <div className="grid grid-cols-2 fixed w-[40%] min-w-[300px] h-[100px] bottom-[20%] right-[1%] gap-[20px]">
            {/* LOGIN Button */}
            <button
              onClick={() => window.location.href='/login?mode=login'}
              className="bg-[#9EA5AD] text-[35px] font-bold rounded-[10px] transition duration-300 transform hover:bg-[#8B949E] hover:scale-105 active:bg-[#7A8B97]"
            >
                LOGIN
            </button>
            {/* SIGN UP Button */}
            <button
              onClick={() => window.location.href='/login?mode=register'}
              className="bg-[#9EA5AD] text-[35px] font-bold rounded-[10px] transition duration-300 transform hover:bg-[#8B949E] hover:scale-105 active:bg-[#7A8B97]"
            >
                SIGN UP
            </button>
        </div>

        <div className="bg-[#9EA5AD] fixed w-[36%] min-w-[300px] h-[60px] bottom-[6%] left-0 z-10 rounded-br-[20px] rounded-tr-[20px]">
            <a href="/about" className="text-[35px] font-bold absolute right-[10%] top-[5%] hover:underline">
                About US
            </a>
        </div>
    </body>
  );
};

export default Webhomepage;
