const registerModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

// Create the createUser function
const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please Enter all fields",
    });
  }

  try {
    const existingUser = await registerModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const randomSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, randomSalt);

    const newUser = new registerModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User Successfully Created",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Login User function
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email and password",
    });
  }

  try {
    const user = await registerModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      message: "Login successful",
      token: token,
      userData: {
        _id: user._id, // ✅ Fixed: Ensuring _id is included
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Upload Profile Picture function
const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded!",
      });
    }

    // Normalize the path to use forward slashes
    const profileImageUrl = `${req.protocol}://${req.get(
      "host"
    )}/${req.file.path.replace(/\\/g, "/")}`;

    // Update the user's profile in the database
    const user = await registerModel.findByIdAndUpdate(
      req.user.id,
      { profileImage: profileImageUrl },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      profileImageUrl,
    });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Get Profile Picture function
const getProfilePicture = async (req, res) => {
  try {
    const user = await registerModel.findById(req.user.id);

    if (!user || !user.profileImage) {
      return res.status(404).json({
        message: "Profile picture not found",
      });
    }

    res.status(200).json({
      profileImageUrl: user.profileImage,
    });
  } catch (error) {
    console.error("Error fetching profile picture:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Get User Profile function (Ensuring _id is returned)
const getUserProfile = async (req, res) => {
  try {
    console.log("🔍 Fetching user profile for ID:", req.user.id); // Debugging log

    const user = await registerModel.findById(req.user.id).select("-password");

    if (!user) {
      console.error("❌ User not found for ID:", req.user.id);
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("✅ User found:", user);

    res.status(200).json({
      success: true,
      _id: user._id, // ✅ Fixed: Ensuring _id is included
      username: user.username,
      email: user.email,
      profileImage: user.profileImage || "",
    });
  } catch (error) {
    console.error("❌ Error fetching user profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
module.exports = {
  createUser,
  loginUser,
  uploadProfilePicture,
  getProfilePicture,
  getUserProfile, // ✅ Fixed: Now includes _id
};
