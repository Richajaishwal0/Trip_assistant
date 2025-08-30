const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Validate environment variables before starting server
const { validateEnvironment } = require("./utils/envValidator");
const envValidation = validateEnvironment();

if (!envValidation.success) {
  console.error('❌ Server startup failed due to environment configuration errors');
  process.exit(1);
}

const connectDB = require("./config/db");
const {
  handleServerError,
  logError,
  sendSuccess,
} = require("./utils/errorHandler");
const app = express();

// Middleware
app.use(express.json());

// Configure CORS based on environment
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📡 CORS origin: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`);
});
