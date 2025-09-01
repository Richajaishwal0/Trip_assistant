const Joi = require('joi');

// MongoDB ObjectId pattern
const objectIdPattern = /^[0-9a-fA-F]{24}$/;

// Common validation patterns
const titlePattern = /^[a-zA-Z0-9\s\-_.,!?()]+$/;
const locationPattern = /^[a-zA-Z0-9\s\-_,.()]+$/;
const propertyTypePattern = /^[a-zA-Z\s]+$/;

// Property ID schema for params
const propertyIdSchema = Joi.string()
  .pattern(objectIdPattern)
  .required()
  .messages({
    'string.pattern.base': 'Property ID must be a valid MongoDB ObjectId',
    'any.required': 'Property ID is required'
  });

// Host ID schema
const hostIdSchema = Joi.string()
  .pattern(objectIdPattern)
  .optional()
  .messages({
    'string.pattern.base': 'Host ID must be a valid MongoDB ObjectId'
  });

// Title schema
const titleSchema = Joi.string()
  .min(3)
  .max(100)
  .pattern(titlePattern)
  .required()
  .messages({
    'string.min': 'Title must be at least 3 characters long',
    'string.max': 'Title cannot exceed 100 characters',
    'string.pattern.base': 'Title can only contain letters, numbers, spaces, and basic punctuation',
    'any.required': 'Title is required'
  });

// Description schema
const descriptionSchema = Joi.string()
  .min(10)
  .max(1000)
  .required()
  .messages({
    'string.min': 'Description must be at least 10 characters long',
    'string.max': 'Description cannot exceed 1000 characters',
    'any.required': 'Description is required'
  });

// Location schema
const locationSchema = Joi.string()
  .min(3)
  .max(200)
  .pattern(locationPattern)
  .required()
  .messages({
    'string.min': 'Location must be at least 3 characters long',
    'string.max': 'Location cannot exceed 200 characters',
    'string.pattern.base': 'Location can only contain letters, numbers, spaces, and basic punctuation',
    'any.required': 'Location is required'
  });

// Price schema
const priceSchema = Joi.number()
  .positive()
  .max(10000)
  .required()
  .messages({
    'number.base': 'Price must be a number',
    'number.positive': 'Price must be positive',
    'number.max': 'Price cannot exceed 10000',
    'any.required': 'Price is required'
  });

// Max guests schema
const maxGuestsSchema = Joi.number()
  .integer()
  .min(1)
  .max(20)
  .required()
  .messages({
    'number.base': 'Max guests must be a number',
    'number.integer': 'Max guests must be an integer',
    'number.min': 'Max guests must be at least 1',
    'number.max': 'Max guests cannot exceed 20',
    'any.required': 'Max guests is required'
  });

// Bedrooms schema
const bedroomsSchema = Joi.number()
  .integer()
  .min(0)
  .max(10)
  .required()
  .messages({
    'number.base': 'Bedrooms must be a number',
    'number.integer': 'Bedrooms must be an integer',
    'number.min': 'Bedrooms cannot be negative',
    'number.max': 'Bedrooms cannot exceed 10',
    'any.required': 'Bedrooms is required'
  });

// Bathrooms schema
const bathroomsSchema = Joi.number()
  .integer()
  .min(0)
  .max(10)
  .required()
  .messages({
    'number.base': 'Bathrooms must be a number',
    'number.integer': 'Bathrooms must be an integer',
    'number.min': 'Bathrooms cannot be negative',
    'number.max': 'Bathrooms cannot exceed 10',
    'any.required': 'Bathrooms is required'
  });

// Property type schema
const propertyTypeSchema = Joi.string()
  .pattern(propertyTypePattern)
  .min(2)
  .max(50)
  .required()
  .messages({
    'string.pattern.base': 'Property type can only contain letters and spaces',
    'string.min': 'Property type must be at least 2 characters long',
    'string.max': 'Property type cannot exceed 50 characters',
    'any.required': 'Property type is required'
  });

// Status schema
const statusSchema = Joi.string()
  .valid('available', 'booked', 'maintenance', 'unavailable')
  .default('available')
  .messages({
    'any.only': 'Status must be one of: available, booked, maintenance, unavailable'
  });

