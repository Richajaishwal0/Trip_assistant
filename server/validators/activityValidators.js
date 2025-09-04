const Joi = require('joi');

// User ID validation pattern (MongoDB ObjectId format)
const objectIdPattern = /^[0-9a-fA-F]{24}$/;

// User ID schema
const userIdSchema = Joi.string()
  .pattern(objectIdPattern)
  .required()
  .messages({
    'string.pattern.base': 'User ID must be a valid MongoDB ObjectId',
    'any.required': 'User ID is required'
  });

// User activity check validation schema
const activityCheckSchema = {
  body: Joi.object({
    userId: userIdSchema
  }),
  query: Joi.object({}).empty(),
  params: Joi.object({}).empty()
};

module.exports = {
  activityCheckSchema
}; 