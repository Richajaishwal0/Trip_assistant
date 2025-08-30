/**
 * Standardized error handling utility for server-side operations
 */

/**
 * Logs error with consistent formatting and returns standardized error response
 * @param {Error|unknown} error - The error object
 * @param {string} operation - Description of the operation that failed
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code (default: 500)
 */
function handleServerError(error, operation, res, statusCode = 500) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
  const logMessage = `❌ ${operation} failed: ${errorMessage}`;

  console.error(logMessage);

  return res.status(statusCode).json({
    success: false,
    error: errorMessage,
    operation: operation
  });
}

/**
 * Sends standardized error response for API endpoints
 * @param {Error|unknown} error - The error object
 * @param {string} operation - Description of the operation that failed
 * @param {Object} res - Express response object (required)
 * @param {number} statusCode - HTTP status code (default: 500)
 */
function handleServerErrorResponse(error, operation, res, statusCode = 500) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
  const logMessage = `❌ ${operation} failed: ${errorMessage}`;

  console.error(logMessage);

  return res.status(statusCode).json({
    success: false,
    error: errorMessage,
    operation: operation
  });
}

/**
 * Returns standardized error object (for non-API or internal use)
 * @param {Error|unknown} error - The error object
 * @param {string} operation - Description of the operation that failed
 */
function getStandardizedErrorObject(error, operation) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
  return {
    success: false,
    error: errorMessage,
    operation: operation
  };
}

/**
 * Logs error without sending response (for non-API operations)
 * @param {Error|unknown} error - The error object
 * @param {string} operation - Description of the operation that failed
 */
function logError(error, operation) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
  console.error(`❌ ${operation} failed: ${errorMessage}`);
}

/**
 * Success response helper
 * @param {Object} res - Express response object
 * @param {any} data - Response data
 * @param {string} message - Success message
 * @param {number} statusCode - HTTP status code (default: 200)
 */
function sendSuccess(res, data = null, message = 'Operation successful', statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message: message,
    user : data
  });
}

module.exports = {
  handleServerError,
  logError,
  sendSuccess
};
