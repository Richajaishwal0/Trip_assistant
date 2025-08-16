import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaStar, FaComments } from "react-icons/fa";
import "./Places.css";
import SearchBar from "../components/searchbar";
import Chatbot from "../components/chatbot";

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
];

const Places: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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

  //updating user's activity by calling backend api for places activity
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return; // No user logged in

    axios.post("http://localhost:5000/api/user/activity", { userId })
      .then(res => console.log("Activity updated:", res.data))
      .catch(err => console.error("Error updating activity", err));
  }, []);

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
            darkMode ? "places-grid bg-dark text-light" : "places-grid"
          }
        >
          {places.map((place) => (
            <div
              key={place.id}
              className={darkMode ? "place-card dark-mode" : "place-card"}
            >
              <img
                src={place.image}
                alt={place.location}
                className="place-image"
              />
              <div className="place-info">
                <h3>
                  <a href="#">
                    <FaMapMarkerAlt
                      className={darkMode ? "map-icon dark-mode" : "map-icon"}
                    />
                  </a>{" "}
                  {place.location}
                </h3>
                <p>{place.distance}</p>
                <p>{place.date}</p>
                <p className={darkMode ? "price dark-mode" : "price"}>
                  {place.price}
                </p>
                <p className="rating">
                  <FaStar /> {place.rating}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Chatbot Button */}
      <button
        className="chatbot-btn btn btn-primary"
        onClick={() => setIsChatOpen(true)}
      >
        <FaComments size={20} />
      </button>

      {/* Show Chatbot when button is clicked */}
      {isChatOpen && <Chatbot onClose={() => setIsChatOpen(false)} />}
    </>
  );
};

export default Places;
