const Profile = require("../models/Profile");

// Fetch all profiles
const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new profile
const createProfile = async (req, res) => {
  const { name, description, photo, address, lat, lng } = req.body;

  const newProfile = new Profile({
    name,
    description,
    photo,
    address,
    lat,
    lng,
  });

  try {
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update profile
const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    profile.name = req.body.name || profile.name;
    profile.description = req.body.description || profile.description;
    profile.photo = req.body.photo || profile.photo;
    profile.address = req.body.address || profile.address;
    profile.lat = req.body.lat || profile.lat;
    profile.lng = req.body.lng || profile.lng;

    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete profile
const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    await profile.remove();
    res.json({ message: "Profile deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProfiles, createProfile, updateProfile, deleteProfile };
