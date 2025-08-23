import { useState, useEffect, useRef } from "react";
<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
=======
import { Link, useNavigate, useLocation } from "react-router-dom";
>>>>>>> 29d190e (added authentication middleware to verify token for user validation , modified authentication logic on client side by seperating loginand signup form and using zod for validation to make code readable and maintainable. Enhanced user flow by logout option when user is logged in and signup/login when user log outs. added logic unauthenticated user to go to specific routes.)
import {
  Home,
  MapPin,
  Users,
  Star,
  Calculator,
  DollarSign,
  User,
<<<<<<< HEAD
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const user_name = localStorage.getItem("user_name") || "";

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
    document.body.classList.toggle("dark-mode", newMode);
  };

  useEffect(() => {
=======
  Sun,
  Moon,
  Menu,
  X,
  HelpCircle,
} from "lucide-react";
import Logo from "./Logo";
import { useToken } from "../context/TokenProvider";

function ProfileDropdown() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { isLoggedin , logout } = useToken();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md"
        aria-label="User menu"
      >
        <User size={18} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden z-50">
          {!isLoggedin ? (
            <>
              <button
                className="w-full px-4 py-2 text-left text-black hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  setOpen(false);
                  navigate("/auth?path=/signup",);
                }}
              >
                Sign Up
              </button>
              <button
                className="w-full px-4 py-2 text-left text-black hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  setOpen(false);
                  navigate("/auth?path=/login");
                }}
              >
                Log In
              </button>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Log Out
              </button>
            </>
          )}
          <div className="border-t border-gray-200 dark:border-gray-700" />
          <Link
            to="/help"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Help Centre
          </Link>
        </div>
      )}
    </div>
  );
}

