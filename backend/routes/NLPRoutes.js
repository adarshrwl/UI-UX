const express = require("express");
const { analyzeText } = require("../controllers/NLPController");
const router = express.Router();

// NLP Analysis Route
router.post("/analyze", analyzeText);

module.exports = router;
