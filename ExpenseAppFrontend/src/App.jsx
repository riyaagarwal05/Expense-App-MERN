import React, { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);

  // Fetch expenses from backend
  const fetchExpenses = async () => {
    const response = await fetch("http://localhost:3000/expenses");
    const data = await response.json();
    setExpenses(data);
    calculateTotal(data);
  };

  // Calculate the total amount of all expenses
  const calculateTotal = (expenses) => {
    const totalAmount = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    setTotal(totalAmount);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Top Bar */}
      <div className="w-full max-w-xl bg-blue-600 text-white text-center text-2xl font-bold py-4 rounded mb-6">
        Expense Manager
      </div>

      {/* Expense Form */}
      <ExpenseForm onAddExpense={fetchExpenses} />

      {/* Expense List */}
      <ExpenseList
        expenses={expenses}
        onEditExpense={fetchExpenses}
        onDeleteExpense={fetchExpenses}
      />

      {/* Total Expenses */}
      <div className="w-full max-w-xl bg-white text-center text-xl font-bold py-4 rounded shadow-md mt-6">
        Total: ₹{total.toFixed(2)}
      </div>
    </div>
  );
};

export default App;
