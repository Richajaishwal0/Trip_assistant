const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const {
  handleServerError,
  logError,
  sendSuccess,
} = require("./utils/errorHandler");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));

// DB Connection check-point
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const placeRoutes = require("./routes/placeRoutes");
const userActivityRoutes=require("./routes/user-activity-check")

// API routes
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/more-places", placeRoutes);
app.use("/api/user/activity",userActivityRoutes)

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
