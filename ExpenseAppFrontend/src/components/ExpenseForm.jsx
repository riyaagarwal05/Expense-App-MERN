import React, { useState } from "react";

const ExpenseForm = ({ onAddExpense }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleAddExpense = async (e) => {
    e.preventDefault();

    const expenseData = {
      description: description,
      amount: parseFloat(amount),
    };

    try {
      const response = await fetch("http://localhost:3000/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add expense");
      }

      setAmount("");
      setDescription("");
      setError(null);
      onAddExpense(); // Refresh the expense list after adding
    } catch (error) {
      console.error("Error:", error.message);
      setError("Failed to add expense. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleAddExpense}
      className="w-full max-w-xl bg-white p-4 rounded shadow-md mb-6"
    >
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2"
        >
          Description
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Expense description"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Expense amount"
          step="0.01"
          required
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
      >
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
