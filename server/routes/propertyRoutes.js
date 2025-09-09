const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  addProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");
const validate = require('../middleware/validation');
const {
  addPropertySchema,
  getAllPropertiesSchema,
  getPropertyByIdSchema,
  updatePropertySchema,
  deletePropertySchema
} = require('../validators/propertyValidators');

// POST /api/properties - Add new property
router.post("/", upload.array("images", 5), validate(addPropertySchema), addProperty);

// GET /api/properties - Get all properties
router.get("/", validate(getAllPropertiesSchema), getAllProperties);

// GET /api/properties/:id - Get property by ID
router.get("/:id", validate(getPropertyByIdSchema), getPropertyById);

// PUT /api/properties/:id - Update property
router.put("/:id", validate(updatePropertySchema), updateProperty);

// DELETE /api/properties/:id - Delete property
router.delete("/:id", validate(deletePropertySchema), deleteProperty);

module.exports = router;
