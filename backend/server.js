const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const profileRoutes = require("./routes/profileRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const profiles = [
  { _id: 1, name: "John Doe", lat: 40.7128, lng: -74.006 },
  { _id: 2, name: "Jane Smith", lat: 37.7749, lng: -122.4194 },
];

app.use(cors());
app.use(express.json());

app.get("/profiles", (req, res) => {
  res.json(profiles);
});
app.post("/api/profiles", async (req, res) => {
  try {
    const { name, email, lat, lng } = req.body;

    const newProfile = new Profile({ name, email, lat, lng });
    await newProfile.save();

    res
      .status(201)
      .json({ message: "Profile added successfully!", profile: newProfile });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding profile", error: error.message });
  }
});



// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
