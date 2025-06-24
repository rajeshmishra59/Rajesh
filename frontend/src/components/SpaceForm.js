// 📁 D:\AppDevelopment\instay-app\frontend\src\components\SpaceForm.js

import React, { useState } from 'react';
import axios from 'axios';

const initialState = {
  roomNumber: '',
  bedNumber: '',
  sharingType: 'Single', // डिफ़ॉल्ट मान
  monthlyRent: '',
  description: ''
};

const SpaceForm = ({ onSpaceAdded }) => {
  const [form, setForm] = useState(initialState);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    // roomNumber और bedNumber को हमेशा अपरकेस में रखें
    if (name === 'roomNumber' || name === 'bedNumber') {
      setForm(prev => ({ ...prev, [name]: value.toUpperCase() }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage(''); // पिछला संदेश साफ़ करें

    try {
      // monthlyRent का सत्यापन
      const rent = parseFloat(form.monthlyRent);
      if (isNaN(rent) || rent <= 0) {
        setSubmitMessage('Error: Monthly Rent must be a positive number.');
        return;
      }

      // dataToSend में केवल आवश्यक फ़ील्ड शामिल करें
      const dataToSend = {
        roomNumber: form.roomNumber,
        bedNumber: form.bedNumber,
        sharingType: form.sharingType,
        monthlyRent: rent,
        description: form.description
      };

      await axios.post('http://localhost:5000/api/spaces', dataToSend);
      setSubmitMessage('Space added successfully!');
      setForm(initialState); // फॉर्म रीसेट करें
      if (onSpaceAdded) onSpaceAdded(); // SpaceList को रीफ्रेश करने के लिए ट्रिगर करें
    } catch (err) {
      console.error('Error adding space from frontend:', err.response ? err.response.data : err.message);
      setSubmitMessage(`Error adding space: ${err.response && err.response.data && err.response.data.message ? err.response.data.message : 'Please check the form data and backend.'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: '0 auto', padding: '20px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
      <h3 style={{ marginBottom: '20px', color: '#333' }}>Add New Co-Living Space (Bed)</h3>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="roomNumber" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Room Number:</label>
        <input
          id="roomNumber"
          type="text"
          name="roomNumber"
          value={form.roomNumber}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="bedNumber" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Bed Number (e.g., B1, B2):</label>
        <input
          id="bedNumber"
          type="text"
          name="bedNumber"
          value={form.bedNumber}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="sharingType" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Sharing Type:</label>
        <select
          id="sharingType"
          name="sharingType"
          value={form.sharingType}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        >
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Triple">Triple</option>
          <option value="Quad">Quad</option>
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="monthlyRent" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Monthly Rent (per bed):</label>
        <input
          id="monthlyRent"
          type="number"
          name="monthlyRent"
          value={form.monthlyRent}
          onChange={handleChange}
          required
          step="0.01"
          min="0"
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="description" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description (Optional):</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="3"
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        ></textarea>
      </div>

      <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}>Add Space</button>
      {submitMessage && (
        <p style={{ marginTop: '15px', color: submitMessage.includes('Error') ? 'red' : 'green', fontWeight: 'bold' }}>
          {submitMessage}
        </p>
      )}
    </form>
  );
};

export default SpaceForm;