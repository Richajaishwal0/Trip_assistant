const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    name: { type: String },
    email: { type: String },
  },
  { _id: false }
);

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    allocatedAmount: { type: Number, default: 0 },
  },
  { _id: false }
);

const budgetSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tripName: { type: String, default: "Trip" },
    totalBudget: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    categories: { type: [categorySchema], default: [] },
    participants: { type: [participantSchema], default: [] },
    notes: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    spentTotal: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Budget", budgetSchema);


