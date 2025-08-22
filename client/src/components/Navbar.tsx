import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav
      style={{
        background: "#111827", // unified dark theme
        padding: "1rem 2rem",
        borderBottom: "1px solid #374151",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo / Brand */}
        <h1 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "bold" }}>
          Trip Planner
        </h1>

        {/* Links */}
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "1.5rem",
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <Link
              to="/"
              style={{
                color: "#d1d5db",
                textDecoration: "none",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#d1d5db")}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              style={{ color: "#d1d5db", textDecoration: "none" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#d1d5db")}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/destinations"
              style={{ color: "#d1d5db", textDecoration: "none" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#d1d5db")}
            >
              Destinations
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              style={{ color: "#d1d5db", textDecoration: "none" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#d1d5db")}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              style={{ color: "#d1d5db", textDecoration: "none" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#d1d5db")}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
