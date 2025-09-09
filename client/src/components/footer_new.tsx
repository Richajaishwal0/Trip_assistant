import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPlane,
  FaGlobe,
  FaShieldAlt,
  FaUserFriends,
} from "react-icons/fa";
import {
  MdEmail,
  MdLocationOn,
  MdPhone,
  MdTravelExplore,
  MdFlightTakeoff,
  MdHotel,
  MdRestaurant,
} from "react-icons/md";

const Footer: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  // const [email, setEmail] = useState("");

  useEffect(() => {
    // Check if dark mode is enabled
    const isDark =
      localStorage.getItem("darkMode") === "true" ||
      document.body.classList.contains("dark-mode");
    setDarkMode(isDark);
  }, []);

  // const handleSubscribe = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (email) {
  //     // Handle newsletter subscription
  //     console.log("Subscribing email:", email);
  //     setEmail("");
  //     // You can add actual subscription logic here
  //   }
  // };

  const footerLinks = {
    destinations: [
      { name: "India", icon: <FaPlane />, popular: true },
      { name: "Nepal", icon: <FaPlane /> },
      { name: "Bangladesh", icon: <FaPlane /> },
      { name: "China", icon: <FaPlane /> },
      { name: "Thailand", icon: <FaPlane />, new: true },
    ],
    places: [
      { name: "Delhi", icon: <MdTravelExplore />, rating: "4.8" },
      { name: "Agra", icon: <MdTravelExplore />, rating: "4.9" },
      { name: "Kathmandu", icon: <MdTravelExplore />, rating: "4.7" },
      { name: "Mumbai", icon: <MdTravelExplore />, rating: "4.6" },
    ],
    services: [
      { name: "Flight Booking", icon: <MdFlightTakeoff /> },
      { name: "Hotel Booking", icon: <MdHotel /> },
      { name: "Restaurant Guide", icon: <MdRestaurant /> },
      { name: "Travel Insurance", icon: <FaShieldAlt /> },
    ],
  };

  const socialLinks = [
    { icon: <FaFacebookF />, name: "Facebook", color: "#1877f2", url: "#" },
    { icon: <FaTwitter />, name: "Twitter", color: "#1da1f2", url: "#" },
    { icon: <FaInstagram />, name: "Instagram", color: "#e4405f", url: "#" },
    { icon: <FaLinkedinIn />, name: "LinkedIn", color: "#0077b5", url: "#" },
    { icon: <FaYoutube />, name: "YouTube", color: "#ff0000", url: "#" },
  ];

  const footerStyle = {
    background: darkMode
      ? "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)"
      : "linear-gradient(135deg, #1a237e 0%, #3949ab 50%, #5e35b1 100%)",
    color: "#ffffff",
    position: "relative" as const,
    overflow: "hidden",
  };

  return (
    <footer style={footerStyle} className="pt-5">
      {/* Wave SVG Animation */}
      <div className="wave-container position-absolute w-100" style={{ top: 0, left: 0, zIndex: 1, overflow: 'hidden' }}>
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
          <path 
            d="M0.00,49.98 C195.31,150.48 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" 
            style={{ 
              stroke: 'none', 
              fill: 'rgba(255, 255, 255, 0.05)',
            }}>
            <animate 
              attributeName="d" 
              dur="10s" 
              repeatCount="indefinite"
              values="M0.00,49.98 C195.31,150.48 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z;
                      M0.00,49.98 C149.99,150.48 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z;
                      M0.00,49.98 C195.31,150.48 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            />
          </path>
        </svg>
      </div>
      
      {/* Animated Background Elements */}
      <div
        className="position-absolute w-100 h-100"
        style={{ top: 0, left: 0, zIndex: 1 }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-20%",
            width: "40%",
            height: "200%",
            background:
              "radial-gradient(circle, rgba(250, 215, 0, 0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            left: "-15%",
            width: "30%",
            height: "150%",
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "float 8s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Main Footer Content */}
      <div
        className="container"
        style={{ 
          position: "relative", 
          zIndex: 2,
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0rem 2rem 0rem 2rem"
        }}
      >
        {/* Newsletter Section */}
        {/* <div className="row mb-5">
          <div className="col-12 text-center">
            <div
              className="p-4 rounded-4 mb-4 newsletter-container"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                transform: "translateY(0)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1)";
              }}
            >
              <h3
                className="mb-3"
                style={{ fontWeight: "700", fontSize: "1.8rem" }}
              >
                <FaPlane className="me-2" style={{ color: "#ffd700" }} />
                Stay Updated on Your Next Adventure!
              </h3>
              <p className="mb-4 opacity-75" style={{ fontSize: "1.1rem" }}>
                Subscribe to our newsletter for exclusive travel deals,
                destination guides, and insider tips.
              </p>
              <form
                onSubmit={handleSubscribe}
                className="row g-2 justify-content-center"
              >
                <div className="col-md-6 col-lg-4 position-relative">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      background: "rgba(255, 255, 255, 0.9)",
                      border: "2px solid transparent",
                      borderRadius: "50px",
                      padding: "0.75rem 1.5rem",
                      fontSize: "1rem",
                      transition: "all 0.3s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#ffd700";
                      e.target.style.boxShadow = "0 0 0 0.2rem rgba(255, 215, 0, 0.25)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "transparent";
                      e.target.style.boxShadow = "none";
                    }}
                    required
                  />
                  <MdEmail 
                    style={{
                      position: "absolute",
                      right: "20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#1a237e",
                      fontSize: "1.2rem",
                    }}
                  />
                </div>
                <div className="col-auto">
                  <button
                    type="submit"
                    className="btn btn-lg px-4 d-flex align-items-center"
                    style={{
                      background: "linear-gradient(45deg, #ffd700, #ffed4e)",
                      color: "#1a237e",
                      border: "none",
                      borderRadius: "50px",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 15px rgba(255, 215, 0, 0.3)",
                      gap: "8px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                      e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 215, 0, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow = "0 4px 15px rgba(255, 215, 0, 0.3)";
                    }}
                  >
                    <span>Subscribe</span>
                    <FaPlane className="subscribe-icon" style={{ transition: "transform 0.3s ease" }} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div> */}

        {/* Main Footer Links */}
        <div className="row g-4">
          {/* Company Info */}
          <div className="col-lg-4 col-md-6">
            <div className="mb-4">
              <h2
                className="mb-3"
                style={{
                  background:
                    "linear-gradient(135deg, #ffd700 0%, #ffffff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontSize: "2rem",
                  fontWeight: "800",
                  letterSpacing: "1px",
                }}
              >
                <FaGlobe className="me-2" style={{ color: "#ffd700" }} />
                Tripp
              </h2>
              <p
                className="mb-4 opacity-75"
                style={{ fontSize: "1.1rem", lineHeight: "1.6" }}
              >
                🌟 Discover the ultimate <strong>Trip Planner</strong> - your
                one-stop solution for seamless travel experiences! Create
                personalized itineraries, find amazing destinations, and make
                unforgettable memories.
              </p>

              {/* Contact Info */}
              <div className="mb-3">
                <div className="d-flex align-items-center mb-2">
                  <MdLocationOn
                    className="me-3"
                    style={{ color: "#ffd700", fontSize: "1.2rem" }}
                  />
                  <span>New Delhi, India</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <MdEmail
                    className="me-3"
                    style={{ color: "#ffd700", fontSize: "1.2rem" }}
                  />
                  <span>contact@tripp.com</span>
                </div>
                <div className="d-flex align-items-center">
                  <MdPhone
                    className="me-3"
                    style={{ color: "#ffd700", fontSize: "1.2rem" }}
                  />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Destinations */}
          <div className="col-lg-2 col-md-6">
            <h5
              className="mb-4"
              style={{
                color: "#ffd700",
                fontWeight: "600",
                fontSize: "1.3rem",
                borderBottom: "2px solid #ffd700",
                paddingBottom: "0.5rem",
                display: "inline-block",
              }}
            >
              Destinations
            </h5>
            <ul className="list-unstyled">
              {footerLinks.destinations.map((destination, index) => (
                <li key={index} className="mb-2">
                  <a
                    href="#"
                    className="text-decoration-none d-flex align-items-center"
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      transition: "all 0.3s ease",
                      padding: "0.3rem 0",
                      borderRadius: "6px",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = "#ffd700";
                      e.currentTarget.style.paddingLeft = "0.5rem";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
                      e.currentTarget.style.paddingLeft = "0";
                    }}
                  >
                    <span
                      className="me-2"
                      style={{ color: "#ffd700", fontSize: "0.9rem" }}
                    >
                      {destination.icon}
                    </span>
                    {destination.name}
                    {destination.popular && (
                      <span
                        className="badge ms-2"
                        style={{
                          background: "#ffd700",
                          color: "#1a237e",
                          fontSize: "0.7rem",
                        }}
                      >
                        Popular
                      </span>
                    )}
                    {destination.new && (
                      <span
                        className="badge ms-2"
                        style={{
                          background: "#ff4757",
                          color: "#fff",
                          fontSize: "0.7rem",
                        }}
                      >
                        New
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Places */}
          <div className="col-lg-2 col-md-6">
            <h5
              className="mb-4"
              style={{
                color: "#ffd700",
                fontWeight: "600",
                fontSize: "1.3rem",
                borderBottom: "2px solid #ffd700",
                paddingBottom: "0.5rem",
                display: "inline-block",
              }}
            >
              Top Places
            </h5>
            <ul className="list-unstyled">
              {footerLinks.places.map((place, index) => (
                <li key={index} className="mb-2">
                  <a
                    href="#"
                    className="text-decoration-none d-flex align-items-center justify-content-between"
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      transition: "all 0.3s ease",
                      padding: "0.3rem 0",
                      borderRadius: "6px",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = "#ffd700";
                      e.currentTarget.style.paddingLeft = "0.5rem";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
                      e.currentTarget.style.paddingLeft = "0";
                    }}
                  >
                    <span className="d-flex align-items-center">
                      <span
                        className="me-2"
                        style={{ color: "#ffd700", fontSize: "0.9rem" }}
                      >
                        {place.icon}
                      </span>
                      {place.name}
                    </span>
                    <span
                      className="badge"
                      style={{
                        background: "rgba(255, 215, 0, 0.2)",
                        color: "#ffd700",
                        fontSize: "0.7rem",
                      }}
                    >
                      ★ {place.rating}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-2 col-md-6">
            <h5
              className="mb-4"
              style={{
                color: "#ffd700",
                fontWeight: "600",
                fontSize: "1.3rem",
                borderBottom: "2px solid #ffd700",
                paddingBottom: "0.5rem",
                display: "inline-block",
              }}
            >
              Services
            </h5>
            <ul className="list-unstyled">
              {footerLinks.services.map((service, index) => (
                <li key={index} className="mb-2">
                  <a
                    href="#"
                    className="text-decoration-none d-flex align-items-center"
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      transition: "all 0.3s ease",
                      padding: "0.3rem 0",
                      borderRadius: "6px",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = "#ffd700";
                      e.currentTarget.style.paddingLeft = "0.5rem";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
                      e.currentTarget.style.paddingLeft = "0";
                    }}
                  >
                    <span
                      className="me-2"
                      style={{ color: "#ffd700", fontSize: "0.9rem" }}
                    >
                      {service.icon}
                    </span>
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media & App */}
          <div className="col-lg-2 col-md-6">
            <h5
              className="mb-4"
              style={{
                color: "#ffd700",
                fontWeight: "600",
                fontSize: "1.3rem",
                borderBottom: "2px solid #ffd700",
                paddingBottom: "0.5rem",
                display: "inline-block",
              }}
            >
              Connect
            </h5>

            {/* Social Links */}
            <div className="mb-4">
              <p className="mb-3 opacity-75">Follow us on social media:</p>
              <div className="d-flex flex-wrap gap-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="btn d-flex align-items-center justify-content-center"
                    title={social.name}
                    style={{
                      width: "45px",
                      height: "45px",
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "12px",
                      color: "#fff",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = social.color;
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = `0 6px 20px ${social.color}40`;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 15px rgba(0, 0, 0, 0.1)";
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div>
              <p className="mb-3 opacity-75">Trusted by travelers:</p>
              <div className="d-flex align-items-center mb-2">
                <FaUserFriends className="me-2" style={{ color: "#ffd700" }} />
                <span style={{ fontSize: "0.9rem" }}>50K+ Happy Customers</span>
              </div>
              <div className="d-flex align-items-center">
                <FaShieldAlt className="me-2" style={{ color: "#ffd700" }} />
                <span style={{ fontSize: "0.9rem" }}>
                  Secure & Safe Booking
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div
          className="row mt-5 pt-4"
          style={{ borderTop: "1px solid rgba(255, 255, 255, 0.2)" }}
        >
          <div className="col-md-6 mb-3">
            <p className="mb-1 opacity-75">
              © 2024 PlanTrip.com. All rights reserved. Made with ❤️ for travelers.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex flex-wrap justify-content-md-end gap-3">
              <a
                href="#"
                className="text-decoration-none"
                style={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-decoration-none"
                style={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-decoration-none"
                style={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                Cookie Policy
              </a>
              <a
                href="#"
                className="text-decoration-none"
                style={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(1deg); }
            50% { transform: translateY(-20px) rotate(2deg); }
            75% { transform: translateY(-10px) rotate(1deg); }
          }

          .footer-link:hover {
            transform: translateX(5px);
          }

          @media (max-width: 768px) {
            .footer-social-links {
              justify-content: center !important;
            }

            /* Ensure company logo and title are centered together on small screens */
            .col-lg-4 .mb-4 h2 {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 0.5rem;
              text-align: center;
            }

            .col-lg-4 .mb-4 h2 .me-2 {
              margin-right: 0.5rem;
            }
          }

          /* Remove unwanted extra space at the very bottom of the footer */
          footer {
            padding-bottom: 0 !important;
            margin-bottom: 0 !important;
          }

          /* Ensure container doesn't add extra bottom padding */
          .container.py-5 {
            padding-bottom: 0 !important;
          }

          /* Tighten the bottom area (bottom row) */
          .row.mt-5.pt-4 {
            margin-top: 1rem !important;
            margin-bottom: 0 !important;
            padding-bottom: 0 !important;
          }

          /* Limit the height of the decorative wave so it doesn't add extra space */
          .wave-container {
            height: 60px;
            overflow: hidden;
            top: 0;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
