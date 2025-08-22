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
import "./accessibility.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./responsive.css";

// Route configuration and lazy loading
import { routes, prefetchCriticalRoutes } from "./utils/routeConfig";

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(prefetchCriticalRoutes, 1000);
    return () => clearTimeout(timer);
  }, []);

  const showHeaderFooter = useMemo(
    () =>
      location.pathname !== "/auth" &&
      location.pathname !== "/admin" &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup",
    [location.pathname]
  );
  const showFooter = useMemo(
    () =>
      showHeaderFooter &&
      location.pathname !== "/find-friends" &&
      location.pathname !== "/help",
    [showHeaderFooter, location.pathname]
  );

  return (
    <ErrorBoundary>
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

      {showHeaderFooter && <Navbar />}

      <main
        id="main-content"
        style={{
          paddingTop:
            showHeaderFooter && location.pathname !== "/help" ? "80px" : "0",
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

      {showFooter && <Footer />}
    </ErrorBoundary>
  );
};

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