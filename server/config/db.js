// MongoDB database configuration for Trip Assistant
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
 const mongoURI = process.env.MONGO_DB_URI || "mongodb://localhost:27017/tripPlannerDB";
 
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("✅ MongoDB Database connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    console.error("Please check your MongoDB connection string and make sure MongoDB is running.");
    // Don't exit the process in production
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
