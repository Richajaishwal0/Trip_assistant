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
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [userNameError, setUserNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Validation patterns from backend
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const userNamePattern = /^[a-zA-Z0-9\s]+$/;

  const validateUserName = (name: string): { isValid: boolean; error: string | null } => {
    if (!name.trim()) {
      return { isValid: false, error: "Username is required" };
    }
    if (name.length < 2) {
      return { isValid: false, error: "Username must be at least 2 characters long" };
    }
    if (name.length > 50) {
      return { isValid: false, error: "Username cannot exceed 50 characters" };
    }
    if (!userNamePattern.test(name)) {
      return { isValid: false, error: "Username can only contain letters, numbers, and spaces" };
    }
    return { isValid: true, error: null };
  };

  const validateEmail = (email: string): { isValid: boolean; error: string | null } => {
    if (!email.trim()) {
      return { isValid: false, error: "Email is required" };
    }
    if (!emailPattern.test(email)) {
      return { isValid: false, error: "Please provide a valid email address" };
    }
    return { isValid: true, error: null };
  };

  // Password validation pattern from backend
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validatePassword = (pass: string): { isValid: boolean; error: string | null } => {
    if (!pass) {
      return { isValid: false, error: "Password is required" };
    }
    if (pass.length < 8) {
      return { isValid: false, error: "Password must be at least 8 characters long" };
    }
    if (!passwordPattern.test(pass)) {
      return { 
        isValid: false, 
        error: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      };
    }
    return { isValid: true, error: null };
  };

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
    const phonePattern = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
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
    setEmailError(null);
    setUserNameError(null);

    // Validate email for both login and signup
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error);
      showError(emailValidation.error || "Please provide a valid email");
      return;
    }

    if (!isLogin) {
      // Validate username for signup
      const userNameValidation = validateUserName(userName);
      if (!userNameValidation.isValid) {
        setUserNameError(userNameValidation.error);
        showError(userNameValidation.error || "Please provide a valid username");
        return;
      }

      // Validate phone number
      const phoneValidation = validatePhoneNumber(mobileNo);
      if (!phoneValidation.isValid) {
        setPhoneError(phoneValidation.error);
        showError(phoneValidation.error || "Please enter a valid phone number");
        return;
      }
    }

    if (!isLogin) {
      // Validate password format
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        setPasswordError(passwordValidation.error);
        showError(passwordValidation.error || "Please check password requirements");
        return;
      }

      // Validate password match
      if (password !== confirmPassword) {
        showError("Passwords do not match!");
        return;
      }
    }

    if (!isOnline()) {
      setAuthError("No internet connection. Please check your network.");
      return;
    }

    const apiBaseUrl = import.meta.env?.VITE_API_BASE_URL || "http://localhost:5000";
