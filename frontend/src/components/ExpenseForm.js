// 📁 D:\AppDevelopment\instay-app\frontend\src\components\ExpenseForm.js

import React, { useState } from 'react';
import axios from 'axios';

const initialState = {
  date: new Date().toISOString().split('T')[0], // YYYY-MM-DD फॉर्मेट
  description: '',
  amount: '',
  category: '', // डिफ़ॉल्ट खाली
  paymentMethod: 'Cash', // डिफ़ॉल्ट कैश
  paidTo: '',
  remarks: '',
  // voucherImageUrl: '', // फाइल अपलोड के बाद ही इसे अपडेट करेंगे
};

const categories = [
  'Rent & Property',
  'Utilities',
  'Staff Salary',
  'Food & Groceries',
  'Consumables & Supplies',
  'Repairs & Maintenance',
  'Furniture & Appliances',
  'Marketing & Advertising',
  'Miscellaneous'
];

const paymentMethods = [
  'Cash',
  'Bank Transfer',
  'UPI',
  'Card',
  'Other'
];

const ExpenseForm = ({ onSuccess }) => {
  const [form, setForm] = useState(initialState);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage('');

    // बेसिक वैलिडेशन
    if (!form.date || !form.description || !form.amount || !form.category || !form.paymentMethod) {
        setSubmitMessage('Error: Please fill in all required fields (Date, Description, Amount, Category, Payment Method).');
        return;
    }
    if (isNaN(parseFloat(form.amount)) || parseFloat(form.amount) <= 0) {
        setSubmitMessage('Error: Amount must be a positive number.');
        return;
    }

    try {
      // API को भेजने से पहले अमाउंट को नंबर में कन्वर्ट करें
      const dataToSend = {
        ...form,
        amount: parseFloat(form.amount),
      };

      await axios.post('http://localhost:5000/api/expenses', dataToSend);
      setSubmitMessage('Expense added successfully!');
      setForm(initialState); // फॉर्म रीसेट करें
      if (onSuccess) onSuccess(); // Parent component (Home.js) को रीफ्रेश करने के लिए
    } catch (err) {
      console.error('Error adding expense:', err.response ? err.response.data : err.message);
      setSubmitMessage(`Error adding expense: ${err.response && err.response.data && err.response.data.message ? err.response.data.message : 'Please check the form data and backend.'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: '0 auto', padding: '20px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
      <h3 style={{ marginBottom: '20px', color: '#333' }}>Add New Expense</h3>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="date" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Date:</label>
        <input type="date" id="date" name="date" value={form.date} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="description" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description:</label>
        <input type="text" id="description" name="description" value={form.description} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="amount" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Amount:</label>
        <input type="number" id="amount" name="amount" value={form.amount} onChange={handleChange} required step="0.01" min="0" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="category" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Category:</label>
        <select id="category" name="category" value={form.category} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}>
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="paymentMethod" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Payment Method:</label>
        <select id="paymentMethod" name="paymentMethod" value={form.paymentMethod} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}>
          {paymentMethods.map((method) => (
            <option key={method} value={method}>{method}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="paidTo" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Paid To (Optional):</label>
        <input type="text" id="paidTo" name="paidTo" value={form.paidTo} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="remarks" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Remarks (Optional):</label>
        <textarea id="remarks" name="remarks" value={form.remarks} onChange={handleChange} rows="3" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}></textarea>
      </div>

      {/* वाउचर अपलोड के लिए इनपुट अभी नहीं जोड़ा गया है, इसे बाद में फाइल अपलोड फंक्शनलिटी के साथ जोड़ेंगे */}
      {/* <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="voucher" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Upload Voucher (Optional):</label>
        <input type="file" id="voucher" name="voucher" onChange={handleFileChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
      </div> */}

      <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', marginTop: '20px' }}>Add Expense</button>
      {submitMessage && (
        <p style={{ marginTop: '15px', color: submitMessage.includes('Error') ? 'red' : 'green', fontWeight: 'bold' }}>
          {submitMessage}
        </p>
      )}
    </form>
  );
};

export default ExpenseForm;