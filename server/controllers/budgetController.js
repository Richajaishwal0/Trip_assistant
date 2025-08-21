const Budget = require("../models/budget");
const Expense = require("../models/expense");
const { handleServerError, sendSuccess } = require("../utils/errorHandler");

function computeSettlement(expenses) {
  const balances = {}; // key -> { paid: number, owed: number }

  for (const exp of expenses) {
    const payerKey = exp.paidBy?.user?.toString() || exp.paidBy?.email || exp.paidBy?.name || "unknown";
    if (!balances[payerKey]) balances[payerKey] = { paid: 0, owed: 0 };
    balances[payerKey].paid += exp.amount;

    for (const sh of exp.sharedWith) {
      const key = sh.user?.toString() || sh.email || sh.name || "unknown";
      if (!balances[key]) balances[key] = { paid: 0, owed: 0 };
      balances[key].owed += sh.shareAmount;
    }
  }

  const summary = Object.entries(balances).map(([person, v]) => ({
    person,
    paid: Number(v.paid.toFixed(2)),
    owed: Number(v.owed.toFixed(2)),
    net: Number((v.owed - v.paid).toFixed(2)),
  }));

  return summary;
}

const createBudget = async (req, res) => {
  try {
    const owner = req.user?.userId;
    const { tripName, totalBudget, currency, categories = [], participants = [], notes, startDate, endDate } = req.body;

    if (!totalBudget) {
      return res.status(400).json({ success: false, message: "totalBudget is required" });
    }

    const budget = await Budget.create({
      owner,
      tripName,
      totalBudget,
      currency,
      categories,
      participants,
      notes,
      startDate,
      endDate,
    });

    return sendSuccess(res, budget, "Budget created", 201);
  } catch (error) {
    return handleServerError(error, "Create budget", res);
  }
};

const getBudgets = async (req, res) => {
  try {
    const owner = req.user?.userId;
    const budgets = await Budget.find({ owner }).sort({ createdAt: -1 });
    return sendSuccess(res, budgets);
  } catch (error) {
    return handleServerError(error, "Get budgets", res);
  }
};

const getBudgetById = async (req, res) => {
  try {
    const { id } = req.params;
    const budget = await Budget.findById(id);
    if (!budget) return res.status(404).json({ success: false, message: "Budget not found" });
    const expenses = await Expense.find({ budget: id }).sort({ date: -1 });
    const totalSpent = expenses.reduce((acc, e) => acc + e.amount, 0);
    const settlement = computeSettlement(expenses);
    return sendSuccess(res, { budget, expenses, totalSpent, settlement });
  } catch (error) {
    return handleServerError(error, "Get budget by id", res);
  }
};

const updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const budget = await Budget.findByIdAndUpdate(id, update, { new: true });
    if (!budget) return res.status(404).json({ success: false, message: "Budget not found" });
    return sendSuccess(res, budget, "Budget updated");
  } catch (error) {
    return handleServerError(error, "Update budget", res);
  }
};

const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const budget = await Budget.findById(id);
    if (!budget) return res.status(404).json({ success: false, message: "Budget not found" });
    await Expense.deleteMany({ budget: id });
    await budget.deleteOne();
    return sendSuccess(res, null, "Budget and related expenses deleted");
  } catch (error) {
    return handleServerError(error, "Delete budget", res);
  }
};

const getBudgetSummary = async (req, res) => {
  try {
    const { id } = req.params;
    const expenses = await Expense.find({ budget: id });
    const totalSpent = expenses.reduce((acc, e) => acc + e.amount, 0);
    const settlement = computeSettlement(expenses);
    return sendSuccess(res, { totalSpent, settlement });
  } catch (error) {
    return handleServerError(error, "Get budget summary", res);
  }
};

module.exports = {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
  getBudgetSummary,
};


