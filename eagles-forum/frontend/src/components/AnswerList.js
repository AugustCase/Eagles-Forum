import React, { useEffect, useState } from "react";
import axios from "axios";

function AnswerList({ questionId }) {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/answers/${questionId}`)
      .then((res) => setAnswers(res.data))
      .catch((err) => console.error("Failed to load answers", err));
  }, [questionId]);

  return (
    <div className="answer-list" style={{ marginTop: "1rem" }}>
      {answers.length > 0 && <h5>Answers:</h5>}
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {answers.map((a) => (
          <li key={a._id} style={{ marginBottom: "0.5rem" }}>
            <div
              style={{
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                padding: "0.5rem",
                borderRadius: "4px",
              }}
            >
              {a.answerText}
              <br />
              <small style={{ color: "#555" }}>
                Posted on {new Date(a.createdAt).toLocaleString()}
              </small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnswerList;