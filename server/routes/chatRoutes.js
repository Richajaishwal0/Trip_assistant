const express = require("express");
const { handleChat } = require("../controllers/chatController");

const router = express.Router();

router.post("/query", handleChat);

module.exports = router;
