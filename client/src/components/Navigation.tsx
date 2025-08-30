import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, MapPin, Users, Star, Calculator, DollarSign, User, Menu, X, Sun, Moon } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    document.body.classList.toggle('dark-mode', newMode);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const navLinks = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/places", icon: MapPin, label: "Places" },
    { to: "/find-friends", icon: Users, label: "Friends" },
    { to: "/more-places", icon: Star, label: "Famous" },
    { to: "/trip-budget", icon: Calculator, label: "Budget" },
    { to: "/currency", icon: DollarSign, label: "Currency" }
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      background: 'linear-gradient(135deg, #1a237e, #3949ab)',
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem'
      }}>
        <Link to="/" style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}>
          🧳 Trip Planner
        </Link>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center' }} className="desktop-nav">
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {navLinks.map(({ to, icon: Icon, label }) => (
              <Link key={to} to={to} style={{
                color: 'white',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                transition: 'all 0.3s ease'
              }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                 onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="desktop-nav">
          <button onClick={toggleDarkMode} style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '6px',
            transition: 'all 0.3s ease'
          }}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => navigate('/auth')} style={{
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.5)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <User size={18} />
            <span>Login</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setIsOpen(!isOpen)} style={{
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          padding: '0.5rem',
          display: 'none'
        }} className="mobile-toggle">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{
          background: '#1a237e',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }} className="mobile-menu">
          {navLinks.map(({ to, icon: Icon, label }) => (
            <Link key={to} to={to} onClick={() => setIsOpen(false)} style={{
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem',
              borderRadius: '6px'
            }}>
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}>
            <button onClick={() => { setIsOpen(false); toggleDarkMode(); }} style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '0.75rem',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              <span>Theme</span>
            </button>
            <button onClick={() => { setIsOpen(false); navigate('/auth'); }} style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.5)',
              color: 'white',
              padding: '0.75rem',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <User size={18} />
              <span>Login</span>
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 1088px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
        @media (min-width: 1089px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}
