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
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer: React.FC = () => {
  return (
    <div className=" my-5">
      <footer
        className="text-start text-white"
        style={{
          backgroundColor: "#45526e",
          width: "100%",
          position: "absolute",
        }}
      >
        <div className="container p-4 pb-0">
          <section>
            <div className="row">
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3 text-start">
                <h6 className="text-uppercase mb-4 font-weight-bold">Tripp</h6>
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
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Countries
                </h6>
                <p>
                  <a href="#" className="text-white color-gold">
                    India
                  </a>
                </p>
                <p>
                  <a href="#" className="text-white color-gold">
                    Nepal
                  </a>
                </p>
                <p>
                  <a href="#" className="text-white color-gold">
                      Bangladesh
                  </a>
                </p>
                <p>
                  <a href="#" className="text-white color-gold">
                    China
                  </a>
                </p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3 text-start">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Most Visited Places
                </h6>
                <p>
                  <a href="#" className="text-white color-gold">
                    Delhi
                  </a>
                </p>
                <p>
                  <a href="#" className="text-white color-gold">
                    Agra
                  </a>
                </p>
                <p>
                  <a href="#" className="text-white color-gold">
                    Kathmandu
                  </a>
                </p>
                <p>
                  <a href="#" className="text-white color-gold">
                    Pokhara
                  </a>
                </p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3 text-start">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Contact
                </h6>
                <p>
                  <FaHome className="me-2 color-gold" />
                  Tamilnadu, India
                </p>
                <p>
                  <FaEnvelope className="me-2 color-gold" />
                  T_M@gmail.com
                </p>
                <p>
                  <FaPhone className="me-2 color-gold" /> +91 01 234 567 88
                </p>
                <p>
                  <FaPrint className="me-2 color-gold" /> +91 01 234 567 89
                </p>
              </div>
            </div>
          </section>

          <hr className="my-3" />

          <section className="p-3 pt-0">
            <div className="row d-flex align-items-center">
              <div className="col-md-7 col-lg-8 text-start">
                <div className="p-3">
                  © 2024 Copyright:{" "}
                  <a href="#" className="text-white color-gold">
                    PlanTrip.com
                  </a>
                </div>
              </div>
              <div className="col-md-5 col-lg-4 text-start">
                <a
                  href="#"
                  className="btn btn-outline-light btn-floating m-1 text-white social-icon"
                  role="button"
                >
                  <style>
                    {`
                        .color-gold:hover{
                        color:#FAD700 !important;
                        transition: 0.3s ease-in-out;
                        }
                        .social-icon:hover {
                            background-color: #FAD700 !important;
                            color: black !important;
                            transition: 0.3s ease-in-out;
                        }
                        `}
                  </style>
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="btn btn-outline-light btn-floating m-1 text-white social-icon"
                  role="button"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="btn btn-outline-light btn-floating m-1 text-white social-icon"
                  role="button"
                >
                  <FaGoogle />
                </a>
                <a
                  href="#"
                  className="btn btn-outline-light btn-floating m-1 text-white social-icon"
                  role="button"
                >
                  <FaInstagram />
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