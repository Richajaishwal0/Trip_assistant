import React, { useState } from "react";

const TripBudgetEstimator: React.FC = () => {
  const [days, setDays] = useState(1);
  const [budgetPerDay, setBudgetPerDay] = useState(1000);
  const [total, setTotal] = useState<number | null>(null);

  const calculateBudget = () => {
    setTotal(days * budgetPerDay);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Trip Budget Estimator</h2>

      <label className="block mb-2">Number of Days:</label>
      <input
        type="number"
        value={days}
        onChange={(e) => setDays(parseInt(e.target.value))}
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2">Budget per Day (₹):</label>
      <input
        type="number"
        value={budgetPerDay}
        onChange={(e) => setBudgetPerDay(parseInt(e.target.value))}
        className="w-full p-2 border rounded mb-4"
      />

      <button
        onClick={calculateBudget}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Calculate
      </button>

      {total !== null && (
        <div className="mt-4 text-lg font-semibold">
          Estimated Total Budget: ₹{total}
        </div>
      )}
    </div>
  );
};

export default TripBudgetEstimator;