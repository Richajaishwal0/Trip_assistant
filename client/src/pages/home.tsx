import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import {
  FaCompass,
  FaArrowRight,
  FaStar,
  FaGlobeAmericas,
  FaRocket,
  FaHeart,
} from "react-icons/fa";
import ScrollToTop from "../components/ScrollToTop";

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Hero images array with high-quality travel photos
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Discover Amazing Destinations",
      subtitle: "Explore breathtaking landscapes and hidden gems",
    },
    {
      url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2835&q=80",
      title: "Plan Your Perfect Journey",
      subtitle: "AI-powered travel planning made simple",
    },
    {
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
      title: "Connect with Fellow Travelers",
      subtitle: "Meet like-minded adventurers and share experiences",
    },
    {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80",
      title: "Create Unforgettable Memories",
      subtitle: "Your next adventure is just a click away",
    },
  ];

  useEffect(() => {
    const checkDarkMode = () => {
      setDarkMode(document.body.classList.contains("dark-mode"));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Scroll observer for animations
    const handleScroll = () => {
      const featuresSection = document.querySelector(".features-section");
      if (featuresSection) {
        const rect = featuresSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(isInView);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    // Auto-slide functionality
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      clearInterval(slideInterval);
    };
  }, [heroImages.length]);

  return (
    <div className={`home ${darkMode ? "dark-mode" : ""}`}>
      {/* Hero Section with Slideshow */}
      <section className="hero-section">
        <div className="hero-slideshow">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? "active" : ""}`}
              style={{ backgroundImage: `url(${image.url})` }}
            >
              <div className="hero-overlay">
                <div className="hero-content">
                  <div className="welcome-badge">
                    <FaCompass className="badge-icon" />
                    <span>Welcome to Trip Planner</span>
                  </div>
                  <h1 className="hero-title">{image.title}</h1>
                  <p className="hero-subtitle">{image.subtitle}</p>
                  <div className="hero-buttons">
                    <Link to="/places" className="btn-primary">
                      Explore Destinations <FaArrowRight />
                    </Link>
                    <Link to="/login" className="btn-primary">
                      Login
                    </Link>
                    <Link to="/signup" className="btn-secondary">
                      Signup
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="slide-indicators">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section
        className={`features-section ${darkMode ? "dark-mode" : ""} ${
          isVisible ? "animate-in" : ""
        }`}
      >
        <div className="floating-shapes">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
          <div className="floating-shape shape-4"></div>
          <div className="floating-shape shape-5"></div>
          <div className="floating-shape shape-6"></div>
        </div>

        <div className="container">
          <div className="section-header">
            <h2>Why Choose Trip Planner?</h2>
            <p>Your ultimate companion for seamless travel planning</p>
          </div>

          <div className="features-grid">
            <div className="feature-card" data-animation-delay="0">
              <div className="feature-icon">
                <FaRocket />
              </div>
              <h3>Smart Destination Discovery</h3>
              <p>
                Discover amazing places with our AI-powered recommendation
                system that learns your preferences
              </p>
            </div>

            <div className="feature-card" data-animation-delay="200">
              <div className="feature-icon">
                <FaHeart />
              </div>
              <h3>Connect with Travelers</h3>
              <p>
                Meet fellow adventurers and plan trips together in our vibrant
                community
              </p>
            </div>

            <div className="feature-card" data-animation-delay="400">
              <div className="feature-icon">
                <FaGlobeAmericas />
              </div>
              <h3>Global Coverage</h3>
              <p>
                Access comprehensive information about destinations worldwide
                with real-time updates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`stats-section ${darkMode ? "dark-mode" : ""}`}>
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Happy Travelers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Destinations</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.9</div>
              <div className="stat-label">
                <FaStar className="star-icon" /> Rating
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={`cta-section ${darkMode ? "dark-mode" : ""}`}>
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Adventure?</h2>
            <p>
              Join thousands of travelers who trust Trip Planner for their
              perfect getaway
            </p>
            <div className="cta-buttons">
              <Link to="/auth" className="btn-cta-primary">
                Sign Up Now <FaArrowRight />
              </Link>
              <Link to="/places" className="btn-cta-secondary">
                Browse Destinations
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default Home;