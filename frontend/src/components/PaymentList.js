// 📁 D:\AppDevelopment\instay-app\frontend\src\components\PaymentList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentList = ({ studentId }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      // यदि studentId प्रदान नहीं किया गया है (जैसे कि अगर PaymentList को किसी और जगह पर बिना studentId के रेंडर किया जाता है)
      if (!studentId) {
        setLoading(false);
        setPayments([]); // सुनिश्चित करें कि कोई पुराना डेटा न दिखे
        return;
      }

      try {
        setLoading(true);
        // API कॉल: विशिष्ट छात्र के भुगतान प्राप्त करें
        const response = await axios.get(`http://localhost:5000/api/payments/student/${studentId}`);
        setPayments(response.data);
        setError(null); // यदि पहले कोई एरर थी, तो उसे साफ़ करें
      } catch (err) {
        console.error(`Error fetching payments for student ${studentId}:`, err);
        setError('Failed to fetch payment history. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, [studentId]); // studentId बदलने पर री-फ़ेच करें

  if (loading) return <p style={{ textAlign: 'center', margin: '20px' }}>Loading payments...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center', margin: '20px' }}>{error}</p>;
  if (payments.length === 0) return <p style={{ textAlign: 'center', margin: '20px' }}>No payments found for this student.</p>;

  return (
    <div style={{ marginTop: '20px', maxHeight: '400px', overflowY: 'auto' }}> {/* Added max-height and overflow for scroll */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {payments.map(payment => (
          <li key={payment._id} style={{
            backgroundColor: '#f9f9f9',
            border: '1px solid #e0e0e0',
            borderRadius: '5px',
            padding: '15px',
            marginBottom: '10px',
            textAlign: 'left',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <p style={{ margin: '0 0 5px 0' }}><strong>Amount:</strong> ₹{payment.amount.toFixed(2)}</p>
            <p style={{ margin: '0 0 5px 0' }}><strong>Date:</strong> {new Date(payment.paymentDate).toLocaleDateString()}</p>
            <p style={{ margin: '0 0 5px 0' }}><strong>Method:</strong> {payment.paymentMethod}</p>
            {payment.transactionId && <p style={{ margin: '0 0 5px 0' }}><strong>Transaction ID:</strong> {payment.transactionId}</p>}
            {payment.description && <p style={{ margin: '0 0 5px 0' }}><strong>Description:</strong> {payment.description}</p>}
            <p style={{ fontSize: '0.8em', color: '#777', margin: '10px 0 0 0', borderTop: '1px solid #eee', paddingTop: '5px' }}>
                Added on: {new Date(payment.createdAt).toLocaleDateString()} {new Date(payment.createdAt).toLocaleTimeString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentList;