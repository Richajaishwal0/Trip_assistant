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
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));

// Database connection
connectDB();

// Routes
const entryRoutes = require("./routes/entry-point");
const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const placeRoutes = require("./routes/placeRoutes");
const userActivityRoutes=require("./routes/user-activity-check")
const budgetRoutes = require("./routes/budgetRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

// API routes
app.use("/entry-point", entryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/more-places", placeRoutes);
app.use("/api/user/activity",userActivityRoutes)
app.use("/api/budgets", budgetRoutes);
app.use("/api/expenses", expenseRoutes);

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
