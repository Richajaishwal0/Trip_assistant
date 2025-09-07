import Navigation from "../components/Navigation";
import { useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { handleError } from "../utils/errorHandlerToast";
import { showError, showSuccess } from "../utils/toastUtils";
import { isOnline } from "../utils/networkUtils";

function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [userName, setUserName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // --- Phone number validation (unchanged core logic) ---
  const validatePhoneNumber = (
    phone: string
  ): { isValid: boolean; error: string | null } => {
    const cleanPhone = phone.replace(/\D/g, "");
    if (!phone.trim()) {
      return { isValid: false, error: "Phone number is required" };
    }
    if (cleanPhone.length < 10) {
      return {
        isValid: false,
        error: "Phone number must be at least 10 digits",
      };
    }
    if (cleanPhone.length > 15) {
      return { isValid: false, error: "Phone number cannot exceed 15 digits" };
    }
    const phonePattern =
      /^(\+?\d{1,3}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    if (!phonePattern.test(phone)) {
      return {
        isValid: false,
        error: "Please enter a valid phone number format",
      };
    }
    return { isValid: true, error: null };
  };

  const handlePhoneChange = (value: string) => {
    setMobileNo(value);
    if (value.trim().length > 0) {
      const validation = validatePhoneNumber(value);
      setPhoneError(validation.error);
    } else {
      setPhoneError(null);
    }
  };

  // Respect navigation state toggle (unchanged)
  useEffect(() => {
    if (location.state?.isLogin !== undefined) {
      setIsLogin(location.state.isLogin);
    }
  }, [location]);

  // --- Submit handler (core logic intact) ---
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError(null);
    setPhoneError(null);

    if (!isLogin) {
      const phoneValidation = validatePhoneNumber(mobileNo);
      if (!phoneValidation.isValid) {
        setPhoneError(phoneValidation.error);
        showError(phoneValidation.error || "Please enter a valid phone number");
        return;
      }
    }

    if (!isLogin && password !== confirmPassword) {
      showError("Passwords do not match!");
      return;
    }

    if (!isOnline()) {
      setAuthError("No internet connection. Please check your network.");
      return;
    }

    const apiBaseUrl =
      import.meta.env?.VITE_API_BASE_URL || "http://localhost:5000";
    // ...existing code...
    const url = isLogin
      ? `${apiBaseUrl}/api/users/login`
      : `${apiBaseUrl}/api/users/signup`;
    // Fix payload structure to match server expectations
    const payload = isLogin
      ? { email, password }
      : { userName, email, password, mobileNo };
    // Check if server is reachable
    try {
      await fetch(`${apiBaseUrl}/api/users`, {
        method: "HEAD",
        signal: AbortSignal.timeout(5000),
      });
    } catch (serverError) {
      setAuthError(
        `Cannot connect to server at ${apiBaseUrl}. Please ensure the backend server is running on port 5000.`
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10000),
      });

      const data = await response.json();

      if (response.ok) {
        showSuccess(isLogin ? "Login Successful" : "Signup Successful");
        // ...existing code...
        // Fix response data access - server returns data.data.user.id
        const userId = data.data?.user?.id || data.user?.id || data.user_id;
        const user_name = data.data?.user?.user_name;

        if (userId) {
          localStorage.setItem("user_id", userId);
          localStorage.setItem("user_name", user_name);
        }
        // Store token if available
        const token = data.data?.token || data.token;
        if (token) {
          localStorage.setItem("auth_token", token);
        }
        navigate("/places");
      } else {
        // Fix error message extraction - server returns data.message
        let errorMsg =
          data.message ||
          data.data?.message ||
          "Authentication failed. Please check your credentials.";

        // Add helpful hints for common login issues
        if (!isLogin) {
          setAuthError(errorMsg);
        } else {
          if (errorMsg.includes("Invalid email or password")) {
            errorMsg = `Invalid credentials. Try demo account:\nEmail: test@example.com\nPassword: password123`;
          } else if (
            errorMsg.includes("User not found") ||
            response.status === 404
          ) {
            errorMsg = `Account not found. Use demo account:\nEmail: test@example.com\nPassword: password123`;
          }
          setAuthError(errorMsg);
        }

        if (isLogin && errorMsg.toLowerCase().includes("not registered")) {
          setTimeout(() => {
            navigate("/auth", { state: { isLogin: false } }); // switch to signup
          }, 2000); // give user time to see error toast
        }

        showError(errorMsg);
      }
    } catch (error) {
      let errorMsg = isLogin
        ? "Unable to log in at this time. Please try again later."
        : "Unable to create your account at this time. Please try again later.";

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          errorMsg =
            "Request timed out. Please check your internet connection and try again.";
        } else if (error.message.includes("fetch")) {
          errorMsg = `Cannot connect to server. Make sure the backend is running on ${apiBaseUrl}.\n\nFor demo, try:\nEmail: test@example.com\nPassword: password123`;
        }
      }

      console.error("Auth error:", error);
      console.log("API URL attempted:", url);
      console.log("Payload sent:", payload);

      setAuthError(errorMsg);
      handleError(error, errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navigation /> {/* ✅ Navbar will now appear at the top */}
      <main
        className="min-vh-100 d-flex justify-content-center align-items-center bg-image flex-grow-1"
        style={{
          backgroundImage: "url('src/images/bg-auth.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backdropFilter: "blur(6px)",
        }}
        role="main"
      >
        <div
          className="card p-4 pb-2 rounded-5 shadow-lg border-0 m-3 sm:m-0"
          style={{
            maxWidth: "420px",
            width: "100%",
            background: "rgba(255, 255, 255, 0.86)", // glassmorphism while keeping theme
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
          }}
          role="region"
          aria-labelledby="auth-heading"
        >
          <h1
            className="text-center mb-4 fw-bold"
            id="auth-heading"
            style={{
              color: "#d4527b",
              letterSpacing: "1px",
              fontSize: "2rem",
            }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </h1>

          <form onSubmit={handleSubmit} noValidate>
            {/* --- Username (Sign Up only) --- */}
            {!isLogin && (
              <div className="mb-3">
                <input
                  id="userName"
                  type="text"
                  className="form-control rounded-4 shadow-sm border-0 px-3 py-2"
                  style={{ transition: "all 0.3s ease-in-out" }}
                  placeholder="Enter your UserName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  aria-describedby={!isLogin ? "userName-help" : undefined}
                  aria-invalid={authError ? "true" : "false"}
                />
                {!isLogin && (
                  <div id="userName-help" className="form-text text-dark">
                    Choose a unique username for your account.
                  </div>
                )}
              </div>
            )}

            {/* --- Email --- */}
            <div className="mb-3">
              <input
                id="email"
                type="email"
                className="form-control rounded-4 shadow-sm border-0 px-3 py-2"
                style={{ transition: "all 0.3s ease-in-out" }}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-describedby="email-help"
                aria-invalid={authError ? "true" : "false"}
              />
              <div id="email-help" className="form-text text-muted small">
                We'll never share your email with anyone else.
              </div>
            </div>

            {/* --- Phone (Sign Up only) --- */}
            {!isLogin && (
              <div className="mb-3">
                <input
                  id="phone"
                  type="tel"
                  className={`form-control rounded-4 shadow-sm px-3 py-2 ${
                    phoneError
                      ? "is-invalid"
                      : mobileNo && !phoneError
                      ? "is-valid"
                      : "border-0"
                  }`}
                  style={{ transition: "all 0.3s ease-in-out" }}
                  placeholder="Enter your phone number (e.g., +1-234-567-8900)"
                  value={mobileNo}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  pattern="^(\+?\d{1,3}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$"
                  required
                  aria-describedby="phone-help phone-error"
                  aria-invalid={phoneError ? "true" : "false"}
                  maxLength={20}
                />
                <div id="phone-help" className="form-text text-muted small">
                  Enter with country code (e.g., +1-2XXXXX, +91 XXXXX)
                </div>
                {phoneError && (
                  <div
                    id="phone-error"
                    className="invalid-feedback d-block"
                    role="alert"
                  >
                    <span className="me-1" aria-hidden="true">
                      ⚠️
                    </span>
                    {phoneError}
                  </div>
                )}
                {!phoneError && mobileNo && (
                  <div className="valid-feedback d-block">
                    <span className="me-1" aria-hidden="true">
                      ✅
                    </span>
                    Phone number format looks good!
                  </div>
                )}
              </div>
            )}

            {/* --- Password --- */}
            <div className="mb-3">
              <input
                id="password"
                type="password"
                className="form-control rounded-4 shadow-sm border-0 px-3 py-2"
                style={{ transition: "all 0.3s ease-in-out" }}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-describedby="password-help"
                aria-invalid={authError ? "true" : "false"}
              />
              <div id="password-help" className="form-text text-muted small">
                {!isLogin
                  ? "Password must be at least 8 characters long."
                  : "Enter your account password."}
              </div>
            </div>

            {/* --- Confirm Password (Sign Up only) --- */}
            {!isLogin && (
              <div className="mb-3">
                <input
                  id="confirmPassword"
                  type="password"
                  className="form-control rounded-4 shadow-sm border-0 px-3 py-2"
                  style={{ transition: "all 0.3s ease-in-out" }}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  aria-describedby="confirmPassword-help"
                  aria-invalid={
                    authError ||
                    (password !== confirmPassword && !!confirmPassword)
                      ? "true"
                      : "false"
                  }
                />
                <div
                  id="confirmPassword-help"
                  className="form-text text-muted small"
                >
                  Re-enter your password to confirm.
                </div>
              </div>
            )}

            {/* --- Auth Error Alert --- */}
            {authError && (
              <div
                className="mb-3"
                role="alert"
                aria-live="polite"
                aria-atomic="true"
              >
                <div className="alert alert-danger d-flex align-items-center mb-0">
                  <div className="me-2" aria-hidden="true">
                    ⚠️
                  </div>
                  <div style={{ whiteSpace: "pre-line" }}>{authError}</div>
                </div>
              </div>
            )}

            {/* --- Submit --- */}
            <button
              type="submit"
              className="btn w-100 fw-bold py-2 rounded-4 mt-1"
              style={{
                background: "linear-gradient(135deg, #d3be52 0%, #d4527b 100%)",
                border: "none",
                boxShadow: "0 4px 10px rgba(212, 82, 123, 0.4)",
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              disabled={isSubmitting}
              aria-describedby="submit-help"
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {isLogin ? "Logging in..." : "Signing up..."}
                </>
              ) : isLogin ? (
                "Login"
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* --- Toggle Login/Signup --- */}
          <p className="mt-3 text-center mb-0">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              className="btn btn-link fw-bold p-0"
              style={{
                color: "#d4527b",
                textDecoration: "none",
                transition: "color 0.3s ease-in-out",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#a8385c")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#d4527b")}
              onClick={() => setIsLogin(!isLogin)}
              type="button"
              aria-label={
                isLogin ? "Switch to sign up form" : "Switch to login form"
              }
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </main>
    </>
  );
}

export default Auth;
