const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

// Routes for CRUD operations on profiles
router.get("/", profileController.getProfiles);
router.post("/", profileController.createProfile);
router.put("/:id", profileController.updateProfile);
router.delete("/:id", profileController.deleteProfile);

module.exports = router;
