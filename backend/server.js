const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Use the profile routes
app.use("/api/profiles", profileRoutes);
app.use("/api/auth", authRoutes);

// For backward compatibility, keep the direct profiles endpoint
app.get("/profiles", async (req, res) => {
  try {
    // Try to fetch from database first
    const Profile = require("./models/Profile");
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    console.error("Error fetching profiles from database:", err);
    // Fallback to sample data if database is not available
    const profiles = [
      {
        _id: 1,
        name: "John Doe",
        description: "Software Developer",
        photo: "https://via.placeholder.com/150",
        address: "New York, NY",
        lat: 40.7128,
        lng: -74.006,
      },
      {
        _id: 2,
        name: "Jane Smith",
        description: "UX Designer",
        photo: "https://via.placeholder.com/150",
        address: "San Francisco, CA",
        lat: 37.7749,
        lng: -122.4194,
      },
    ];
    res.json(profiles);
  }
});

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
