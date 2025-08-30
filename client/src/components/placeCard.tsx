import React from "react";
import "./placeCard.css";
import { useState } from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

const PlaceCard: React.FC = () => {
  const [darkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [beachCarouselIndex, setBeachCarouselIndex] = useState(0);
  const [resortCarouselIndex, setResortCarouselIndex] = useState(0);

  const places = [
    {
      id: 1,
      name: "Taj Mahal, Agra, India",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIMq0Utl9O-TUtLMs4xn6n1q0jyqAYN0YB3w&s",
      location: "Agra, Uttar Pradesh, India",
      mapLink: "https://www.google.com/maps?q=Taj+Mahal,+Agra,+India",
      price: "₹1,100 for foreign tourists; ₹50 for Indian tourists",
      rating: "4.9/5",
    },
    {
      id: 2,
      name: "Hawa Mahal, Jaipur, India",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Hawa_Mahal%2C_Jaipur%2C_India.jpg/1200px-Hawa_Mahal%2C_Jaipur%2C_India.jpg?20061207162736",
      location: "Jaipur, Rajasthan, India",
      mapLink: "https://www.google.com/maps?q=Hawa+Mahal,+Jaipur,+India",
      price: "₹200 for foreign tourists; ₹50 for Indian tourists",
      rating: "4.5/5.0",
    },
    {
      id: 3,
      name: "Backwaters, Kerala, India",
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjDYok_vkBswf-Ml0Bp7wijTSMZx2I-Y5j1gdOAybazBJA74Tud1rLRq5EZebMXkzu2QIfe2U6QKt0uxpLmEHFNko6gLE-XWiiHvDBZZCl85XqbCfeovoMd_3W5AKr3jOKDWHb-TkHqzcM/s640/Alleppy+backwaters+kerala-1.jpg",
      location: "Alleppey, Kerala, India",
      mapLink: "https://www.google.com/maps/place/Alleppey,+Kerala,+India",
      price: "Houseboat rentals starting from ₹7,000 per night",
      rating: "4.8/5",
    },
    {
      id: 4,
      name: "Beaches, Goa, India",
      image: "https://deih43ym53wif.cloudfront.net/large_palolem-beach-south-goa-india-shutterstock_565871314_10f6f1c9f7.jpeg",
      location: "Goa, India",
      mapLink: "https://www.google.com/maps/place/Goa,+India",
      price: "Free public access; water sports priced individually",
      rating: "4.7/5",
    },
    {
      id: 5,
      name: "Qutub Minar, Delhi, India",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Qutub_Minar_with_other_Monuments_13.jpg/640px-Qutub_Minar_with_other_Monuments_13.jpg",
      location: "Delhi, India",
      mapLink: "https://www.google.com/maps/place/Qutub+Minar,+Delhi,+India",
      price: "₹600 for foreign tourists; ₹40 for Indian tourists",
      rating: "4.6/5",
    },
    {
      id: 6,
      name: "Gateway of India, Mumbai, India",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0fcqjYesT9zhmYJVw4nbQD_7WVK1gFSvdxg&s",
      location: "Mumbai, Maharashtra, India",
      mapLink: "https://www.google.com/maps/place/Gateway+of+India,+Mumbai,+Maharashtra,+India",
      price: "Free public access",
      rating: "4.4/5",
    },
    {
      id: 7,
      name: "Victoria Memorial, Kolkata, India",
      image: "https://indiano.travel/wp-content/uploads/2022/02/Victoria-Memorial-1.webp",
      location: "Kolkata, West Bengal, India",
      mapLink: "https://www.google.com/maps/place/Victoria+Memorial,+Kolkata,+West+Bengal,+India",
      price: "₹500 for foreign tourists; ₹30 for Indian tourists",
      rating: "4.5/5",
    },
    {
      id: 8,
      name: "Lake Pichola, Udaipur, India",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnQ60ScbK0RArTXZ_85aQAV2sKfpc-0bEKog&s",
      location: "Udaipur, Rajasthan, India",
      mapLink: "https://www.google.com/maps/place/Lake+Pichola,+Udaipur,+Rajasthan,+India",
      price: "Boat rides starting from ₹400 per person",
      rating: "4.7/5",
    },
    {
      id: 9,
      name: "Mysore Palace, Mysore, India",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Mysore_Palace_Front_view.jpg/1200px-Mysore_Palace_Front_view.jpg",
      location: "Mysore, Karnataka, India",
      mapLink: "https://www.google.com/maps/place/Mysore+Palace,+Mysore,+Karnataka,+India",
      price: "₹200 for foreign tourists; ₹70 for Indian tourists",
      rating: "4.6/5",
    },
    {
      id: 10,
      name: "Ghats of Varanasi, Varanasi, India",
      image: "https://static.toiimg.com/thumb/width-600,height-400,msid-107570888.cms",
      location: "Varanasi, Uttar Pradesh, India",
      mapLink: "https://www.google.com/maps/place/Varanasi+Ghats,+Varanasi,+Uttar+Pradesh,+India",
      price: "Free public access; boat rides priced individually",
      rating: "4.8/5",
    },
    {
      id: 11,
      name: "Shimla, Himachal Pradesh, India",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Longwood_%28Shimla%29.jpg/640px-Longwood_%28Shimla%29.jpg",
      location: "Shimla, Himachal Pradesh, India",
      mapLink: "https://www.google.com/maps/place/Amber+Fort,+Jaipur,+India",
      price: "₹500 for foreign tourists; ₹100 for Indian tourists",
      rating: "4.7/5",
    },
    {
      id: 12,
      name: "Shanti Stupa, Ladakh",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Shanti_Stupa_-Leh_-Jammu_and_Kashmir_-IMG001.jpg/640px-Shanti_Stupa_-Leh_-Jammu_and_Kashmir_-IMG001.jpg",
      location: "Shanti Stupa, Ladakh",
      mapLink: "https://www.google.com/maps/place/Charminar,+Hyderabad,+India",
      price: "₹250 for foreign tourists; ₹25 for Indian tourists",
      rating: "4.6/5",
    },
  ]

  const beaches = [
    {
      id: 13,
      name: "Radhanagar Beach, Andaman",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop",
      location: "Havelock Island, Andaman",
      mapLink: "https://www.google.com/maps/place/Radhanagar+Beach,+Andaman",
      price: "Free access; ferry ₹1,500 return",
      rating: "4.9/5",
    },
    {
      id: 14,
      name: "Varkala Beach, Kerala",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
      location: "Varkala, Kerala",
      mapLink: "https://www.google.com/maps/place/Varkala+Beach,+Kerala",
      price: "Free access; cliff-top dining available",
      rating: "4.7/5",
    },
    {
      id: 15,
      name: "Palolem Beach, Goa",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&h=300&fit=crop",
      location: "South Goa",
      mapLink: "https://www.google.com/maps/place/Palolem+Beach,+Goa",
      price: "Free access; beach shacks available",
      rating: "4.8/5",
    },
    {
      id: 16,
      name: "Marina Beach, Chennai",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
      location: "Chennai, Tamil Nadu",
      mapLink: "https://www.google.com/maps/place/Marina+Beach,+Chennai",
      price: "Free access; street food available",
      rating: "4.5/5",
    },
    {
      id: 17,
      name: "Kovalam Beach, Kerala",
      image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=500&h=300&fit=crop",
      location: "Kovalam, Kerala",
      mapLink: "https://www.google.com/maps/place/Kovalam+Beach,+Kerala",
      price: "Free access; ayurvedic spas nearby",
      rating: "4.6/5",
    },
    {
      id: 18,
      name: "Juhu Beach, Mumbai",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
      location: "Mumbai, Maharashtra",
      mapLink: "https://www.google.com/maps/place/Juhu+Beach,+Mumbai",
      price: "Free access; street food paradise",
      rating: "4.3/5",
    }
  ]

  const resorts = [
    {
      id: 19,
      name: "Taj Lake Palace, Udaipur",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop",
      location: "Udaipur, Rajasthan",
      mapLink: "https://www.google.com/maps/place/Taj+Lake+Palace,+Udaipur",
      price: "₹45,000+ per night",
      rating: "4.9/5",
    },
    {
      id: 20,
      name: "Oberoi Udaivilas, Udaipur",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&h=300&fit=crop",
      location: "Udaipur, Rajasthan",
      mapLink: "https://www.google.com/maps/place/Oberoi+Udaivilas,+Udaipur",
      price: "₹55,000+ per night",
      rating: "4.8/5",
    },
    {
      id: 21,
      name: "Leela Goa Beach Resort",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&h=300&fit=crop",
      location: "South Goa",
      mapLink: "https://www.google.com/maps/place/Leela+Goa+Beach+Resort",
      price: "₹25,000+ per night",
      rating: "4.7/5",
    },
    {
      id: 22,
      name: "Wildflower Hall, Shimla",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
      location: "Shimla, Himachal Pradesh",
      mapLink: "https://www.google.com/maps/place/Wildflower+Hall,+Shimla",
      price: "₹35,000+ per night",
      rating: "4.8/5",
    },
    {
      id: 23,
      name: "Kumarakom Lake Resort",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
      location: "Kumarakom, Kerala",
      mapLink: "https://www.google.com/maps/place/Kumarakom+Lake+Resort",
      price: "₹20,000+ per night",
      rating: "4.6/5",
    },
    {
      id: 24,
      name: "Rambagh Palace, Jaipur",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&h=300&fit=crop",
      location: "Jaipur, Rajasthan",
      mapLink: "https://www.google.com/maps/place/Rambagh+Palace,+Jaipur",
      price: "₹30,000+ per night",
      rating: "4.7/5",
    }
  ]

  // Carousel auto-scroll
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % places.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [places.length]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setBeachCarouselIndex((prev) => (prev + 1) % beaches.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [beaches.length]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setResortCarouselIndex((prev) => (prev + 1) % resorts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [resorts.length]);



  return (
    <main className="place bg-black" role="main">
      <div className={darkMode ? "places-container bg-dark text-light" : "places-container"}>
        <h1 className={darkMode ? "title bg-dark text-light" : "title"} id="places-heading">
          Our Top Rated Tours and Adventures
        </h1>
        
        <div className={darkMode ? "places-carousel bg-dark text-light" : "places-carousel"}>
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${carouselIndex * 320}px)`,
              transition: "transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)"
            }}
          >
            {places.concat(places).map((place, idx) => (
              <article
                key={idx + "-" + place.id}
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
                    {place.location} {" "}
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
                  <p className="rating" aria-label={`Rating: ${place.rating} stars`}>
                    <FaStar aria-hidden="true" />
                    <span className="sr-only">Rating: </span>
                    {place.rating}
                  </p>
                  <button className="view-details-btn">
                    View Details
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <h2 className={darkMode ? "section-title bg-dark text-light" : "section-title"}>Beach Destinations</h2>
        <div className={darkMode ? "places-carousel bg-dark text-light" : "places-carousel"}>
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${beachCarouselIndex * 320}px)`,
              transition: "transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)"
            }}
          >
            {beaches.concat(beaches).map((place, idx) => (
              <article
                key={idx + "-beach-" + place.id}
                className="place-card"
                role="article"
                aria-labelledby={`place-title-${place.id}`}
                tabIndex={0}
              >
                <a
                  href="/beach"
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
                    {place.location} {" "}
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
                  <p className="rating" aria-label={`Rating: ${place.rating} stars`}>
                    <FaStar aria-hidden="true" />
                    <span className="sr-only">Rating: </span>
                    {place.rating}
                  </p>
                  <button className="view-details-btn">
                    View Details
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <h2 className={darkMode ? "section-title bg-dark text-light" : "section-title"}>Luxury Resorts</h2>
        <div className={darkMode ? "places-carousel bg-dark text-light" : "places-carousel"}>
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${resortCarouselIndex * 320}px)`,
              transition: "transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)"
            }}
          >
            {resorts.concat(resorts).map((place, idx) => (
              <article
                key={idx + "-resort-" + place.id}
                className="place-card"
                role="article"
                aria-labelledby={`place-title-${place.id}`}
                tabIndex={0}
              >
                <a
                  href="/resort"
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
                    {place.location} {" "}
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
                  <p className="rating" aria-label={`Rating: ${place.rating} stars`}>
                    <FaStar aria-hidden="true" />
                    <span className="sr-only">Rating: </span>
                    {place.rating}
                  </p>
                  <button className="view-details-btn">
                    View Details
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PlaceCard;