const express = require("express");
const { saveUserResponse, getUserResponses } = require("../controllers/historyController");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ Ensure req.user.id is attached
    console.log("✅ Authenticated User ID:", req.user.id); // Debugging log
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// Route to save a user response (authenticated)
router.post("/responses", authenticateUser, saveUserResponse);

// Route to get all responses for a user (authenticated)
router.get("/responses", authenticateUser, getUserResponses);

module.exports = router;
