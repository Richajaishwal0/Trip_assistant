import { FaUser } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admin.css"; // Custom styles
import "bootstrap-icons/font/bootstrap-icons.css";
import PropertyForm from "./Add"; // Import the PropertyForm component
import axios from "axios";
import { handleError } from "../../utils/errorHandlerToast";

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard"); // State to track active content
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [properties, setProperties] = useState<any[]>([]); // Store fetched properties

  useEffect(() => {
    fetchProperties();
  }, []);

  const apiBaseUrl = import.meta.env?.VITE_API_BASE_URL || "http://localhost:5000";
  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/api/properties/read`); //changed the api to '/properties/read'
      setProperties(response.data);
    } catch (error) {
      handleError(error, "Error occured while fetching properties.")
    }
  };

  // Handle modal open/close
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Function to render the content dynamically
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <h2>Welcome to Dashboard</h2>
            <div className="Operations">
              <div className="Insert oper" onClick={handleOpen}>
                <h5>Add</h5>
              </div>
              <div className="Update oper">
                <h5>Update</h5>
              </div>
              <div className="Delete oper">
                <h5>Delete</h5>
              </div>
            </div>

            {/* Display Properties Dynamically */}
            <div className="property-list mt-4">
              <h3>Properties</h3>
              <div className="row">
                {properties.map((property) => (
                  <div key={property.property_id} className="col-md-4 mb-3">
                    <div className="card">
                      <img
                        src={`${apiBaseUrl}${property.images.split(",")[0]}`}
                        alt="Property"
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{property.title}</h5>
                        <p className="card-text">{property.location}</p>
                        <p className="card-text">
                          <strong>Price:</strong> ${property.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      case "bookings":
        return <h2>Manage your Bookings here.</h2>;
      case "reviews":
        return <h2>View and manage Reviews.</h2>;
      case "payments":
        return <h2>Handle Payments and Transactions.</h2>;
      case "complaints":
        return <h2>Resolve Customer Complaints.</h2>;
      default:
        return <h2>Welcome to the Admin Dashboard!</h2>;
    }
  };

  return (
    <div className="admin-page">
      <button
        className="toggle-btn d-md-none"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <i className="bi bi-list"></i>
      </button>

      <div className="d-flex">
        <nav className={`sidebar ${sidebarOpen ? "active" : ""}`}>
          <div className="sidebar-header">
            <FaUser /> <h2>Admin</h2>
          </div>
          <ul className="nav flex-column">
            <li className="nav-item">
              <button className="nav-link" onClick={() => setActiveTab("dashboard")}>
                <i className="bi bi-house"></i> Dashboard
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => setActiveTab("bookings")}>
                <i className="bi bi-book"></i> Bookings
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => setActiveTab("reviews")}>
                <i className="bi bi-star"></i> Reviews
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => setActiveTab("payments")}>
                <i className="bi bi-cash"></i> Payments
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => setActiveTab("complaints")}>
                <i className="bi bi-exclamation-circle"></i> Complaints
              </button>
            </li>
          </ul>
        </nav>

        <div className="content p-4">{renderContent()}</div>
      </div>

      <PropertyForm show={showModal} handleClose={handleClose} refreshProperties={fetchProperties} />
    </div>
  );
};

export default Dashboard;
