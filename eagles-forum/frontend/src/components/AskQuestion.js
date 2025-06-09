import React, { useState } from "react";
import axios from "axios";

function AskQuestion({ category, onNewQuestion }) {
  const [questionText, setQuestionText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/questions",
        {
          category,
          questionText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuestionText(""); // Clear form
      if (onNewQuestion) onNewQuestion(); // Refresh questions in Dashboard
    } catch (err) {
      console.error(err);
      setError("Failed to submit question.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h4>Ask a Question in {category}</h4>
      <textarea
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        rows={3}
        style={{ width: "100%", padding: "0.5rem" }}
        placeholder="What's your question?"
        required
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Submit Question</button>
    </form>
  );
}

export default AskQuestion;