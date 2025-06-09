import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryList from "../components/CategoryList";
import QuestionList from "../components/QuestionList";
import AskQuestion from "../components/AskQuestion";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`/api/questions/${selectedCategory}`)
        .then((res) => setQuestions(res.data));
    }
  }, [selectedCategory]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div className="header-left">
          <span>Welcome, {username}</span>
        </div>

        <div className="header-center">
          <h2>Eagles Forum</h2>
        </div>

        <div className="header-right">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="dashboard-main">
        <CategoryList
          categories={categories}
          onSelectCategory={setSelectedCategory}
          selected={selectedCategory}
        />

        <div className="dashboard-content">
          {!selectedCategory ? (
            <p>Select a category to view its questions.</p>
          ) : (
            <>
              <h3>{selectedCategory} Questions</h3>
              <AskQuestion
                category={selectedCategory}
                onNewQuestion={() =>
                  axios
                    .get(`/api/questions/${selectedCategory}`)
                    .then((res) => setQuestions(res.data))
                }
              />
              <QuestionList questions={questions} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;