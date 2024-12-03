import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import App from "./App";

// 设置 axios 默认配置
axios.defaults.withCredentials = true;

ReactDOM.render(<App />, document.getElementById("root"));
