import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaHome,
  FaEnvelope,
  FaPhone,
  FaPrint,
  FaHeadset,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <div>
      <footer
        className="text-start text-white"
        style={{
          background:
            "linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          width: "100%",
          position: "absolute",
          borderRadius: "20px 20px 0 0",
        }}
      >
        <div className="container p-4 pb-0">
          <section>
            <div className="row">
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3 text-start">
                <h6
                  className="text-uppercase mb-4 font-weight-bold"
                  style={{
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    fontSize: "1.3rem",
                    letterSpacing: "1px",
                  }}
                >
                  Tripp
                </h6>
                <p>
                  🌟Discover the ultimate <strong>Trip Planner </strong> your
                  one-stop solution for seamless travel experiences!
                  Effortlessly create personalized itineraries, find the best
                  destinations, book accommodations, and explore must-visit
                  attractions.
                </p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3 text-start">
                <h6
                  className="text-uppercase mb-4 font-weight-bold"
                  style={{
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    fontSize: "1.1rem",
                    letterSpacing: "0.5px",
                  }}
                >
                  Countries
                </h6>
                <p>
                  <a
                    href="#"
                    className="text-white"
                    style={{
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "6px",
                      display: "inline-block",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = "#FFD700";
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.transform = "translateX(5px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    India
                  </a>
                </p>
                <p>
                  <a
                    href="#"
                    className="text-white"
                    style={{
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "6px",
                      display: "inline-block",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = "#FFD700";
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.transform = "translateX(5px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    Nepal
                  </a>
                </p>
                <p>
                  <a
                    href="#"
                    className="text-white"
                    style={{
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "6px",
                      display: "inline-block",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = "#FFD700";
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.transform = "translateX(5px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    Bangladesh
                  </a>
                </p>
                <p>
                  <a
                    href="#"
                    className="text-white"
                    style={{
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "6px",
                      display: "inline-block",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = "#FFD700";
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.transform = "translateX(5px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    China
                  </a>
                </p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3 text-start">
                <h6
                  className="text-uppercase mb-4 font-weight-bold"
                  style={{
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    fontSize: "1.1rem",
                    letterSpacing: "0.5px",
                  }}
                >
                  Most Visited Places
                </h6>
                <p>
                  <a
                    href="#"
                    className="text-white"
                    style={{
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "6px",
                      display: "inline-block",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = "#FFD700";
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.transform = "translateX(5px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    Delhi
                  </a>
                </p>
                <p>
                  <a
                    href="#"
                    className="text-white"
                    style={{
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "6px",
                      display: "inline-block",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = "#FFD700";
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.transform = "translateX(5px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    Agra
                  </a>
                </p>
                <p>
                  <a
                    href="#"
                    className="text-white"
                    style={{
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "6px",
                      display: "inline-block",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = "#FFD700";
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.transform = "translateX(5px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    Kathmandu
                  </a>
                </p>
                <p>
                  <a
                    href="#"
                    className="text-white"
                    style={{
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "6px",
                      display: "inline-block",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = "#FFD700";
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.transform = "translateX(5px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    Pokhara
                  </a>
                </p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3 text-start">
    <h6
        className="text-uppercase mb-4 font-weight-bold"
        style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            fontSize: "1.1rem",
            letterSpacing: "0.5px",
        }}
    >
        Contact
    </h6>

    {/* Added transition and hover effect classes to each paragraph */}
    <p className="flex gap-2 transition-transform duration-300 transform hover:scale-105">
        <FaHome />
        Tamilnadu, India
    </p>
    <p className="flex gap-2 transition-transform duration-300 transform hover:scale-105">
        <FaEnvelope />
        T_M@gmail.com
    </p>
    <p className="flex gap-2 transition-transform duration-300 transform hover:scale-105">
        <FaPhone /> +91 01 234 567 88
    </p>
    <p className="flex gap-2 transition-transform duration-300 transform hover:scale-105">
        <FaPrint /> +91 01 234 567 89
    </p>

    {/* Added transition and hover effect classes to the Link */}
    <Link
        to="/help"
        className="flex gap-2 text-white text-decoration-none text-lg transition-transform duration-300 transform hover:scale-105"
    >
        <FaHeadset size={22} />
        Help Center
    </Link>
</div>
            </div>
          </section>

          <hr className="my-3" />

          <section className="p-3 pt-0">
            <div className="row d-flex align-items-center">
              <div className="col-md-7 col-lg-8 text-start">
                <div className="p-3">
                  © 2024 Copyright:{" "}
                  <a
                    href="#"
                    className="text-white"
                    style={{
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "6px",
                      display: "inline-block",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = "#FFD700";
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.transform = "translateX(5px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    PlanTrip.com
                  </a>
                </div>
              </div>
              <div className="col-md-5 col-lg-4 text-start">
                <a
                  href="https://facebook.com/"
                  target="_blank"
                  className="btn m-1 text-white"
                  role="button"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "12px",
                    padding: "0.6rem 0.8rem",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)";
                    e.currentTarget.style.color = "#000";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 20px rgba(255, 215, 0, 0.4)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(0, 0, 0, 0.2)";
                  }}
                >
                  <FaFacebookF size={16} />
                </a>
                <a
                  href="https://x.com/"
                  target="_blank"
                  className="btn m-1 text-white"
                  role="button"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "12px",
                    padding: "0.6rem 0.8rem",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)";
                    e.currentTarget.style.color = "#000";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 20px rgba(255, 215, 0, 0.4)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(0, 0, 0, 0.2)";
                  }}
                >
                  <FaTwitter size={16} />
                </a>
                <a
                  href="https://google.com/"
                  target="_blank"
                  className="btn m-1 text-white"
                  role="button"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "12px",
                    padding: "0.6rem 0.8rem",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)";
                    e.currentTarget.style.color = "#000";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 20px rgba(255, 215, 0, 0.4)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(0, 0, 0, 0.2)";
                  }}
                >
                  <FaGoogle size={16} />
                </a>
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  className="btn m-1 text-white"
                  role="button"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "12px",
                    padding: "0.6rem 0.8rem",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)";
                    e.currentTarget.style.color = "#000";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 20px rgba(255, 215, 0, 0.4)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(0, 0, 0, 0.2)";
                  }}
                >
                  <FaInstagram size={16} />
                </a>
              </div>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
