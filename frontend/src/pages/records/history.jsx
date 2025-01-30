import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import "./history.css";
import { getUserHistory } from "../../apis/Api";

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("No token found. Redirecting to login...");
        navigate("/login");
        return;
      }

      const history = await getUserHistory(token);
      setHistoryData(history);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching history:", error);
      toast.error("Failed to fetch history. Redirecting to login...");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div></div>
      </div>
    );
  }

  const capAtHundred = (score) => Math.min(score, 100);

  return (
    <>
      <Navbar />
      <div className="history-container">
        <h1 className="history-title">Practice History</h1>

        {historyData.length === 0 ? (
          <p className="no-history">No history available.</p>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Your Response</th>
                <th>Correct Answer</th>
                <th>Grammar Score</th>
                <th>Spelling Score</th>
                <th>Overall Score</th>
                <th>Time Taken (s)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.question}</td>
                  <td>{item.response}</td>
                  <td>{item.correctAnswer}</td>
                  <td>{capAtHundred(item.grammarScore)}%</td>
                  <td>{capAtHundred(item.spellingScore)}%</td>
                  <td>{capAtHundred(item.overallScore)}%</td>
                  <td>{item.timeTaken}</td>
                  <td>{new Date(item.timestamp).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default History;
