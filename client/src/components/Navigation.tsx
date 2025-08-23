import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  MapPin,
  Users,
  Star,
  Calculator,
  DollarSign,
  User,
  Sun,
  Moon,
  Mail, // Keeping relevant icons
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Navigation.css";
import Logo from "./Logo";
import { initializeBootstrap } from "../utils/bootstrapInit";

function Navbar() {
  const navigate = useNavigate();
  const navCollapseRef = useRef<HTMLDivElement>(null);
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem("darkMode") === "true";
    } catch {
      return false;
    }
  });

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    try {
      localStorage.setItem("darkMode", newMode.toString());
    } catch {
      console.warn("Could not save dark mode preference");
    }
    document.body.classList.toggle("dark-mode", newMode);
  };

  const closeMobileNav = () => {
    try {
      const navbarCollapse = navCollapseRef.current;
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        if (typeof window !== 'undefined' && window.bootstrap) {
          const bsCollapse = new window.bootstrap.Collapse(
            navbarCollapse,
            { toggle: false }
          );
          bsCollapse.hide();
        } else {
          navbarCollapse.classList.remove("show");
        }
      }
    } catch (error) {
      console.warn("Could not close mobile navigation:", error);
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  useEffect(() => {
    initializeBootstrap();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top custom-navbar">
        <div className="container-fluid">
          {/* Logo - Left side */}
          <button
            className="navbar-brand btn p-0 border-0 bg-transparent"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Trip Assistant - Scroll to top"
          >
            <div className="d-flex align-items-center">
              <Logo />
            </div>
          </button>

          {/* Mobile toggle button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible content - Right side */}
          <div className="collapse navbar-collapse" id="navbarNav" ref={navCollapseRef}>
            {/* Navigation links - centered */}
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/"
                  onClick={closeMobileNav}
                  aria-label="Home page"
                >
                  <Home size={18} className="me-1" />
                  <span className="d-lg-none">Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/places"
                  onClick={closeMobileNav}
                  aria-label="Places to visit"
                >
                  <MapPin size={18} className="me-1" />
                  <span className="d-lg-none">Places</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/find-friends"
                  onClick={closeMobileNav}
                  aria-label="Find Friends"
                >
                  <Users size={18} className="me-1" />
                  <span className="d-lg-none">Friends</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/more-places"
                  onClick={closeMobileNav}
                  aria-label="Famous Places"
                >
                  <Star size={18} className="me-1" />
                  <span className="d-lg-none">Famous</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/trip-budget"
                  onClick={closeMobileNav}
                  aria-label="Trip Budget Estimator"
                >
                  <Calculator size={18} className="me-1" />
                  <span className="d-lg-none">Budget</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/currency"
                  onClick={closeMobileNav}
                  aria-label="Currency Converter"
                >
                  <DollarSign size={18} className="me-1" />
                  <span className="d-lg-none">Currency</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/contact"
                  onClick={closeMobileNav}
                  aria-label="Contact Us"
                >
                  <Mail size={18} className="me-1" />
                  <span className="d-lg-none">Contact</span>
                </Link>
              </li>
            </ul>

            {/* Right side actions */}
            <div className="d-flex align-items-center gap-3 ms-auto">
              {/* Theme toggle */}
              <button
                className="btn"
                onClick={toggleDarkMode}
                aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                title="Toggle theme"
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: 'white',
                  padding: '0.5rem',
                  minWidth: '40px',
                  minHeight: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* User dropdown */}
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  aria-label="User menu"
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <User size={14} />
                  </div>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        closeMobileNav();
                        navigate("/auth", { state: { isLogin: false } });
                      }}
                    >
                      Sign up
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        closeMobileNav();
                        navigate("/auth", { state: { isLogin: true } });
                      }}
                    >
                      Log in
                    </button>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/help"
                      onClick={closeMobileNav}
                    >
                      Help Centre
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;