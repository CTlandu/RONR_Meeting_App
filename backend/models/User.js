const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  meeting_attended: {
    type: [String], // 字符串数组，用于存储会议ID
    default: [], // 默认为空数组
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
