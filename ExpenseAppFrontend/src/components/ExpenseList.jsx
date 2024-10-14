import React, { useState } from "react";

const ExpenseList = ({ expenses, onEditExpense, onDeleteExpense }) => {
  const [editing, setEditing] = useState(null);
  const [newAmount, setNewAmount] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleEditClick = (expense) => {
    setEditing(expense._id);
    setNewAmount(expense.amount);
    setNewDescription(expense.description);
  };

  const handleSaveEdit = async (id) => {
    await fetch(`http://localhost:3000/expenses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: parseFloat(newAmount),
        description: newDescription,
      }),
    });
    onEditExpense(); // Refresh the list after editing
    setEditing(null);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/expenses/${id}`, {
      method: "DELETE",
    });
    onDeleteExpense(); // Refresh the list after deleting
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mt-4 w-full max-w-xl">
      <h2 className="text-xl font-bold mb-4">Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id} className="flex justify-between mb-2">
            {editing === expense._id ? (
              <>
                <input
                  type="number"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="border px-2 py-1 rounded mr-2"
                />
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="border px-2 py-1 rounded mr-2"
                />
                <button
                  onClick={() => handleSaveEdit(expense._id)}
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>
                  {expense.description} - ₹{expense.amount.toFixed(2)}
                </span>
                <div>
                  <button
                    onClick={() => handleEditClick(expense)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(expense._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;

ptani

