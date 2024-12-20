const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Updated in-memory storage
const reviewsData = {};

// Save a review
app.post("/reviews", (req, res) => {
  const { userId, reviewId, reviewData, meetingId } = req.body;

  if (!userId || !reviewId || !reviewData || !meetingId) {
    return res.status(400).json({ message: "Missing userId, reviewId, reviewData, or meetingId" });
  }

  if (!reviewsData[userId]) {
    reviewsData[userId] = {};
  }

  if (!reviewsData[userId][meetingId]) {
    reviewsData[userId][meetingId] = {};
  }

  reviewsData[userId][meetingId][reviewId] = reviewData;
  res.status(201).json({ message: "Review saved successfully" });
});

// Get all reviews for a specific user and meeting
app.get("/reviews/:userId/:meetingId", (req, res) => {
  const { userId, meetingId } = req.params;

  if (!reviewsData[userId] || !reviewsData[userId][meetingId]) {
    return res.status(404).json({ message: "No reviews found for this user and meeting" });
  }

  res.status(200).json(reviewsData[userId][meetingId]);
});

// Start the data server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Data server running on port ${PORT}`);
});