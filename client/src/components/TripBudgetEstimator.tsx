"use client";

import React, { useState } from "react";
import axios from "axios";

const TripBudgetEstimator = () => {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post("http://localhost:5000/api/trip/estimate", {
        destination,
        days,
        budget,
      });

      // The API response is in a raw text format.
      // We will handle the formatting manually based on the content.
      setResult(res.data.result);
    } catch (err) {
      setResult("Error: Could not fetch estimation");
    } finally {
      setLoading(false);
    }
  };

  const renderFormattedResult = () => {
    if (!result) return null;

    const lines = result.split('\n');

    return lines.map((line, index) => {
      // Trim whitespace from the beginning and end of the line
      const trimmedLine = line.trim();

      // Check for headings (e.g., ##)
      if (trimmedLine.startsWith('## ')) {
        const text = trimmedLine.substring(3).trim();
        return <h2 key={index} className="text-xl font-bold mt-4 mb-2">{text}</h2>;
      }

      // Check for subheadings (e.g., **)
      if (trimmedLine.startsWith('* **')) {
        const text = trimmedLine.replace(/\* \*\*(.*?)\*\*/, '$1');
        return <h3 key={index} className="text-lg font-semibold mt-4 mb-1">{text}</h3>;
      }
      
      // Check for bullet points (e.g., *)
      if (trimmedLine.startsWith('* ')) {
        const text = trimmedLine.substring(2).trim();
        return <li key={index} className="list-disc ml-6">{text}</li>;
      }

      // Check for other bold text
      if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        const text = trimmedLine.replace(/\*\*(.*?)\*\*/, '$1');
        return <p key={index} className="font-semibold">{text}</p>;
      }

      // Default rendering for a paragraph
      return <p key={index} className="my-1">{trimmedLine}</p>;
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Trip Budget Estimator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Number of Days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Estimating..." : "Estimate Trip"}
        </button>
      </form>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="font-semibold">Estimation:</h2>
          <div className="text-sm leading-relaxed">
            {renderFormattedResult()}
          </div>
        </div>
      )}
    </div>
  );
};

export default TripBudgetEstimator;