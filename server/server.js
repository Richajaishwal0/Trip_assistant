const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");
const {
  handleServerError,
  logError,
  sendSuccess,
} = require("./utils/errorHandler");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
// Serve uploads from the exact same path as uploads.js
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/static", express.static("static"));

// Database connection
connectDB();

// Routes
const entryRoutes = require("./routes/entry-point");
const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const placeRoutes = require("./routes/placeRoutes");
const userActivityRoutes=require("./routes/user-activity-check")

// API routes
app.use("/entry-point", entryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/more-places", placeRoutes);
app.use("/api/user/activity",userActivityRoutes)

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
