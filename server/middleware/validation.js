const Joi = require('joi');

const validate = (schema) => {
  return (req, res, next) => {
    const { error: bodyError } = schema.body ? schema.body.validate(req.body) : { error: null };
    const { error: queryError } = schema.query ? schema.query.validate(req.query) : { error: null };
    const { error: paramsError } = schema.params ? schema.params.validate(req.params) : { error: null };

    if (bodyError || queryError || paramsError) {
      const errors = [];
      
      if (bodyError) {
        errors.push(`Body: ${bodyError.details[0].message}`);
      }
      if (queryError) {
        errors.push(`Query: ${queryError.details[0].message}`);
      }
      if (paramsError) {
        errors.push(`Params: ${paramsError.details[0].message}`);
      }

      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors
      });
    }

    next();
  };
};

module.exports = validate; 