import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Slider from "react-slick";
import "./HomePage.css";

import event1 from "../images/event1.png";
import event2 from "../images/event2.png";
import event3 from "../images/event3.png";
import jazz1 from "../images/jazz1.png";
import jazz2 from "../images/jazz2.png";
import jazz3 from "../images/jazz3.png";
import hackathon1 from "../images/hackathon1.png";
import hackathon2 from "../images/hackathon2.png";
import hackathon3 from "../images/hackathon3.png";
import artgallery1 from "../images/artgallery1.png";
import artgallery2 from "../images/artgallery2.png";
import artgallery3 from "../images/artgallery3.png";

// Social share component
const SocialShare = ({ eventTitle }) => {
  const url = window.location.href;
  const text = `Check out ${eventTitle}!`;

  return (
    <div className="social-share">
      <h3>Share this Event</h3>
      <div className="share-buttons">
        <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="share-btn twitter">Twitter</a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="share-btn facebook">Facebook</a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="share-btn linkedin">LinkedIn</a>
      </div>
    </div>
  );
};

// Reviews component
const Reviews = () => {
  const mockReviews = [
    { name: "John Doe", rating: 5, comment: "Amazing event! Can't wait to attend again." },
    { name: "Jane Smith", rating: 4, comment: "Great atmosphere and performers. Highly recommended." },
    { name: "Mike Johnson", rating: 5, comment: "Incredible experience. The prizes were awesome!" },
  ];

  return (
    <section className="section reviews-section">
      <h2>Reviews</h2>
      <div className="reviews">
        {mockReviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="rating">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div>
            <p>"{review.comment}"</p>
            <span>- {review.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Detailed event data
    const eventsData = {
      1: {
        id: 1,
        title: "FIFA Tournament",
        icon: "🎮",
        heroImage: event1,
        overview: "Compete with the best in our annual FIFA showdown! Show off your skills in this exciting gaming event.",
        formatRules: "Knockout tournament with group stages and 1v1 brackets. Best of 3 matches in finals.",
        registration: "Entry fee: $20, Registration deadline: October 25, 2025, Max participants: 64",
        prizes: "1st Place: Trophy + Gaming Gear ($500), 2nd Place: Gaming Gear ($200), 3rd Place: Cash Prize ($100)",
        schedule: "November 1, 2025 - 10:00 AM to 8:00 PM, Venue: Online Platform (Discord + FIFA)",
        gallery: [event1, event2, event3], // FIFA images
        ctaText: "Register Now"
      },
      2: {
        id: 2,
        title: "Jazz Night",
        icon: "🎷",
        heroImage: jazz1,
        overview: "An evening of smooth jazz, live bands, and great vibes. Immerse yourself in the soulful melodies.",
        performers: "The Smooth Operators (Jazz Quartet), Midnight Melodies (Saxophone Solo), Groove Masters (Full Band)",
        venue: "Location: Downtown Jazz Club, Seating: Indoor with outdoor patio, Ticket Info: $50 per person",
        schedule: "November 20, 2023 - Opening act 7:30 PM, Main show 9:00 PM, After-party until 11:00 PM",
        highlights: "Food & drinks available, Dress code: Casual elegant",
        gallery: [jazz1, jazz2, jazz3], // Jazz images
        ctaText: "Book Your Spot"
      },
      3: {
        id: 3,
        title: "Hackathon",
        icon: "💻",
        heroImage: hackathon1,
        overview: "24 hours of coding, innovation, and collaboration. Build something amazing!",
        tracks: "Web Development, AI & Machine Learning, Mobile Apps, Blockchain",
        rulesFormat: "Team sizes: 2-4 members, Judging criteria: Innovation, Functionality, Presentation, Submission deadline: End of hacking period",
        prizes: "1st Place: $2000 + Internships, 2nd Place: $1000 + Mentorship, 3rd Place: $500 + Swag",
        mentorsJudges: "Industry professionals from TechCorp, Professors from Local University",
        schedule: "December 5, 2023 - Kickoff: 9:00 AM, Hacking: 10:00 AM - 10:00 AM next day, Workshops: Throughout, Final pitches: 2:00 PM",
        resources: "APIs from sponsors, Development tools (GitHub, AWS), Mentor sessions",
        gallery: [hackathon1, hackathon2, hackathon3], // Hackathon images
        ctaText: "Join Hackathon"
      }
    };

    setEvent(eventsData[Number(id)]);

    // Add Art Gallery event
    if (Number(id) === 4) {
      setEvent({
        id: 4,
        title: "Art Gallery Exhibition",
        icon: "🎨",
        heroImage: artgallery1,
        overview: "Discover breathtaking artworks from talented local artists. Immerse yourself in creativity and inspiration.",
        artists: "Featuring works by Sarah Johnson, Michael Chen, and Elena Rodriguez. A diverse collection of paintings, sculptures, and digital art.",
        venue: "Location: City Art Center, Exhibition Hall A, Admission: $15 per person",
        schedule: "January 10, 2024 - Opening Reception: 6:00 PM, Exhibition Hours: 10:00 AM - 8:00 PM daily",
        highlights: "Artist talks, guided tours, refreshments available, Photography allowed",
        gallery: [artgallery1, artgallery2, artgallery3], // Art gallery images
        ctaText: "Get Tickets"
      });
    }

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [id]);

  if (!event) return <div className="loading">Loading...</div>;

  return (
    <div className="event-details">
      {/* Hero Section */}
      <section className="event-hero" style={{ backgroundImage: `url(${event.heroImage})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="event-icon">{event.icon}</span>
          <h1>{event.title}</h1>
          <p>{event.overview}</p>
        </div>
      </section>

      {/* Event Overview */}
      <section className="section">
        <h2>Event Overview</h2>
        <p>{event.overview}</p>
      </section>

      {/* Conditional Sections */}
      {event.formatRules && (
        <section className="section">
          <h2>Format & Rules</h2>
          <p>{event.formatRules}</p>
        </section>
      )}

      {event.performers && (
        <section className="section">
          <h2>Performers</h2>
          <p>{event.performers}</p>
        </section>
      )}

      {event.tracks && (
        <section className="section">
          <h2>Tracks/Categories</h2>
          <p>{event.tracks}</p>
        </section>
      )}

      {event.registration && (
        <section className="section">
          <h2>Registration Info</h2>
          <p>{event.registration}</p>
        </section>
      )}

      {event.venue && (
        <section className="section">
          <h2>Venue Details</h2>
          <p>{event.venue}</p>
        </section>
      )}

      {event.rulesFormat && (
        <section className="section">
          <h2>Rules & Format</h2>
          <p>{event.rulesFormat}</p>
        </section>
      )}

      <section className="section">
        <h2>Prizes</h2>
        <p>{event.prizes}</p>
      </section>

      {event.mentorsJudges && (
        <section className="section">
          <h2>Mentors & Judges</h2>
          <p>{event.mentorsJudges}</p>
        </section>
      )}

      <section className="section">
        <h2>Schedule</h2>
        <p>{event.schedule}</p>
      </section>

      {event.highlights && (
        <section className="section">
          <h2>Experience Highlights</h2>
          <p>{event.highlights}</p>
        </section>
      )}

      {event.resources && (
        <section className="section">
          <h2>Resources</h2>
          <p>{event.resources}</p>
        </section>
      )}

      {/* Gallery */}
      <section className="section">
        <h2>Gallery</h2>
        <div className="gallery">
          <Slider
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={3000}
            arrows={true}
          >
            {event.gallery.map((img, index) => (
              <div key={index} className="gallery-slide">
                <img src={img} alt={`${event.title} ${index + 1}`} className="gallery-img" style={{ maxHeight: '300px', objectFit: 'contain' }} />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Venue Map for Jazz Night */}
      {event.id === 2 && (
        <section className="section">
          <h2>Venue Location</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1!2d-73.9857!3d40.7589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Venue Map"
            ></iframe>
          </div>
        </section>
      )}

      {/* Social Share */}
      <section className="section">
        <SocialShare eventTitle={event.title} />
      </section>

      {/* Reviews */}
      <Reviews />

      {/* Sticky CTA */}
      <div className="sticky-cta">
        <Link to="/register" className="cta-btn primary">{event.ctaText}</Link>
      </div>
    </div>
  );
};

export default EventDetailsPage;
