const router = require("express").Router();
const userController = require("../controllers/userController");
const authenticateToken = require("../middleware/authMiddleware");
const multer = require("multer"); // Import multer for file uploads

// Multer setup for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  },
});
const upload = multer({ storage }); // Middleware for file upload

// User routes
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);

// Profile picture upload route
router.post(
  "/upload",
  authenticateToken, // Middleware to authenticate user
  upload.single("profileImage"), // Middleware to handle single file upload
  userController.uploadProfilePicture // Controller to process the upload
);

// Get profile picture route
router.get(
  "/profile-picture",
  authenticateToken, // Middleware to authenticate user
  userController.getProfilePicture // Controller to fetch the profile picture
);

module.exports = router;
