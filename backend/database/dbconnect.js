const mongoose = require("mongoose");

mongodb_uri = "";

const connectDB = async () => {
  try {
    console.log("正在尝试连接到MongoDB..., 链接地址:", mongodb_uri);
    const conn = await mongoose.connect(mongodb_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
