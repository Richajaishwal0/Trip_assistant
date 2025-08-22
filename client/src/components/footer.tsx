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
    <div className="my-5">
      <footer
        className="text-start text-white"
        style={{
          background: "#111827", // unified dark background
          color: "#d1d5db",
          width: "100%",
          padding: "2rem",
          borderTop: "1px solid #374151",
        }}
      >
        <div className="container p-4 pb-0">
          <section>
            <div className="row">
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3 text-start">
                <h6
                  className="text-uppercase mb-4 font-weight-bold"
                  style={{
                    color: "#fff",
                    fontSize: "1.3rem",
                    letterSpacing: "1px",
                  }}
                >
                  Trip Planner
                </h6>
                <p>
                  🌟 Discover the ultimate <strong>Trip Planner</strong>, your
                  one-stop solution for seamless travel experiences!
                </p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3 text-start">
                <h6
                  className="text-uppercase mb-4 font-weight-bold"
                  style={{ color: "#fff" }}
                >
                  Countries
                </h6>
                <p><a href="#" className="text-gray-300 text-decoration-none">India</a></p>
                <p><a href="#" className="text-gray-300 text-decoration-none">Nepal</a></p>
                <p><a href="#" className="text-gray-300 text-decoration-none">Bangladesh</a></p>
                <p><a href="#" className="text-gray-300 text-decoration-none">China</a></p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3 text-start">
                <h6
                  className="text-uppercase mb-4 font-weight-bold"
                  style={{ color: "#fff" }}
                >
                  Most Visited Places
                </h6>
                <p><a href="#" className="text-gray-300 text-decoration-none">Delhi</a></p>
                <p><a href="#" className="text-gray-300 text-decoration-none">Agra</a></p>
                <p><a href="#" className="text-gray-300 text-decoration-none">Kathmandu</a></p>
                <p><a href="#" className="text-gray-300 text-decoration-none">Pokhara</a></p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3 text-start">
                <h6 className="text-uppercase mb-4 font-weight-bold" style={{ color: "#fff" }}>
                  Contact
                </h6>
                <p><FaHome className="me-2" /> Tamilnadu, India</p>
                <p><FaEnvelope className="me-2" /> T_M@gmail.com</p>
                <p><FaPhone className="me-2" /> +91 01 234 567 88</p>
                <p><FaPrint className="me-2" /> +91 01 234 567 89</p>
              </div>
            </div>
          </section>

          <hr className="my-3" style={{ borderColor: "#374151" }} />

          <section className="p-3 pt-0">
            <div className="row d-flex align-items-center">
              <div className="col-md-7 col-lg-8 text-start">
                <div className="p-3">
                  © {new Date().getFullYear()} Trip Planner. All rights reserved.
                </div>
              </div>
              <div className="col-md-5 col-lg-4 text-start">
                <a href="#" className="btn m-1 text-white" style={{ background: "#374151" }}>
                  <FaFacebookF size={16} />
                </a>
                <a href="#" className="btn m-1 text-white" style={{ background: "#374151" }}>
                  <FaTwitter size={16} />
                </a>
                <a href="#" className="btn m-1 text-white" style={{ background: "#374151" }}>
                  <FaGoogle size={16} />
                </a>
                <a href="#" className="btn m-1 text-white" style={{ background: "#374151" }}>
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