// ...existing code...
    const url = isLogin ? `${apiBaseUrl}/api/users/login` : `${apiBaseUrl}/api/users/signup`;
    // Fix payload structure to match server expectations
    const payload = isLogin 
      ? { email, password }
      : { user_name: userName, email, password, mobile_no: mobileNo };
    // Check if server is reachable
    try {
      await fetch(`${apiBaseUrl}/api/users`, { 
        method: 'HEAD',
        signal: AbortSignal.timeout(5000)
      });
    } catch (serverError) {
      setAuthError(`Cannot connect to server at ${apiBaseUrl}. Please ensure the backend server is running on port 5000.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
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
        if (userId) {
          localStorage.setItem("user_id", userId);
        }
        // Store token if available
        const token = data.data?.token || data.token;
        if (token) {
          localStorage.setItem("auth_token", token);
        }
        navigate("/places");
      } else {
        // Fix error message extraction - server returns data.message
        let errorMsg = data.message || data.data?.message || "Authentication failed. Please check your credentials.";
        
        // Add helpful hints for common login issues
        if (!isLogin) {
          setAuthError(errorMsg);
        } else {
          if (errorMsg.includes("Invalid email or password")) {
            errorMsg = `Invalid credentials. Try demo account:\nEmail: test@example.com\nPassword: password123`;
          } else if (
            errorMsg.includes("User not found") || response.status === 404
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
          errorMsg = "Request timed out. Please check your internet connection and try again.";
        } else if (error.message.includes("fetch")) {
          errorMsg = `Cannot connect to server. Make sure the backend is running on ${apiBaseUrl}.\n\nFor demo, try:\nEmail: test@example.com\nPassword: password123`;
        }
      }
      
      console.error('Auth error:', error);
      console.log('API URL attempted:', url);
      console.log('Payload sent:', payload);
      
      setAuthError(errorMsg);
      handleError(error, errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

return (
  <>
    <Navigation />   {/* ✅ Navbar will now appear at the top */}
    <main
      className="min-vh-100 d-flex justify-content-center align-items-center bg-image flex-grow-1"
      style={{
        backgroundImage: "url('src/images/bg-auth.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(6px)",
        paddingTop: "80px", // Add padding to account for fixed header
        minHeight: "100vh",
        position: "relative",
      }}
      role="main"
    >

      <div
        className="card p-4 pb-2 rounded-5 shadow-lg border-0 m-3 sm:m-0"
        style={{
          maxWidth: "420px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.95)", // Increased opacity for better readability
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
          margin: "20px auto", // Center the card and add some vertical spacing
          position: "relative", // Ensure proper stacking context
          zIndex: 1, // Ensure card appears above background
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
                className={`form-control rounded-4 shadow-sm px-3 py-2 ${
                  userNameError ? "is-invalid" : userName && !userNameError ? "is-valid" : "border-0"
                }`}
                style={{ transition: "all 0.3s ease-in-out" }}
                placeholder="Enter your UserName"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                  const validation = validateUserName(e.target.value);
                  setUserNameError(validation.error);
                }}
                required
                aria-describedby={!isLogin ? "userName-help userName-error" : undefined}
                aria-invalid={userNameError ? "true" : "false"}
              />
              {!isLogin && (
                <>
                  {userNameError && (
                    <div id="userName-error" className="invalid-feedback" role="alert">
                      <span className="me-1" aria-hidden="true">⚠️</span>
                      {userNameError}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* --- Email --- */}
          <div className="mb-3">
            <input
              id="email"
              type="email"
              className={`form-control rounded-4 shadow-sm px-3 py-2 ${
                emailError ? "is-invalid" : email && !emailError ? "is-valid" : "border-0"
              }`}
              style={{ transition: "all 0.3s ease-in-out" }}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                const validation = validateEmail(e.target.value);
                setEmailError(validation.error);
              }}
              required
              aria-describedby="email-help email-error"
              aria-invalid={emailError ? "true" : "false"}
            />
            {emailError && (
              <div id="email-error" className="invalid-feedback" role="alert">
                <span className="me-1" aria-hidden="true">⚠️</span>
                {emailError}
              </div>
            )}
          </div>

          {/* --- Phone (Sign Up only) --- */}
          {!isLogin && (
            <div className="mb-3">
              <input
                id="phone"
                type="tel"
                className={`form-control rounded-4 shadow-sm px-3 py-2 ${
                  phoneError ? "is-invalid" : mobileNo && !phoneError ? "is-valid" : "border-0"
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
              {phoneError && (
                <div id="phone-error" className="invalid-feedback d-block" role="alert">
                  <span className="me-1" aria-hidden="true">⚠️</span>
                  {phoneError}
                </div>
              )}
              {!phoneError && mobileNo && (
                <div className="valid-feedback d-block">
                  <span className="me-1" aria-hidden="true">✅</span>
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
              className={`form-control rounded-4 shadow-sm px-3 py-2 ${
                !isLogin && password
                  ? passwordPattern.test(password)
                    ? "is-valid border-success"
                    : "is-invalid border-danger"
                  : "border-0"
              }`}
              style={{ transition: "all 0.3s ease-in-out" }}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (!isLogin) {
                  const validation = validatePassword(e.target.value);
                  setPasswordError(validation.error);
                }
              }}
              required
              aria-describedby="password-help password-requirements"
              aria-invalid={passwordError ? "true" : "false"}
            />
            {!isLogin && (
              <div id="password-requirements" className="form-text">
                <div className={`small ${password.length >= 8 ? 'text-success' : 'text-muted'}`}>
                  ✓ At least 8 characters
                </div>
                <div className={`small ${/[A-Z]/.test(password) ? 'text-success' : 'text-muted'}`}>
                  ✓ One uppercase letter
                </div>
                <div className={`small ${/[a-z]/.test(password) ? 'text-success' : 'text-muted'}`}>
                  ✓ One lowercase letter
                </div>
                <div className={`small ${/\d/.test(password) ? 'text-success' : 'text-muted'}`}>
                  ✓ One number
                </div>
                <div className={`small ${/[@$!%*?&]/.test(password) ? 'text-success' : 'text-muted'}`}>
                  ✓ One special character (@$!%*?&)
                </div>
              </div>
            )}
            {isLogin && (
              <div id="password-help" className="form-text text-muted small">
                Enter your account password.
              </div>
            )}
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
                  authError || (password !== confirmPassword && !!confirmPassword)
                    ? "true"
                    : "false"
                }
              />
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
                <div className="me-2" aria-hidden="true">⚠️</div>
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
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
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
