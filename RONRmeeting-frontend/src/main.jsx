import React from "react";
import ReactDOM from "react-dom/client"; // 从 react-dom/client 导入
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // 获取根元素
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
