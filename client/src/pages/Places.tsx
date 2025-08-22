import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaStar, FaComments } from "react-icons/fa";
import { FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import PlaceCard from "../components/placeCard";
import "./Places.css";
import SearchBar from "../components/searchbar";
import Chatbot from "../components/chatbot";
import "../components/chatbot.css";

const places = [
  {
    id: 1,
    image: "src/images/home1.jpg",
    location: "Ellijay, Georgia, US",
    distance: "101 km away",
    date: "29 Mar – 3 Apr",
    price: "₹26,432 night",
    rating: 5.0,
  },
  {
    id: 2,
    image: "src/images/home2.jpg",
    location: "Cherry Log, Georgia, US",
    distance: "117 km away",
    date: "23–28 Mar",
    price: "₹26,996 night",
    rating: 5.0,
  },
  {
    id: 3,
    image: "src/images/home3.jpg",
    location: "Blue Ridge, Georgia, US",
    distance: "113 km away",
    date: "2–7 Mar",
    price: "₹17,407 night",
    rating: 5.0,
  },
  {
    id: 4,
    image: "src/images/home4.jpg",
    location: "Savannah, Georgia, US",
    distance: "250 km away",
    date: "10–15 Apr",
    price: "₹22,000 night",
    rating: 4.8,
  },
  {
    id: 5,
    image: "src/images/home5.jpeg",
    location: "Asheville, North Carolina, US",
    distance: "300 km away",
    date: "5–10 May",
    price: "₹28,500 night",
    rating: 4.9,
  },
  {
    id: 6,
    image: "src/images/ihome_image.png",
    location: "Miami Beach, Florida, US",
    distance: "900 km away",
    date: "12–17 Jun",
    price: "₹35,000 night",
    rating: 4.7,
  },
  {
    id: 7,
    image: "src/images/logo1.jpg",
    location: "Nashville, Tennessee, US",
    distance: "400 km away",
    date: "20–25 Jul",
    price: "₹19,800 night",
    rating: 4.6,
  },
  {
    id: 8,
    image: "src/images/bg-auth.jpg",
    location: "Austin, Texas, US",
    distance: "1200 km away",
    date: "1–6 Aug",
    price: "₹32,000 night",
    rating: 4.8,
  },
  {
    id: 9,
    image: "src/images/home2.jpg",
    location: "San Francisco, California, US",
    distance: "2500 km away",
    date: "15–20 Sep",
    price: "₹40,000 night",
    rating: 4.9,
  },
  {
    id: 10,
    image: "src/images/home3.jpg",
    location: "Seattle, Washington, US",
    distance: "2700 km away",
    date: "25–30 Oct",
    price: "₹38,000 night",
    rating: 4.7,
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
  interface RatingStarsProps {
    rating: number; 
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % totalPlaces);
    }, 2000);
    return () => clearInterval(interval);
  }, [totalPlaces]);
  function RatingStars({ rating }: RatingStarsProps) {
    const stars = [];
    const totalStars = 5;

    // 1. Render full stars
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-warning" />);
    }

    // 2. Render half star if applicable
    const hasHalfStar = rating - fullStars >= 0.5;
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-warning" />);
    }

    // 3. Render empty stars
    const emptyStars = totalStars - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-muted" />);
    }

    return <div className="flex flex-row gap-1">{stars}</div>;
  }

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
                className={darkMode ? "place-card dark-mode" : "place-card "}
              >
                <div className="card-image-wrapper ">
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
                  </div>
                  <div className="place-rating ">
                    {/* Call the new component with the rating */}
                    <RatingStars rating={place.rating} />
                    <span>{place.rating}</span>
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

      {/* Floating Chatbot Button */}
      <button className="chatbot-btn btn" onClick={() => setIsChatOpen(true)}>
        <FaComments size={20} />
      </button>

      {/* Show Chatbot when button is clicked */}
      {isChatOpen && <Chatbot onClose={() => setIsChatOpen(false)} />}

      {/* Top Rated Tours and Adventures Section from PlaceCard */}
      <PlaceCard />
    </>
  );
};

export default Places;
