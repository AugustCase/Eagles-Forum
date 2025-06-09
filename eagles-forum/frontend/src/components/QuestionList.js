import React from "react";
import AnswerList from "./AnswerList";
import AnswerForm from "./AnswerForm";

function QuestionList({ questions }) {
  return (
    <div className="question-list">
      {questions.length === 0 ? (
        <p>No questions yet. Be the first to ask!</p>
      ) : (
        questions.map((q) => (
          <div
            key={q._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "1rem",
              marginBottom: "1rem",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h4>{q.questionText}</h4>
            <small>
              Posted on {new Date(q.createdAt).toLocaleString()}
            </small>
            <div style={{ marginTop: "1rem" }}>
              <AnswerList questionId={q._id} />
              <AnswerForm questionId={q._id} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default QuestionList;