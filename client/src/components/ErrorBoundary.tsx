import { Component, ErrorInfo, ReactNode } from "react";
import { showError } from "../utils/toastUtils";
import { FaExclamationTriangle, FaRedo } from "react-icons/fa";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showToast?: boolean;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary component to catch errors in child components
 * Prevents the entire app from crashing when a component fails
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error
    console.error("ErrorBoundary caught error:", error);
    console.error("Component stack:", errorInfo.componentStack);
    
    // Call onError prop if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // Show toast notification
    if (this.props.showToast !== false) {
      const componentName = this.props.componentName || 'A component';
      showError(`${componentName} encountered an error: ${error.message}`);
    }

    // In production, you might want to send this to an error reporting service
    if (import.meta.env.PROD) {
      // Example: sendToErrorReporting(error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="error-boundary-container p-4 border border-danger rounded bg-light shadow-sm my-3">
          <div className="text-center mb-3">
            <FaExclamationTriangle className="text-danger" size={32} />
          </div>
          
          <h3 className="text-danger text-center mb-3">Something went wrong</h3>
          
          <p className="text-center mb-3">
            We apologize for the inconvenience. You can try reloading the component or the entire page.
          </p>
          
          <details className="mb-3">
            <summary className="text-secondary cursor-pointer">Error Details</summary>
            <pre className="bg-light p-2 rounded border mt-2 text-danger small">
              {this.state.error && this.state.error.toString()}
            </pre>
          </details>
          
          <div className="d-flex justify-content-center gap-3">
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="btn btn-primary"
              aria-label="Try reloading the component"
            >
              <FaRedo className="me-2" /> Reload Component
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="btn btn-outline-secondary"
              aria-label="Reload the entire page"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
