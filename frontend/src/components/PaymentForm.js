// 📁 D:\AppDevelopment\instay-app\frontend\src\components\PaymentForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  student: '', // यह छात्र की _id को स्टोर करेगा
  amount: '',
  paymentDate: new Date().toISOString().split('T')[0], // डिफ़ॉल्ट रूप से आज की तारीख (YYYY-MM-DD)
  paymentMethod: 'Cash',
  transactionId: '',
  description: ''
};

const PaymentForm = ({ onPaymentAdded }) => {
  const [form, setForm] = useState(initialState);
  const [students, setStudents] = useState([]); // छात्रों की सूची को ड्रॉपडाउन के लिए
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [errorStudents, setErrorStudents] = useState(null);
  const [submitMessage, setSubmitMessage] = useState('');

  // छात्रों की सूची लोड करें जब कंपोनेंट माउंट हो
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students');
        setStudents(response.data);
      } catch (err) {
        console.error('Error fetching students for payment form:', err);
        setErrorStudents('Failed to load students for selection.');
      } finally {
        setLoadingStudents(false);
      }
    };
    fetchStudents();
  }, []); // खाली डिपेंडेंसी एरे का मतलब है कि यह केवल एक बार चलेगा

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage('');

    try {
      // सुनिश्चित करें कि student ID चुना गया है
      if (!form.student) {
        setSubmitMessage('Error: Please select a student.');
        return;
      }
      // सुनिश्चित करें कि amount मान्य संख्या है
      if (isNaN(parseFloat(form.amount)) || parseFloat(form.amount) <= 0) {
        setSubmitMessage('Error: Please enter a valid amount.');
        return;
      }

      const dataToSend = { ...form, amount: parseFloat(form.amount) };
      // यदि transactionId खाली है, तो इसे payload से हटा दें (यदि मॉडल में sparse: true है)
      if (!dataToSend.transactionId) {
        delete dataToSend.transactionId;
      }
      // यदि description खाली है, तो इसे payload से हटा दें
      if (!dataToSend.description) {
        delete dataToSend.description;
      }

      await axios.post('http://localhost:5000/api/payments', dataToSend);
      setSubmitMessage('Payment added successfully!');
      setForm(initialState); // फॉर्म रीसेट करें
      if (onPaymentAdded) onPaymentAdded(); // भुगतान सूची को रीफ्रेश करने के लिए ट्रिगर करें
    } catch (err) {
      console.error('Error adding payment from frontend:', err.response ? err.response.data : err.message);
      setSubmitMessage(`Error adding payment: ${err.response && err.response.data && err.response.data.details ? err.response.data.details : (err.response && err.response.data && err.response.data.message ? err.response.data.message : 'Please check the form data and backend.')}`);
    }
  };

  if (loadingStudents) {
    return <p>Loading students for payment form...</p>;
  }

  if (errorStudents) {
    return <p style={{ color: 'red' }}>{errorStudents}</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: '0 auto', padding: '20px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
      <h3 style={{ marginBottom: '20px', color: '#333' }}>Add New Payment</h3>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="student" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Select Student:</label>
        <select
          id="student"
          name="student"
          value={form.student}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        >
          <option value="">-- Select a Student --</option>
          {students.map(student => (
            <option key={student._id} value={student._id}>
              {student.name} ({student.collegeName})
            </option>
          ))}
        </select>
        {students.length === 0 && !loadingStudents && <p style={{ color: 'orange' }}>No students available. Please add students first.</p>}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="amount" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Amount:</label>
        <input
          id="amount"
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          required
          step="0.01" // दशमलव मानों के लिए
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="paymentDate" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Payment Date:</label>
        <input
          id="paymentDate"
          type="date"
          name="paymentDate"
          value={form.paymentDate}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="paymentMethod" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Payment Method:</label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        >
          <option value="Cash">Cash</option>
          <option value="Online Transfer">Online Transfer</option>
          <option value="Card">Card</option>
          <option value="Cheque">Cheque</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="transactionId" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Transaction ID (Optional):</label>
        <input
          id="transactionId"
          type="text"
          name="transactionId"
          value={form.transactionId}
          onChange={handleChange}
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

      <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}>Add Payment</button>
      {submitMessage && (
        <p style={{ marginTop: '15px', color: submitMessage.includes('Error') ? 'red' : 'green', fontWeight: 'bold' }}>
          {submitMessage}
        </p>
      )}
    </form>
  );
};

export default PaymentForm;