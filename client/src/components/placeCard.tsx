import React from "react";
import "./placeCard.css";
import { useState } from "react";
import WeatherCard from "./WeatherCard";
import { FaMapMarkerAlt, FaStar, FaCloudSun } from "react-icons/fa"; // added icon
import { FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const PlaceCard: React.FC = () => {
  const [darkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
  interface RatingStarsProps {
    rating: number;
  }
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

  const places = [
    {
      id: 1,
      name: "Taj Mahal, Agra, India",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIMq0Utl9O-TUtLMs4xn6n1q0jyqAYN0YB3w&s",
      location: "Agra, Uttar Pradesh, India",
      mapLink: "https://www.google.com/maps?q=Taj+Mahal,+Agra,+India",
      price: "₹1,100 for foreign tourists; ₹50 for Indian tourists",
      rating: "4.9/5",
    },
    {
      id: 2,
      name: "Hawa Mahal, Jaipur, India",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Hawa_Mahal%2C_Jaipur%2C_India.jpg/1200px-Hawa_Mahal%2C_Jaipur%2C_India.jpg?20061207162736",
      location: "Jaipur, Rajasthan, India",
      mapLink: "https://www.google.com/maps?q=Hawa+Mahal,+Jaipur,+India",
      price: "₹200 for foreign tourists; ₹50 for Indian tourists",
      rating: "4.5/5.0",
    },
    {
      id: 3,
      name: "Backwaters, Kerala, India",
      image:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjDYok_vkBswf-Ml0Bp7wijTSMZx2I-Y5j1gdOAybazBJA74Tud1rLRq5EZebMXkzu2QIfe2U6QKt0uxpLmEHFNko6gLE-XWiiHvDBZZCl85XqbCfeovoMd_3W5AKr3jOKDWHb-TkHqzcM/s640/Alleppy+backwaters+kerala-1.jpg",
      location: "Alleppey, Kerala, India",
      mapLink: "https://www.google.com/maps/place/Alleppey,+Kerala,+India",
      price: "Houseboat rentals starting from ₹7,000 per night",
      rating: "4.8/5",
    },
    {
      id: 4,
      name: "Beaches, Goa, India",
      image:
        "https://deih43ym53wif.cloudfront.net/large_palolem-beach-south-goa-india-shutterstock_565871314_10f6f1c9f7.jpeg",
      location: "Goa, India",
      mapLink: "https://www.google.com/maps/place/Goa,+India",
      price: "Free public access; water sports priced individually",
      rating: "4.7/5",
    },
    {
      id: 5,
      name: "Qutub Minar, Delhi, India",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Qutub_Minar_with_other_Monuments_13.jpg/640px-Qutub_Minar_with_other_Monuments_13.jpg",
      location: "Delhi, India",
      mapLink: "https://www.google.com/maps/place/Qutub+Minar,+Delhi,+India",
      price: "₹600 for foreign tourists; ₹40 for Indian tourists",
      rating: "4.6/5",
    },
    {
      id: 6,
      name: "Gateway of India, Mumbai, India",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0fcqjYesT9zhmYJVw4nbQD_7WVK1gFSvdxg&s",
      location: "Mumbai, Maharashtra, India",
      mapLink:
        "https://www.google.com/maps/place/Gateway+of+India,+Mumbai,+Maharashtra,+India",
      price: "Free public access",
      rating: "4.4/5",
    },
    {
      id: 7,
      name: "Victoria Memorial, Kolkata, India",
      image:
        "https://indiano.travel/wp-content/uploads/2022/02/Victoria-Memorial-1.webp",
      location: "Kolkata, West Bengal, India",
      mapLink:
        "https://www.google.com/maps/place/Victoria+Memorial,+Kolkata,+West+Bengal,+India",
      price: "₹500 for foreign tourists; ₹30 for Indian tourists",
      rating: "4.5/5",
    },
    {
      id: 8,
      name: "Lake Pichola, Udaipur, India",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnQ60ScbK0RArTXZ_85aQAV2sKfpc-0bEKog&s",
      location: "Udaipur, Rajasthan, India",
      mapLink:
        "https://www.google.com/maps/place/Lake+Pichola,+Udaipur,+Rajasthan,+India",
      price: "Boat rides starting from ₹400 per person",
      rating: "4.7/5",
    },
    {
      id: 9,
      name: "Mysore Palace, Mysore, India",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Mysore_Palace_Front_view.jpg/1200px-Mysore_Palace_Front_view.jpg",
      location: "Mysore, Karnataka, India",
      mapLink:
        "https://www.google.com/maps/place/Mysore+Palace,+Mysore,+Karnataka,+India",
      price: "₹200 for foreign tourists; ₹70 for Indian tourists",
      rating: "4.6/5",
    },
    {
      id: 10,
      name: "Ghats of Varanasi, Varanasi, India",
      image:
        "https://static.toiimg.com/thumb/width-600,height-400,msid-107570888.cms",
      location: "Varanasi, Uttar Pradesh, India",
      mapLink:
        "https://www.google.com/maps/place/Varanasi+Ghats,+Varanasi,+Uttar+Pradesh,+India",
      price: "Free public access; boat rides priced individually",
      rating: "4.8/5",
    },
    {
      id: 11,
      name: "Shimla, Himachal Pradesh, India",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Longwood_%28Shimla%29.jpg/640px-Longwood_%28Shimla%29.jpg",
      location: "Shimla, Himachal Pradesh, India",
      mapLink: "https://www.google.com/maps/place/Amber+Fort,+Jaipur,+India",
      price: "₹500 for foreign tourists; ₹100 for Indian tourists",
      rating: "4.7/5",
    },
    {
      id: 12,
      name: "Shanti Stupa, Ladakh",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Shanti_Stupa_-Leh_-Jammu_and_Kashmir_-IMG001.jpg/640px-Shanti_Stupa_-Leh_-Jammu_and_Kashmir_-IMG001.jpg",
      location: "Shanti Stupa, Ladakh",
      mapLink: "https://www.google.com/maps/place/Charminar,+Hyderabad,+India",
      price: "₹250 for foreign tourists; ₹25 for Indian tourists",
      rating: "4.6/5",
    },
  ];

  return (
    <main className="place bg-black" role="main">
      <div
        className={
          darkMode ? "places-container bg-dark text-light" : "places-container"
        }
      >
        <h1
          className={darkMode ? "title bg-dark text-light" : "title"}
          id="places-heading"
        >
          Our Top Rated Tours and Adventures
        </h1>
        <section
          className={
            darkMode ? "places-grid bg-dark text-light" : "places-grid"
          }
          aria-labelledby="places-heading"
          role="region"
        >
          {places.map((place) => (
            <article
              key={place.id}
              className="place-card"
              role="article"
              aria-labelledby={`place-title-${place.id}`}
              tabIndex={0}
            >
              <a
                href="/agra"
                aria-label={`View details for ${place.name}`}
                tabIndex={0}
              >
                <img
                  src={place.image}
                  alt={`Beautiful view of ${place.name}, showing the main attraction in ${place.location}`}
                  className="place-image"
                  loading="lazy"
                />
              </a>
              <div className="place-info">
                <h3 id={`place-title-${place.id}`}>
                  {place.location}{" "}
                  <a
                    href={place.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${place.location} on map (opens in new tab)`}
                    title={`View ${place.location} on map`}
                    tabIndex={0}
                  >
                    <FaMapMarkerAlt
                      className="map-icon"
                      aria-hidden="true"
                      role="img"
                    />
                  </a>
                </h3>
                <p className="price" aria-label={`Price: ${place.price}`}>
                  {place.price}
                </p>
                <p
                  className="rating"
                  aria-label={`Rating: ${place.rating} stars`}
                >
                  <RatingStars rating={parseFloat(place.rating)} />

                  <span className="sr-only">Rating: </span>
                  {place.rating}
                </p>

                <button
                  onClick={() =>
                    setSelectedPlaceId(
                      selectedPlaceId === place.id ? null : place.id
                    )
                  }
                  className="weather-btn"
                  aria-expanded={selectedPlaceId === place.id}
                  aria-controls={`weather-info-${place.id}`}
                  aria-label={
                    selectedPlaceId === place.id
                      ? `Hide weather information for ${place.location}`
                      : `Show weather information for ${place.location}`
                  }
                  type="button"
                >
                  <FaCloudSun
                    style={{ marginRight: "6px" }}
                    aria-hidden="true"
                  />
                  {selectedPlaceId === place.id
                    ? "Hide Weather"
                    : "Show Weather"}
                </button>

                {selectedPlaceId === place.id && (
                  <div
                    id={`weather-info-${place.id}`}
                    aria-live="polite"
                    role="region"
                    aria-label={`Weather information for ${place.location}`}
                  >
                    <WeatherCard city={place.location} />
                  </div>
                )}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default PlaceCard;
