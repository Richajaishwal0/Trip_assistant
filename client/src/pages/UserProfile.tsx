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
      .get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const userData = response.data.data.user;
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
      user_name: editedUser.user_name,
      email: editedUser.email,
      mobile_no: editedUser.mobile_no,
    };
    try {
      const token = localStorage.getItem("auth_token");
      const response = await axios.put(
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
      className={`min-vh-100 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
      style={{
        background: darkMode 
          ? "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)"
          : "linear-gradient(135deg, #f6f9fc 0%, #eef2f7 100%)"
      }}
    >
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div
              className={`card  overflow-hidden ${
                darkMode ? "text-light border border-white" : "bg-white"
              }`}
              style={{
                borderRadius: "20px",
                boxShadow: darkMode 
                  ? "0 10px 30px rgba(15, 23, 42, 0.3)"
                  : "0 10px 30px rgba(0,0,0,0.1)",
                backdropFilter: "blur(10px)",
                background: darkMode 
                  ? "rgba(15, 23, 42, 0.95)"
                  : "rgba(255, 255, 255, 0.95)"
              }}
            >
              {/* Header */}
              <div
                className="card-header text-center py-4 position-relative overflow-hidden border-0"
                style={{
                  background: darkMode
                    ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
                    : "linear-gradient(135deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
                }}
              >
                <div 
                  className="position-absolute w-100 h-100" 
                  style={{
                    top: 0,
                    left: 0,
                    background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%)",
                  }}
                />
                <div className="position-relative">
                  <div className="d-flex justify-content-center align-items-center mb-4">
                    <div 
                      className="rounded-circle p-2 d-flex justify-content-center align-items-center"
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        backdropFilter: "blur(5px)",
                        width: "90px",
                        height: "90px"
                      }}
                    >
                      <FaUserCircle size={60} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="mb-2 fw-bold text-white">User Profile</h2>
                    <p className="mb-0 text-white-50">
                      Manage your account information
                    </p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="card-body p-3">
                <div className="row g-3">
                  {/* Username */}
                  <div className="col-12">
                    <div
                      className={`p-3 rounded-3`}
                      style={{
                        background: darkMode 
                          ? "rgba(30, 41, 59, 0.5)"
                          : "rgba(241, 245, 249, 0.5)",
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <div className="d-flex align-items-center mb-3">
                        <div 
                          className="rounded-circle p-2 me-2 d-flex align-items-center justify-content-center"
                          style={{
                            background: darkMode 
                              ? "rgba(59, 130, 246, 0.15)"
                              : "rgba(59, 130, 246, 0.1)",
                            width: "36px",
                            height: "36px"
                          }}
                        >
                          <FaUser
                            className="text-blue-500"
                            style={{
                              color: darkMode ? "#60a5fa" : "#3b82f6"
                            }}
                            size={16}
                          />
                        </div>
                        <label className="form-label mb-0 fw-semibold fs-5">
                          Username
                        </label>
                      </div>
                      {isEditing ? (
                        <input
                          type="text"
                          className="form-control form-control-lg border-2 rounded-3"
                          style={{
                            background: darkMode ? "rgba(30, 41, 59, 0.7)" : "",
                            borderColor: darkMode ? "#60a5fa" : "#3b82f6",
                            color: darkMode ? "#f8fafc" : "inherit",
                            transition: "all 0.3s ease",
                            boxShadow: "none"
                          }}
                          value={editedUser.user_name || ""}
                          onChange={(e) =>
                            handleInputChange("user_name", e.target.value)
                          }
                          placeholder="Enter username"
                        />
                      ) : (
                        <p
                          className={`mb-0 fs-4 ${
                            darkMode ? "text-light" : "text-dark"
                          }`}
                          style={{ fontWeight: "500" }}
                        >
                          {user.user_name || "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-12">
                    <div
                      className={`p-4 rounded-4 ${
                        darkMode ? "bg-dark" : "bg-light"
                      }`}
                      style={{
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <div className="d-flex align-items-center mb-3">
                        <div 
                          className={`rounded-circle p-2 me-3 d-flex align-items-center justify-content-center ${
                            darkMode ? "bg-info bg-opacity-10" : "bg-primary bg-opacity-10"
                          }`}
                          style={{ width: "36px", height: "36px" }}
                        >
                          <FaEnvelope
                            className={`${
                              darkMode ? "text-info" : "text-primary"
                            }`}
                            size={16}
                          />
                        </div>
                        <label className="form-label mb-0 fw-semibold fs-5">
                          Email
                        </label>
                      </div>
                      {isEditing ? (
                        <input
                          type="email"
                          className={`form-control form-control-lg border-2 rounded-3 ${
                            darkMode
                              ? "bg-dark text-light border-info"
                              : "border-primary"
                          }`}
                          style={{
                            transition: "all 0.3s ease",
                            boxShadow: "none"
                          }}
                          value={editedUser.email || ""}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="Enter email address"
                        />
                      ) : (
                        <p
                          className={`mb-0 fs-4 ${
                            darkMode ? "text-light" : "text-dark"
                          }`}
                          style={{ fontWeight: "500" }}
                        >
                          {user.email || "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Mobile */}
                  <div className="col-12">
                    <div
                      className={`p-4 rounded-4 ${
                        darkMode ? "bg-dark" : "bg-light"
                      }`}
                      style={{
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <div className="d-flex align-items-center mb-3">
                        <div 
                          className={`rounded-circle p-2 me-3 d-flex align-items-center justify-content-center ${
                            darkMode ? "bg-info bg-opacity-10" : "bg-primary bg-opacity-10"
                          }`}
                          style={{ width: "36px", height: "36px" }}
                        >
                          <FaPhone
                            className={`${
                              darkMode ? "text-info" : "text-primary"
                            }`}
                            size={16}
                          />
                        </div>
                        <label className="form-label mb-0 fw-semibold fs-5">
                          Mobile Number
                        </label>
                      </div>
                      {isEditing ? (
                        <input
                          type="tel"
                          className={`form-control form-control-lg border-2 rounded-3 ${
                            darkMode
                              ? "bg-dark text-light border-info"
                              : "border-primary"
                          }`}
                          style={{
                            transition: "all 0.3s ease",
                            boxShadow: "none"
                          }}
                          value={editedUser.mobile_no || ""}
                          onChange={(e) =>
                            handleInputChange("mobile_no", e.target.value)
                          }
                          placeholder="Enter mobile number"
                        />
                      ) : (
                        <p
                          className={`mb-0 fs-4 ${
                            darkMode ? "text-light" : "text-dark"
                          }`}
                          style={{ fontWeight: "500" }}
                        >
                          {user.mobile_no || "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Activity Count */}
                  <div className="col-12">
                    <div
                      className={`p-4 rounded-4 ${
                        darkMode ? "bg-dark" : "bg-light"
                      }`}
                      style={{
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <div className="d-flex align-items-center mb-3">
                        <div 
                          className={`rounded-circle p-2 me-3 d-flex align-items-center justify-content-center ${
                            darkMode ? "bg-info bg-opacity-10" : "bg-primary bg-opacity-10"
                          }`}
                          style={{ width: "36px", height: "36px" }}
                        >
                          <FaChartLine
                            className={`${
                              darkMode ? "text-info" : "text-primary"
                            }`}
                            size={16}
                          />
                        </div>
                        <label className="form-label mb-0 fw-semibold fs-5">
                          Activity Count
                        </label>
                      </div>
                      <div className="d-flex align-items-center">
                        <span
                          className="badge fs-5 px-4 py-3 rounded-3"
                          style={{
                            background: darkMode ? "#3b82f6" : "#2563eb",
                            color: "#ffffff",
                            boxShadow: darkMode 
                              ? "0 4px 15px rgba(58, 191, 248, 0.2)"
                              : "0 4px 15px rgba(13, 110, 253, 0.2)"
                          }}
                        >
                          {user.activityCount || 0} Activities
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 d-flex justify-content-center gap-2">
                  {!isEditing ? (
                    <button
                      className="btn btn-lg px-4 py-2 rounded-3 d-flex align-items-center flex-row"
                      style={{
                      background: darkMode ? "#3b82f6" : "#2563eb",
                      color: "#ffffff",
                      border: "none",
                      transition: "all 0.3s ease",
                      transform: "translateY(0)",
                      boxShadow: darkMode 
                        ? "0 4px 15px rgba(58, 191, 248, 0.2)"
                        : "0 4px 15px rgba(13, 110, 253, 0.2)"
                      }}
                      onClick={handleEdit}
                      onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <FaEdit className="me-2" size={18} />
                      <span>Edit Profile</span>
                    </button>
                  ) : (
                    <>
                      <button
                        className="btn btn-lg px-4 py-2 rounded-3 d-flex align-items-center flex-row"
                        style={{
                          background: darkMode ? "#059669" : "#22c55e",
                          color: "#ffffff",
                          border: "none",
                          transition: "all 0.3s ease",
                          transform: "translateY(0)",
                          boxShadow: "0 4px 15px rgba(25, 135, 84, 0.2)"
                        }}
                        onClick={handleSave}
                        disabled={loading}
                        onMouseEnter={(e) => {
                          if (!loading) e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          if (!loading) e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Saving...
                          </>
                        ) : (
                          <>
                            <FaSave className="me-2" size={18} />
                            Save Changes
                          </>
                        )}
                      </button>
                      <button
                        className="btn btn-lg px-4 py-2 rounded-3 d-flex align-items-center flex-row"
                        style={{
                          background: "transparent",
                          color: darkMode ? "#f8fafc" : "#475569",
                          border: `2px solid ${darkMode ? "#f8fafc" : "#475569"}`,
                          transition: "all 0.3s ease",
                          transform: "translateY(0)"
                        }}
                        onClick={handleCancel}
                        disabled={loading}
                        onMouseEnter={(e) => {
                          if (!loading) e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          if (!loading) e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        <FaTimes className="me-2" size={18} />
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
