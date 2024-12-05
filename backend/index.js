// index.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./dbconnect");
const authRoutes = require("./routes/auth");

const app = express();
connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Credentials",
      "Access-Control-Allow-Headers",
    ],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

// 添加预检请求处理
app.options("*", cors());

// 设置根路由
app.get("/", (req, res) => {
  res.send("Hello, Express with Socket.IO and other services!");
});

// 创建 HTTP 服务器实例
const server = http.createServer(app);

require("./server")(server);

// 启动 HTTP 服务
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
