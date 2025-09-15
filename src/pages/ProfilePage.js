import React, { useState } from "react";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "Event enthusiast and tech lover. Always excited about new experiences!",
    role: "User",
    joinDate: "January 2023",
    lastLogin: "Today",
    avatar: "JD", // Initials
  });

  const [settings, setSettings] = useState({
    newPassword: "",
    confirmPassword: "",
    newEmail: "",
    bio: profile.bio,
  });

  const [preferences, setPreferences] = useState({
    darkMode: true,
    notifications: true,
    language: "en",
  });

  const [socialLinks, setSocialLinks] = useState({
    linkedin: "",
    github: "",
    twitter: "",
  });

  const handleProfileUpdate = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSettingsUpdate = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferencesToggle = (field) => {
    setPreferences(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSocialUpdate = (field, value) => {
    setSocialLinks(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Mock save
    alert("Profile updated successfully!");
  };

  const activities = [
    { icon: "🎫", title: "Purchased ticket for FIFA Tournament", date: "2 days ago" },
    { icon: "🎵", title: "Registered for Jazz Event", date: "1 week ago" },
    { icon: "⭐", title: "Left review for Hackathon Event", date: "2 weeks ago" },
    { icon: "👥", title: "Joined 3 events this month", date: "1 month ago" },
  ];

  const stats = [
    { number: "5", label: "Events Attended" },
    { number: "12", label: "Tickets Purchased" },
    { number: "3", label: "Reviews Written" },
    { number: "98", label: "Profile Completion %" },
  ];

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Header Section */}
        <div className="profile-header">
          <div className="profile-avatar">
            {profile.avatar}
          </div>
          <div className="profile-info">
            <h1>{profile.name}</h1>
            <div className="role">{profile.role}</div>
            <div className="bio">{profile.bio}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button
            className={`tab-btn ${activeTab === "personal" ? "active" : ""}`}
            onClick={() => setActiveTab("personal")}
          >
            Personal Info
          </button>
          <button
            className={`tab-btn ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
          <button
            className={`tab-btn ${activeTab === "activity" ? "active" : ""}`}
            onClick={() => setActiveTab("activity")}
          >
            Activity
          </button>
          <button
            className={`tab-btn ${activeTab === "preferences" ? "active" : ""}`}
            onClick={() => setActiveTab("preferences")}
          >
            Preferences
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "personal" && (
            <div>
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <span className="stat-number">{stat.number}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
              <div className="info-grid">
                <div className="info-card">
                  <h3>Account Details</h3>
                  <div className="info-item">
                    <span className="info-label">Full Name</span>
                    <span className="info-value">{profile.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-value">{profile.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Role</span>
                    <span className="info-value">{profile.role}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Join Date</span>
                    <span className="info-value">{profile.joinDate}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Last Login</span>
                    <span className="info-value">{profile.lastLogin}</span>
                  </div>
                </div>
                <div className="info-card">
                  <h3>Social Links</h3>
                  <div className="social-links">
                    {socialLinks.linkedin && (
                      <a href={socialLinks.linkedin} className="social-link" target="_blank" rel="noopener noreferrer">
                        💼 LinkedIn
                      </a>
                    )}
                    {socialLinks.github && (
                      <a href={socialLinks.github} className="social-link" target="_blank" rel="noopener noreferrer">
                        💻 GitHub
                      </a>
                    )}
                    {socialLinks.twitter && (
                      <a href={socialLinks.twitter} className="social-link" target="_blank" rel="noopener noreferrer">
                        🐦 Twitter
                      </a>
                    )}
                  </div>
                  {!socialLinks.linkedin && !socialLinks.github && !socialLinks.twitter && (
                    <p style={{ color: "var(--text-muted)" }}>No social links added yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="settings-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleProfileUpdate("name", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={settings.newEmail || profile.email}
                  onChange={(e) => handleSettingsUpdate("newEmail", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea
                  value={settings.bio}
                  onChange={(e) => handleSettingsUpdate("bio", e.target.value)}
                  placeholder="Tell us about yourself..."
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={settings.newPassword}
                  onChange={(e) => handleSettingsUpdate("newPassword", e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={settings.confirmPassword}
                  onChange={(e) => handleSettingsUpdate("confirmPassword", e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>
              <div className="form-group">
                <label>LinkedIn</label>
                <input
                  type="url"
                  value={socialLinks.linkedin}
                  onChange={(e) => handleSocialUpdate("linkedin", e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              <div className="form-group">
                <label>GitHub</label>
                <input
                  type="url"
                  value={socialLinks.github}
                  onChange={(e) => handleSocialUpdate("github", e.target.value)}
                  placeholder="https://github.com/yourusername"
                />
              </div>
              <div className="form-group">
                <label>Twitter</label>
                <input
                  type="url"
                  value={socialLinks.twitter}
                  onChange={(e) => handleSocialUpdate("twitter", e.target.value)}
                  placeholder="https://twitter.com/yourusername"
                />
              </div>
              <div style={{ gridColumn: "1 / -1", textAlign: "center", marginTop: "2rem" }}>
                <button className="btn-primary" onClick={handleSave}>Save Changes</button>
                <button className="btn-secondary" onClick={() => setSettings({ ...settings, bio: profile.bio })}>
                  Reset
                </button>
              </div>
            </div>
          )}

          {activeTab === "activity" && (
            <div>
              <h3>Recent Activity</h3>
              <ul className="activity-list">
                {activities.map((activity, index) => (
                  <li key={index} className="activity-item">
                    <span className="activity-icon">{activity.icon}</span>
                    <div className="activity-content">
                      <h4>{activity.title}</h4>
                      <p>{activity.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="preferences">
              <div className="pref-item">
                <span className="pref-label">Dark Mode</span>
                <div
                  className={`toggle-switch ${preferences.darkMode ? "active" : ""}`}
                  onClick={() => handlePreferencesToggle("darkMode")}
                ></div>
              </div>
              <div className="pref-item">
                <span className="pref-label">Notifications</span>
                <div
                  className={`toggle-switch ${preferences.notifications ? "active" : ""}`}
                  onClick={() => handlePreferencesToggle("notifications")}
                ></div>
              </div>
              <div className="form-group" style={{ marginTop: "1rem" }}>
                <label>Language</label>
                <select
                  value={preferences.language}
                  onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
