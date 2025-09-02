import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaStar, FaComments, FaTimes } from "react-icons/fa";

import { FaMapMarkerAlt, FaStar, FaRobot } from "react-icons/fa";

import PlaceCard from "../components/placeCard";


import "./Places.css";


import SearchBar from "../components/searchbar";
import Chatbot from "../components/chatbot";

import "./Places.css";

// Import images properly
import home1 from "../images/home1.jpg";
import home2 from "../images/home2.jpg";
import home3 from "../images/home3.jpg";
import home4 from "../images/home4.jpg";
import home5 from "../images/home5.jpeg";
import ihomeImage from "../images/ihome_image.png";
import logo1 from "../images/logo1.jpg";
import bgAuth from "../images/bg-auth.jpg";

import ScrollToTop from "../components/ScrollToTop";
// import OptimizedMap from "../components/map/OptimizedMap";
import { lazy, Suspense, useMemo } from "react"; // ✅
const OptimizedMap = lazy(() => import("../components/map/OptimizedMap")); 





interface Place {
  id: number;
  image: string;
  location: string;
  distance: string;
  date: string;
  price: string;
  rating: number;
  description?: string;
}

const places: Place[] = [
  {
    id: 1,
    image: home1,
    location: "Ellijay, Georgia, US",
    distance: "101 km away",
    date: "29 Mar – 3 Apr",
    price: "₹26,432 night",
    rating: 5.0,

    description: "Beautiful cabin in the woods with modern amenities and stunning views.",

    lat: 34.6940,
    lng: -84.4821,

  },
  {
    id: 2,
    image: home2,
    location: "Cherry Log, Georgia, US",
    distance: "117 km away",
    date: "23–28 Mar",
    price: "₹26,996 night",
    rating: 5.0,

    description: "Cozy cabin with a private hot tub and breathtaking views of the surrounding mountains.",

    lat: 34.7937,
    lng: -84.3660,

  },
  {
    id: 3,
    image: home3,
    location: "Blue Ridge, Georgia, US",
    distance: "113 km away",
    date: "2–7 Mar",
    price: "₹17,407 night",
    rating: 5.0,

    description: "Charming cabin with a fireplace and a fully equipped kitchen, perfect for a romantic getaway.",

    lat: 34.8631,
    lng: -84.3247,

  },
  {
    id: 4,
    image: home4,
    location: "Savannah, Georgia, US",
    distance: "250 km away",
    date: "10–15 Apr",
    price: "₹22,000 night",
    rating: 4.8,

    description: "Historic mansion with a private pool and a beautifully landscaped garden, ideal for a family vacation.",
  },
  {
    id: 5,
    image: home5,
    location: "Asheville, North Carolina, US",
    distance: "300 km away",
    date: "5–10 May",
    price: "₹28,500 night",
    rating: 4.9,
    description: "Modern cabin with a hot tub and a stunning view of the surrounding mountains, perfect for a relaxing retreat.",
  },
  {
    id: 6,
    image: ihomeImage,
    location: "Miami Beach, Florida, US",
    distance: "900 km away",
    date: "12–17 Jun",
    price: "₹35,000 night",
    rating: 4.7,
    description: "Luxurious beachfront condo with a private balcony and a stunning view of the ocean, ideal for a beach vacation.",
    lat: 25.79,
    lng: -80.14,
  },
  {
    id: 7,
    image: logo1,
    location: "Nashville, Tennessee, US",
    distance: "400 km away",
    date: "20–25 Jul",
    price: "₹19,800 night",
    rating: 4.6,
    description: "Charming cabin with a private hot tub and a fully equipped kitchen, perfect for a romantic getaway.",
  },
  {
    id: 8,
    image: bgAuth,

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

    description: "Modern condo with a private pool and a stunning view of the surrounding cityscape, ideal for a city break.",

    lat: 30.2672,
    lng: -97.7431,

  },
  {
    id: 9,
    image: home2,
    location: "San Francisco, California, US",
    distance: "2500 km away",
    date: "15–20 Sep",
    price: "₹40,000 night",
    rating: 4.9,

    description: "Luxurious apartment with a private balcony and a stunning view of the Golden Gate Bridge, perfect for a city break.",

    lat: 37.7749,
    lng: -122.4194,

  },
  {
    id: 10,
    image: home3,
    location: "Seattle, Washington, US",
    distance: "2700 km away",
    date: "25–30 Oct",
    price: "₹38,000 night",
    rating: 4.7,

    description: "Charming cabin with a private hot tub and a fully equipped kitchen, perfect for a romantic getaway.",

    lat: 47.6062,
    lng: -122.3321,

  },
];

