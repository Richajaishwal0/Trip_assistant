import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  MapPin,
  Users,
  Star,
  Calculator,
  DollarSign,
  Menu,
  User,
  Sun,
  Moon,
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Navbar() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      return savedMode === "true";
    }
    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
    
    // Add smooth transition class
    document.body.classList.add("theme-transitioning");
    
    // Toggle dark mode class
    document.body.classList.toggle("dark-mode", newMode);
    
    // Remove transition class after animation
    setTimeout(() => {
      document.body.classList.remove("theme-transitioning");
    }, 300);
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent("themeChanged", { detail: { darkMode: newMode } }));
  };

  // Function to close mobile navbar when a navigation link is clicked
  const closeMobileNav = () => {
    const navbarCollapse = document.getElementById("navbarSupportedContent");
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      // Use the 'any' type assertion for window.bootstrap to avoid TypeScript errors
      // if you don't have the Bootstrap types installed.
      const bsCollapse = new (window as any).bootstrap.Collapse(
        navbarCollapse,
        {
          toggle: false,
        }
      );
      bsCollapse.hide();
    }
  };

  useEffect(() => {
    // Apply theme on mount
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem("darkMode") === null) {
        setDarkMode(e.matches);
        document.body.classList.toggle("dark-mode", e.matches);
      }
    };
    
    // Handle window resize for responsive navigation
    const handleResize = () => {
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse) {
        if (window.innerWidth >= 992) {
          // Desktop: ensure navigation is visible
          navbarCollapse.setAttribute('style', 'display: flex !important; flex-basis: auto;');
        } else {
          // Mobile: hide navigation unless toggled
          if (!navbarCollapse.classList.contains('show')) {
            navbarCollapse.setAttribute('style', 'display: none !important;');
          }
        }
      }
    };
    
    mediaQuery.addEventListener("change", handleSystemThemeChange);
    window.addEventListener("resize", handleResize);
    
    // Debug: Ensure navbar is visible
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.setAttribute('style', 'display: flex !important; visibility: visible !important; opacity: 1 !important; z-index: 1030 !important;');
    }
    
    // Debug: Ensure navbar collapse is visible on desktop
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse && window.innerWidth >= 992) {
      navbarCollapse.setAttribute('style', 'display: flex !important; flex-basis: auto;');
    }
    
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
      window.removeEventListener("resize", handleResize);
    };
  }, [darkMode]);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg fixed-top"
        style={{
          backdropFilter: "none",
          borderBottom: "none",
          boxShadow: "none",
          zIndex: "1030",
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* All CSS is inlined via the <style> tag for component portability */}
        <style>
          {`
             /* Set consistent dark blue background */
             .navbar { background-color: #1a237e !important; }
             
             /* Light mode navbar styling */
             body:not(.dark-mode) .navbar {
               background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
               box-shadow: 0 2px 20px rgba(102, 126, 234, 0.3) !important;
             }
             
             /* Dark mode navbar styling */
             body.dark-mode .navbar {
               background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%) !important;
               box-shadow: 0 2px 20px rgba(26, 35, 126, 0.4) !important;
             }
             
             /* Light mode nav links */
             body:not(.dark-mode) .navbar-nav .nav-link {
               color: #fff !important;
             }
             
             body:not(.dark-mode) .navbar-nav .nav-link:hover,
             body:not(.dark-mode) .navbar-nav .nav-link:focus,
             body:not(.dark-mode) .navbar-nav .nav-link.active {
               background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%) !important;
               color: #1a202c !important;
               box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4) !important;
             }
             
             /* Dark mode nav links */
             body.dark-mode .navbar-nav .nav-link {
               color: #f7fafc !important;
             }
             
             body.dark-mode .navbar-nav .nav-link:hover,
             body.dark-mode .navbar-nav .nav-link:focus,
             body.dark-mode .navbar-nav .nav-link.active {
               background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%) !important;
               color: #1a202c !important;
               box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4) !important;
             }
             
             /* Light mode dropdown */
             body:not(.dark-mode) .dropdown-menu {
               background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
               border: 1px solid rgba(255, 255, 255, 0.2) !important;
             }
             
             /* Dark mode dropdown */
             body.dark-mode .dropdown-menu {
               background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%) !important;
               border: 1px solid rgba(255, 255, 255, 0.1) !important;
             }
             
             /* Light mode theme toggle */
             body:not(.dark-mode) .theme-toggle-btn {
               background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%) !important;
               border: 1px solid rgba(255, 255, 255, 0.3) !important;
             }
             
             body:not(.dark-mode) .theme-toggle-btn:hover {
               background: linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(255, 165, 0, 0.2) 100%) !important;
               border-color: rgba(255, 215, 0, 0.5) !important;
             }
             
             /* Dark mode theme toggle */
             body.dark-mode .theme-toggle-btn {
               background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%) !important;
               border-color: rgba(255, 215, 0, 0.3) !important;
             }
             
             body.dark-mode .theme-toggle-btn:hover {
               background: linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(255, 215, 0, 0.2) 100%) !important;
               border-color: rgba(255, 215, 0, 0.6) !important;
             }
             /* Ensure navbar is always visible and properly positioned */
            .navbar-expand-lg .navbar-collapse {
              display: flex !important;
              flex-basis: auto;
            }
            
            .navbar-expand-lg .navbar-nav {
              flex-direction: row;
              margin-left: auto;
              margin-right: auto;
            }
            
            .navbar-expand-lg .navbar-nav .nav-link {
              padding-right: 0.5rem;
              padding-left: 0.5rem;
            }
            
            /* Ensure proper z-index and visibility */
            .navbar {
              z-index: 1030 !important;
              position: fixed !important;
              top: 0 !important;
              right: 0 !important;
              left: 0 !important;
              width: 100% !important;
              transition: background 0.3s ease, box-shadow 0.3s ease !important;
            }
            
            /* Smooth transitions for all navbar elements */
            .navbar,
            .navbar-nav .nav-link,
            .theme-toggle-btn,
            .dropdown-menu {
              transition: all 0.3s ease !important;
            }
            
            /* Fix container width and positioning */
            .navbar .container-fluid {
              width: 100% !important;
              max-width: 100% !important;
              padding-left: 1rem !important;
              padding-right: 1rem !important;
            }
            
            /* Force navbar to be visible */
            .navbar,
            .navbar * {
              visibility: visible !important;
              opacity: 1 !important;
            }
            
            /* Ensure navbar collapse is properly displayed */
            .navbar-collapse {
              display: flex !important;
              flex-basis: auto;
              align-items: center;
            }
            
            /* Fix any potential overflow issues */
            .navbar {
              overflow: visible !important;
            }
            
            .navbar .container-fluid {
              overflow: visible !important;
            }
            
            /* Accessibility & Base Styles */
            .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
            .navbar-nav .nav-link:focus, .action-btn:focus, .dropdown-toggle:focus, .dropdown-item:focus, .navbar-brand:focus { outline: 2px solid #FAD700 !important; outline-offset: 2px !important; box-shadow: 0 0 0 0.2rem rgba(250, 215, 0, 0.25) !important; }


            /* Media Preference Queries */
            @media (prefers-contrast: high) {
              .navbar { background: #000 !important; border-bottom: 2px solid #fff !important; }
              .navbar-nav .nav-link { color: #fff !important; background: transparent !important; }
              .navbar-nav .nav-link:hover, .navbar-nav .nav-link:focus { background: #fff !important; color: #000 !important; }
            }
            @media (prefers-reduced-motion: reduce) {
              .navbar, .logo-icon, .nav-link, .action-btn, .logo-container:hover, .place-card:hover { animation: none !important; transition: none !important; transform: none !important; }
            }

            /* Logo & Brand Styling */
            .logo-container { display: flex; align-items: center; justify-content: center; transition: transform 0.3s ease; }
            .logo-container:hover { transform: scale(1.05); }
            .logo-icon { position: relative; filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2)); animation: logoFloat 4s ease-in-out infinite; }
            .logo-icon svg { transition: transform 0.3s ease; }
            .logo-container:hover .logo-icon svg { transform: rotate(5deg); }
            .navbar-brand { display: flex; align-items: center; text-decoration: none; transition: all 0.3s ease; }

            /* Nav Link Styling */
            .navbar-nav .nav-link { 
              color: #fff !important; 
              font-size: 1rem; 
              font-weight: 500; 
              padding: 0.75rem; 
              border-radius: 16px; 
              margin: 0 0.3rem; 
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
              position: relative; 
              overflow: visible; 
              background: transparent; 
              backdrop-filter: none; 
              border: none; 
              box-shadow: none; 
              animation: fadeInUp 0.6s ease-out;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 50px;
              min-width: 50px;
            }
            .navbar-nav .nav-link .nav-icon {
              transition: all 0.3s ease;
            }
                         .navbar-nav .nav-link .nav-text {
               position: absolute;
               bottom: -45px;
               left: 50%;
               transform: translateX(-50%) translateY(10px);
               background: rgba(0,0,0,0.9);
               color: #fff;
               padding: 8px 12px;
               border-radius: 8px;
               font-size: 0.75rem;
               white-space: nowrap;
               opacity: 0 !important;
               visibility: hidden !important;
               transition: all 0.3s ease;
               z-index: 1000;
               pointer-events: none;
               display: block !important;
             }
            .navbar-nav .nav-link .nav-text::before {
              content: '';
              position: absolute;
              top: -4px;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-left: 4px solid transparent;
              border-right: 4px solid transparent;
              border-bottom: 4px solid rgba(0,0,0,0.9);
            }
            .navbar-nav .nav-link:hover .nav-text {
              opacity: 1 !important;
              visibility: visible !important;
              transform: translateX(-50%) translateY(0);
            }

            .navbar-nav .nav-link:hover .nav-icon {
              transform: scale(1.2) rotate(5deg);
              filter: drop-shadow(0 4px 8px rgba(255,215,0,0.4));
            }

            .navbar-nav .nav-link.active, 
            .navbar-nav .nav-link:focus, 
            .navbar-nav .nav-link:hover { 
              color: #1a202c !important; 
              background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%) !important; 
              font-weight: 600; 
              box-shadow: 0 12px 35px rgba(255,215,0,0.4); 
              transform: translateY(-4px) scale(1.05); 
              border: 1px solid rgba(255,215,0,0.3);
            }

            
            /* Toggler & Action Buttons */
            .navbar-toggler { border: none; padding: 0.5rem; border-radius: 10px; background: transparent; backdrop-filter: none; }
            .navbar-toggler:focus { box-shadow: 0 0 0 0.2rem rgba(255,255,255,0.25); }
            .navbar-toggler-icon { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.9%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='m4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e"); }
            .action-btn { background: transparent; backdrop-filter: none; border: none; border-radius: 12px; padding: 0.6rem; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: none; min-height: 44px; min-width: 44px; }
            .action-btn:hover { background: rgba(255,255,255,0.25); transform: translateY(-2px) scale(1.05); box-shadow: 0 8px 25px rgba(0,0,0,0.15); }
            .action-btn:active { transform: translateY(0) scale(0.95); }
            .profile-icon { width: 35px; height: 35px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: 2px solid rgba(255,255,255,0.3); }

            /* Theme Toggle Button Enhanced Styling */
            .theme-toggle-btn {
              background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%) !important;
              border: 1px solid rgba(255,255,255,0.2) !important;
              backdrop-filter: blur(10px);
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              position: relative;
              overflow: hidden;
            }
            
            .theme-toggle-btn::before {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
              transition: left 0.5s;
            }
            
            .theme-toggle-btn:hover::before {
              left: 100%;
            }
            
            .theme-toggle-btn:hover {
              background: linear-gradient(135deg, rgba(255,215,0,0.2) 0%, rgba(255,165,0,0.1) 100%) !important;
              border-color: rgba(255,215,0,0.4) !important;
              transform: translateY(-3px) scale(1.1);
              box-shadow: 0 10px 30px rgba(255,215,0,0.3);
            }
            
            .theme-toggle-btn:active {
              transform: translateY(-1px) scale(1.05);
            }
            
            .theme-toggle-btn .theme-icon {
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
            }
            
            .theme-toggle-btn:hover .theme-icon {
              transform: rotate(180deg) scale(1.2);
              filter: drop-shadow(0 4px 8px rgba(255,215,0,0.4));
            }
            
            /* Dark mode specific theme toggle styling */
            body.dark-mode .theme-toggle-btn {
              background: linear-gradient(135deg, rgba(255,215,0,0.1) 0%, rgba(255,215,0,0.05) 100%) !important;
              border-color: rgba(255,215,0,0.3) !important;
            }
            
            body.dark-mode .theme-toggle-btn:hover {
              background: linear-gradient(135deg, rgba(255,215,0,0.3) 0%, rgba(255,215,0,0.2) 100%) !important;
              border-color: rgba(255,215,0,0.6) !important;
              box-shadow: 0 10px 30px rgba(255,215,0,0.4);
            }
            
            /* Theme status indicator */
            .theme-toggle-btn::after {
              content: '';
              position: absolute;
              top: 2px;
              right: 2px;
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: rgba(255,215,0,0.8);
              opacity: 0;
              transition: opacity 0.3s ease;
            }
            
            body.dark-mode .theme-toggle-btn::after {
              opacity: 1;
              background: rgba(255,215,0,1);
            }

            /* Dropdown Menu */
            .dropdown-menu { background: #1a237e; backdrop-filter: none; border: none; border-radius: 15px; box-shadow: none; padding: 0.5rem; }
            .dropdown-item { border-radius: 8px; margin: 0.2rem 0; transition: all 0.2s ease; min-height: 44px; display: flex; align-items: center; }
            .dropdown-item:hover { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; transform: translateX(5px); }
            
            /* Responsive Styles */
            @media (max-width: 991.98px) {
              /* Hide desktop navigation on mobile */
              .navbar-expand-lg .navbar-collapse {
                display: none !important;
              }
              
              /* Show mobile navigation when toggled */
              .navbar-collapse.show {
                display: flex !important;
                flex-direction: column;
                background: #1a237e; 
                backdrop-filter: none; 
                border-radius: 0; 
                margin-top: 0.5rem; 
                border: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                z-index: 1020;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
              }
              
              .navbar-collapse.show { animation: mobileMenuSlide 0.3s ease-out; }
              
              .navbar-nav { 
                width: 100%; 
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                padding: 1rem;
              }
              .navbar-nav .nav-link { 
                margin: 0; 
                text-align: center;
                flex-direction: row;
                min-height: 50px;
                min-width: auto;
                width: 100%;
                justify-content: flex-start;
                padding: 0.75rem 1rem;
              }
              .navbar-nav .nav-link .nav-icon {
                margin-bottom: 0;
                margin-right: 12px;
              }
              .navbar-nav .nav-link .nav-text {
                position: absolute;
                bottom: -45px;
                left: 50%;
                transform: translateX(-50%) translateY(10px);
                background: rgba(0,0,0,0.9);
                color: #fff;
                padding: 8px 12px;
                border-radius: 8px;
                font-size: 0.75rem;
                white-space: nowrap;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 1000;
                pointer-events: none;
                margin-left: 0;
              }
              .navbar-nav .nav-link .nav-text::before {
                content: '';
                position: absolute;
                top: -4px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 4px solid transparent;
                border-right: 4px solid transparent;
                border-bottom: 4px solid rgba(0,0,0,0.9);
              }
              .navbar-nav .nav-link:hover .nav-text {
                opacity: 1 !important;
                visibility: visible !important;
                transform: translateX(-50%) translateY(0);
              }

              /* Mobile theme toggle button styling */
              .theme-toggle-btn {
                margin: 0.5rem 0;
                width: 100%;
                justify-content: flex-start;
                padding: 0.75rem 1rem;
                border-radius: 8px;
                background: rgba(255,255,255,0.1) !important;
              }
              
              .theme-toggle-btn:hover {
                background: rgba(255,215,0,0.2) !important;
                transform: translateX(5px);
              }
              
              .theme-toggle-btn .theme-icon {
                margin-right: 12px;
              }
              
              /* Ensure mobile menu is clickable */
              .navbar-collapse.show .nav-link,
              .navbar-collapse.show .theme-toggle-btn {
                pointer-events: auto !important;
                cursor: pointer !important;
              }
            }
            
            /* Desktop styles - ensure navigation is always visible */
            @media (min-width: 992px) {
              .navbar-expand-lg .navbar-collapse {
                display: flex !important;
                flex-basis: auto;
              }
              
              .navbar-expand-lg .navbar-nav {
                flex-direction: row;
                margin-left: auto;
                margin-right: auto;
              }
              
              .navbar-expand-lg .navbar-nav .nav-link {
                padding-right: 0.5rem;
                padding-left: 0.5rem;
              }
              
              /* Hide mobile toggle on desktop */
              .navbar-toggler {
                display: none !important;
              }
              
              /* Ensure all nav items are clickable on desktop */
              .navbar-nav .nav-link,
              .theme-toggle-btn,
              .action-btn {
                pointer-events: auto !important;
                cursor: pointer !important;
              }
            }

            /* Animations */
            @keyframes logoFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
            @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes mobileMenuSlide { from { opacity: 0; transform: translateY(-10px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
            .navbar { animation: navbarLoad 0.8s ease-out; }
            @keyframes navbarLoad { from { opacity: 0; transform: translateY(-100%); } to { opacity: 1; transform: translateY(0); } }
          `}
        </style>

        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            aria-label="Trip Assistant - Go to homepage"
          >
            <div className="logo-container">
              <div className="logo-icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                >
                  <defs>
                    <linearGradient
                      id="gradient1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#667eea" />
                      <stop offset="100%" stopColor="#764ba2" />
                    </linearGradient>
                    <linearGradient
                      id="gradient2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#FFD700" />
                      <stop offset="100%" stopColor="#FFA500" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="8"
                    y="8"
                    width="24"
                    height="24"
                    rx="3"
                    fill="url(#gradient1)"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1"
                  />
                  <path
                    d="M12 16h16 M12 20h16 M12 24h16 M16 12v16 M20 12v16 M24 12v16"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="0.5"
                  />
                  <circle cx="20" cy="18" r="2" fill="url(#gradient2)" />
                  <path
                    d="M20 20v6"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="28"
                    cy="12"
                    r="3"
                    fill="rgba(255,255,255,0.1)"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M28 9v6M25 12h6"
                    stroke="rgba(255,255,255,0.6)"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 28c2-2 4-1 8-1s6-1 8 1"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"> </span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* --- Nav Items --- */}
            <ul
              className="navbar-nav mx-auto mb-2 mb-lg-0"
              role="menubar"
              aria-label="Main menu"
            >
              <li className="nav-item" role="none">
                <Link
                  className="nav-link"
                  to="/"
                  onClick={closeMobileNav}
                  role="menuitem"
                  aria-label="Home page"
                >
                  <Home className="nav-icon" size={20} aria-hidden="true" />
                  <span className="nav-text">Home</span>
                </Link>
              </li>
              <li className="nav-item" role="none">
                <Link
                  className="nav-link"
                  to="/places"
                  onClick={closeMobileNav}
                  role="menuitem"
                  aria-label="Places to visit"
                >
                  <MapPin className="nav-icon" size={20} aria-hidden="true" />
                  <span className="nav-text">Places</span>
                </Link>
              </li>
              <li className="nav-item" role="none">
                <Link
                  className="nav-link"
                  to="/find-friends"
                  onClick={closeMobileNav}
                  role="menuitem"
                  aria-label="Find Friends"
                >
                  <Users className="nav-icon" size={20} aria-hidden="true" />
                  <span className="nav-text">Friends</span>
                </Link>
              </li>
              <li className="nav-item" role="none">
                <Link
                  className="nav-link"
                  to="/more-places"
                  onClick={closeMobileNav}
                  role="menuitem"
                  aria-label="Famous Places"
                >
                  <Star className="nav-icon" size={20} aria-hidden="true" />
                  <span className="nav-text">Famous</span>
                </Link>
              </li>
              <li className="nav-item" role="none">
                <Link
                  className="nav-link"
                  to="/trip-budget"
                  onClick={closeMobileNav}
                  role="menuitem"
                  aria-label="Trip Budget Estimator"
                >
                  <Calculator
                    className="nav-icon"
                    size={20}
                    aria-hidden="true"
                  />
                  <span className="nav-text">Budget</span>
                </Link>
              </li>
              <li className="nav-item" role="none">
                <Link
                  className="nav-link"
                  to="/currency"
                  onClick={closeMobileNav}
                  role="menuitem"
                  aria-label="Currency Converter"
                >
                  <DollarSign
                    className="nav-icon"
                    size={20}
                    aria-hidden="true"
                  />
                  <span className="nav-text">Currency</span>
                </Link>
              </li>
              
              {/* Mobile Theme Toggle */}
              <li className="nav-item d-lg-none" role="none">
                <button
                  className="nav-link theme-toggle-btn"
                  onClick={() => {
                    toggleDarkMode();
                    closeMobileNav();
                  }}
                  role="menuitem"
                  aria-label={
                    darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                  }
                  type="button"
                >
                  {darkMode ? (
                    <Sun className="nav-icon theme-icon" size={20} aria-hidden="true" />
                  ) : (
                    <Moon className="nav-icon theme-icon" size={20} aria-hidden="true" />
                  )}
                  <span className="nav-text">
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </span>
                </button>
              </li>
            </ul>

            {/* --- Right Side Icons --- */}
            <div className="d-flex align-items-center">
              {/* Desktop Theme Toggle */}
              <button
                className="btn action-btn theme-toggle-btn d-none d-lg-flex align-items-center justify-content-center me-2"
                onClick={toggleDarkMode}
                aria-label={
                  darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
                title={darkMode ? "🌞 Switch to Light Mode" : "🌙 Switch to Dark Mode"}
                type="button"
              >
                {darkMode ? (
                  <Sun className="text-warning theme-icon" size={20} aria-hidden="true" />
                ) : (
                  <Moon className="text-light theme-icon" size={20} aria-hidden="true" />
                )}
              </button>

              <div className="dropdown">
                <button
                  className="btn action-btn d-flex align-items-center"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  aria-label="User menu"
                  aria-haspopup="true"
                >
                  <Menu
                    className="text-light me-2 d-none d-lg-inline"
                    size={16}
                    aria-hidden="true"
                  />
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center profile-icon"
                    role="img"
                    aria-label="User profile"
                  >
                    <User className="text-white" size={16} aria-hidden="true" />
                  </div>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  role="menu"
                  aria-label="User account menu"
                >
                  <li role="none">
                    <button
                      className="dropdown-item fw-bold dropdown-item-white"
                      onClick={() => {
                        closeMobileNav();
                        navigate("/auth", { state: { isLogin: false } });
                      }}
                      role="menuitem"
                      type="button"
                    >
                      <i
                        className="fas fa-user-plus me-2"
                        aria-hidden="true"
                      ></i>
                      Sign up
                    </button>
                  </li>
                  <li role="none">
                    <button
                      className="dropdown-item dropdown-item-white"
                      onClick={() => {
                        closeMobileNav();
                        navigate("/auth", { state: { isLogin: true } });
                      }}
                      role="menuitem"
                      type="button"
                    >
                      <i
                        className="fas fa-sign-in-alt me-2"
                        aria-hidden="true"
                      ></i>
                      Log in
                    </button>
                  </li>
                  <li role="separator">
                    <hr className="my-2" />
                  </li>
                  <li role="none">
                    <Link
                      className="dropdown-item"
                      to="/help"
                      onClick={closeMobileNav}
                      role="menuitem"
                    >
                      <i
                        className="fas fa-question-circle me-2"
                        aria-hidden="true"
                      ></i>
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
