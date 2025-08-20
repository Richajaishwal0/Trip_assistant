const express = require("express");
const { estimateTrip } = require("../controllers/tripController");

const router = express.Router();

router.post("/estimate", estimateTrip);

module.exports = router;