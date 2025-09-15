import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock register
    if (name && email && password) {
      localStorage.setItem("userRole", role);
      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Join SummitSpace</h1>
          <p>Create your account and start exploring amazing events</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="input-field"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <span className="input-icon">👤</span>
          </div>

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
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="input-icon">🔒</span>
          </div>

          <div className="form-group">
            <div className="role-select">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="input-field"
              >
                <option value="user">Attendee</option>
                <option value="organizer">Event Organizer</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <div className="auth-links">
          <p>Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
