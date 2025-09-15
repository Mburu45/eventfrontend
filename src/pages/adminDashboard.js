import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalUsers: 0,
    ticketsSold: 0,
  });

  // later we’ll fetch from backend
  useEffect(() => {
    // Example fetch placeholder:
    // fetch("/api/admin/stats")
    //   .then(res => res.json())
    //   .then(data => setStats(data));

    // temporary mock data
    setStats({ totalEvents: 25, totalUsers: 150, ticketsSold: 500 });
  }, []);

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-grid">
        <div className="card">
          <h3>{stats.totalEvents}</h3>
          <p>Total Events</p>
        </div>
        <div className="card">
          <h3>{stats.totalUsers}</h3>
          <p>Registered Users</p>
        </div>
        <div className="card">
          <h3>{stats.ticketsSold}</h3>
          <p>Tickets Sold</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
