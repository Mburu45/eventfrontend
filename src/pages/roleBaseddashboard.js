import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../helpers/authHelper";
import AdminDashboard from "./adminDashboard";
import OrganizerDashboard from "./organizerDashboard";
import UserDashboard from "./userDashboard";

const RoleBasedDashboard = () => {
  const role = getUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!role) {
      // Redirect to login after showing the message
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000); // Redirect after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [role, navigate]);

  switch (role) {
    case "admin": return <AdminDashboard />;
    case "organizer": return <OrganizerDashboard />;
    case "user": return <UserDashboard />;
    default: return (
      <div style={{ textAlign: "center", padding: "4rem", background: "var(--background-dark)", color: "white", minHeight: "100vh" }}>
        <h1>Welcome to SummitSpace Dashboard</h1>
        <p>Please log in to access your personalized dashboard.</p>
        <p>You will be redirected to the login page shortly...</p>
      </div>
    );
  }
};

export default RoleBasedDashboard;
