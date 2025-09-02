import { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaStar, FaSearch, FaCompass, FaCamera } from "react-icons/fa";
import "./MorePlaces.css";
import { handleError } from "../utils/errorHandlerToast";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import { isOnline } from "../utils/networkUtils";
import { motion, AnimatePresence } from "framer-motion";

interface Place {
  id: number;
  src: string;
  alt: string;
  photographer: string;
  location: string;
  city: string;
  attraction: string;
  description: string;
  price: string;
  rating: string;
}

const MorePlaces = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("famous places");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [darkMode] = useState(document.body.classList.contains("dark-mode"));
  const [error, setError] = useState<string | null>(null);

  const apiBaseUrl =
    import.meta.env?.VITE_API_BASE_URL || "http://localhost:5000";

  const fetchPlaces = async (query = searchTerm, currentPage = 1) => {
    // Reset error state
    setError(null);

    // Check network connectivity first
    if (!isOnline()) {
      setError(
        "No internet connection. Please check your network and try again."
      );
      setLoading(false);
      return;
    }

    try {
      if (currentPage === 1) {
        setLoading(true);
      }

      const res = await axios.get(
        `${apiBaseUrl}/api/more-places?query=${encodeURIComponent(
          query
        )}&page=${currentPage}&per_page=12`,
        { timeout: 10000 } // Set a reasonable timeout
      );

      // Make sure res.data is an array
      const placesData = Array.isArray(res.data) ? res.data : [];

      if (placesData.length === 0) {
        setHasMore(false);
      }

      if (currentPage === 1) {
        setPlaces(placesData);
      } else {
        setPlaces((prev) => [...prev, ...placesData]);
      }

      setLoading(false);
    } catch (err) {
      const errorMessage = "Failed to load places. Please try again.";
      setError(errorMessage);
      handleError(err, errorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces(searchTerm, 1);
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    setHasMore(true);
    setPlaces([]);
    fetchPlaces(searchTerm, 1);
  };

  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPlaces(searchTerm, nextPage);
  };

  const getCleanPlaceName = (description: string): string => {
    if (!description) return "Beautiful Destination";
    const parts = description.split(
      /,| featuring| with| in| at sunset| spanning/
    );
    return parts[0].trim();
  };

  const handleShowDetails = (placeName: string): void => {
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      placeName
    )}`;
    window.open(googleSearchUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`more-places-container ${darkMode ? "dark-mode" : ""}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-header">
          <motion.h1
            className="section-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="title-with-icon">
              <FaCompass />
              <span>Explore More Destinations</span>
            </span>
          </motion.h1>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Discover amazing places around the world and plan your next adventure
          </motion.p>
        </div>

        <div className="search-container">
          <motion.form
            onSubmit={handleSearch}
            className="search-input-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <FaSearch className="search-icon" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for amazing destinations..."
              className="search-input"
            />
            <motion.button
              type="submit"
              className="search-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Search
            </motion.button>
          </motion.form>
        </div>

        {error ? (
          <ErrorState
            message={error}
            onRetry={() => fetchPlaces(searchTerm, 1)}
            className="py-5"
          />
        ) : loading && places.length === 0 ? (
          <LoadingState
            message="Loading destinations..."
            size="lg"
            className="py-5"
          />
        ) : (
          <motion.div
            className="places-grid"
            variants={{
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              },
              hidden: { opacity: 0 }
            }}
            initial="hidden"
            animate="show"
          >
            <AnimatePresence mode="popLayout">
              {Array.isArray(places) && places.length > 0 ? (
                places.map((place, index) => (
                  <motion.div
                    key={`${place.id}-${page}-${index}`}
                    className="place-card"
                    onClick={() => handleShowDetails(getCleanPlaceName(place.alt))}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 }
                    }}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, y: -20 }}
                    whileHover={{ y: -10 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                  >
                    <div className="place-image-wrapper">
                      <motion.img
                        src={place.src}
                        alt={place.alt}
                        className="place-image"
                        loading="lazy"
                      />
                      <motion.div 
                        className="place-overlay"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <motion.button
                          className="view-details-btn"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Details
                        </motion.button>
                      </motion.div>
                    </div>
                    <div className="place-content">
                      <div className="place-title">
                        <span>{getCleanPlaceName(place.alt)}</span>
                        <motion.a
                          href={`https://www.google.com/maps?q=${encodeURIComponent(
                            getCleanPlaceName(place.alt)
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          whileHover={{ scale: 1.1 }}
                          className="map-link"
                        >
                          <FaMapMarkerAlt className="location-icon" />
                        </motion.a>
                      </div>
                      <div className="location-info">
                        <FaCamera />
                        <span>{place.photographer}</span>
                      </div>
                      <div className="place-details">
                        <span className="photographer" title={`By ${place.photographer}`}>
                          By {place.photographer}
                        </span>
                        <div className="rating">
                          <FaStar className="rating-star" />
                          <span>Featured</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
            ) : (
              <motion.div
                className="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.2 }}
              >
                <p>No places found. Try a different search term.</p>
              </motion.div>
            )}
            </AnimatePresence>
          </motion.div>
        )}

        {hasMore && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <motion.button
              onClick={handleShowMore}
              className="load-more-button"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0, 98, 255, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Discover More Places
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MorePlaces;
