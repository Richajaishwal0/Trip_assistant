import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Component & Page Imports
import Navbar from "./components/Navigation";
import Footer from "./components/footer";
import Home from "./pages/home";
import Places from "./pages/Places";
import FindFriends from "./pages/FindFriends";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Admin/admin";
import MorePlaces from './pages/MorePlaces';
import PlaceDetails from './pages/PlaceDetails';

// Style and Configuration Imports
import "./i18n"; 
import "./responsive.css";

function AppContent() {
  const location = useLocation(); // Get the current route

  // Determine if the header and footer should be shown
  const showHeaderFooter = location.pathname !== "/auth" && location.pathname !== "/admin";
  const showFooter = showHeaderFooter && location.pathname !== "/find-friends";

  return (
    <>
      {/* Show Navbar only if NOT on the Auth or Admin page */}
      {showHeaderFooter && <Navbar />}

      {/* --- THIS IS THE FIX --- */}
      {/* We add top padding to the main content area ONLY when the navbar is visible.
          This prevents the page content from being hidden underneath the fixed navbar. 
      */}
      <main style={{ paddingTop: showHeaderFooter ? '80px' : '0' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/places" element={<Places />} />
          <Route path="/find-friends" element={<FindFriends />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/more-places" element={<MorePlaces />} />
          <Route path="/places/:placeName" element={<PlaceDetails />} />
          <Route path="/admin" element={<Dashboard />} />
        </Routes>
      </main>

      {/* Conditionally render the Footer */}
      {showFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
