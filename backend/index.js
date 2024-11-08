// 导入 express
const express = require("express");
const cors = require("cors"); // 引入 cors

// 创建 express 实例
const app = express();

// 定义服务器端口
const PORT = 3000;

const connectDB = require("./dbconnect");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");

connectDB();

// 使用 cors 中间件
app.use(
  cors({
    origin: "http://localhost:3000", // 替换为你的前端地址
    credentials: true, // 允许发送 Cookie
  })
);

// 设置根路由
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// 启动服务器，监听指定端口
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 服务器运行在端口${PORT}`);
});

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
