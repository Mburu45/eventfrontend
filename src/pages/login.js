import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login - check credentials
    if (email === "login@gmail.com" && password === "passw0rd") {
      localStorage.setItem("userRole", "user");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials. Use login@gmail.com / passw0rd");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your SummitSpace account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="input-field"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="input-icon">📧</span>
          </div>

          <div className="form-group">
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="input-icon">🔒</span>
          </div>

          <button type="submit" className="submit-btn">
            Sign In
          </button>
        </form>

        <div className="auth-links">
          <p>Don't have an account? <Link to="/register">Create Account</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
