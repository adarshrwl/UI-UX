import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import Pagination from "../../components/Pagination";
import "./Practice.css";

const Practice = () => {
  const [time, setTime] = useState(60);
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [submittedAnswer, setSubmittedAnswer] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedTaskType, setSelectedTaskType] = useState(
    "Write about the Photo"
  );
  const [currentTask, setCurrentTask] = useState(null);
  const [playCount, setPlayCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const [overallScore, setOverallScore] = useState(0);
  const [grammarPercentage, setGrammarPercentage] = useState(0);
  const [spellingPercentage, setSpellingPercentage] = useState(0);
  const [lexicalDiversity, setLexicalDiversity] = useState(0);
  const [coherenceScore, setCoherenceScore] = useState(0);
  const [taskAchievement, setTaskAchievement] = useState(0);

  const audioRef = useRef(null);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  // Timer Effect
  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => setTime(time - 1), 1000);
      return () => clearInterval(timer);
    } else {
      handleSubmit();
      setIsDisabled(true);
    }
  }, [time]);

  // Update current task when tasks or current page changes
  useEffect(() => {
    if (tasks.length > 0) setCurrentTask(tasks[currentPage - 1]);
  }, [tasks, currentPage]);

  // Update word count on text change
  useEffect(() => {
    setWordCount(
      text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length
    );
  }, [text]);

  // Fetch tasks based on selected task type
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const url =
          selectedTaskType === "Write about the Photo"
            ? "http://localhost:5002/practiceTasks"
            : "http://localhost:5002/audioQuestions";
        const response = await axios.get(url);
        setTasks(response.data.tasks || response.data.questions || []);
      } catch (error) {
        console.error("Error fetching practice tasks:", error);
        setTasks([]);
      }
    };
    fetchTasks();
  }, [selectedTaskType]);

  // Reset state for retry
  const handleRetry = () => {
    setText("");
    setWordCount(0);
    setTime(60);
    setShowExplanation(false);
    setSubmittedAnswer("");
    setPlayCount(0);
    setIsDisabled(false);
    setOverallScore(0);
    setGrammarPercentage(0);
    setSpellingPercentage(0);
    setLexicalDiversity(0);
    setCoherenceScore(0);
    setTaskAchievement(0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Analyze text using NLP API
  const calculateGrammarAndSpelling = async (userInput, explanation) => {
    try {
      const response = await axios.post("http://localhost:5002/api/analyze", {
        userInput,
        explanation,
      });

      // Validate if the expected fields exist in the response
      const {
        grammarScore,
        spellingScore,
        overallScore,
        lexicalDiversity,
        coherenceScore,
        taskAchievement,
      } = response.data;

      if (
        grammarScore !== undefined &&
        spellingScore !== undefined &&
        overallScore !== undefined &&
        lexicalDiversity !== undefined &&
        coherenceScore !== undefined &&
        taskAchievement !== undefined
      ) {
        return response.data;
      } else {
        console.error("Unexpected response format:", response.data);
        return {
          grammarScore: 0,
          spellingScore: 0,
          overallScore: 0,
          lexicalDiversity: 0,
          coherenceScore: 0,
          taskAchievement: 0,
        };
      }
    } catch (error) {
      console.error("Error analyzing text with NLP:", error);
      return {
        grammarScore: 0,
        spellingScore: 0,
        overallScore: 0,
        lexicalDiversity: 0,
        coherenceScore: 0,
        taskAchievement: 0,
      };
    }
  };

  // Submit answer and calculate scores
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setSubmittedAnswer(text);
    setShowExplanation(true);
    setIsDisabled(true);

    if (currentTask) {
      // Calculate scores using the NLP API
      const scores = await calculateGrammarAndSpelling(
        text,
        currentTask.explanation
      );

      // Update state with scores
      setGrammarPercentage(scores.grammarScore);
      setSpellingPercentage(scores.spellingScore);
      setOverallScore(scores.overallScore);
      setLexicalDiversity(scores.lexicalDiversity);
      setCoherenceScore(scores.coherenceScore);
      setTaskAchievement(scores.taskAchievement);

      try {
        // Save user response to the history
        await axios.post(
          "http://localhost:5002/api/history/responses",
          {
            question: currentTask.question || currentTask.taskType,
            response: text,
            correctAnswer: currentTask.correctAnswer || "N/A",
            grammarScore: scores.grammarScore, // Add grammarScore
            spellingScore: scores.spellingScore, // Add spellingScore
            overallScore: scores.overallScore, // Add overallScore
            timeTaken: 60 - time, // Time taken is calculated as total time minus remaining time
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("✅ User response saved to history successfully.");
      } catch (error) {
        console.error("❌ Error saving response to history:", error);
      }
    }

    // Scroll to the bottom of the page
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  // Handle audio play with a limit of 3 plays
  const handleAudioPlay = () => {
    if (playCount < 3) {
      setPlayCount(playCount + 1);
      audioRef.current.play();
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    handleRetry();
  };

  const renderProgressBar = (label, value) => {
    // Ensure value is cast to a number or default to 0
    const numericValue = Math.min(Number(value) || 0, 100); // Ensure the value is capped at 100%

    return (
      <div className="progress-bar-wrapper">
        <p className="progress-bar-label">{label}:</p>
        <div className="progress">
          <div
            className={`progress-bar ${
              numericValue >= 40 ? "bg-success" : "bg-danger"
            }`}
            role="progressbar"
            style={{ width: `${numericValue}%` }} // Safely handle non-numeric values
          >
            {numericValue > 0 ? `${numericValue.toFixed(2)}%` : "N/A"}{" "}
            {/* Use toFixed only if numeric */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <div className="mb-4">
          <label htmlFor="taskTypeSelect" className="form-label">
            Select Task Type
          </label>
          <select
            id="taskTypeSelect"
            className="form-select"
            value={selectedTaskType}
            onChange={(e) => {
              setSelectedTaskType(e.target.value);
              setCurrentPage(1);
              handleRetry();
            }}
          >
            <option value="Write about the Photo">Write about the Photo</option>
            <option value="Listen and Type">Listen and Type</option>
          </select>
        </div>

        {tasks.length > 0 ? (
          tasks.slice(currentPage - 1, currentPage).map((task, index) => (
            <div key={index} className="card p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="m-0">
                  Task:{" "}
                  <span className="badge bg-warning text-dark">
                    {task.taskType}
                  </span>
                </h5>
                <div className="text-right" style={{ fontSize: "2rem" }}>
                  <span>
                    {String(Math.floor(time / 60)).padStart(2, "0")}:
                    {String(time % 60).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {selectedTaskType === "Write about the Photo" ? (
                <>
                  <div className="text-center mb-3">
                    <h6>Write one or more sentences about the image</h6>
                    <img
                      src={`http://localhost:5002/uploads/${task.imageUrl}`}
                      alt="Example"
                      className="img-fluid"
                      width={"400px"}
                    />
                  </div>
                  <textarea
                    className="form-control mb-3"
                    rows="3"
                    placeholder="Type Here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isDisabled}
                  />
                </>
              ) : (
                <>
                  <div className="text-center mb-3">
                    <h6>Listen and type what you hear</h6>
                    <div
                      className="custom-audio-button"
                      onClick={handleAudioPlay}
                    >
                      <img src="play_button.png" alt="Play" />
                    </div>
                    <audio
                      ref={audioRef}
                      src={`http://localhost:5002/uploads/${task.audioUrl}`}
                    />
                    <p>{3 - playCount} listens remaining</p>
                  </div>
                  <textarea
                    className="form-control mb-3"
                    rows="3"
                    placeholder="Type Here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isDisabled}
                  />
                </>
              )}

              <div className="d-flex justify-content-between align-items-center">
                <button className="btn btn-warning" onClick={handleRetry}>
                  Retry
                </button>
                <span>Word count: {wordCount}</span>
                <button
                  className="btn btn-warning"
                  onClick={handleSubmit}
                  disabled={isDisabled}
                >
                  Submit
                </button>
              </div>

              {showExplanation && (
                <div className="mt-3">
                  <h6 className="answer-label">Your Answer:</h6>
                  <p>{submittedAnswer}</p>

                  <h6 className="progress-bar-label">Progress Report:</h6>
                  <div className="progress-container">
                    {renderProgressBar("Overall Score", overallScore)}
                    {renderProgressBar("Grammar", grammarPercentage)}
                    {renderProgressBar("Spelling", spellingPercentage)}
                    {renderProgressBar("Lexical Diversity", lexicalDiversity)}
                    {renderProgressBar("Coherence", coherenceScore)}
                    {renderProgressBar("Task Achievement", taskAchievement)}
                  </div>
                </div>
              )}
              <div ref={bottomRef}></div>
            </div>
          ))
        ) : (
          <p>No tasks found.</p>
        )}

        <Pagination
          tasksPerPage={1}
          totalTasks={tasks.length}
          paginate={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Practice;
