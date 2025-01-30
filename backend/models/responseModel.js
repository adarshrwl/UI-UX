const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  grammarScore: {
    type: Number,
    required: true,
  },
  spellingScore: {
    type: Number,
    required: true,
  },
  overallScore: {
    type: Number,
    required: true,
  },
  timeTaken: {
    type: Number, // Time taken in seconds
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Response", ResponseSchema);
