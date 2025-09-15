// src/components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">SummitSpace</Link>
      </div>
      <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
        <li><Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link></li>
        <li><Link to="/events" onClick={() => setIsOpen(false)}>Events</Link></li>
        <li><Link to="/tickets" onClick={() => setIsOpen(false)}>Tickets</Link></li>
        <li><Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link></li>
        <li><a href="#" onClick={handleLogout}>Logout</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
