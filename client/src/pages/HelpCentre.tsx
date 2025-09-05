import React, { useState } from "react";
import {
  FaSearch,
  FaHeadset,
  FaEnvelope,
  FaMapMarkedAlt,
  FaCalendarCheck,
  FaCreditCard,
  FaUserCog,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";

const HelpCentre: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  return (
    <>
      <style>
        {`
          .custom-placeholder::placeholder {
            color: white;
            opacity: 1; /* Override browser default fading */
          }
        `}
      </style>

      <div
        className="min-vh-100"
        style={{
          background:
            'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%), url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80") no-repeat center center fixed',
          backgroundSize: "cover",
          paddingTop: "80px",
          paddingBottom: "50px",
        }}
      >
        <div className="container mt-4">
          {/* Hero Section */}
          <div className="text-center text-white mb-5">
            <h1
              className="display-4 fw-bold mb-4"
              style={{
                textShadow: "0 4px 4px rgba(0,0,0,0.3)",
              }}
            >
              Help Center
            </h1>
            <p
              className="text-xl mb-5"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
            >
              Find answers to your questions or contact support
            </p>

            {/* Search Bar */}
            <div className="row justify-content-center mb-5">
              <div className="col-md-6 col-lg-5">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control form-control-lg custom-placeholder text-white"
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1.5px solid rgba(255, 255, 255, 0.3)",
                      borderRadius: "25px",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                      paddingLeft: "50px",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#FFD700";
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.2)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 20px rgba(255, 215, 0, 0.3)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(255, 255, 255, 0.3)";
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 15px rgba(0, 0, 0, 0.2)";
                    }}
                  />
                  <FaSearch
                    className="position-absolute"
                    style={{
                      left: "20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Support Section */}
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8">
              <div
                className="text-center p-5 rounded-4"
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 8px 32px 0 rgba(0,0,0,0.3)",
                }}
              >
                <div className="mb-4">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-1"
                    style={{
                      width: "80px",
                      height: "80px",
                      background:
                        "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                      boxShadow: "0 4px 15px rgba(255, 215, 0, 0.4)",
                    }}
                  >
                    <FaHeadset className="fa-2x text-dark" size={32} />
                  </div>
                </div>
                <h2
                  className="h3 fw-semibold mb-3"
                  style={{
                    textShadow: "0 4px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  Contact Support
                </h2>
                <p
                  className="text-white mb-4"
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
                >
                  Need help with a specific issue? Contact our support team for
                  assistance.
                </p>
                <button
                  className="btn btn-lg d-flex mx-auto px-4 py-2"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "30px",
                    color: "#ffffff",
                    fontWeight: "bold",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                    transition: "all 0.3s ease",
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
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(0, 0, 0, 0.2)";
                  }}
                >
                  <FaEnvelope className="me-2" />
                  <span>Contact Support</span>
                </button>
              </div>
            </div>
          </div>

          {/* Help Topics Section */}
          <div className="mb-5 pt-2">
            <h2
              className="h1 text-white text-center mb-5"
              style={{
                textShadow: "0 4px 4px rgba(0,0,0,0.3)",
              }}
            >
              Common Help Topics
            </h2>

            <div className="row g-4">
              <HelpTopic
                icon="map"
                iconColor="linear-gradient(135deg, #28a745 0%, #20c997 100%)"
                title="Planning a Trip"
                desc="Learn how to create and customize your travel plans"
              />
              <HelpTopic
                icon="calendar"
                iconColor="linear-gradient(135deg, #17a2b8 0%, #6f42c1 100%)"
                title="Managing Your Bookings"
                desc="View, modify, or cancel your existing reservations"
              />
              <HelpTopic
                icon="credit"
                iconColor="linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)"
                title="Payment and Refunds"
                desc="Manage your payment methods and understand refund policies"
              />
              <HelpTopic
                icon="user"
                iconColor="linear-gradient(135deg, #dc3545 0%, #e83e8c 100%)"
                title="Account Settings"
                desc="Update your profile information and preferences"
              />
            </div>
          </div>

          {/* FAQ Section */}
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div
                className="p-5 rounded-4"
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 8px 32px 0 rgba(0,0,0,0.3)",
                }}
              >
                <h2
                  className="h3 fw-semibold text-center mb-5"
                  style={{
                    textShadow: "0 4px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  Frequently Asked Questions
                </h2>

                <div className="space-y-3">
                  <FAQItem
                    id="faq1"
                    question="How do I create a new booking?"
                    answer="You can create a new booking by navigating to our booking page and following the step-by-step process. Make sure you have all necessary travel details ready including dates, destinations, and traveler information."
                    isExpanded={expandedFaq === "faq1"}
                    onToggle={() => toggleFaq("faq1")}
                  />
                  <FAQItem
                    id="faq2"
                    question="What is your cancellation policy?"
                    answer="Our cancellation policy varies depending on the type of booking and timing. Generally, you can cancel up to 24 hours before your scheduled time for a full refund. Please check your booking confirmation for specific terms."
                    isExpanded={expandedFaq === "faq2"}
                    onToggle={() => toggleFaq("faq2")}
                  />
                  <FAQItem
                    id="faq3"
                    question="How can I modify my existing booking?"
                    answer="You can modify your booking by logging into your account and accessing the 'My Bookings' section. From there, you can make changes to dates, times, or other details. Some modifications may incur additional fees."
                    isExpanded={expandedFaq === "faq3"}
                    onToggle={() => toggleFaq("faq3")}
                  />
                  <FAQItem
                    id="faq4"
                    question="How do I contact customer support?"
                    answer="You can contact our customer support team through multiple channels: email us at T_M@gmail.com, call us at +91 01 234 567 88, or use the live chat feature available 24/7 on our website."
                    isExpanded={expandedFaq === "faq4"}
                    onToggle={() => toggleFaq("faq4")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface HelpTopicProps {
  icon: string;
  iconColor: string;
  title: string;
  desc: string;
}

const HelpTopic: React.FC<HelpTopicProps> = ({
  icon,
  iconColor,
  title,
  desc,
}) => (
  <div className="col-md-6 col-lg-3">
    <div
      className="h-100 p-4 rounded-4"
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 215, 0, 0.3)";
        e.currentTarget.style.border = "1px solid rgba(255, 215, 0, 0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
        e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
        e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.2)";
      }}
    >
      <div className="text-center">
        <div
          className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
          style={{
            width: "60px",
            height: "60px",
            background: iconColor,
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
          }}
        >
          {icon === "map" && (
            <FaMapMarkedAlt className="fa-lg text-white" size={24} />
          )}
          {icon === "calendar" && (
            <FaCalendarCheck className="fa-lg text-white" size={24} />
          )}
          {icon === "credit" && (
            <FaCreditCard className="fa-lg text-white" size={24} />
          )}
          {icon === "user" && (
            <FaUserCog className="fa-lg text-white" size={24} />
          )}
        </div>
        <h3
          className="h5 fw-bold mb-3"
          style={{
            color: "#ffffff",
            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
          }}
        >
          {title}
        </h3>
        <p
          className="mb-0 small"
          style={{
            color: "#ffffff",
            opacity: "0.9",
            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
          }}
        >
          {desc}
        </p>
      </div>
    </div>
  </div>
);

const FAQItem: React.FC<{
  id: string;
  question: string;
  answer: string;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ question, answer, isExpanded, onToggle }) => (
  <div
    className="mb-3 rounded-3 overflow-hidden"
    style={{
      background: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    }}
  >
    <button
      className="w-100 p-4 text-start border-0 fw-semibold d-flex justify-content-between align-items-center"
      style={{
        background: "transparent",
        color: "#ffffff",
        textShadow: "0 1px 2px rgba(0,0,0,0.3)",
        transition: "all 0.3s ease",
      }}
      onClick={onToggle}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <span>{question}</span>
      {isExpanded ? (
        <FaChevronUp className="ms-2" />
      ) : (
        <FaChevronDown className="ms-2" />
      )}
    </button>
    {isExpanded && (
      <div
        className="px-4 pb-4"
        style={{
          color: "#ffffff",
          opacity: "0.9",
          textShadow: "0 1px 2px rgba(0,0,0,0.3)",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {answer}
      </div>
    )}
  </div>
);

export default HelpCentre;
