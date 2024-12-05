import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200">
      {/* 左侧面板 */}
      <div className="lg:w-1/3 w-full bg-gradient-to-b from-blue-400 to-purple-400 flex items-center justify-center p-8 lg:p-0">
        <h1 className="text-5xl font-extrabold text-white tracking-wide drop-shadow-lg">
          Meet Our Team
        </h1>
      </div>

      {/* 右侧面板 */}
      <div className="flex-1 bg-white p-12 lg:p-16 relative flex flex-col justify-between shadow-md overflow-y-auto">
        {/* 标题部分 */}
        <div className="flex flex-col items-start mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-lg drop-shadow-md">
            <h2 className="text-3xl font-bold text-white">About EON RONR</h2>
          </div>
        </div>

        {/* 主要内容 */}
        <div className="flex-grow mb-8">
          <p className="text-gray-800 leading-relaxed text-lg">
            EON RONR is a comprehensive platform aimed at making your meetings
            more effective and efficient. With tools inspired by parliamentary
            procedures, our platform provides the ability to streamline your
            team's decision-making process and ensure everyone has a voice.
          </p>
          <p className="text-gray-800 leading-relaxed text-lg mt-6">
            Our mission is to provide a fair, consistent, and powerful approach
            to managing meetings, from small discussions to larger corporate
            gatherings. We believe in open collaboration and empowering leaders
            and team members alike.
          </p>
        </div>

        {/* 团队成员展示部分 */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg mb-16 shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-4">
            Our Team Members
          </h3>
          <ul className="text-white space-y-2 text-lg">
            <li>Ajax Li</li>
            <li>Mengyang He</li>
            <li>Colin Tang</li>
            <li>Duohan Xu</li>
            <li>Aibo Li</li>
            <li>Huizhi Zhao</li>
          </ul>
        </div>

        {/* 底部链接 */}
        <div className="absolute bottom-1 left-10">
          <Link
            to="/prelogin"
            className="text-blue-600 font-bold hover:underline flex items-center space-x-2"
          >
            <span>&larr;</span> <span>Back to Home Page</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
