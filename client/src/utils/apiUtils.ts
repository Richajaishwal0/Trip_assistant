/**
 * API Error Handling Utility
 * Provides standardized error handling for API requests
 */
import { handleError } from './errorHandlerToast';
import { isOnline } from './networkUtils';

/**
 * Standard API Error structure
 */
export interface ApiErrorResponse {
  success: boolean;
  message: string;
  error?: string;
  statusCode?: number;
  details?: any;
}

/**
 * Checks if an object is an API error response
 * @param obj - The object to check
 */
export const isApiErrorResponse = (obj: any): obj is ApiErrorResponse => {
  return obj && 
    typeof obj === 'object' && 
    'success' in obj && 
    obj.success === false && 
    'message' in obj;
};

/**
 * Custom API error class
 * @extends Error
 */
export class ApiError extends Error {
  statusCode: number;
  responseData: any;
  endpoint: string;

  constructor(message: string, statusCode = 500, endpoint = '', responseData: any = null) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.endpoint = endpoint;
    this.responseData = responseData;
  }
}

/**
 * Extracts error message from API response
 * Handles various error response formats
 * @param error - The error object
 * @param fallback - Fallback message if no error message found
 */
export const getErrorMessage = (error: unknown, fallback = 'Something went wrong'): string => {
  if (!error) return fallback;

  // Check if it's our ApiError class
  if (error instanceof ApiError) {
    return error.message;
  }

  // Check if it's a standard Error object
  if (error instanceof Error) {
    if (error.name === 'AbortError') {
      return 'Request timed out. Please try again.';
    }
    return error.message || fallback;
  }

  // Check if it's a string
  if (typeof error === 'string') {
    return error;
  }

  // Check if it's an object with a message property (like from API)
  if (typeof error === 'object' && error !== null) {
    const err = error as Record<string, any>;
    return err.message || 
           err.error || 
           (err.response?.data?.message) ||
           (err.response?.data?.error) ||
           fallback;
  }

  return fallback;
};

/**
 * Type for API request options
 */
export interface ApiRequestOptions extends RequestInit {
  timeout?: number;
  showErrorToast?: boolean;
  errorMessage?: string;
}

/**
 * Enhanced fetch function with standardized error handling
 * @param url - API endpoint URL
 * @param options - Request options
 * @returns Promise with response data
 */
export const apiRequest = async <T = any>(
  url: string, 
  options: ApiRequestOptions = {}
): Promise<T> => {
  const {
    timeout = 10000,
    showErrorToast = true,
    errorMessage,
    ...fetchOptions
  } = options;

  // Check for internet connection
  if (!isOnline()) {
    const offlineError = new ApiError(
      'You are currently offline. Please check your internet connection.',
      0,
      url
    );
    
    if (showErrorToast) {
      handleError(offlineError);
    }
    
    throw offlineError;
  }

  // Set up request with timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    
    const data = await response.json().catch(() => ({}));
    
    // If response is not ok, handle the error
    if (!response.ok) {
      const message = getErrorMessage(
        data, 
        errorMessage || `Error ${response.status}: ${response.statusText}`
      );
      
      const apiError = new ApiError(
        message,
        response.status,
        url,
        data
      );
      
      if (showErrorToast) {
        handleError(apiError);
      }
      
      throw apiError;
    }
    
    return data as T;
  } catch (error) {
    clearTimeout(timeoutId);
    
    // Handle fetch errors (network issues, timeout, etc.)
    if (error instanceof ApiError) {
      throw error; // Already processed
    }
    
    // For other errors, create a standardized ApiError
    const apiError = new ApiError(
      getErrorMessage(error, errorMessage || 'Network request failed'),
      0, // unknown status
      url
    );
    
    if (showErrorToast) {
      handleError(apiError);
    }
    
    throw apiError;
  }
};

/**
 * GET request with error handling
 * @param url - API endpoint
 * @param options - Request options
 */
export const apiGet = <T = any>(url: string, options?: ApiRequestOptions): Promise<T> => {
  return apiRequest<T>(url, { ...options, method: 'GET' });
};

/**
 * POST request with error handling
 * @param url - API endpoint
 * @param data - Request body
 * @param options - Request options
 */
export const apiPost = <T = any>(
  url: string, 
  data?: any, 
  options?: ApiRequestOptions
): Promise<T> => {
  return apiRequest<T>(url, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
};

/**
 * PUT request with error handling
 * @param url - API endpoint
 * @param data - Request body
 * @param options - Request options
 */
export const apiPut = <T = any>(
  url: string, 
  data?: any, 
  options?: ApiRequestOptions
): Promise<T> => {
  return apiRequest<T>(url, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
};

/**
 * DELETE request with error handling
 * @param url - API endpoint
 * @param options - Request options
 */
export const apiDelete = <T = any>(
  url: string, 
  options?: ApiRequestOptions
): Promise<T> => {
  return apiRequest<T>(url, { ...options, method: 'DELETE' });
};

export default {
  get: apiGet,
  post: apiPost,
  put: apiPut,
  delete: apiDelete,
  request: apiRequest,
};
