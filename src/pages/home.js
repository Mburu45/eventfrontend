// src/pages/Home.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "./HomePage.css";

import event1 from "../images/event1.png";
import jazz1 from "../images/jazz1.png";
import hackathon1 from "../images/hackathon1.png";
import artgallery1 from "../images/artgallery1.png";
import summitlogo from "../images/summitlogo.png";
import summit from "../images/summit.png";

const Home = () => {
  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  // Countdown timer for next event (FIFA Tournament on Nov 1, 2025)
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const targetDate = new Date("2025-11-01T00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const events = [
    { id: 1, name: "FIFA Tournament", date: "November 1, 2025", icon: "🎮", image: event1, description: "Compete in the ultimate football showdown!" },
    { id: 2, name: "Jazz Night", date: "November 20, 2023", icon: "🎷", image: jazz1, description: "Enjoy an evening of smooth jazz melodies." },
    { id: 3, name: "Hackathon", date: "December 5, 2023", icon: "💻", image: hackathon1, description: "Code your way to innovation in 48 hours." },
    { id: 4, name: "Art Gallery Event", date: "January 10, 2024", icon: "🎨", image: artgallery1, description: "Explore stunning artworks and meet talented artists." },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url(${summit})` }}></div>
        <div className="overlay"></div>
        <div className="hero-content fade-in">
          <div className="logo-placeholder" style={{ marginBottom: "1rem" }}>
            <img src={summitlogo} alt="summitlogo" style={{ width: "150px", height: "150px", borderRadius: "50%" }} />
            <h1 style={{ fontSize: "4rem", fontWeight: "bold", background: "linear-gradient(45deg, var(--accent-color), var(--accent-purple))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>SummitSpace</h1>
          </div>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Gathering of Minds & Talents</h2>
          <p>Where Ideas and Events Rise.</p>
          <div className="cta-buttons">
            <Link to="/events" className="cta-btn primary">
              View Events
            </Link>
            <Link to="/register" className="cta-btn secondary">
              Register Now
            </Link>
          </div>
        </div>
      </section>

      {/* Event Categories Preview */}
      <section className="event-categories">
        <h2>Featured Events</h2>
        <div className="event-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card fade-in">
              <img src={event.image} alt={event.name} className="event-img" />
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <Link to={`/events/${event.id}`} className="learn-btn">
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="countdown">
        <h2>Next Big Event: FIFA Tournament</h2>
        <div className="timer">
          <div className="time-unit">
            <span className="number">{timeLeft.days || 0}</span>
            <span className="label">Days</span>
          </div>
          <div className="time-unit">
            <span className="number">{timeLeft.hours || 0}</span>
            <span className="label">Hours</span>
          </div>
          <div className="time-unit">
            <span className="number">{timeLeft.minutes || 0}</span>
            <span className="label">Minutes</span>
          </div>
          <div className="time-unit">
            <span className="number">{timeLeft.seconds || 0}</span>
            <span className="label">Seconds</span>
          </div>
        </div>
      </section>

      {/* Upcoming Events Timeline */}
      <section className="timeline">
        <h2>Upcoming Events Timeline</h2>
        <div className="timeline-container">
          {events.map((event, index) => (
            <div key={event.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} fade-in`}>
              <div className="timeline-content">
                <span className="icon">{event.icon}</span>
                <h3>{event.name}</h3>
                <p>{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Carousel Section */}
      <section className="carousel">
        <h2>Event Highlights</h2>
        <Slider {...settings}>
          {events.map((event) => (
            <div key={event.id}>
              <img src={event.image} alt={event.name} className="carousel-img" />
              <div className="carousel-overlay">
                <h3>{event.name}</h3>
                <p>{event.date}</p>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-content">
          <div className="about-text fade-in">
            <h2>About SummitSpace</h2>
            <p>
              SummitSpace is your ultimate platform for gathering minds and talents.
              From tournaments to concerts, we bring communities together with seamless
              organization, ticketing, and engagement. Where ideas and events rise.
            </p>
            <Link to="/about" className="learn-btn">
              Learn More
            </Link>
          </div>
          <div className="about-img">{/* Placeholder for image */}</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Experience the Best Events?</h2>
        <Link to="/register" className="cta-btn primary">
          Join Now
        </Link>
      </section>
    </div>
  );
};

export default Home;
