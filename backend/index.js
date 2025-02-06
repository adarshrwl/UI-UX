require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database/database");
const userRoutes = require("./routes/userRoutes");
const practiceRoutes = require("./routes/practiceRoutes");
const audioQuestionRoutes = require("./routes/audioQuestionRoutes");
const profileRoute = require("./routes/profileRoute");
const nlpRoute = require("./routes/NLPRoutes"); 
const historyRoutes = require("./routes/historyRoutes");
const path = require("path");

const app = express();


connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/login", userRoutes);
app.use("/api/users", userRoutes);
app.use("/practiceTasks", practiceRoutes);
app.use("/audioQuestions", audioQuestionRoutes);
app.use("/api/profile", profileRoute);
app.use("/api", nlpRoute); // Correct registration of NLP route
app.use("/api/history", historyRoutes);
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.path}`);
  next();
});

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
