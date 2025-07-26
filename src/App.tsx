import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navigation";
import Home from "./pages/home";
import Places from "./pages/Places";
import FindFriends from "./pages/FindFriends";
import Auth from "./pages/Auth";
import Footer from "./components/footer";
import Dashboard from "./pages/Admin/admin";
import "./i18n"; // Import i18next configuration
import "./responsive.css";
import HelpCentre from "./pages/helpcenter";
function AppContent() {
  const location = useLocation(); // Get the current route

  return (
    <>
      {/* Show Navbar only if NOT on the Auth page */}

      {location.pathname !== "/auth" && location.pathname !== "/admin" && (
        <Navbar />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/places" element={<Places />} />
        <Route path="/find-friends" element={<FindFriends />} />
        <Route path="/auth" element={<Auth />} />

        <Route path="/admin" element={<Dashboard />} />
        <Route path="/help" element={<HelpCentre/>}/>
      </Routes>
      {location.pathname !== "/auth" &&
        location.pathname !== "/admin" &&
        location.pathname !== "/find-friends" && <Footer />}
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
