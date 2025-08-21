const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth");
const {
  createExpense,
  getExpensesForBudget,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

router.use(auth);

// Budget-scoped expenses
router.get("/budget/:budgetId", getExpensesForBudget);
router.post("/", createExpense);
router.get("/:id", getExpenseById);
router.patch("/:id", updateExpense);
router.delete("/:id", deleteExpense);

module.exports = router;


