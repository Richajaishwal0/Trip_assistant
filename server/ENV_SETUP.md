# Environment Configuration Guide

This guide explains how to configure environment variables for the Trip Assistant application.

## Setting Up Environment Variables

Environment variables are essential for the application to run properly and securely. They store sensitive information like API keys, database connection strings, and other configuration settings.

### Option 1: Using the Setup Script (Recommended)

We've created a script to help you set up your environment variables easily:

```bash
# From the server directory
node setup-env.js
```

This interactive script will:
1. Guide you through setting up all required variables
2. Generate secure random values for secrets
3. Use default values where appropriate
4. Save everything to a `.env` file

### Option 2: Manual Setup

1. Copy the example environment file:
   ```bash
   cp .env.example server/.env
   ```

2. Edit the `.env` file with your actual values:
   ```bash
   nano server/.env
   ```

## Required Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_DB_URI` | MongoDB connection string | `mongodb://localhost:27017/tripPlannerDB` |
| `JWT_SECRET` | Secret key for JWT token signing (min 32 chars) | *none - must be set* |

## Optional Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PEXELS_API_KEY` | API key for Pexels image service | *none* |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment (development/production) | `development` |
| `CORS_ORIGIN` | CORS allowed origin (frontend URL) | `http://localhost:5173` |
| `JWT_EXPIRES_IN` | JWT token expiration time | `7d` |

## Security Recommendations

1. **Never commit your `.env` file** to version control
2. Use strong, random values for secrets
3. Store production secrets in a secure location
4. Rotate secrets periodically
5. Limit access to production environment variables

## Troubleshooting

If you encounter environment-related errors:

1. Run the environment validator:
   ```bash
   node -e "require('./utils/envValidator').validateEnvironment()"
   ```

2. Check for typos in your `.env` file
3. Ensure all required variables are set
4. Verify the MongoDB connection string is correct
5. Make sure the JWT_SECRET is at least 32 characters long

## Additional Tools

- **Environment Validator**: Checks that all required variables are set
  ```bash
  node -e "console.log(require('./utils/envValidator').validateEnvironment())"
  ```

- **Security Audit**: Checks for hardcoded credentials in the codebase
  ```bash
  node security-audit.js
  ```
