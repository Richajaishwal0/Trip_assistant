const Joi = require('joi');

// Common validation patterns
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobilePattern = /^[0-9]{10}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const userNamePattern = /^[a-zA-Z0-9\s]+$/;

// Common schemas that can be reused
const emailSchema = Joi.string()
  .email({ tlds: { allow: false } })
  .pattern(emailPattern)
  .required()
  .messages({
    'string.email': 'Please provide a valid email address',
    'string.pattern.base': 'Please provide a valid email address',
    'any.required': 'Email is required'
  });

const optionalEmailSchema = Joi.string()
  .email({ tlds: { allow: false } })
  .pattern(emailPattern)
  .optional()
  .messages({
    'string.email': 'Please provide a valid email address',
    'string.pattern.base': 'Please provide a valid email address'
  });

const passwordSchema = Joi.string()
  .min(8)
  .pattern(passwordPattern)
  .required()
  .messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    'any.required': 'Password is required'
  });

const userNameSchema = Joi.string()
  .min(2)
  .max(50)
  .pattern(userNamePattern)
  .required()
  .messages({
    'string.min': 'Username must be at least 2 characters long',
    'string.max': 'Username cannot exceed 50 characters',
    'string.pattern.base': 'Username can only contain letters, numbers, and spaces',
    'any.required': 'Username is required'
  });

const optionalUserNameSchema = Joi.string()
  .min(2)
  .max(50)
  .pattern(userNamePattern)
  .optional()
  .messages({
    'string.min': 'Username must be at least 2 characters long',
    'string.max': 'Username cannot exceed 50 characters',
    'string.pattern.base': 'Username can only contain letters, numbers, and spaces'
  });

const mobileSchema = Joi.string()
  .pattern(mobilePattern)
  .required()
  .messages({
    'string.pattern.base': 'Mobile number must be exactly 10 digits',
    'any.required': 'Mobile number is required'
  });

const optionalMobileSchema = Joi.string()
  .pattern(mobilePattern)
  .optional()
  .messages({
    'string.pattern.base': 'Mobile number must be exactly 10 digits'
  });

// Empty schemas for routes that don't need body/query/params
const emptyBodySchema = Joi.object({}).empty();
const emptyQuerySchema = Joi.object({}).empty();
const emptyParamsSchema = Joi.object({}).empty();

// Login validation schema
const loginSchema = {
  body: Joi.object({
    email: emailSchema,
    password: Joi.string().required().messages({
      'any.required': 'Password is required'
    })
  }),
  query: emptyQuerySchema,
  params: emptyParamsSchema
};

// Register validation schema
const registerSchema = {
  body: Joi.object({
    userName: userNameSchema,
    email: emailSchema,
    password: passwordSchema,
    mobileNo: mobileSchema
  }),
  query: emptyQuerySchema,
  params: emptyParamsSchema
};

// Update user validation schema
const updateUserSchema = {
  body: Joi.object({
    user_name: optionalUserNameSchema,
    email: optionalEmailSchema,
    mobile_no: optionalMobileSchema
  }).min(1).messages({
    'object.min': 'At least one field must be provided for update'
  }),
  query: emptyQuerySchema,
  params: emptyParamsSchema
};

// Delete user validation schema (no body needed, just auth)
const deleteUserSchema = {
  body: emptyBodySchema,
  query: emptyQuerySchema,
  params: emptyParamsSchema
};

module.exports = {
  loginSchema,
  registerSchema,
  updateUserSchema,
  deleteUserSchema
}; 