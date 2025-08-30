import React from "react";
import { FaExclamationTriangle, FaRedo } from "react-icons/fa";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
  error?: Error | null;
}

/**
 * Error state component to display when data fetching fails
 * Shows a friendly error message with a retry button if onRetry is provided
 */
const ErrorState: React.FC<ErrorStateProps> = ({
  message = "Something went wrong",
  onRetry,
  className = "",
  error
}) => {
  // Show error details in development only
  const errorDetails = error && import.meta.env.DEV 
    ? error.message 
    : null;

  return (
    <div className={`text-center p-4 ${className}`}>
      <div className="text-danger mb-3">
        <FaExclamationTriangle size={40} />
      </div>
      <h5 className="text-danger mb-3">{message}</h5>
      
      {/* Show error details only in development environment */}
      {errorDetails && (
        <div className="alert alert-secondary small mb-3">
          <details>
            <summary>Technical details</summary>
            <pre className="mt-2 text-start">{errorDetails}</pre>
          </details>
        </div>
      )}
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn btn-outline-primary d-flex align-items-center mx-auto"
          aria-label="Try again"
        >
          <FaRedo className="me-2" /> Try again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
