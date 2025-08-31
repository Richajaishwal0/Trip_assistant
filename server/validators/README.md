# Validation System Documentation

This directory contains Joi validation schemas for the Trip Assistant API.

## Structure

- `userValidators.js` - User-specific validation schemas with all validation patterns and schemas
- `README.md` - This documentation file

## Usage

### 1. Import the validation middleware
```javascript
const validate = require('../middleware/validation');
```

### 2. Import the schemas
```javascript
const { loginSchema, registerSchema } = require('../validators/userValidators');
```

### 3. Apply validation to routes
```javascript
router.post('/login', validate(loginSchema), loginController);
```

## Validation Schemas

### User Routes

#### Login Schema
- **Body**: `email` (required, valid email), `password` (required)
- **Query**: Empty (no query parameters allowed)
- **Params**: Empty (no path parameters allowed)

#### Register Schema
- **Body**: `userName` (required, 2-50 chars, alphanumeric + spaces), `email` (required, valid email), `password` (required, 8+ chars with complexity), `mobileNo` (required, 10 digits)
- **Query**: Empty
- **Params**: Empty

#### Update User Schema
- **Body**: At least one of `userName`, `email`, `mobileNo` (all optional, same validation as register)
- **Query**: Empty
- **Params**: Empty

#### Delete User Schema
- **Body**: Empty (no body needed)
- **Query**: Empty
- **Params**: Empty

## Common Schemas

The `userValidators.js` file provides reusable schemas:

- `emailSchema` - Required email validation
- `optionalEmailSchema` - Optional email validation
- `passwordSchema` - Required password with complexity requirements
- `userNameSchema` - Required username validation
- `optionalUserNameSchema` - Optional username validation
- `mobileSchema` - Required mobile number validation
- `optionalMobileSchema` - Optional mobile number validation
- `emptyBodySchema` - Empty body schema
- `emptyQuerySchema` - Empty query schema
- `emptyParamsSchema` - Empty params schema

## Validation Patterns

- **Email**: Standard email format validation
- **Mobile**: Exactly 10 digits
- **Password**: Minimum 8 characters with uppercase, lowercase, number, and special character
- **Username**: 2-50 characters, alphanumeric and spaces only

## Error Messages

All validation schemas include custom error messages for better user experience. The validation middleware returns structured error responses with:

```json
{
  "success": false,
  "message": "Validation error",
  "errors": ["Body: Email is required", "Query: Unexpected field 'extra'"]
}
```

## Adding New Validators

1. Create a new validator file (e.g., `placeValidators.js`)
2. Define your validation schemas with patterns and schemas directly in the file
3. Export the schemas
4. Import and use in your routes

Example:
```javascript
const Joi = require('joi');

// Define patterns and schemas
const namePattern = /^[a-zA-Z0-9\s]+$/;
const nameSchema = Joi.string()
  .min(2)
  .max(100)
  .pattern(namePattern)
  .required()
  .messages({
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name cannot exceed 100 characters',
    'string.pattern.base': 'Name can only contain letters, numbers, and spaces',
    'any.required': 'Name is required'
  });

const createPlaceSchema = {
  body: Joi.object({
    name: nameSchema,
    description: Joi.string().optional()
  }),
  query: Joi.object({}).empty(),
  params: Joi.object({}).empty()
};

module.exports = { createPlaceSchema };
``` 