function Navbar() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
>>>>>>> 29d190e (added authentication middleware to verify token for user validation , modified authentication logic on client side by seperating loginand signup form and using zod for validation to make code readable and maintainable. Enhanced user flow by logout option when user is logged in and signup/login when user log outs. added logic unauthenticated user to go to specific routes.)
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const navLinks = [
<<<<<<< HEAD
    { to: "/", icon: Home, label: "Home" },
    { to: "/places", icon: MapPin, label: "Places" },
    { to: "/find-friends", icon: Users, label: "Friends" },
    { to: "/more-places", icon: Star, label: "Famous" },
    { to: "/trip-budget", icon: Calculator, label: "Budget" },
    { to: "/currency", icon: DollarSign, label: "Currency" },
=======
    { path: "/", label: "Home", icon: Home },
    { path: "/places", label: "Places", icon: MapPin },
    { path: "/find-friends", label: "Friends", icon: Users },
    { path: "/more-places", label: "Famous", icon: Star },
    { path: "/trip-budget", label: "Budget", icon: Calculator },
    { path: "/currency", label: "Currency", icon: DollarSign },
>>>>>>> 29d190e (added authentication middleware to verify token for user validation , modified authentication logic on client side by seperating loginand signup form and using zod for validation to make code readable and maintainable. Enhanced user flow by logout option when user is logged in and signup/login when user log outs. added logic unauthenticated user to go to specific routes.)
  ];

  // Function to handle dropdown near username
  const handleDropdownToggle = () => setShowDropdown((prev) => !prev);

  // User Profile Dropdown
  const UserDropdown = () => {
    return (
      <div
        ref={dropdownRef}
        className={`absolute top-14 w-32 lg:w-48 border ${darkMode ? "bg-slate-800 text-white border-white" : "bg-white text-black border-black"} rounded-md shadow-lg py-1 mt-4 lg:ms-14`}
        style={{
          pointerEvents: "auto",
          cursor: "default",
          zIndex: 2000,
        }}
        onMouseDown={e => e.stopPropagation()}
      >
        <Link
          to="/profile"
          className="block px-4 py-2.5 text-decoration-none hover:bg-gray-200 cursor-pointer"
          onClick={e => {
            e.stopPropagation();
            setShowDropdown(false);
          }}
        >
          <span className={darkMode ? "text-white" : "text-black"}>Profile</span>
        </Link>

        <button
          onClick={e => {
            e.stopPropagation();
            handleLogout();
            setShowDropdown(false);
          }}
          className="block px-4 hover:bg-gray-200 w-full text-left cursor-pointer"
        >
          Logout
        </button>
      </div>
    );
  };

  const handleLogout = () => {
    const input = confirm("Are you sure you want to logout!");
    if (input) {
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_name");
      localStorage.removeItem("auth_token");
      navigate("/auth");
      return;
    }
    return;
  };

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
<<<<<<< HEAD
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        background: "linear-gradient(135deg, #1a237e, #3949ab)",
        zIndex: 1000,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          🧳 Trip Planner
        </Link>

        {/* Desktop Menu */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
          }}
          className="desktop-nav"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            {navLinks.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                style={{
                  color: "white",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.background = "rgba(255,255,255,0.1)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.background = "transparent")
                }
=======
    <nav className="bg-indigo-600 dark:bg-gray-900 text-white fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Logo />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? "bg-white/20"
                    : "hover:bg-white/10"
                }`}
>>>>>>> 29d190e (added authentication middleware to verify token for user validation , modified authentication logic on client side by seperating loginand signup form and using zod for validation to make code readable and maintainable. Enhanced user flow by logout option when user is logged in and signup/login when user log outs. added logic unauthenticated user to go to specific routes.)
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
          </div>

<<<<<<< HEAD
        {/* Right Side Actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
          className="desktop-nav"
        >
          <button
            onClick={toggleDarkMode}
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              padding: "0.5rem",
              borderRadius: "6px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.target.style.background = "rgba(255,255,255,0.1)")
            }
            onMouseLeave={(e) => (e.target.style.background = "transparent")}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {user_name !== "" ? (
            <>
              <button
                onClick={handleDropdownToggle}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "1px solid rgba(255,255,255,0.5)",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <>
                  <User size={18} />
                  <span>{user_name}</span>
                </>
              </button>
              {/* Show dropdown on userclick */}
              {showDropdown && <UserDropdown />}
            </>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.5)",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <>
                <User size={18} />
                <span>Login</span>
              </>
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="mobile-menu flex gap-2">
          {user_name !== "" && (
            <>
              <button
                onClick={handleDropdownToggle}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "1px solid rgba(255,255,255,0.5)",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <>
                  <User size={18} />
                  <span>{user_name}</span>
                </>
              </button>
              {/* Show dropdown on userclick */}
              {showDropdown && <UserDropdown />}
            </>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              padding: "0.5rem",
              display: "none",
            }}
            className="mobile-toggle"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          style={{
            background: "#1a237e",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
          className="mobile-menu"
        >
          {navLinks.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              style={{
                color: "white",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem",
                borderRadius: "6px",
              }}
=======
          {/* Right controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-white/20"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <ProfileDropdown />

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/20"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-indigo-700 dark:bg-gray-800 px-4 pb-4 space-y-2">
          {navLinks.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium ${
                location.pathname === path
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`}
>>>>>>> 29d190e (added authentication middleware to verify token for user validation , modified authentication logic on client side by seperating loginand signup form and using zod for validation to make code readable and maintainable. Enhanced user flow by logout option when user is logged in and signup/login when user log outs. added logic unauthenticated user to go to specific routes.)
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}
<<<<<<< HEAD
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              paddingTop: "1rem",
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <button
              onClick={() => {
                setIsOpen(false);
                toggleDarkMode();
              }}
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "0.75rem",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              <span>Theme</span>
            </button>
            {user_name === "" && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate("/auth");
                }}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "1px solid rgba(255,255,255,0.5)",
                  color: "white",
                  padding: "0.75rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  width: "fit-content",
                }}
              >
                <User size={18} />
                <span>Login</span>
              </button>
            )}
          </div>
=======
          <Link
            to="/help"
            onClick={() => setMobileOpen(false)}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/10"
          >
            <HelpCircle size={18} />
            <span>Help Centre</span>
          </Link>
>>>>>>> 29d190e (added authentication middleware to verify token for user validation , modified authentication logic on client side by seperating loginand signup form and using zod for validation to make code readable and maintainable. Enhanced user flow by logout option when user is logged in and signup/login when user log outs. added logic unauthenticated user to go to specific routes.)
        </div>
      )}
    </nav>
  );
}
<<<<<<< HEAD
=======

export default Navbar;
>>>>>>> 29d190e (added authentication middleware to verify token for user validation , modified authentication logic on client side by seperating loginand signup form and using zod for validation to make code readable and maintainable. Enhanced user flow by logout option when user is logged in and signup/login when user log outs. added logic unauthenticated user to go to specific routes.)