const Places: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const totalPlaces = places.length;

  // Dark mode check
  useEffect(() => {
    const checkDarkMode = () => {
      setDarkMode(document.body.classList.contains("dark-mode"));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const apiBaseUrl = import.meta.env?.VITE_API_BASE_URL || "http://localhost:5000";

  // Update user's activity
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    axios
      .post(`${apiBaseUrl}/api/user/activity`, { userId })
      .then((res) => console.log("Activity updated:", res.data))
      .catch((err) => console.error("Error updating activity", err));
  }, [apiBaseUrl]);

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % totalPlaces);
    }, 3000);
    return () => clearInterval(interval);
  }, [totalPlaces]);


  const handleViewDetails = (place: Place) => {
    setSelectedPlace(place);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };


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
      <div className={darkMode ? "places-container bg-dark" : "places-container"}>
        <h2 className={darkMode ? "title bg-dark text-light" : "title"}>Explore Amazing Places</h2>
        <div className={darkMode ? "places-carousel bg-dark text-light" : "places-carousel"}>
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${carouselIndex * 432}px)`,
            }}
          >
            {places.concat(places).map((place, idx) => (
              <div key={`${place.id}-${idx}`} className={darkMode ? "place-card dark-mode" : "place-card"}>
                <div className="card-image-wrapper">
                  <img
                    src={place.image}
                    alt={place.location}
                    className="place-image"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                    }}
                  />
                  <button className="view-details-btn" onClick={() => handleViewDetails(place)}>
                    View Details
                  </button>
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
                      {place.distance} • {place.date}
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


      {/* Place Details Modal */}
      {isModalOpen && selectedPlace && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>
              <FaTimes />
            </button>
            <div className="modal-body">
              <img
                src={selectedPlace.image}
                alt={selectedPlace.location}
                className="modal-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/800x500?text=Image+Not+Found";
                }}
              />
              <div className="modal-details">
                <h2>{selectedPlace.location}</h2>
                <div className="place-rating">
                  <FaStar /> {selectedPlace.rating}
                </div>
                <p className="place-description">{selectedPlace.description || "No description available."}</p>
                <div className="place-meta">
                  <p>
                    <FaMapMarkerAlt /> {selectedPlace.distance}
                  </p>
                  <p>Available: {selectedPlace.date}</p>
                  <p className="price">{selectedPlace.price}</p>
                </div>
                <button className="book-now-btn">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      )}


    </Suspense>

      {/* Floating Chatbot Button */}

      <button className="chatbot-btn btn btn-primary" onClick={() => setIsChatOpen(true)}>
        <FaComments size={20} />

      <button
        className="chatbot-btn"
        onClick={() => setIsChatOpen(true)}
        aria-label="Open travel assistant chat"
        title="Chat with our travel assistant"
      >
        <FaRobot size={20} />
      </button>
      {isChatOpen && <Chatbot onClose={() => setIsChatOpen(false)} />}


      {/* Top Rated Tours and Adventures Section */}

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Top Rated Tours and Adventures Section from PlaceCard */}

      <PlaceCard />
    </>
  );
};

export default Places;
