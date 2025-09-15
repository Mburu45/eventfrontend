import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchEvents } from "../helpers/apiHelper";
import "./HomePage.css";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      // Try to fetch from API first, fallback to mock data
      const apiEvents = await fetchEvents().catch(() => null);

      if (apiEvents) {
        setEvents(apiEvents);
      } else {
        // Mock data with more comprehensive information
        setEvents([
          {
            id: 1,
            title: "Tech Conference 2024",
            date: "2024-10-15",
            location: "New York, NY",
            category: "Technology",
            description: "Annual technology conference featuring the latest innovations",
            price: "$299",
            image: "/images/event1.png",
            attendees: 500,
            rating: 4.8
          },
          {
            id: 2,
            title: "Jazz Night Live",
            date: "2024-11-20",
            location: "Los Angeles, CA",
            category: "Music",
            description: "An evening of smooth jazz with renowned musicians",
            price: "$75",
            image: "/images/event2.png",
            attendees: 200,
            rating: 4.9
          },
          {
            id: 3,
            title: "Hackathon 2024",
            date: "2024-12-05",
            location: "San Francisco, CA",
            category: "Technology",
            description: "48-hour coding competition with amazing prizes",
            price: "Free",
            image: "/images/event3.png",
            attendees: 300,
            rating: 4.7
          },
          {
            id: 4,
            title: "Art Gallery Opening",
            date: "2024-09-30",
            location: "Chicago, IL",
            category: "Arts",
            description: "Contemporary art exhibition featuring local artists",
            price: "$25",
            image: "/images/event1.png",
            attendees: 150,
            rating: 4.5
          }
        ]);
      }
    } catch (err) {
      setError("Failed to load events. Please try again later.");
      console.error("Error loading events:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || event.category.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(events.map(event => event.category))];

  if (loading) {
    return (
      <div className="loading">
        <div>Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home" style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <h1>Events</h1>
        <div style={{ color: "red", marginBottom: "2rem" }}>{error}</div>
        <button onClick={loadEvents} className="cta-btn primary">Try Again</button>
      </div>
    );
  }

  return (
    <div className="home" style={{ padding: "4rem 2rem" }}>
      <div className="hero-content" style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ color: "var(--accent-color)", marginBottom: "1rem" }}>Discover Amazing Events</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>
          Find and attend the best events in your area
        </p>
      </div>

      {/* Search and Filter */}
      <div style={{
        display: "flex",
        gap: "1rem",
        marginBottom: "2rem",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            border: "1px solid var(--secondary-color)",
            minWidth: "250px"
          }}
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            border: "1px solid var(--secondary-color)"
          }}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === "all" ? "All Categories" : category}
            </option>
          ))}
        </select>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <h3>No events found matching your criteria</h3>
          <p>Try adjusting your search or filter settings</p>
        </div>
      ) : (
        <div className="event-grid">
          {filteredEvents.map((event) => (
            <div key={event.id} className="event-card fade-in">
              <div style={{
                width: "100%",
                height: "200px",
                background: `linear-gradient(135deg, var(--accent-color), var(--accent-purple))`,
                borderRadius: "10px",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "3rem"
              }}>
                {event.category === "Technology" ? "💻" :
                 event.category === "Music" ? "🎵" :
                 event.category === "Arts" ? "🎨" : "📅"}
              </div>
              <h3 style={{ color: "var(--accent-color)", marginBottom: "0.5rem" }}>
                {event.title}
              </h3>
              <p style={{ color: "var(--text-muted)", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                {event.description}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontWeight: "bold", color: "var(--accent-orange)" }}>{event.price}</span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  ⭐ {event.rating} ({event.attendees} attending)
                </span>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <p style={{ margin: "0.25rem 0", fontSize: "0.9rem" }}>
                  📅 {new Date(event.date).toLocaleDateString()}
                </p>
                <p style={{ margin: "0.25rem 0", fontSize: "0.9rem" }}>
                  📍 {event.location}
                </p>
              </div>
              <Link to={`/events/${event.id}`} className="cta-btn primary" style={{ width: "100%", textAlign: "center" }}>
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Call to Action */}
      <div className="cta" style={{ marginTop: "4rem" }}>
        <h2>Can't Find What You're Looking For?</h2>
        <p>Check back later for more exciting events or contact us to suggest new ones!</p>
        <Link to="/register" className="cta-btn primary">Get Event Updates</Link>
      </div>
    </div>
  );
};

export default EventsPage;
