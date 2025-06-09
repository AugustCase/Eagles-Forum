import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css"; 

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5000/api/register", {
        username,
        email,
        password,
      });
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response && err.response.status === 400) {
        setError("User already exists or invalid input.");
      } else {
        setError("Registration failed.");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <a href="/">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;