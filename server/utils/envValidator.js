// Environment validation utility for Trip Assistant
// This ensures all required environment variables are set before starting the server

const chalk = require('chalk');

/**
 * Required environment variables for the server
 * These must be set or the server will not start in production
 */
const requiredEnvVars = [
  {
    name: 'JWT_SECRET',
    description: 'JWT secret key for token signing',
    critical: true,
    minLength: 32,
    message: 'Must be at least 32 characters for security'
  },
  {
    name: 'MONGO_DB_URI',
    description: 'MongoDB connection string',
    critical: true,
    message: 'Required for database connection'
  }
];

/**
 * Optional but recommended environment variables
 * These improve functionality but have fallbacks
 */
const recommendedEnvVars = [
  {
    name: 'PEXELS_API_KEY',
    description: 'Pexels API key for place images',
    feature: 'Places functionality',
    message: 'Required for the More Places feature to work properly'
  },
  {
    name: 'NODE_ENV',
    description: 'Application environment',
    default: 'development',
    options: ['development', 'staging', 'production'],
    message: 'Controls various security and optimization features'
  },
  {
    name: 'PORT',
    description: 'Server port',
    default: '5000',
    message: 'Port on which the server will listen'
  },
  {
    name: 'CORS_ORIGIN',
    description: 'CORS allowed origin',
    default: 'http://localhost:5173',
    message: 'URL of the frontend application for CORS configuration'
  },
  {
    name: 'JWT_EXPIRES_IN',
    description: 'JWT token expiration time',
    default: '7d',
    message: 'Controls how long user sessions remain valid'
  }
];

/**
 * Validates all environment variables
 * @returns {Object} validation result
 */
function validateEnvironment() {
  const errors = [];
  const warnings = [];
  const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
  
  console.log(chalk.blue('\n🔍 Validating environment configuration...\n'));
  console.log(chalk.blue(`📌 Environment: ${process.env.NODE_ENV || 'development'}\n`));
  
  // Check required variables
  for (const envVar of requiredEnvVars) {
    const value = process.env[envVar.name];
    
    if (!value) {
      errors.push({
        name: envVar.name,
        message: `${envVar.description} is required${envVar.message ? ` - ${envVar.message}` : ''}`,
        critical: envVar.critical
      });
    } else if (envVar.minLength && value.length < envVar.minLength) {
      errors.push({
        name: envVar.name,
        message: `${envVar.description} must be at least ${envVar.minLength} characters long`,
        critical: envVar.critical
      });
    } else {
      console.log(chalk.green(`✅ ${envVar.name}: Configured correctly`));
    }
  }
  
  // Check recommended variables
  for (const envVar of recommendedEnvVars) {
    const value = process.env[envVar.name];
    
    if (!value) {
      warnings.push({
        name: envVar.name,
        message: `${envVar.description} is not set${envVar.feature ? ` - ${envVar.feature} may not work` : ''}${envVar.message ? ` - ${envVar.message}` : ''}`,
        default: envVar.default
      });
    } else if (envVar.options && !envVar.options.includes(value)) {
      warnings.push({
        name: envVar.name,
        message: `Value "${value}" may not be valid. Expected one of: ${envVar.options.join(', ')}`,
        current: value
      });
    } else {
      console.log(chalk.green(`✅ ${envVar.name}: ${value === envVar.default ? 'Using default value' : 'Configured correctly'}`));
    }
  }
  
  // Display warnings
  if (warnings.length > 0) {
    console.log(chalk.yellow('\n⚠️  WARNINGS:'));
    warnings.forEach(warning => {
      console.log(chalk.yellow(`   • ${warning.name}: ${warning.message}`));
      if (warning.default) {
        console.log(chalk.gray(`     Using default: ${warning.default}`));
      }
    });
  }
  
  // Display errors
  if (errors.length > 0) {
    console.log(chalk.red('\n❌ ERRORS:'));
    errors.forEach(error => {
      console.log(chalk.red(`   • ${error.name}: ${error.message}`));
    });
    
    console.log(chalk.red('\n🔧 To fix these issues:'));
    console.log(chalk.white('   1. Copy .env.example to server/.env'));
    console.log(chalk.white('   2. Fill in the required values in server/.env'));
    console.log(chalk.white('   3. Restart the server\n'));
    
    const criticalErrors = errors.filter(e => e.critical);
    if (criticalErrors.length > 0) {
      if (!isDevelopment) {
        console.log(chalk.red('🚨 CRITICAL: Cannot start server with missing critical environment variables\n'));
        return { success: false, errors, warnings };
      } else {
        console.log(chalk.yellow('⚠️ Allowing server to start in development mode despite missing critical variables\n'));
        console.log(chalk.yellow('   This would prevent startup in production mode!\n'));
      }
    }
  }
  
  if (errors.length === 0 && warnings.length === 0) {
    console.log(chalk.green('\n🎉 All environment variables are properly configured!\n'));
  } else if (errors.length === 0) {
    console.log(chalk.yellow('\n✅ Environment validation passed with warnings\n'));
  }
  
  // Always fail in production if there are critical errors
  if (process.env.NODE_ENV === 'production' && errors.some(e => e.critical)) {
    return { success: false, errors, warnings };
  }
  
  return { 
    success: isDevelopment || errors.length === 0, 
    errors, 
    warnings,
    isDevelopment
  };
}

/**
 * Validates specific environment variable
 * @param {string} varName - Environment variable name
 * @returns {boolean} Is valid
 */
function validateEnvVar(varName) {
  const value = process.env[varName];
  const required = requiredEnvVars.find(v => v.name === varName);
  
  if (!value) return false;
  if (required && required.minLength && value.length < required.minLength) return false;
  
  return true;
}

/**
 * Gets environment variable with validation
 * @param {string} varName - Environment variable name
 * @param {string} defaultValue - Default value if not set
 * @returns {string} Environment variable value
 */
function getEnvVar(varName, defaultValue = null) {
  const value = process.env[varName];
  
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${varName} is required but not set`);
  }
  
  return value || defaultValue;
}

module.exports = {
  validateEnvironment,
  validateEnvVar,
  getEnvVar,
  requiredEnvVars,
  recommendedEnvVars
};
