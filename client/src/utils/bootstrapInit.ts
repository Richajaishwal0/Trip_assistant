// Extend Window interface for Bootstrap
declare global {
  interface Window {
    bootstrap?: any;
  }
}

// Bootstrap initialization utility
export const initializeBootstrap = () => {
  // Check if Bootstrap is available
  if (typeof window !== 'undefined' && !window.bootstrap) {
    console.warn('Bootstrap JavaScript not loaded. Some features may not work properly.');
    return false;
  // amazonq-ignore-next-line
  }
  return true;
};

// Fallback function for mobile menu toggle without Bootstrap
export const toggleMobileMenu = (element: HTMLElement) => {
  element.classList.toggle('show');
};