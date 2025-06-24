// 📁 D:\AppDevelopment\instay-app\frontend\src\components\ExpenseList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseList = ({ refreshKey }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get('http://localhost:5000/api/expenses');
        setExpenses(response.data);
      } catch (err) {
        console.error('Error fetching expenses:', err);
        setError('Failed to fetch expenses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, [refreshKey]); // refreshKey के बदलने पर डेटा रीफ्रेश होगा

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense record?')) {
      try {
        await axios.delete(`http://localhost:5000/api/expenses/${id}`);
        setExpenses(expenses.filter(expense => expense._id !== id));
        alert('Expense deleted successfully!');
      } catch (err) {
        console.error('Error deleting expense:', err.response ? err.response.data : err.message);
        alert(`Error deleting expense: ${err.response && err.response.data && err.response.data.message ? err.response.data.message : 'Please try again.'}`);
      }
    }
  };

  if (loading) return <p style={{ textAlign: 'center', margin: '20px' }}>Loading expenses...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red', margin: '20px' }}>{error}</p>;
  if (expenses.length === 0) return <p style={{ textAlign: 'center', margin: '20px' }}>No expenses found. Add some expenses using the form above.</p>;

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: '20px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
      <h3 style={{ marginBottom: '20px', color: '#333' }}>All Expenses</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Date</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Description</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'right' }}>Amount</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Category</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Method</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Paid To</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(expense.date).toLocaleDateString()}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{expense.description}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'right' }}>₹{expense.amount.toFixed(2)}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{expense.category}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{expense.paymentMethod}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{expense.paidTo || 'N/A'}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <button
                  onClick={() => handleDelete(expense._id)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    padding: '5px 10px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;