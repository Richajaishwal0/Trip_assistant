import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaChartLine,
  FaEdit,
  FaSave,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import { showError, showSuccess } from "../utils/toastUtils";

interface UserData {
  _id?: string;
  user_name?: string;
  email?: string;
  mobile_no?: string;
  activityCount?: number;
}

export default function UserProfile() {
  const [user, setUser] = useState<UserData>({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserData>({});
  const [loading, setLoading] = useState(false);

  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // Dark mode observer
  useEffect(() => {
    const checkDark = () =>
      setDarkMode(document.body.classList.contains("dark-mode"));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    axios
      .get("http://localhost:5000/api/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.user.user);
        const userData = response.data.user.user;
        setUser(userData);
        setEditedUser({
          user_name: userData.user_name,
          email: userData.email,
          mobile_no: userData.mobile_no,
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        showError("Error while fetching user data.");
      });
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser({ ...user });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser({ ...user });
  };

  // Function to handle saving changes (update user details)
  const handleSave = async () => {
    setLoading(true);
    const updatedUser = {
      userName: editedUser.user_name,
      email: editedUser.email,
      mobileNo: editedUser.mobile_no,
    };
    try {
      const token = localStorage.getItem("auth_token");
      const response = await axios.patch(
        "http://localhost:5000/api/users/update",
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(editedUser);

      setIsEditing(false);
      showSuccess(response?.data?.message || "Profile updated successfully!");
    } catch (error: any) {
      console.log(error);
      showError(error?.response?.data?.errors?.[0].split(":")[1] || "Error while updating profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof UserData, value: string | number) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div
      className={`d-flex align-items-center justify-content-center min-vh-100 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
      style={{
        background: darkMode 
          ? "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)"
          : "linear-gradient(135deg, #f6f9fc 0%, #eef2f7 100%)",
        padding: "10px"
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <div
              className={`card overflow-hidden ${
                darkMode ? "text-light border border-white" : "bg-white"
              }`}
              style={{
                borderRadius: "24px",
                boxShadow: darkMode 
                  ? "0 20px 60px rgba(15, 23, 42, 0.4)"
                  : "0 20px 60px rgba(0,0,0,0.15)",
                backdropFilter: "blur(20px)",
                background: darkMode 
                  ? "rgba(15, 23, 42, 0.95)"
                  : "rgba(255, 255, 255, 0.95)",
                maxHeight: "90vh"
              }}
            >
              {/* Compact Header */}
              <div
                className="card-header text-center py-3 position-relative overflow-hidden border-0"
                style={{
                  background: darkMode
                    ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
                    : "linear-gradient(135deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
                  minHeight: "140px"
                }}
              >
                <div 
                  className="position-absolute w-100 h-100" 
                  style={{
                    top: 0,
                    left: 0,
                    background: "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)",
                  }}
                />
                <div className="position-relative d-flex flex-column align-items-center justify-content-center h-100">
                  <div 
                    className="rounded-circle p-2 d-flex justify-content-center align-items-center mb-2"
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      backdropFilter: "blur(10px)",
                      width: "70px",
                      height: "70px",
                      border: "2px solid rgba(255,255,255,0.3)"
                    }}
                  >
                    <FaUserCircle size={45} className="text-white" />
                  </div>
                  <h3 className="mb-1 fw-bold text-white">User Profile</h3>
                  <p className="mb-0 text-white-50 small">
                    Manage your account information
                  </p>
                </div>
              </div>

              {/* Compact Body */}
              <div className="card-body p-4">
                <div className="row g-3">
                  {/* Username */}
                  <div className="col-12">
                    <div
                      className="p-3 rounded-3 position-relative overflow-hidden"
                      style={{
                        background: darkMode 
                          ? "linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(30, 41, 59, 0.3) 100%)"
                          : "linear-gradient(135deg, rgba(241, 245, 249, 0.8) 0%, rgba(241, 245, 249, 0.4) 100%)",
                        border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)'}`,
                        transition: "all 0.3s ease"
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <div 
                          className="rounded-circle p-2 me-3 d-flex align-items-center justify-content-center"
                          style={{
                            background: darkMode 
                              ? "rgba(59, 130, 246, 0.2)"
                              : "rgba(59, 130, 246, 0.15)",
                            width: "40px",
                            height: "40px"
                          }}
                        >
                          <FaUser
                            style={{ color: darkMode ? "#60a5fa" : "#3b82f6" }}
                            size={16}
                          />
                        </div>
                        <div className="flex-grow-1">
                          <label className="form-label mb-1 fw-semibold text-muted small">
                            Username
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              className="form-control border-0 p-0 bg-transparent"
                              style={{
                                fontSize: "1.1rem",
                                fontWeight: "500",
                                color: darkMode ? "#f8fafc" : "#1e293b",
                                boxShadow: "none"
                              }}
                              value={editedUser.user_name || ""}
                              onChange={(e) =>
                                handleInputChange("user_name", e.target.value)
                              }
                              placeholder="Enter username"
                            />
                          ) : (
                            <div
                              style={{
                                fontSize: "1.1rem",
                                fontWeight: "500",
                                color: darkMode ? "#f8fafc" : "#1e293b"
                              }}
                            >
                              {user.user_name || "Not provided"}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-12">
                    <div
                      className="p-3 rounded-3 position-relative overflow-hidden"
                      style={{
                        background: darkMode 
                          ? "linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(30, 41, 59, 0.3) 100%)"
                          : "linear-gradient(135deg, rgba(241, 245, 249, 0.8) 0%, rgba(241, 245, 249, 0.4) 100%)",
                        border: `1px solid ${darkMode ? 'rgba(14, 165, 233, 0.2)' : 'rgba(14, 165, 233, 0.1)'}`,
                        transition: "all 0.3s ease"
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <div 
                          className="rounded-circle p-2 me-3 d-flex align-items-center justify-content-center"
                          style={{
                            background: darkMode 
                              ? "rgba(14, 165, 233, 0.2)"
                              : "rgba(14, 165, 233, 0.15)",
                            width: "40px",
                            height: "40px"
                          }}
                        >
                          <FaEnvelope
                            style={{ color: darkMode ? "#0ea5e9" : "#0284c7" }}
                            size={16}
                          />
                        </div>
                        <div className="flex-grow-1">
                          <label className="form-label mb-1 fw-semibold text-muted small">
                            Email Address
                          </label>
                          {isEditing ? (
                            <input
                              type="email"
                              className="form-control border-0 p-0 bg-transparent"
                              style={{
                                fontSize: "1.1rem",
                                fontWeight: "500",
                                color: darkMode ? "#f8fafc" : "#1e293b",
                                boxShadow: "none"
                              }}
                              value={editedUser.email || ""}
                              onChange={(e) =>
                                handleInputChange("email", e.target.value)
                              }
                              placeholder="Enter email address"
                            />
                          ) : (
                            <div
                              style={{
                                fontSize: "1.1rem",
                                fontWeight: "500",
                                color: darkMode ? "#f8fafc" : "#1e293b"
                              }}
                            >
                              {user.email || "Not provided"}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile & Activity Count Row */}
                  <div className="col-md-6">
                    <div
                      className="p-3 rounded-3 h-100"
                      style={{
                        background: darkMode 
                          ? "linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(30, 41, 59, 0.3) 100%)"
                          : "linear-gradient(135deg, rgba(241, 245, 249, 0.8) 0%, rgba(241, 245, 249, 0.4) 100%)",
                        border: `1px solid ${darkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)'}`,
                        transition: "all 0.3s ease"
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <div 
                          className="rounded-circle p-2 me-3 d-flex align-items-center justify-content-center"
                          style={{
                            background: darkMode 
                              ? "rgba(16, 185, 129, 0.2)"
                              : "rgba(16, 185, 129, 0.15)",
                            width: "40px",
                            height: "40px"
                          }}
                        >
                          <FaPhone
                            style={{ color: darkMode ? "#10b981" : "#059669" }}
                            size={16}
                          />
                        </div>
                        <div className="flex-grow-1">
                          <label className="form-label mb-1 fw-semibold text-muted small">
                            Mobile Number
                          </label>
                          {isEditing ? (
                            <input
                              type="tel"
                              className="form-control border-0 p-0 bg-transparent"
                              style={{
                                fontSize: "1.1rem",
                                fontWeight: "500",
                                color: darkMode ? "#f8fafc" : "#1e293b",
                                boxShadow: "none"
                              }}
                              value={editedUser.mobile_no || ""}
                              onChange={(e) =>
                                handleInputChange("mobile_no", e.target.value)
                              }
                              placeholder="Enter mobile number"
                            />
                          ) : (
                            <div
                              style={{
                                fontSize: "1.1rem",
                                fontWeight: "500",
                                color: darkMode ? "#f8fafc" : "#1e293b"
                              }}
                            >
                              {user.mobile_no || "Not provided"}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div
                      className="p-3 rounded-3 h-100"
                      style={{
                        background: darkMode 
                          ? "linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(30, 41, 59, 0.3) 100%)"
                          : "linear-gradient(135deg, rgba(241, 245, 249, 0.8) 0%, rgba(241, 245, 249, 0.4) 100%)",
                        border: `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.1)'}`,
                        transition: "all 0.3s ease"
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <div 
                          className="rounded-circle p-2 me-3 d-flex align-items-center justify-content-center"
                          style={{
                            background: darkMode 
                              ? "rgba(168, 85, 247, 0.2)"
                              : "rgba(168, 85, 247, 0.15)",
                            width: "40px",
                            height: "40px"
                          }}
                        >
                          <FaChartLine
                            style={{ color: darkMode ? "#a855f7" : "#7c3aed" }}
                            size={16}
                          />
                        </div>
                        <div className="flex-grow-1">
                          <label className="form-label mb-1 fw-semibold text-muted small">
                            Activity Count
                          </label>
                          <div className="d-flex align-items-center">
                            <span
                              className="badge rounded-pill px-3 py-1"
                              style={{
                                background: darkMode 
                                  ? "linear-gradient(45deg, #3b82f6, #8b5cf6)"
                                  : "linear-gradient(45deg, #2563eb, #7c3aed)",
                                color: "#ffffff",
                                fontSize: "0.9rem",
                                fontWeight: "600"
                              }}
                            >
                              {user.activityCount || 0} Activities
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 d-flex justify-content-center gap-3">
                  {!isEditing ? (
                    <button
                      className="btn btn-lg px-5 py-2 rounded-pill d-flex align-items-center"
                      style={{
                        background: darkMode 
                          ? "linear-gradient(45deg, #3b82f6, #8b5cf6)"
                          : "linear-gradient(45deg, #2563eb, #7c3aed)",
                        color: "#ffffff",
                        border: "none",
                        transition: "all 0.3s ease",
                        boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
                        fontWeight: "600"
                      }}
                      onClick={handleEdit}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 12px 30px rgba(59, 130, 246, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 8px 25px rgba(59, 130, 246, 0.3)";
                      }}
                    >
                      <FaEdit className="me-2" size={18} />
                      <span>Edit Profile</span>
                    </button>
                  ) : (
                    <>
                      <button
                        className="btn btn-lg px-4 py-2 rounded-pill d-flex align-items-center"
                        style={{
                          background: darkMode 
                            ? "linear-gradient(45deg, #059669, #10b981)"
                            : "linear-gradient(45deg, #16a34a, #22c55e)",
                          color: "#ffffff",
                          border: "none",
                          transition: "all 0.3s ease",
                          boxShadow: "0 8px 25px rgba(34, 197, 94, 0.3)",
                          fontWeight: "600"
                        }}
                        onClick={handleSave}
                        disabled={loading}
                        onMouseEnter={(e) => {
                          if (!loading) {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 12px 30px rgba(34, 197, 94, 0.4)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!loading) {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 8px 25px rgba(34, 197, 94, 0.3)";
                          }
                        }}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                              style={{ width: "16px", height: "16px" }}
                            ></span>
                            Saving...
                          </>
                        ) : (
                          <>
                            <FaSave className="me-2" size={16} />
                            Save Changes
                          </>
                        )}
                      </button>
                      <button
                        className="btn btn-lg px-4 py-2 rounded-pill d-flex align-items-center"
                        style={{
                          background: "transparent",
                          color: darkMode ? "#f8fafc" : "#64748b",
                          border: `2px solid ${darkMode ? "#64748b" : "#cbd5e1"}`,
                          transition: "all 0.3s ease",
                          fontWeight: "600"
                        }}
                        onClick={handleCancel}
                        disabled={loading}
                        onMouseEnter={(e) => {
                          if (!loading) {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.borderColor = darkMode ? "#f8fafc" : "#64748b";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!loading) {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.borderColor = darkMode ? "#64748b" : "#cbd5e1";
                          }
                        }}
                      >
                        <FaTimes className="me-2" size={16} />
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}