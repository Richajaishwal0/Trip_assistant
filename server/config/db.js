// MongoDB database configuration for Trip Assistant
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    // Validate that MONGO_DB_URI is set
    if (!process.env.MONGO_DB_URI) {
      throw new Error('MONGO_DB_URI environment variable is not set. Please configure your MongoDB connection string.');
    }

    const mongoURI = process.env.MONGO_DB_URI;
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("✅ MongoDB Database connected successfully!");
    console.log(`📍 Connected to: ${mongoURI.replace(/\/\/.*@/, '//*****@')}`); // Hide credentials in logs
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    
    if (error.message.includes('MONGO_DB_URI')) {
      console.error("\n🔧 Fix: Copy server/.env.sample to server/.env and configure MONGO_DB_URI");
    } else {
      console.error("Please check your MongoDB connection string and make sure MongoDB is running.");
    }
    
    // Don't exit the process in production, but log the error clearly
    if (process.env.NODE_ENV !== 'production') {
      console.error("\n🚨 Exiting due to database connection failure in development mode");
      process.exit(1);
    }
  }
};

module.exports = connectDB;
