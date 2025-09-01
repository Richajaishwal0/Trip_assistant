const Expense = require("../models/expense");
const Budget = require("../models/budget");
const { handleServerError, sendSuccess } = require("../utils/errorHandler");

function normalizePersons(list = []) {
  return list.map((p) => ({
    user: p.user || undefined,
    name: p.name || undefined,
    email: p.email || undefined,
  }));
}

function computeEqualShares(amount, participants) {
  const count = Math.max(participants.length, 1);
  const share = Number((amount / count).toFixed(2));
  const remainder = Number((amount - share * count).toFixed(2));
  // Distribute rounding remainder to the first participants
  return participants.map((p, idx) => ({
    user: p.user,
    name: p.name,
    email: p.email,
    shareAmount: Number((share + (idx < Math.round(Math.abs(remainder) * 100) / 100 ? Math.sign(remainder) * 0.01 : 0)).toFixed(2)),
  }));
}

const createExpense = async (req, res) => {
  try {
    const createdBy = req.user?.userId;
    const { budget: budgetId, amount, currency, category, description, date, paidBy, splitType = "equal", sharedWith = [], customShares = [] } = req.body;

    if (!budgetId || !amount || !paidBy) {
      return res.status(400).json({ success: false, message: "budget, amount and paidBy are required" });
    }

    const budget = await Budget.findById(budgetId);
    if (!budget) return res.status(404).json({ success: false, message: "Budget not found" });

    let shares = [];
    if (splitType === "custom" && customShares?.length) {
      shares = customShares.map((s) => ({
        user: s.user,
        name: s.name,
        email: s.email,
        shareAmount: s.shareAmount,
      }));
    } else {
      const participants = normalizePersons(sharedWith);
      shares = computeEqualShares(amount, participants);
    }

    const expense = await Expense.create({
      budget: budgetId,
      amount,
      currency,
      category,
      description,
      date,
      paidBy,
      splitType,
      sharedWith: shares,
      createdBy,
    });

    return sendSuccess(res, expense, "Expense created", 201);
  } catch (error) {
    return handleServerError(error, "Create expense", res);
  }
};

const getExpensesForBudget = async (req, res) => {
  try {
    const { budgetId } = req.params;
    const expenses = await Expense.find({ budget: budgetId }).sort({ date: -1 });
    return sendSuccess(res, expenses);
  } catch (error) {
    return handleServerError(error, "Get expenses for budget", res);
  }
};

const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ success: false, message: "Expense not found" });
    return sendSuccess(res, expense);
  } catch (error) {
    return handleServerError(error, "Get expense by id", res);
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const update = { ...req.body };

    // Recompute shares if amount or split data changed
    if (update.splitType || update.sharedWith || update.customShares || update.amount) {
      const existing = await Expense.findById(id);
      if (!existing) return res.status(404).json({ success: false, message: "Expense not found" });
      const splitType = update.splitType || existing.splitType;
      const amount = update.amount ?? existing.amount;
      if (splitType === "custom" && update.customShares?.length) {
        update.sharedWith = update.customShares.map((s) => ({
          user: s.user,
          name: s.name,
          email: s.email,
          shareAmount: s.shareAmount,
        }));
      } else if (update.sharedWith || update.amount) {
        const participants = normalizePersons(update.sharedWith || existing.sharedWith);
        update.sharedWith = computeEqualShares(amount, participants);
      }
      delete update.customShares;
    }

    const expense = await Expense.findByIdAndUpdate(id, update, { new: true });
    if (!expense) return res.status(404).json({ success: false, message: "Expense not found" });
    return sendSuccess(res, expense, "Expense updated");
  } catch (error) {
    return handleServerError(error, "Update expense", res);
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) return res.status(404).json({ success: false, message: "Expense not found" });
    return sendSuccess(res, null, "Expense deleted");
  } catch (error) {
    return handleServerError(error, "Delete expense", res);
  }
};

module.exports = {
  createExpense,
  getExpensesForBudget,
  getExpenseById,
  updateExpense,
  deleteExpense,
};


