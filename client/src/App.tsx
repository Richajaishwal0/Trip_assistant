import React, { Suspense, useEffect, useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "sonner";

// Core component imports
import Navbar from "./components/Navigation";
import Footer from "./components/footer";
import NetworkStatusBar from "./components/NetworkStatusBar";
import LoadingState from "./components/LoadingState";
import ErrorBoundary from "./components/ErrorBoundary";

// Style and Configuration Imports
import "./App.css";
import "./accessibility.css"; // Global accessibility styles from 'main'
import "bootstrap/dist/css/bootstrap.min.css"; // Added from 'currency-converter'
import "./responsive.css";

// Route configuration and lazy loading from 'main'
// IMPORTANT: You must add your new routes (Currency, AboutUsPage, etc.) to this file.
import { routes, prefetchCriticalRoutes } from "./utils/routeConfig";

// App content component as a function component
const AppContent = () => {
  const location = useLocation(); // Get the current route
  
  // Prefetch critical routes after component mounts
  useEffect(() => {
    const timer = setTimeout(prefetchCriticalRoutes, 1000);
    return () => clearTimeout(timer);
  }, []);

  // navbar height
  const [navBarHeight, setNavBarHeight] = React.useState(0);
  useEffect(() => {
    const navBar = document.querySelector(".navbar");
    if(navBar){
      setNavBarHeight(navBar.clientHeight);
    }
  }, [location.pathname]);

  // Determine if the header and footer should be shown based on the route
  const showHeaderFooter = useMemo(
    () => location.pathname !== "/auth" && location.pathname !== "/admin",
    [location.pathname]
  );
  const showFooter = useMemo(
    () => showHeaderFooter &&
      location.pathname !== "/find-friends" &&
      location.pathname !== "/help",
    [showHeaderFooter, location.pathname]
  );

  return (
    <ErrorBoundary>
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <NetworkStatusBar />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          className: "toast-notification",
        }}
      />

      {/* Show Navbar conditionally */}
      {showHeaderFooter && <Navbar />}

      {/* Main content area with dynamic padding to prevent overlap with fixed navbar */}

      <main
        id="main-content"
        style={{
          paddingTop:
            showHeaderFooter && location.pathname !== "/help" ? `${navBarHeight}px` : "0",
        }}
        role="main"
        tabIndex={-1}
      >
        <ErrorBoundary
          fallback={
            <div className="alert alert-danger m-3">
              <h4>Navigation Error</h4>
              <p>
                We encountered a problem loading this page. Please try
                refreshing.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-outline-danger"
              >
                Refresh
              </button>
            </div>
          }
        >
          <Suspense fallback={<LoadingState size="lg" />}>
            <Routes>
              {/* Routes are now mapped from the central routeConfig file */}
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>

      {/* Conditionally render the Footer */}
      {showFooter && <Footer />}
    </ErrorBoundary>
  );
};

// AppContent doesn't need memoization as it has no props and location changes trigger re-renders anyway

// App component with Router and ErrorBoundary
function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
}



export default App;
