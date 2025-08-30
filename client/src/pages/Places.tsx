import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaStar, FaRobot } from "react-icons/fa";
import PlaceCard from "../components/placeCard";
import "./Places.css";

import SearchBar from "../components/searchbar";
import Chatbot from "../components/chatbot";
import ScrollToTop from "../components/ScrollToTop";
// import OptimizedMap from "../components/map/OptimizedMap";
import { lazy, Suspense, useMemo } from "react"; // ✅
const OptimizedMap = lazy(() => import("../components/map/OptimizedMap")); 




const places = [
  {
    id: 1,
    image: "src/images/home1.jpg",
    location: "Ellijay, Georgia, US",
    distance: "101 km away",
    date: "29 Mar – 3 Apr",
    price: "₹26,432 night",
    rating: 5.0,
    lat: 34.6940,
    lng: -84.4821,
  },
  {
    id: 2,
    image: "src/images/home2.jpg",
    location: "Cherry Log, Georgia, US",
    distance: "117 km away",
    date: "23–28 Mar",
    price: "₹26,996 night",
    rating: 5.0,
    lat: 34.7937,
    lng: -84.3660,
  },
  {
    id: 3,
    image: "src/images/home3.jpg",
    location: "Blue Ridge, Georgia, US",
    distance: "113 km away",
    date: "2–7 Mar",
    price: "₹17,407 night",
    rating: 5.0,
    lat: 34.8631,
    lng: -84.3247,
  },
  {
    id: 4,
    image: "src/images/home4.jpg",
    location: "Savannah, Georgia, US",
    distance: "250 km away",
    date: "10–15 Apr",
    price: "₹22,000 night",
    rating: 4.8,
    lat: 32.0809,
    lng: -81.0912,
  },
  {
    id: 8,
    image: "/images/bg-auth.jpg",
    location: "Austin, Texas, US",
    distance: "1200 km away",
    date: "1–6 Aug",
    price: "₹32,000 night",
    rating: 4.8,
    lat: 30.2672,
    lng: -97.7431,
  },
  {
    id: 9,
    image: "src/images/home2.jpg",
    location: "San Francisco, California, US",
    distance: "2500 km away",
    date: "15–20 Sep",
    price: "₹40,000 night",
    rating: 4.9,
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    id: 10,
    image: "src/images/home3.jpg",
    location: "Seattle, Washington, US",
    distance: "2700 km away",
    date: "25–30 Oct",
    price: "₹38,000 night",
    rating: 4.7,
    lat: 47.6062,
    lng: -122.3321,
  },
];

const Places: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const totalPlaces = places.length;
  const visibleCards = 10;

  useEffect(() => {
    const checkDarkMode = () => {
      setDarkMode(document.body.classList.contains("dark-mode"));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const apiBaseUrl =
    import.meta.env?.VITE_API_BASE_URL || "http://localhost:5000";
  //updating user's activity by calling backend api for places activity
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return; // No user logged in

    axios
      .post(`${apiBaseUrl}/api/user/activity`, { userId })
      .then((res) => console.log("Activity updated:", res.data))
      .catch((err) => console.error("Error updating activity", err));
  }, []);

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % totalPlaces);
    }, 2000);
    return () => clearInterval(interval);
  }, [totalPlaces]);


//   const points = useMemo(   // ✅
//   () =>
//     places.map((p) => ({
//       id: p.id,
//       lat: 28.6139 + Math.random(), // 🔧 dummy coords for now
//       lng: 77.2090 + Math.random(),
//       title: p.location,
//       description: `${p.price}, Rating: ${p.rating}`,
//     })),
//   []
// );

const points = useMemo(
  () =>
    places.map((p) => ({
      id: p.id,
      lat: p.lat,
      lng: p.lng,
      title: p.location,
      description: `${p.price}, Rating: ${p.rating}`,
    })),
  [places]
);


  return (
    <>
      <SearchBar />
      <div
        className={darkMode ? "places-container bg-dark" : "places-container"}
      >
        <h2 className={darkMode ? "title bg-dark text-light" : "title"}>
          Explore Amazing Places
        </h2>
        <div
          className={
            darkMode ? "places-carousel bg-dark text-light" : "places-carousel"
          }
        >
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${carouselIndex * 432}px)`, // 400px card + 32px gap
            }}
          >
            {places.concat(places).map((place, idx) => (
              <div
                key={idx + "-" + place.id}
                className={darkMode ? "place-card dark-mode" : "place-card"}
              >
                <div className="card-image-wrapper">
                  <img
                    src={place.image}
                    alt={place.location}
                    className="place-image"
                  />
                  <button className="view-details-btn">View Details</button>
                </div>
                <div className="place-info">
                  <div className="place-header">
                    <h3 className="place-title">{place.location}</h3>
                    <span className="place-rating">
                      <FaStar /> {place.rating}
                    </span>
                  </div>
                  <div className="place-meta">
                    <span>
                      {place.distance} {place.date}
                    </span>
                  </div>
                  <div className="place-footer">
                    <span className="price">{place.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  {/* ✅ Add map here */}
    <Suspense fallback={<div style={{ height: "60vh" }}>Loading map…</div>}>
<OptimizedMap center={[39.8283, -98.5795]} zoom={4} points={points} />

    </Suspense>
      {/* Floating Chatbot Button */}
      <button
        className="chatbot-btn"
        onClick={() => setIsChatOpen(true)}
        aria-label="Open travel assistant chat"
        title="Chat with our travel assistant"
      >
        <FaRobot size={20} />
      </button>

      {/* Show Chatbot when button is clicked */}
      {isChatOpen && <Chatbot onClose={() => setIsChatOpen(false)} />}

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Top Rated Tours and Adventures Section from PlaceCard */}
      <PlaceCard />
    </>
  );
};

export default Places;
