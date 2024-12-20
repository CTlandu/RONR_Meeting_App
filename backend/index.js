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

// Save a review
let reviews = [];
app.post("/api/reviews", async (req, res) => {
  try {
    const { userId, reviewId, reviewData } = req.body;
    if (!userId || !reviewId || !reviewData) {
      return res.status(400).json({ message: "Missing required fields" });
    }
  
    const newReview = {
      userId,
      reviewId,
      reviewData,
    };
  
    // Save the review in memory (or in your database)
    reviews.push(newReview);
  
    res.status(201).json({ message: "Review saved successfully", review: newReview });
  } catch (error) {
    console.error("Error saving review:", error.message);
    res.status(500).json({ message: "Failed to save review" });
  }
});

// Get all reviews for a user
app.get("/api/reviews/:userId/:meetingId", async (req, res) => {
  const { userId, meetingId } = req.params;
  console.log(meetingId)
  try {
    // Filter reviews by userId and meetingId
    const meetingReviews = reviews.filter(review => review.userId === userId && review.reviewId === meetingId);
    console.log(reviews);
    if (meetingReviews.length === 0) {
      return res.status(404).json({ message: "No reviews found for this meeting" });
    }
    res.status(200).json(meetingReviews);
  } catch (error) {
    console.error("Error fetching meeting reviews:", error.message);
    res.status(500).json({ message: "Failed to fetch meeting reviews" });
  }
});

app.get("/api/reviews/:userId", (req, res) => {
  const { userId } = req.params;

  // Find all meetings for the user
  const userMeetings = reviews.filter(review => review.userId === userId);

  if (userMeetings.length === 0) {
    return res.status(404).json({ message: "No meetings found for this user" });
  }

  res.status(200).json(userMeetings);
});



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