// Add property validation schema
const addPropertySchema = {
  body: Joi.object({
    host_id: hostIdSchema,
    title: titleSchema,
    description: descriptionSchema,
    location: locationSchema,
    price: priceSchema,
    max_guests: maxGuestsSchema,
    bedrooms: bedroomsSchema,
    bathrooms: bathroomsSchema,
    property_type: propertyTypeSchema,
    status: statusSchema
  }),
  query: Joi.object({}).empty(),
  params: Joi.object({}).empty()
};

// Get all properties validation schema (no body, no params, query optional)
const getAllPropertiesSchema = {
  body: Joi.object({}).empty(),
  query: Joi.object({}).empty(),
  params: Joi.object({}).empty()
};

// Get property by ID validation schema
const getPropertyByIdSchema = {
  body: Joi.object({}).empty(),
  query: Joi.object({}).empty(),
  params: Joi.object({
    id: propertyIdSchema
  })
};

// Update property validation schema
const updatePropertySchema = {
  body: Joi.object({
    host_id: hostIdSchema,
    title: Joi.string()
      .min(3)
      .max(100)
      .pattern(titlePattern)
      .optional()
      .messages({
        'string.min': 'Title must be at least 3 characters long',
        'string.max': 'Title cannot exceed 100 characters',
        'string.pattern.base': 'Title can only contain letters, numbers, spaces, and basic punctuation'
      }),
    description: Joi.string()
      .min(10)
      .max(1000)
      .optional()
      .messages({
        'string.min': 'Description must be at least 10 characters long',
        'string.max': 'Description cannot exceed 1000 characters'
      }),
    location: Joi.string()
      .min(3)
      .max(200)
      .pattern(locationPattern)
      .optional()
      .messages({
        'string.min': 'Location must be at least 3 characters long',
        'string.max': 'Location cannot exceed 200 characters',
        'string.pattern.base': 'Location can only contain letters, numbers, spaces, and basic punctuation'
      }),
    price: Joi.number()
      .positive()
      .max(10000)
      .optional()
      .messages({
        'number.base': 'Price must be a number',
        'number.positive': 'Price must be positive',
        'number.max': 'Price cannot exceed 10000'
      }),
    max_guests: Joi.number()
      .integer()
      .min(1)
      .max(20)
      .optional()
      .messages({
        'number.base': 'Max guests must be a number',
        'number.integer': 'Max guests must be an integer',
        'number.min': 'Max guests must be at least 1',
        'number.max': 'Max guests cannot exceed 20'
      }),
    bedrooms: Joi.number()
      .integer()
      .min(0)
      .max(10)
      .optional()
      .messages({
        'number.base': 'Bedrooms must be a number',
        'number.integer': 'Bedrooms must be an integer',
        'number.min': 'Bedrooms cannot be negative',
        'number.max': 'Bedrooms cannot exceed 10'
      }),
    bathrooms: Joi.number()
      .integer()
      .min(0)
      .max(10)
      .optional()
      .messages({
        'number.base': 'Bathrooms must be a number',
        'number.integer': 'Bathrooms must be an integer',
        'number.min': 'Bathrooms cannot be negative',
        'number.max': 'Bathrooms cannot exceed 10'
      }),
    property_type: Joi.string()
      .pattern(propertyTypePattern)
      .min(2)
      .max(50)
      .optional()
      .messages({
        'string.pattern.base': 'Property type can only contain letters and spaces',
        'string.min': 'Property type must be at least 2 characters long',
        'string.max': 'Property type cannot exceed 50 characters'
      }),
    status: statusSchema
  }).min(1).messages({
    'object.min': 'At least one field must be provided for update'
  }),
  query: Joi.object({}).empty(),
  params: Joi.object({
    id: propertyIdSchema
  })
};

// Delete property validation schema
const deletePropertySchema = {
  body: Joi.object({}).empty(),
  query: Joi.object({}).empty(),
  params: Joi.object({
    id: propertyIdSchema
  })
};

module.exports = {
  addPropertySchema,
  getAllPropertiesSchema,
  getPropertyByIdSchema,
  updatePropertySchema,
  deletePropertySchema
}; 