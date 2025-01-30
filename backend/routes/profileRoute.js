const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const authenticateToken = require("../middleware/authMiddleware");
const multer = require("multer"); // Import multer for file uploads
const path = require("path");
const bcrypt = require("bcryptjs");
const { getUserProfile } = require("../controllers/userController");
// Multer setup for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage });

// GET /api/profile
router.get("/", authenticateToken, async (req, res) => {
  try {
    // Retrieve necessary fields including username (profile name)
    const user = await User.findById(req.user.id).select(
      "username email profileImage"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      username: user.username, // Include profile name
      email: user.email,
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/profile/upload
router.post(
  "/upload",
  authenticateToken, // Ensure the user is authenticated
  upload.single("profileImage"), // Multer middleware to handle the uploaded file
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Update user's profileImage in the database
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { profileImage: req.file.path }, // Save file path in profileImage field
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        message: "Profile picture uploaded successfully",
        profileImageUrl: req.file.path,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// POST /api/change-password
router.post("/change-password", authenticateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Please provide both old and new passwords" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect old password" });
    }

    if (oldPassword === newPassword) {
      return res
        .status(400)
        .json({ message: "Please use a different password" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
