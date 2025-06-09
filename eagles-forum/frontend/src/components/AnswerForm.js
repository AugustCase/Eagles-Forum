import React, { useState } from "react";
import axios from "axios";

function AnswerForm({ questionId }) {
  const [answerText, setAnswerText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/answers",
        {
          questionId,
          answerText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnswerText(""); // Clear form
    } catch (err) {
      console.error(err);
      setError("Failed to submit answer.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <textarea
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
        rows={3}
        style={{ width: "100%", padding: "0.5rem" }}
        placeholder="Write your answer..."
        required
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Submit Answer</button>
    </form>
  );
}

export default AnswerForm;