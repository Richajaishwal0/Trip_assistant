import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // theme
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // UI state
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // refs for accessibility
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null);
  const profileBtnRef = useRef<HTMLButtonElement | null>(null);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  // dark mode <-> body class & persistence
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((s) => !s);

  // close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    if (mobileOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = prev;
    }
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [mobileOpen]);

  // focus management when opening/closing the mobile menu
  useEffect(() => {
    if (mobileOpen) {
      // move focus into the menu
      firstMobileLinkRef.current?.focus();
    } else {
      // return focus to toggle for accessibility
      mobileToggleRef.current?.focus();
    }
  }, [mobileOpen]);

  // close on outside click / ESC (mobile + profile)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setProfileOpen(false);
      }
    }
    function onClick(e: MouseEvent) {
      // profile dropdown
      if (profileOpen) {
        const inButton = profileBtnRef.current?.contains(e.target as Node);
        const inMenu = profileMenuRef.current?.contains(e.target as Node);
        if (!inButton && !inMenu) setProfileOpen(false);
      }
      // mobile menu closes when clicking outside bar+menu area
      if (mobileOpen) {
        const bar = document.querySelector(".nav-bar");
        const menu = document.querySelector(".nav-mobile");
        const target = e.target as Node;
        if (bar && menu && !bar.contains(target) && !menu.contains(target)) {
          setMobileOpen(false);
        }
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [mobileOpen, profileOpen]);

  const closeMobileNav = () => setMobileOpen(false);

  return (
    <>
      <nav className="nav-bar" role="navigation" aria-label="Main navigation">
        <style>{`
          :root {
            --nav-bg: #1a237e;
            --nav-fg: #ffffff;
            --nav-accent-1: #FFD700;
            --nav-accent-2: #FFA500;
            --nav-shadow: 0 10px 30px rgba(0,0,0,.25);
            --nav-height: 64px;
          }

          .nav-bar {
            position: fixed; inset: 0 0 auto 0;
            height: var(--nav-height);
            background: var(--nav-bg);
            color: white;
            z-index: 1030;
            padding-top: max(env(safe-area-inset-top), 0);
          }

          .nav-wrap {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 16px;
            height: calc(var(--nav-height));
            display: grid;
            grid-template-columns: auto 1fr auto;
            align-items: center;
            gap: 8px;
          }

          .nav-brand { display: inline-flex; align-items: center; text-decoration: none; }
          .nav-logoWrap { display:flex; align-items:center; justify-content:center; transition: transform .25s ease; }
          .nav-logoWrap:hover { transform: scale(1.03); }
          .nav-logo { filter: drop-shadow(0 2px 8px rgba(0,0,0,.2)); }

          .nav-links {
            display:flex; justify-content:center; align-items:center; gap:.25rem; margin: auto 0
          }
          .nav-item { list-style:none; margin: auto 0 }
          .nav-link {
            color: var(--nav-fg);
            text-decoration: none;
            font-size: 1rem; font-weight: 500;
            padding: .65rem; margin: 0 .3rem;
            border-radius: 16px;
            min-width: 50px; min-height: 50px;
            display:inline-flex; align-items:center; justify-content:center;
            position: relative; transition: transform .18s ease, background .18s ease, color .18s ease;
            outline-offset: 3px;
            // margin: auto 0
          }
          .nav-link:hover, .nav-link:focus {
            color: #1a202c;
            background: linear-gradient(135deg, var(--nav-accent-1), var(--nav-accent-2));
            transform: translateY(-3px) scale(1.02);
          }
          .nav-link .nav-tip {
            position:absolute; bottom:-44px; left:50%; transform: translateX(-50%) translateY(10px);
            background: rgba(0,0,0,.9); color: #fff; font-size:.75rem; padding:6px 10px; border-radius:8px;
            opacity:0; visibility:hidden; white-space:nowrap; transition: .16s ease; pointer-events:none; z-index:1000;
          }
          .nav-link:hover .nav-tip, .nav-link:focus .nav-tip { opacity:1; visibility:visible; transform: translateX(-50%) translateY(0); }

          .nav-actions { display:flex; align-items:center; gap:.4rem; }
          .nav-btn {
            border:none; background:transparent; color:var(--nav-fg);
            display:inline-flex; align-items:center; justify-content:center;
            width:44px; height:44px; border-radius:12px; cursor:pointer;
          }
          .nav-btn:focus { outline: 2px solid rgba(255,255,255,.35); outline-offset: 2px; }

          .nav-profilePic {
            width: 35px; height: 35px; border-radius: 999px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border: 2px solid rgba(255,255,255,.35);
            display:flex; align-items:center; justify-content:center;
          }

          .nav-dd { position:relative; }
          .nav-menu {
            position:absolute; right:0; top:calc(100% + 8px);
            background: var(--nav-bg); color: var(--nav-fg);
            border-radius: 14px; padding: 6px; min-width: 220px;
            display:none; box-shadow: var(--nav-shadow);
            z-index: 1040;
          }
          .nav-menu.open { display:block; }
          .nav-ddItem, .nav-ddLink {
            display:flex; align-items:center; gap:.5rem; width:100%;
            padding:.65rem .75rem; border-radius:8px; text-decoration:none; color:inherit;
            background: transparent; border: none; cursor: pointer; text-align:left;
          }
          .nav-ddItem:hover, .nav-ddLink:hover { background: linear-gradient(135deg,#667eea,#764ba2); color:#fff; }

          .nav-hr { margin:.4rem 0; border:none; border-top:1px solid rgba(255,255,255,.08); }

          /* mobile */
          .nav-mobileToggle { display:none; }
          .nav-mobile { display:none; }

          @media (max-width: 1024px) {
            .nav-links { display:none; }
            .nav-mobileToggle { display:inline-flex; }
            .nav-wrap { grid-template-columns: auto 1fr auto; }
            .nav-actions { justify-self: end; }

            .nav-mobile {
              position: fixed; left:0; right:0; top: var(--nav-height);
              background: linear-gradient(180deg, rgba(26,35,126,0.98), rgba(26,35,126,0.96));
              color: var(--nav-fg);
              display:flex; flex-direction:column; gap:.5rem; padding: 12px 16px 28px 16px;
              box-shadow: var(--nav-shadow);
              max-height: calc(100vh - var(--nav-height)); overflow:auto;
              z-index: 1029;
              -webkit-overflow-scrolling: touch;
            }
            .nav-mobile .nav-link {
              width:100%; justify-content:flex-start; gap:.75rem; padding:.85rem 12px; min-height: 48px;
              border-radius: 10px;
            }
            .nav-mobile .nav-link .nav-tip { position:static; opacity:1; visibility:visible; transform:none; background:transparent; color:inherit; padding:0; }

            /* mobile-specific profile dropdown override: clicking profile shows its own list if opened (small popover below button) */
            .nav-dd .nav-menu {
              position: static;
              display: none;
              box-shadow: none;
              background: transparent;
              padding: 0;
            }
            .nav-dd .nav-menu.open {
              display: block;
            }
            .nav-ddItem, .nav-ddLink { background: rgba(255,255,255,.02); margin:.12rem 0; border-radius:8px; }
          }

          .sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0 0 0 0); border:0; }

          @media (prefers-reduced-motion: reduce) {
            .nav-link, .nav-logoWrap, .nav-tip { transition: none !important; }
          }
          @media (prefers-contrast: more) {
            .nav-bar { background:#000; }
            .nav-link:hover, .nav-link:focus { background:#fff; color:#000; }
          }
        `}</style>

        <div className="nav-wrap">
          {/* Brand */}
          <Link
            to="/"
            className="nav-brand"
            aria-label="Trip Assistant - Go to homepage"
            onClick={closeMobileNav}

          >
            <div className="nav-logoWrap">
              <div className="nav-logo" aria-hidden="true">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#667eea" />
                      <stop offset="100%" stopColor="#764ba2" />
                    </linearGradient>
                    <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFD700" />
                      <stop offset="100%" stopColor="#FFA500" />
                    </linearGradient>
                  </defs>
                  <rect x="8" y="8" width="24" height="24" rx="3" fill="url(#g1)" stroke="rgba(255,255,255,.3)" strokeWidth="1" />
                  <path d="M12 16h16 M12 20h16 M12 24h16 M16 12v16 M20 12v16 M24 12v16" stroke="rgba(255,255,255,.2)" strokeWidth=".5" />
                  <circle cx="20" cy="18" r="2" fill="url(#g2)" />
                  <path d="M20 20v6" stroke="url(#g2)" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="28" cy="12" r="3" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.3)" strokeWidth=".5" />
                  <path d="M28 9v6M25 12h6" stroke="rgba(255,255,255,.6)" strokeWidth="1" strokeLinecap="round" />
                  <path d="M12 28c2-2 4-1 8-1s6-1 8 1" stroke="url(#g2)" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>
              </div>
            </div>
          </Link>

        {/* Desktop nav */}
        <ul className="nav-links" role="menubar" aria-label="Main menu">
          <li className="nav-item" role="none">
            <Link className="nav-link" to="/" role="menuitem" onClick={closeMobileNav} aria-label="Home">
              <Home size={20} aria-hidden="true" />
              <span className="nav-tip">Home</span>
            </Link>
          </li>
          <li className="nav-item" role="none">
            <Link className="nav-link" to="/places" role="menuitem" onClick={closeMobileNav} aria-label="Places">
              <MapPin size={20} aria-hidden="true" />
              <span className="nav-tip">Places</span>
            </Link>
          </li>
          <li className="nav-item" role="none">
            <Link className="nav-link" to="/find-friends" role="menuitem" onClick={closeMobileNav} aria-label="Friends">
              <Users size={20} aria-hidden="true" />
              <span className="nav-tip">Friends</span>
            </Link>
          </li>
          <li className="nav-item" role="none">
            <Link className="nav-link" to="/more-places" role="menuitem" onClick={closeMobileNav} aria-label="Famous">
              <Star size={20} aria-hidden="true" />
              <span className="nav-tip">Famous</span>
            </Link>
          </li>
          <li className="nav-item" role="none">
            <Link className="nav-link" to="/trip-budget" role="menuitem" onClick={closeMobileNav} aria-label="Budget">
              <Calculator size={20} aria-hidden="true" />
              <span className="nav-tip">Budget</span>
            </Link>
          </li>
          <li className="nav-item" role="none">
            <Link className="nav-link" to="/currency" role="menuitem" onClick={closeMobileNav} aria-label="Currency">
              <DollarSign size={20} aria-hidden="true" />
              <span className="nav-tip">Currency</span>
            </Link>
          </li>
        </ul>

        {/* Right actions */}
        <div className="nav-actions">
          {/* mobile toggle */}
          <button
            ref={mobileToggleRef}
            className="nav-btn nav-mobileToggle"
            aria-expanded={mobileOpen}
            aria-controls="nav-mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((s) => !s)}
            type="button"
          >
            <Menu size={20} />
          </button>

          {/* dark mode */}
          <button
            className="nav-btn"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            title="Toggle theme"
            onClick={toggleDarkMode}
            type="button"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* profile dropdown */}
          <div className="nav-dd hidden lg:block">
            <button
              ref={profileBtnRef}
              className="nav-btn"
              aria-haspopup="menu"
              aria-expanded={profileOpen}
              aria-controls="nav-profile-menu"
              onClick={() => setProfileOpen((s) => !s)}
              type="button"
              title="User menu"
            >
              <div className="nav-profilePic" aria-hidden="true">
                <User size={16} />
              </div>
            </button>

            <div
              ref={profileMenuRef}
              id="nav-profile-menu"
              className={`nav-menu ${profileOpen ? "open" : ""}`}
              role="menu"
            >
              <button
                className="nav-ddItem"
                role="menuitem"
                onClick={() => {
                  setMobileOpen(false);
                  setProfileOpen(false);
                  navigate("/auth", { state: { isLogin: false } });
                }}
              >
                <span aria-hidden="true">➕</span>
                <span>Sign up</span>
              </button>

              <button
                className="nav-ddItem"
                role="menuitem"
                onClick={() => {
                  setMobileOpen(false);
                  setProfileOpen(false);
                  navigate("/auth", { state: { isLogin: true } });
                }}
              >
                <span aria-hidden="true">🔐</span>
                <span>Log in</span>
              </button>

              <hr className="nav-hr" />

              <Link
                to="/help"
                className="nav-ddLink"
                role="menuitem"
                onClick={() => setProfileOpen(false)}
              >
                <span aria-hidden="true">❓</span>
                <span>Help Centre</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile full menu */}
      {mobileOpen && (
        <div
          id="nav-mobile-menu"
          className="nav-mobile"
          role="menu"
          aria-label="Mobile main menu"
        >
          <Link
            ref={firstMobileLinkRef}
            className="nav-link"
            to="/"
            onClick={closeMobileNav}
          >
            <Home size={18} aria-hidden="true" />
            <span className="nav-tip">Home</span>
          </Link>

          <Link className="nav-link" to="/places" onClick={closeMobileNav}>
            <MapPin size={18} aria-hidden="true" />
            <span className="nav-tip">Places</span>
          </Link>

          <Link className="nav-link" to="/find-friends" onClick={closeMobileNav}>
            <Users size={18} aria-hidden="true" />
            <span className="nav-tip">Friends</span>
          </Link>

          <Link className="nav-link" to="/more-places" onClick={closeMobileNav}>
            <Star size={18} aria-hidden="true" />
            <span className="nav-tip">Famous</span>
          </Link>

          <Link className="nav-link" to="/trip-budget" onClick={closeMobileNav}>
            <Calculator size={18} aria-hidden="true" />
            <span className="nav-tip">Budget</span>
          </Link>

          <Link className="nav-link" to="/currency" onClick={closeMobileNav}>
            <DollarSign size={18} aria-hidden="true" />
            <span className="nav-tip">Currency</span>
          </Link>

          <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", marginTop: 8, paddingTop: 8 }}>
            <button
              className="nav-ddItem"
              onClick={() => {
                setMobileOpen(false);
                navigate("/auth", { state: { isLogin: false } });
              }}
            >
              <span aria-hidden="true">➕</span>
              <span>Sign up</span>
            </button>

            <button
              className="nav-ddItem"
              onClick={() => {
                setMobileOpen(false);
                navigate("/auth", { state: { isLogin: true } });
              }}
            >
              <span aria-hidden="true">🔐</span>
              <span>Log in</span>
            </button>

            <Link className="nav-ddLink" to="/help" onClick={() => setMobileOpen(false)}>
              <span aria-hidden="true">❓</span>
              <span>Help Centre</span>
            </Link>
          </div>
        </div>
      )}
    </nav >

      {/* Spacer to avoid content under fixed bar */ }
      < div aria-hidden="true" style = {{ height: "var(--nav-height)" }
} />
    </>
  );
}

export default Navbar;