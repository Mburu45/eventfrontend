import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const OrganizerDashboard = () => {
  const [stats, setStats] = useState({
    myEvents: 0,
    ticketsSold: 0,
    revenue: 0,
  });

  useEffect(() => {
    // fetch("/api/organizer/stats").then(...);
    setStats({ myEvents: 5, ticketsSold: 120, revenue: 1200 });
  }, []);

  return (
    <div className="dashboard">
      <h1>Organizer Dashboard</h1>
      <div className="dashboard-grid">
        <div className="card"><h3>{stats.myEvents}</h3><p>My Events</p></div>
        <div className="card"><h3>{stats.ticketsSold}</h3><p>Tickets Sold</p></div>
        <div className="card"><h3>${stats.revenue}</h3><p>Revenue</p></div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
