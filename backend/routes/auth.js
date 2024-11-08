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
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    // 生成 token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // 在发送响应之前设置 Cookie
    res.cookie("token", token, { httpOnly: true, secure: false });
    res.status(201).send("User registered 用户成功注册");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 登录
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).send("Invalid email，邮箱错误，找不到用户");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid password，密码错误");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, secure: false });
    res.send("Logged in");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 检查是否已登录
router.get("/check-auth", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("Not authenticated");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).send("Authenticated");
  } catch (error) {
    res.status(401).send("Invalid token");
  }
});

module.exports = router;
