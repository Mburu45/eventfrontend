import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const UserDashboard = () => {
  const [stats, setStats] = useState({
    myTickets: 0,
    upcomingEvents: 0,
    spending: 0,
  });

  useEffect(() => {
    // fetch("/api/user/stats").then(...);
    setStats({ myTickets: 3, upcomingEvents: 2, spending: 250 });
  }, []);

  return (
    <div className="dashboard">
      <h1>User Dashboard</h1>
      <div className="dashboard-grid">
        <div className="card"><h3>{stats.myTickets}</h3><p>My Tickets</p></div>
        <div className="card"><h3>{stats.upcomingEvents}</h3><p>Upcoming Events</p></div>
        <div className="card"><h3>${stats.spending}</h3><p>My Spending</p></div>
      </div>
    </div>
  );
};

export default UserDashboard;
