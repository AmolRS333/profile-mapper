const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  photo: { type: String, required: false },
  address: { type: String, required: false },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

module.exports = mongoose.model("Profile", profileSchema);
