const mongoose = require("mongoose");

const personRefSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    name: { type: String },
    email: { type: String },
  },
  { _id: false }
);

const shareSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    name: { type: String },
    email: { type: String },
    shareAmount: { type: Number, required: true },
  },
  { _id: false }
);

const expenseSchema = new mongoose.Schema(
  {
    budget: { type: mongoose.Schema.Types.ObjectId, ref: "Budget", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    category: { type: String },
    description: { type: String },
    date: { type: Date, default: Date.now },
    paidBy: { type: personRefSchema, required: true },
    splitType: { type: String, enum: ["equal", "custom"], default: "equal" },
    sharedWith: { type: [shareSchema], default: [] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);


