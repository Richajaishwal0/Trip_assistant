import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  Menu,
  X,
  HelpCircle,
} from "lucide-react";
import Logo from "./Logo";
import { useToken } from "../context/TokenProvider";

function ProfileDropdown() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { isLoggedin, login , logout } = useToken();
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
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/places", label: "Places", icon: MapPin },
    { path: "/find-friends", label: "Friends", icon: Users },
    { path: "/more-places", label: "Famous", icon: Star },
    { path: "/trip-budget", label: "Budget", icon: Calculator },
    { path: "/currency", label: "Currency", icon: DollarSign },
  ];

  return (
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
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
          </div>

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
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}
          <Link
            to="/help"
            onClick={() => setMobileOpen(false)}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/10"
          >
            <HelpCircle size={18} />
            <span>Help Centre</span>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
