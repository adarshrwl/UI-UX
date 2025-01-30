const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String, // Store the URL of the uploaded image
    default: "default_avatar.jpg", // Optional: Default avatar
  },
});

const Register = mongoose.model("register", registerSchema);
module.exports = Register;
