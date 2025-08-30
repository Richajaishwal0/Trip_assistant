const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
  getBudgetSummary,
} = require("../controllers/budgetController");

router.use(auth);

router.post("/", createBudget);
router.get("/", getBudgets);
router.get("/:id", getBudgetById);
router.get("/:id/summary", getBudgetSummary);
router.patch("/:id", updateBudget);
router.delete("/:id", deleteBudget);

module.exports = router;


