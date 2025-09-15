import React, { useState } from "react";
import "./HomePage.css";

const ProfilePage = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");

  const handleSave = () => {
    // Mock save
    alert("Profile updated!");
  };

  return (
    <div className="home" style={{ padding: "4rem 2rem", textAlign: "center" }}>
      <h1>Profile</h1>
      <form style={{ maxWidth: "400px", margin: "0 auto" }}>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <button type="button" onClick={handleSave} className="cta-btn" style={{ width: "100%" }}>Save</button>
      </form>
    </div>
  );
};

export default ProfilePage;
