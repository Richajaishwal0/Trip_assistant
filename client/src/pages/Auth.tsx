import { useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { handleError } from "../utils/errorHandlerToast";
import { showError, showSuccess } from "../utils/toastUtils";
import { isOnline } from "../utils/networkUtils";

function Auth() {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [userName, setUserName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Phone number validation function
  const validatePhoneNumber = (phone: string): { isValid: boolean; error: string | null } => {
    // Remove all non-digit characters for validation
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Check if empty
    if (!phone.trim()) {
      return { isValid: false, error: "Phone number is required" };
    }
    
    // Check minimum length (10 digits for most countries)
    if (cleanPhone.length < 10) {
      return { isValid: false, error: "Phone number must be at least 10 digits" };
    }
    
    // Check maximum length (15 digits according to ITU-T E.164)
    if (cleanPhone.length > 15) {
      return { isValid: false, error: "Phone number cannot exceed 15 digits" };
    }
    
    // Enhanced pattern for international phone numbers
    // Supports: +country code, area codes with various separators, and different formats
    const phonePattern = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    
    if (!phonePattern.test(phone)) {
      return { isValid: false, error: "Please enter a valid phone number format" };
    }
    
    return { isValid: true, error: null };
  };

  // Handle phone number input with real-time validation
  const handlePhoneChange = (value: string) => {
    setMobileNo(value);
    
    // Only validate if user has started typing
    if (value.trim().length > 0) {
      const validation = validatePhoneNumber(value);
      setPhoneError(validation.error);
    } else {
      setPhoneError(null);
    }
  };

  useEffect(() => {
    if (location.state?.isLogin !== undefined) {
      setIsLogin(location.state.isLogin);
    }
  }, [location]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError(null);
    setPhoneError(null);
    
    // Validate phone number for signup
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
    
    // Check network connectivity
    if (!isOnline()) {
      setAuthError("No internet connection. Please check your network.");
      return;
    }

    const apiBaseUrl = import.meta.env?.VITE_API_BASE_URL || "http://localhost:5000";
    const url = isLogin ? `${apiBaseUrl}/entry-point/login` : `${apiBaseUrl}/entry-point/signup`;
    const payload = { email, password, mobileNo, userName };
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        // Set a reasonable timeout
        signal: AbortSignal.timeout(10000),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showSuccess(isLogin ? "Login Successful" : "Signup Successful");
        localStorage.setItem("user_id", data.user_id);//nd
        navigate("/places");
      } else {
let errorMsg = data.message || "Authentication failed. Please check your credentials.";
        
        // Add helpful hints for common login issues
        if (!isLogin) {
          // For signup, show the specific error
          setAuthError(errorMsg);
        } else {
          // For login, provide helpful demo credentials info
          if (errorMsg.includes("Invalid email or password")) {
            errorMsg = `Invalid credentials. Try demo account:\nEmail: test@example.com\nPassword: password123`;
          } else if (errorMsg.includes("User not found") || response.status === 404) {
            errorMsg = `Account not found. Use demo account:\nEmail: test@example.com\nPassword: password123`;
          }
          setAuthError(errorMsg);
        }
        if (isLogin && data.message.toLowerCase().includes("not registered")) {
    setTimeout(() => {
      navigate("/auth", { state: { isLogin: false } }); // switch to signup
    }, 20); // give user time to see error toast
    
  }
        showError(errorMsg);
      }
    } catch (error) {
      let errorMsg = isLogin 
        ? "Unable to log in at this time. Please try again later." 
        : "Unable to create your account at this time. Please try again later.";
      
      // More specific error messages
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMsg = "Request timed out. Please check your internet connection and try again.";
        } else if (error.message.includes('fetch')) {
          errorMsg = `Cannot connect to server. Make sure the backend is running on ${apiBaseUrl}.\n\nFor demo, try:\nEmail: test@example.com\nPassword: password123`;
        }
      }
      
      setAuthError(errorMsg);
      handleError(error, errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className="vh-100 d-flex justify-content-center align-items-center bg-image"
      style={{
        backgroundImage: "url('src/images/bg-auth.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      role="main"
    >
      <div
        className="card p-4 rounded-4 shadow-lg bg-light"
        style={{
          maxWidth: "400px",
          width: "100%",
          border: "2px solid #ff4081",
          background: "linear-gradient(135deg, #d3be52ff 0%, #d4527bff 100%)" // changed background
        }}
        role="region"
        aria-labelledby="auth-heading"
      >
        <h1 className="text-center mb-4 text-dark" id="auth-heading">
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        
        <form onSubmit={handleSubmit} noValidate>
        
        {!isLogin && (
            <div className="mb-3">
              <label className="form-label text-dark" htmlFor="userName">
                User Name
              </label>
              <input
                id="userName"
                type="text"
                className="form-control border-danger"
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


          <div className="mb-3">
            <label className="form-label text-dark" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="form-control border-danger"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-describedby="email-help"
              aria-invalid={authError ? "true" : "false"}
            />
            <div id="email-help" className="form-text text-dark">
              We'll never share your email with anyone else.
            </div>
          </div>

          {!isLogin && (
            <div className="mb-3">
              <label className="form-label text-dark" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                className={`form-control border-danger ${phoneError ? 'is-invalid' : mobileNo && !phoneError ? 'is-valid' : ''}`}
                placeholder="Enter your phone number (e.g., +1-234-567-8900)"
                value={mobileNo}
                onChange={(e) => handlePhoneChange(e.target.value)}
                pattern="^(\+?\d{1,3}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$"
                required
                aria-describedby="phone-help phone-error"
                aria-invalid={phoneError ? "true" : "false"}
                maxLength={20}
              />
              <div id="phone-help" className="form-text text-dark">
                Enter with country code (e.g., +1-234-567-8900, +91 98765 43210)
              </div>
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

          <div className="mb-3">
            <label className="form-label text-dark" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control border-danger"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-describedby="password-help"
              aria-invalid={authError ? "true" : "false"}
            />
            <div id="password-help" className="form-text text-dark">
              {!isLogin 
                ? "Password must be at least 8 characters long." 
                : "Enter your account password."
              }
            </div>
          </div>

          {!isLogin && (
            <div className="mb-3">
              <label className="form-label text-dark" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="form-control border-danger"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                aria-describedby="confirmPassword-help"
                aria-invalid={authError || (password !== confirmPassword && confirmPassword) ? "true" : "false"}
              />
              <div id="confirmPassword-help" className="form-text text-dark">
                Re-enter your password to confirm.
              </div>
            </div>
          )}
          
          {authError && (
            <div 
              className="mb-3" 
              role="alert" 
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="alert alert-danger d-flex align-items-center">
                <div className="me-2" aria-hidden="true">⚠️</div>
                <div>{authError}</div>
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-danger w-100 fw-bold" 
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
            ) : (
              isLogin ? "Login" : "Sign Up"
            )}
          </button>
          <div id="submit-help" className="form-text text-dark text-center mt-2">
            {isLogin 
              ? "Click to access your account." 
              : "Click to create your new account."
            }
          </div>
        </form>

        <p className="mt-3 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"} {" "}
          <button 
            className="btn btn-link text-danger fw-bold" 
            onClick={() => setIsLogin(!isLogin)}
            type="button"
            aria-label={isLogin ? "Switch to sign up form" : "Switch to login form"}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </main>
  );
}

export default Auth;
