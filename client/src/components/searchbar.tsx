import React, { useState,useEffect } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Row,
  Col,
  Dropdown,
  Badge,
} from "react-bootstrap";
import {
  FaSearch,
  FaFilter,
  FaTimes,
  FaStar,
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaUtensils,
  FaSnowflake,
  FaUmbrellaBeach,
  FaMountain,
  FaCity,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchBar: React.FC = () => {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [rating, setRating] = useState<number | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [locationType, setLocationType] = useState<string>("");
  const [where, setWhere] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
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
 useEffect(() => {
  const fetchSuggestions = async () => {
    if (where.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const res = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: {
          q: where,
          format: "json",
          addressdetails: 1,
          limit: 5,
        },
      });

      const places = res.data.map((place: any) => place.display_name);
      setSuggestions(places);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  const timeout = setTimeout(fetchSuggestions, 300); // debounce
  return () => clearTimeout(timeout);
}, [where]);
  const amenities = [
    { id: "wifi", name: "WiFi", icon: <FaWifi /> },
    { id: "pool", name: "Pool", icon: <FaSwimmingPool /> },
    { id: "parking", name: "Parking", icon: <FaParking /> },
    { id: "restaurant", name: "Restaurant", icon: <FaUtensils /> },
    { id: "ac", name: "AC", icon: <FaSnowflake /> },
  ];

  const locationTypes = [
    { id: "beach", name: "Beach", icon: <FaUmbrellaBeach /> },
    { id: "mountain", name: "Mountain", icon: <FaMountain /> },
    { id: "city", name: "City", icon: <FaCity /> },
  ];

  const handleAmenityToggle = (amenityId: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId)
        ? prev.filter((id) => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const handleSearch = () => {
    console.log("Search with filters:", {
      where,
      checkIn,
      checkOut,
      guests,
      priceRange,
      rating,
      selectedAmenities,
      locationType,
    });
  };

  const clearFilters = () => {
    setPriceRange({ min: "", max: "" });
    setRating(null);
    setSelectedAmenities([]);
    setLocationType("");
    setWhere("");
    setCheckIn(null);
    setCheckOut(null);
    setGuests(1);
  };

  const hasActiveFilters =
    priceRange.min ||
    priceRange.max ||
    rating ||
    selectedAmenities.length > 0 ||
    locationType;

  return (
    <section 
      className="search-container" 
      style={{ marginTop: "100px", padding: "0 20px" }}
      role="search"
      aria-labelledby="search-heading"
    >
      <h2 id="search-heading" className="sr-only">
        Search for places and accommodations
      </h2>
      
      {/* Main Search Bar */}
      <div className="d-flex justify-content-center mb-4">
        <form
          className={`p-4 rounded-4 shadow-lg ${darkMode ? 'bg-dark text-light' : 'bg-white'}`}
          style={{ 
            maxWidth: "1000px", 
            width: "100%",
            border: `2px solid ${darkMode ? '#fad700' : '#45526e'}`,
            transition: "all 0.3s ease",
            backgroundColor: darkMode ? '#2d3748' : '#fff'
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          role="search"
          aria-label="Main search form"
        >
          <Row className="w-100 align-items-end g-3">
            {/* Where Input */}
            <Col xs={12} sm={6} md={3}>
              <Form.Label 
                className={`fw-bold mb-2 ${darkMode ? 'text-light' : 'text-muted'}`}
                htmlFor="search-location"
              >
                Where
              </Form.Label>
              <div style={{ position: "relative" }}>
           <Form.Control
  id="search-location"
  type="text"
  placeholder="Search places"
  className={`border-0 p-3 rounded-3 ${darkMode ? 'bg-secondary text-light' : ''}`}
  value={where}
  onChange={(e) => setWhere(e.target.value)}
  onFocus={() => setShowSuggestions(true)}
  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
  style={{ 
    fontSize: "0.95rem",
    backgroundColor: darkMode ? '#374151' : '#fff',
    color: darkMode ? '#fff' : '#000',
    border: darkMode ? '1px solid #4b5563' : '1px solid #ddd'
  }}
  aria-describedby="location-help"
  aria-expanded={showSuggestions && suggestions.length > 0}
  aria-haspopup="listbox"
  aria-autocomplete="list"
/>
<div id="location-help" className="sr-only">
  Type to search for locations. Use arrow keys to navigate suggestions.
</div>

{/* Suggestions Dropdown */}
{showSuggestions && suggestions.length > 0 && (
  <ul
    role="listbox"
    aria-label="Location suggestions"
    style={{
      position: "absolute",
      backgroundColor: darkMode ? '#374151' : '#fff',
      border: `1px solid ${darkMode ? '#4b5563' : '#ccc'}`,
      borderRadius: "4px",
      zIndex: 1000,
      marginTop: "4px",
      width: "100%",
      maxHeight: "150px",
      overflowY: "auto",
      listStyle: "none",
      padding: 0,
      margin: 0,
      color: darkMode ? '#fff' : '#000'
    }}
  >
    {suggestions.map((suggestion, index) => (
      <li
        key={index}
        role="option"
        aria-selected="false"
        onMouseDown={() => {
          setWhere(suggestion);
          setShowSuggestions(false);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setWhere(suggestion);
            setShowSuggestions(false);
          }
        }}
        style={{
          padding: "8px 12px",
          cursor: "pointer",
          borderBottom: `1px solid ${darkMode ? '#4b5563' : '#eee'}`,
          backgroundColor: darkMode ? '#374151' : '#fff',
          color: darkMode ? '#fff' : '#000'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = darkMode ? '#4b5563' : '#f8f9fa';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = darkMode ? '#374151' : '#fff';
        }}
        tabIndex={0}
      >
        {suggestion}
      </li>
    ))}
  </ul>
)} </div>

            </Col>

            {/* Check In */}
            <Col xs={6} sm={3} md={2}>
              <Form.Label 
                className={`fw-bold mb-2 ${darkMode ? 'text-light' : 'text-dark'}`}
                htmlFor="check-in-date"
              >
                Check in
              </Form.Label>
              <DatePicker
                id="check-in-date"
                selected={checkIn}
                onChange={(date) => setCheckIn(date)}
                placeholderText="Add dates"
                className="border-0 w-100 p-3 rounded-3"
                aria-label="Select check-in date"
              />
            </Col>

            {/* Check Out */}
            <Col xs={6} sm={3} md={2}>
              <Form.Label 
                className={`fw-bold mb-2 ${darkMode ? 'text-light' : 'text-dark'}`}
                htmlFor="check-out-date"
              >
                Check out
              </Form.Label>
              <DatePicker
                id="check-out-date"
                selected={checkOut}
                onChange={(date) => setCheckOut(date)}
                placeholderText="Add dates"
                className="border-0 w-100 p-3 rounded-3"
                aria-label="Select check-out date"
              />
            </Col>

            {/* Guests */}
            <Col xs={12} sm={6} md={3}>
              <Form.Label 
                className={`fw-bold mb-2 ${darkMode ? 'text-light' : 'text-dark'}`}
                htmlFor="guests-select"
              >
                Guests
              </Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  id="guests-select"
                  variant="light"
                  className="border-0 w-100 text-muted p-3 text-start rounded-3"
                  style={{ fontSize: "0.95rem" }}
                  aria-label={`${guests} ${guests === 1 ? "Guest" : "Guests"} selected`}
                >
                  {guests} {guests === 1 ? "Guest" : "Guests"}
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100" role="listbox">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <Dropdown.Item
                      key={`guest-${num}`}
                      onClick={() => setGuests(num)}
                      role="option"
                      aria-selected={guests === num}
                    >
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>

            {/* Advanced Filters Toggle */}
            <Col xs={6} sm={3} md={1}>
              <Form.Label className="fw-bold text-dark mb-2 d-block text-center">
                Filters
              </Form.Label>
              <div className="d-flex justify-content-center">
                <Button
                  variant={hasActiveFilters ? "primary" : "outline-secondary"}
                  className="rounded-circle d-flex align-items-center justify-content-center position-relative"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  style={{ 
                    width: "45px", 
                    height: "45px",
                    transition: "all 0.3s ease"
                  }}
                  aria-label={`${showAdvancedFilters ? 'Hide' : 'Show'} advanced filters`}
                  aria-expanded={showAdvancedFilters}
                  aria-controls="advanced-filters"
                  type="button"
                >
                  <FaFilter size={16} aria-hidden="true" />
                  {hasActiveFilters && (
                    <Badge 
                      bg="danger" 
                      className="position-absolute top-0 start-100 translate-middle"
                      style={{ 
                        fontSize: "0.6rem", 
                        transform: "translate(-50%, -50%)",
                        minWidth: "18px",
                        height: "18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                      aria-label={`${[
                        priceRange.min,
                        priceRange.max,
                        rating,
                        selectedAmenities.length,
                        locationType,
                      ].filter(Boolean).length} active filters`}
                    >
                      {
                        [
                          priceRange.min,
                          priceRange.max,
                          rating,
                          selectedAmenities.length,
                          locationType,
                        ].filter(Boolean).length
                      }
                    </Badge>
                  )}
                </Button>
              </div>
            </Col>

            {/* Search Button */}
            <Col xs={6} sm={3} md={1}>
              <Form.Label className="fw-bold text-dark mb-2 d-block text-center">
                Search
              </Form.Label>
              <div className="d-flex justify-content-center">
                <Button
                  type="submit"
                  variant="danger"
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: "#45526e",
                    border: "none",
                    transition: "all 0.3s ease",
                    width: "45px",
                    height: "45px",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#2c3e50")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#45526e")
                  }
                  aria-label="Search for places"
                >
                  <FaSearch size={18} className="text-white" aria-hidden="true" />
                </Button>
              </div>
            </Col>
          </Row>
        </form>
      </div>

      {/* Advanced Filters Section */}
      {showAdvancedFilters && (
        <div className="d-flex justify-content-center mb-4">
          <section
            id="advanced-filters"
            className={`p-4 rounded-4 shadow-lg w-100 ${darkMode ? 'bg-dark text-light' : 'bg-white'}`}
            style={{ 
              maxWidth: "1000px", 
              border: `2px solid ${darkMode ? '#fad700' : '#45526e'}`,
              animation: "slideDown 0.3s ease-out",
              backgroundColor: darkMode ? '#2d3748' : '#fff'
            }}
            aria-label="Advanced search filters"
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className={`mb-0 fw-bold ${darkMode ? 'text-light' : 'text-dark'}`}>
                <FaFilter className="me-2" />
                Advanced Filters
              </h6>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={clearFilters}
                className="d-flex align-items-center gap-2"
                style={{ fontSize: "0.85rem" }}
              >
                <FaTimes />
                Clear All
              </Button>
            </div>

            <Row className="g-4">
              {/* Price Range */}
              <Col xs={12} sm={6} md={3}>
                <Form.Label className="fw-bold text-dark mb-3">Price Range (₹)</Form.Label>
                <Row className="g-2">
                  <Col xs={6}>
                    <Form.Control
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          min: e.target.value,
                        }))
                      }
                      className="rounded-3 p-2"
                    />
                  </Col>
                  <Col xs={6}>
                    <Form.Control
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          max: e.target.value,
                        }))
                      }
                      className="rounded-3 p-2"
                    />
                  </Col>
                </Row>
              </Col>

              {/* Rating */}
              <Col xs={12} sm={6} md={3}>
                <Form.Label className="fw-bold text-dark mb-3">Rating</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle 
                    variant="light" 
                    className="w-100 text-start rounded-3 border p-2"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {rating ? (
                      <span className="d-flex align-items-center gap-2">
                        <FaStar className="text-warning" />
                        {rating}+ Stars
                      </span>
                    ) : (
                      "Select Rating"
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-100">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <Dropdown.Item
                        key={`rating-${star}`}
                        onClick={() => setRating(star)}
                        className="d-flex align-items-center gap-2"
                      >
                        <FaStar className="text-warning" />
                        {star}+ Stars
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>

              {/* Location Type */}
              <Col xs={12} sm={6} md={3}>
                <Form.Label className="fw-bold text-dark mb-3">Location Type</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle 
                    variant="light" 
                    className="w-100 text-start rounded-3 border p-2"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {locationType ? (
                      <span className="d-flex align-items-center gap-2">
                        {locationTypes.find((lt) => lt.id === locationType)?.icon}
                        {locationTypes.find((lt) => lt.id === locationType)?.name}
                      </span>
                    ) : (
                      "Select Type"
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-100">
                    {locationTypes.map((type) => (
                      <Dropdown.Item
                        key={`type-${type.id}`}
                        onClick={() => setLocationType(type.id)}
                        className="d-flex align-items-center gap-2"
                      >
                        {type.icon}
                        {type.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>

              {/* Amenities */}
              <Col xs={12} sm={6} md={3}>
                <Form.Label className="fw-bold text-dark mb-3">Amenities</Form.Label>
                <div className="d-flex flex-wrap gap-2">
                  {amenities.map((amenity) => (
                    <Button
                      key={amenity.id}
                      variant={
                        selectedAmenities.includes(amenity.id)
                          ? "primary"
                          : "outline-secondary"
                      }
                      size="sm"
                      onClick={() => handleAmenityToggle(amenity.id)}
                      className="d-flex align-items-center gap-1 rounded-3"
                      style={{ 
                        fontSize: "0.8rem",
                        transition: "all 0.2s ease"
                      }}
                    >
                      {amenity.icon}
                      <span className="d-none d-sm-inline">{amenity.name}</span>
                    </Button>
                  ))}
                </div>
              </Col>
            </Row>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-top">
                <h6 className={`fw-bold mb-3 ${darkMode ? 'text-light' : 'text-dark'}`}>
                  <FaFilter className="me-2" />
                  Active Filters:
                </h6>
                <div className="d-flex flex-wrap gap-2">
                  {priceRange.min && (
                    <Badge
                      bg="info"
                      className="d-flex align-items-center gap-2 px-3 py-2"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Min: ₹{priceRange.min}
                      <FaTimes
                        size={12}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          setPriceRange((prev) => ({ ...prev, min: "" }))
                        }
                      />
                    </Badge>
                  )}
                  {priceRange.max && (
                    <Badge
                      bg="info"
                      className="d-flex align-items-center gap-2 px-3 py-2"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Max: ₹{priceRange.max}
                      <FaTimes
                        size={12}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          setPriceRange((prev) => ({ ...prev, max: "" }))
                        }
                      />
                    </Badge>
                  )}
                  {rating && (
                    <Badge
                      bg="warning"
                      className="d-flex align-items-center gap-2 px-3 py-2"
                      style={{ fontSize: "0.8rem" }}
                    >
                      <FaStar />
                      {rating}+ Stars
                      <FaTimes
                        size={12}
                        style={{ cursor: "pointer" }}
                        onClick={() => setRating(null)}
                      />
                    </Badge>
                  )}
                  {locationType && (
                    <Badge
                      bg="success"
                      className="d-flex align-items-center gap-2 px-3 py-2"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {locationTypes.find((lt) => lt.id === locationType)?.icon}
                      {locationTypes.find((lt) => lt.id === locationType)?.name}
                      <FaTimes
                        size={12}
                        style={{ cursor: "pointer" }}
                        onClick={() => setLocationType("")}
                      />
                    </Badge>
                  )}
                  {selectedAmenities.map((amenityId) => (
                    <Badge
                      key={amenityId}
                      bg="secondary"
                      className="d-flex align-items-center gap-2 px-3 py-2"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {amenities.find((a) => a.id === amenityId)?.icon}
                      {amenities.find((a) => a.id === amenityId)?.name}
                      <FaTimes
                        size={12}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleAmenityToggle(amenityId)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      <style>{`
        /* Screen reader only class for accessibility */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* Focus management for better keyboard navigation */
        .form-control:focus,
        .btn:focus,
        .dropdown-toggle:focus {
          outline: 2px solid #FAD700;
          outline-offset: 2px;
          box-shadow: 0 0 0 0.2rem rgba(250, 215, 0, 0.25);
        }

        /* Minimum touch target size for mobile accessibility */
        .btn {
          min-height: 44px;
          min-width: 44px;
        }

        /* Dark mode styles */
        body.dark-mode .search-container .form-control {
          background-color: #374151 !important;
          border-color: #4b5563 !important;
          color: #fff !important;
        }
        
        body.dark-mode .search-container .form-control::placeholder {
          color: #9ca3af !important;
        }
        
        body.dark-mode .search-container .dropdown-menu {
          background-color: #374151 !important;
          border-color: #4b5563 !important;
        }
        
        body.dark-mode .search-container .dropdown-item {
          color: #fff !important;
        }
        
        body.dark-mode .search-container .dropdown-item:hover {
          background-color: #4b5563 !important;
        }
        
        body.dark-mode .search-container .react-datepicker-wrapper input {
          background-color: #374151 !important;
          border-color: #4b5563 !important;
          color: #fff !important;
        }
        
        body.dark-mode .search-container .dropdown-toggle {
          background-color: #374151 !important;
          border-color: #4b5563 !important;
          color: #fff !important;
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .bg-white {
            background: #fff !important;
            border: 2px solid #000 !important;
          }
          .text-muted {
            color: #000 !important;
          }
          body.dark-mode .search-container form {
            background: #000 !important;
            border: 2px solid #fff !important;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .search-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        @media (max-width: 768px) {
          .search-container {
            padding: 0 15px;
          }
        }
        
        @media (max-width: 576px) {
          .search-container {
            padding: 0 10px;
          }
        }
      `}</style>
    </section>
  );
};

export default SearchBar;
