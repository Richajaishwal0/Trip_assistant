import React, { FormEvent, useEffect, useState } from "react";

interface ExtraExpense {
  id: string;
  category: string;
  amount: number;
}

const EXCHANGE_API_KEY = "f02838ecdf804300bff9c4e5"; // Replace with your actual API key
const CURRENCY_SYMBOLS: { [key: string]: string } = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  INR: "₹",
  AUD: "A$",
  CAD: "C$",
};

const TripBudgetEstimator: React.FC = () => {
  const [days, setDays] = useState(1);
  const [budgetPerDay, setBudgetPerDay] = useState(1000);
  const [extraExpenses, setExtraExpenses] = useState<ExtraExpense[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);

  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // Fetch exchange rates
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/INR`
        );
        const data = await response.json();
        setExchangeRates(data.conversion_rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExchangeRates();
  }, []);

  // Dark mode observer
  useEffect(() => {
    const checkDark = () =>
      setDarkMode(document.body.classList.contains("dark-mode"));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const calculateBudget = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

    const dailyTotal = days * budgetPerDay;
    const extraTotal = extraExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    const newTotal = dailyTotal + extraTotal;
    setTotal(newTotal);
  };

  const handleAddExpense = () => {
    const newExpense: ExtraExpense = {
      id: Date.now().toString(),
      category: "",
      amount: 0,
    };
    setExtraExpenses([...extraExpenses, newExpense]);
  };

  const handleExpenseChange = (
    id: string,
    field: "category" | "amount",
    value: string | number
  ) => {
    setExtraExpenses((expenses) =>
      expenses.map((expense) =>
        expense.id === id ? { ...expense, [field]: value } : expense
      )
    );
  };

  const handleRemoveExpense = (id: string) => {
    setExtraExpenses((expenses) =>
      expenses.filter((expense) => expense.id !== id)
    );
  };

  const convertCurrency = (amount: number): number => {
    if (!exchangeRates[selectedCurrency]) return amount;
    return amount * exchangeRates[selectedCurrency];
  };

  const formatCurrency = (amount: number): string => {
    const symbol = CURRENCY_SYMBOLS[selectedCurrency] || selectedCurrency;
    return `${symbol}${convertCurrency(amount).toLocaleString("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })}`;
  };

  console.log(darkMode);

  return (
    <div
      className={
        darkMode
          ? "p-6 max-w-2xl mx-auto bg-slate-600 border text-white rounded mt-5"
          : "p-6 max-w-2xl mx-auto bg-white text-black rounded shadow mt-5"
      }
    >
      <h2 className="text-2xl font-bold mb-6">Trip Budget Estimator</h2>

      <form onSubmit={calculateBudget}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 font-medium">Number of Days:</label>
            <input
              type="number"
              min="1"
              value={days}
              onChange={(e) => setDays(Math.max(1, parseInt(e.target.value)))}
              className="w-full p-3 border rounded mb-4 text-black bg-white"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Budget per Day:</label>
            <div className="relative">
              <input
                type="number"
                min="0"
                value={budgetPerDay}
                onChange={(e) =>
                  setBudgetPerDay(Math.max(0, parseInt(e.target.value)))
                }
                className="w-full p-3 border rounded mb-4 text-black  pl-8 ps-4"
                required
              />
              <span className={"absolute left-3 top-[17px] text-gray-600"}>
                {CURRENCY_SYMBOLS[selectedCurrency]}
              </span>
            </div>
          </div>
        </div>

        {/* Currency Selection */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">Select Currency:</label>
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="w-full p-3 border rounded text-black bg-white"
            disabled={isLoading}
            required
          >
            {Object.keys(CURRENCY_SYMBOLS).map((currency) => (
              <option key={currency} value={currency}>
                {currency} ({CURRENCY_SYMBOLS[currency]})
              </option>
            ))}
          </select>
        </div>

        {/* Extra Expenses Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Extra Expenses</h3>
            <button
              onClick={handleAddExpense}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Expense
            </button>
          </div>

          {extraExpenses.map((expense) => (
            <div key={expense.id} className="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="Category (e.g., Travel, Food)"
                value={expense.category}
                onChange={(e) =>
                  handleExpenseChange(expense.id, "category", e.target.value)
                }
                className="flex-1 p-2 border rounded text-black bg-white"
                required
              />
              <div className="relative w-1/3">
                <input
                  type="number"
                  min="0"
                  value={expense.amount}
                  onChange={(e) =>
                    handleExpenseChange(
                      expense.id,
                      "amount",
                      Math.max(0, parseFloat(e.target.value))
                    )
                  }
                  className="w-full p-2 border rounded text-black bg-white ps-4 "
                  required
                />
                <span className="absolute left-3 top-[9px] pe-4 text-gray-600">
                  {CURRENCY_SYMBOLS[selectedCurrency]}
                </span>
              </div>
              <button
                onClick={() => handleRemoveExpense(expense.id)}
                className="bg-red-500 text-white px-3 rounded hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Calculate Total Budget"}
        </button>
      </form>

      {total !== null && (
        <div
          className={
            darkMode
              ? "mt-6 p-4 bg-slate-700 text-white rounded-lg border border-slate-500"
              : "mt-6 p-4 bg-blue-50 text-black rounded-lg border border-blue-200"
          }
        >
          <h4
            className={
              darkMode
                ? "text-lg font-semibold text-white mb-2"
                : "text-lg font-semibold text-blue-900 mb-2"
            }
          >
            Budget Breakdown:
          </h4>
          <div className={darkMode ? "space-y-2 text-white" : "space-y-2 text-blue-800"}>
            <p>
              Daily Budget: {formatCurrency(budgetPerDay)} × {days} days
            </p>
            <p>Total Daily: {formatCurrency(days * budgetPerDay)}</p>
            {extraExpenses.length > 0 && (
              <>
                <p className="font-medium mt-2">Extra Expenses:</p>
                {extraExpenses.map((expense) => (
                  <p key={expense.id}>
                    {expense.category}: {formatCurrency(expense.amount)}
                  </p>
                ))}
              </>
            )}
            <div
              className={
                darkMode
                  ? "border-t border-slate-500 mt-4 pt-4"
                  : "border-t border-blue-200 mt-4 pt-4"
              }
            >
              <p className={darkMode ? "text-xl font-bold text-white" : "text-xl font-bold"}>
                Total Budget: {formatCurrency(total)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripBudgetEstimator;
