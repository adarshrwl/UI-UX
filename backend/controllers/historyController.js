const mongoose = require("mongoose");
const Response = require("../models/responseModel");

// Save a user response
const saveUserResponse = async (req, res) => {
  const {
    question,
    response,
    correctAnswer,
    grammarScore,
    spellingScore,
    overallScore,
    timeTaken,
  } = req.body;

  // Validate that all required fields are provided
  if (
    !req.user.id ||
    !question ||
    !response ||
    !correctAnswer ||
    grammarScore === undefined ||
    spellingScore === undefined ||
    overallScore === undefined ||
    timeTaken === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    // Create a new response with all the provided details
    const newResponse = new Response({
      userId: req.user.id, // Extract user ID from the token (req.user)
      question,
      response,
      correctAnswer,
      grammarScore,
      spellingScore,
      overallScore,
      timeTaken,
    });

    // Save the response to the database
    const savedResponse = await newResponse.save();

    res.status(201).json({
      success: true,
      message: "Response saved successfully",
      data: savedResponse,
    });
  } catch (error) {
    console.error("❌ Error saving user response:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get user responses (History)
const getUserResponses = async (req, res) => {
  const userId = req.user.id; // Extract user ID from the token (req.user)

  console.log("🔍 Retrieved User ID from token:", userId);

  try {
    // Find all responses for the logged-in user
    const responses = await Response.find({ userId });

    console.log("✅ Retrieved responses:", responses);
    res.status(200).json({
      success: true,
      data: responses,
    });
  } catch (error) {
    console.error("❌ Error fetching user responses:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  saveUserResponse,
  getUserResponses,
};
