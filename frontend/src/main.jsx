import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import App from "./App";

// 设置 axios 默认配置
axios.defaults.withCredentials = true;
// 添加基础 URL
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

ReactDOM.render(<App />, document.getElementById("root"));
