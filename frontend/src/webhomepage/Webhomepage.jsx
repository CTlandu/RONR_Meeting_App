// src/pages/Webhomepage.jsx
import React from "react";

const Webhomepage = () => {
  return (
    <body class="flex flex-col relative m-0 p-0 box-border font-sans">
        <div class="bg-[#606060] relative w-full h-[55%] min-h-[400px]">
            <div class="bg-[#9EA5AD] absolute w-[85%] min-w-[800px] h-[120px] top-[10%] left-0 z-30">
                <p class="text-[70px] font-bold absolute left-[5%] top-[10%]">
                    Prototype Login Page
                </p>
            </div>
            <div class="bg-[#9EA5AD] absolute w-[60%] min-w-[600px] h-[30px] top-[50%] left-0 z-30"></div>
            <div class="bg-[#9EA5AD] absolute w-[45%] min-w-[400px] h-[30px] top-[105%] left-0"></div>
            <div class="bg-[#D9D9D9] absolute w-[9%] min-w-[50px] h-screen top-0 left-[5%] z-20"></div>
            <div class="bg-[#D9D9D9] absolute w-[3%] min-w-[10px] h-[80vh] top-0 left-[15%]"></div>
        </div>

        <div class="grid grid-cols-2 fixed w-[40%] min-w-[300px] h-[100px] bottom-[20%] right-[1%] gap-[20px]">
            <button class="bg-[#9EA5AD] text-[35px] font-bold">
                LOGIN
            </button>
            <button class="bg-[#9EA5AD] text-[35px] font-bold">
                SIGN UP
            </button>
        </div>

        <div class="bg-[#9EA5AD] fixed w-[36%] min-w-[300px] h-[60px] bottom-[6%] left-0 z-10">
            <p class="text-[35px] font-bold absolute right-[10%] top-[15%]">
                About US
            </p>
        </div>
    </body>
  );
};

export default Webhomepage;
