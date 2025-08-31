const express = require("express");
const router = express.Router();
const { getMorePlaces } = require("../controllers/placeController");
const validate = require('../middleware/validation');
const { getMorePlacesSchema } = require('../validators/placeValidators');

// GET /api/more-places
router.get("/", validate(getMorePlacesSchema), getMorePlaces);

module.exports = router;
