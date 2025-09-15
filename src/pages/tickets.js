import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const TicketsPage = () => {
  const [selectedTickets, setSelectedTickets] = useState({});

  const events = [
    {
      id: 1,
      title: "FIFA Tournament",
      icon: "🎮",
      date: "October 15, 2023",
      venue: "Online Platform",
      price: "$20",
      description: "Compete in our annual FIFA showdown!"
    },
    {
      id: 2,
      title: "Jazz Night",
      icon: "🎷",
      date: "November 20, 2023",
      venue: "Downtown Jazz Club",
      price: "$50",
      description: "An evening of smooth jazz and great vibes."
    },
    {
      id: 3,
      title: "Hackathon",
      icon: "💻",
      date: "December 5, 2023",
      venue: "Tech Hub",
      price: "Free",
      description: "24 hours of coding and innovation."
    },
    {
      id: 4,
      title: "Art Gallery Exhibition",
      icon: "🎨",
      date: "January 10, 2024",
      venue: "City Art Center",
      price: "$15",
      description: "Explore stunning artworks from local artists."
    }
  ];

  const handleQuantityChange = (eventId, quantity) => {
    setSelectedTickets(prev => ({
      ...prev,
      [eventId]: quantity
    }));
  };

  const handlePurchase = (eventId) => {
    const quantity = selectedTickets[eventId] || 0;
    if (quantity > 0) {
      alert(`Purchased ${quantity} ticket(s) for ${events.find(e => e.id === eventId).title}`);
      // Here you would typically send the purchase request to the backend
    }
  };

  return (
    <div className="home" style={{ padding: "4rem 2rem", background: "var(--background-dark)", color: "white", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "var(--accent-color)", marginBottom: "2rem" }}>SummitSpace Tickets</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2rem" }}>
        {events.map((event) => (
          <div key={event.id} className="event-card" style={{ background: "var(--secondary-color)", borderRadius: "15px", padding: "2rem", boxShadow: "var(--box-shadow)", transition: "transform 0.3s" }}>
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <span style={{ fontSize: "3rem" }}>{event.icon}</span>
            </div>
            <h3 style={{ color: "var(--accent-color)", marginBottom: "0.5rem" }}>{event.title}</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>{event.description}</p>
            <div style={{ marginBottom: "1rem" }}>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
              <p><strong>Price:</strong> {event.price}</p>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>Quantity:</label>
              <input
                type="number"
                min="0"
                max="10"
                value={selectedTickets[event.id] || 0}
                onChange={(e) => handleQuantityChange(event.id, parseInt(e.target.value) || 0)}
                style={{ padding: "0.5rem", borderRadius: "5px", border: "none", width: "100%" }}
              />
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={() => handlePurchase(event.id)}
                disabled={!selectedTickets[event.id] || selectedTickets[event.id] === 0}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  background: "var(--accent-color)",
                  color: "var(--secondary-color)",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "background 0.3s"
                }}
                onMouseOver={(e) => e.target.style.background = "var(--accent-purple)"}
                onMouseOut={(e) => e.target.style.background = "var(--accent-color)"}
              >
                Purchase
              </button>
              <Link to={`/events/${event.id}`} style={{ flex: 1 }}>
                <button
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "var(--primary-color)",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "background 0.3s"
                  }}
                  onMouseOver={(e) => e.target.style.background = "var(--accent-purple)"}
                  onMouseOut={(e) => e.target.style.background = "var(--primary-color)"}
                >
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
