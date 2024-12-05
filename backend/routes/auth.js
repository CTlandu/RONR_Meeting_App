const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

// 注册
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    // 使用 bcrypt 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    // 生成 token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // 设置 cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 登录
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", { email }); // 不要记录密码

    const user = await User.findOne({ email });
    console.log("Found user:", user ? "Yes" : "No"); // 调试用

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 使用 bcrypt 比较密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 创建 token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // 设置 cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    console.log("Login successful, token set"); // 调试用

    res.status(200).json({
      message: "Logged in successfully",
      user: { email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

// 检查认证状态
router.get("/check-auth", (req, res) => {
  console.log("Received cookies:", req.cookies); // 调试日志
  const token = req.cookies.token;

  if (!token) {
    console.log("No token in cookies"); // 调试日志
    return res.status(401).json({ message: "No token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // 调试日志
    res.status(200).json({
      message: "Authenticated",
      user: { email: decoded.email },
    });
  } catch (error) {
    console.error("Token verification error:", error); // 调试日志
    res.status(401).json({ message: "Invalid token" });
  }
});

// 登出路由
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
