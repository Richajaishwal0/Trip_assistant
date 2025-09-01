const Joi = require('joi');

// Query parameter validation schemas
const querySchema = Joi.string()
  .min(1)
  .max(100)
  .optional()
  .default("famous places")
  .messages({
    'string.min': 'Query must be at least 1 character long',
    'string.max': 'Query cannot exceed 100 characters'
  });

const pageSchema = Joi.number()
  .integer()
  .min(1)
  .max(100)
  .optional()
  .default(1)
  .messages({
    'number.base': 'Page must be a number',
    'number.integer': 'Page must be an integer',
    'number.min': 'Page must be at least 1',
    'number.max': 'Page cannot exceed 100'
  });

const perPageSchema = Joi.number()
  .integer()
  .min(1)
  .max(80)
  .optional()
  .default(12)
  .messages({
    'number.base': 'Per page must be a number',
    'number.integer': 'Per page must be an integer',
    'number.min': 'Per page must be at least 1',
    'number.max': 'Per page cannot exceed 80'
  });

// Get more places validation schema
const getMorePlacesSchema = {
  body: Joi.object({}).empty(),
  query: Joi.object({
    query: querySchema,
    page: pageSchema,
    per_page: perPageSchema
  }),
  params: Joi.object({}).empty()
};

module.exports = {
  getMorePlacesSchema
}; 