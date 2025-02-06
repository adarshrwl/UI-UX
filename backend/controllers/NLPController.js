const natural = require("natural");
const Typo = require("typo-js"); // Import Typo.js

// Load the default English dictionary
const dictionary = new Typo("en_US");

// Analyze Text for IELTS-Like Scoring
const analyzeText = async (req, res) => {
  try {
    const { userInput, explanation } = req.body;

    if (!userInput || !explanation) {
      return res
        .status(400)
        .json({ error: "Both userInput and explanation are required." });
    }

    const tokenizer = new natural.WordTokenizer();
    const userWords = tokenizer.tokenize(userInput.toLowerCase());
    const explanationWords = tokenizer.tokenize(explanation.toLowerCase());

    // 1. Grammar Check (Word Overlap)
    const matchedWords = userWords.filter((word) =>
      explanationWords.includes(word)
    );
    let grammarScore = (matchedWords.length / explanationWords.length) * 100;
    grammarScore = Math.min(grammarScore, 100); // Cap at 100%

    // 2. Lexical Diversity
    const uniqueWords = [...new Set(userWords)];
    let lexicalDiversity = (uniqueWords.length / userWords.length) * 100;
    lexicalDiversity = Math.min(lexicalDiversity, 100); // Cap at 100%

    // 3. Coherence (Keyword Overlap Between Sentences)
    const sentenceTokenizer = new natural.SentenceTokenizer();
    const userSentences = sentenceTokenizer.tokenize(userInput.toLowerCase());
    const explanationSentences = sentenceTokenizer.tokenize(
      explanation.toLowerCase()
    );

    let coherenceScore = 0;
    userSentences.forEach((userSentence) => {
      const userTokens = tokenizer.tokenize(userSentence);
      explanationSentences.forEach((explanationSentence) => {
        const explanationTokens = tokenizer.tokenize(explanationSentence);
        const overlap = userTokens.filter((word) =>
          explanationTokens.includes(word)
        );
        if (overlap.length > 0) coherenceScore++;
      });
    });
    coherenceScore = (coherenceScore / explanationSentences.length) * 100;
    coherenceScore = Math.min(coherenceScore, 100); // Cap at 100%

    // 4. Task Achievement (Word Count Proxy)
    const wordCount = userWords.length;
    const targetWordCount = 250; // Example target for IELTS writing task
    let taskAchievement = (wordCount / targetWordCount) * 100;
    taskAchievement = Math.min(taskAchievement, 100); // Cap at 100%

    // 5. Spelling Check
    let misspelledCount = 0;
    userWords.forEach((word) => {
      if (!dictionary.check(word)) {
        misspelledCount++;
      }
    });
    let spellingScore =
      ((userWords.length - misspelledCount) / userWords.length) * 100;
    spellingScore = Math.min(spellingScore, 100); // Cap at 100%

    // Overall IELTS-Like Score (Weighted Average)
    const overallScore =
      grammarScore * 0.3 + // Increased weight for Grammar (30%)
      coherenceScore * 0.3 + // Increased weight for Coherence (30%)
      lexicalDiversity * 0.1 + // Reduced weight for Lexical Diversity (10%)
      taskAchievement * 0.2 + // Kept Task Achievement at 20%
      spellingScore * 0.1; // Reduced weight for Spelling (10%)

    // Send the response
    res.json({
      grammarScore: Math.min(grammarScore, 100).toFixed(2),
      lexicalDiversity: Math.min(lexicalDiversity, 100).toFixed(2),
      coherenceScore: Math.min(coherenceScore, 100).toFixed(2),
      taskAchievement: Math.min(taskAchievement, 100).toFixed(2),
      spellingScore: Math.min(spellingScore, 100).toFixed(2),
      overallScore: Math.min(overallScore, 100).toFixed(2), // Ensure overallScore is capped
    });
    
  } catch (error) {
    console.error("Error analyzing text:", error);
    res
      .status(500)
      .json({ error: "An error occurred while analyzing the text." });
  }
};

module.exports = { analyzeText };
