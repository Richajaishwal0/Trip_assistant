import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Import Tailwind CSS
import "./index.css";
// Only import critical bootstrap CSS at initial load
// Other bootstrap components will be loaded when needed
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import TokenProvider  from "./context/TokenProvider";

// Preload critical resources
const preloadStylesheets = () => {
  // Add bootstrap-icons CSS directly instead of preloading
  const iconLink = document.createElement("link");
  iconLink.rel = "stylesheet";
  iconLink.href =
    "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css";
  document.head.appendChild(iconLink);
};

// Execute preload strategy
preloadStylesheets();

// Create root and render app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TokenProvider>
      <App />
    </TokenProvider>
  </StrictMode>
);
