const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile_no: { type: String, required: true },
  activityCount: { type: Number, default: 0 },
  badges: { type: [String], default: [] }
}, { timestamps: true }); // adds createdAt and updatedAt fields

module.exports = mongoose.model("User", userSchema);
