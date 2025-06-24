// 📁 D:\AppDevelopment\instay-app\frontend\src\components\ComplaintForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // AuthContext से useAuth इम्पोर्ट करें

const categories = [
  'Plumbing',
  'Electrical',
  'Cleaning & Housekeeping',
  'Internet & Wi-Fi',
  'Furniture & Appliances',
  'Pest Control',
  'Safety & Security',
  'Food & Mess',
  'Management & Staff',
  'Other'
];

const ComplaintForm = ({ onSuccess }) => {
  const { user } = useAuth(); // वर्तमान लॉग इन यूजर प्राप्त करें
  const [form, setForm] = useState({
    studentId: user?.student?._id || '', // यदि छात्र लॉग इन है तो उसकी ID प्री-फिल करें
    category: '',
    description: '',
    space: '', // वैकल्पिक
  });
  const [students, setStudents] = useState([]); // छात्रों की सूची (एडमिन/मैनेजर के लिए)
  const [spaces, setSpaces] = useState([]);   // स्पेस की सूची
  const [submitMessage, setSubmitMessage] = useState('');
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingSpaces, setLoadingSpaces] = useState(false);

  useEffect(() => {
    // एडमिन/मैनेजर/वार्डन के लिए छात्रों की सूची लोड करें
    if (user && ['Admin', 'Manager', 'Warden'].includes(user.role)) {
      const fetchStudents = async () => {
        setLoadingStudents(true);
        try {
          const response = await axios.get('http://localhost:5000/api/students');
          setStudents(response.data);
        } catch (error) {
          console.error('Error fetching students:', error);
        } finally {
          setLoadingStudents(false);
        }
      };
      fetchStudents();
    }

    // सभी यूजर्स के लिए स्पेस की सूची लोड करें
    const fetchSpaces = async () => {
      setLoadingSpaces(true);
      try {
        const response = await axios.get('http://localhost:5000/api/spaces');
        setSpaces(response.data);
      } catch (error) {
        console.error('Error fetching spaces:', error);
      } finally {
        setLoadingSpaces(false);
      }
    };
    fetchSpaces();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage('');

    if (!form.studentId || !form.category || !form.description) {
        setSubmitMessage('Error: Please fill in all required fields (Student, Category, Description).');
        return;
    }

    try {
      await axios.post('http://localhost:5000/api/complaints', form);
      setSubmitMessage('Complaint submitted successfully!');
      setForm({
        studentId: user?.student?._id || '',
        category: '',
        description: '',
        space: '',
      }); // फॉर्म रीसेट करें
      if (onSuccess) onSuccess(); // Parent component को रीफ्रेश करने के लिए
    } catch (err) {
      console.error('Error submitting complaint:', err.response ? err.response.data : err.message);
      setSubmitMessage(`Error submitting complaint: ${err.response && err.response.data && err.response.data.message ? err.response.data.message : 'Please check the form data and backend.'}`);
    }
  };

  if (!user) return <p>Please log in to submit a complaint.</p>; // यूजर लॉग इन नहीं है तो संदेश दिखाएं

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: '0 auto', padding: '20px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
      <h3 style={{ marginBottom: '20px', color: '#333' }}>Submit New Complaint</h3>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="studentId" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Student:</label>
        {user.role === 'Student' ? (
          <input
            type="text"
            id="studentNameDisplay"
            value={`${user.username} (Your ID: ${user.student ? user.student._id : 'N/A'})`}
            readOnly
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', backgroundColor: '#f0f0f0' }}
          />
        ) : (
          <select
            id="studentId"
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
          >
            <option value="">-- Select Student --</option>
            {loadingStudents ? (
              <option>Loading students...</option>
            ) : (
              students.map(student => (
                <option key={student._id} value={student._id}>
                  {`${student.firstName} ${student.lastName} (Room: ${student.roomNumber || 'N/A'})`}
                </option>
              ))
            )}
          </select>
        )}
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
        <label htmlFor="description" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description:</label>
        <textarea id="description" name="description" value={form.description} onChange={handleChange} required rows="4" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}></textarea>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="space" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Related Space (Optional):</label>
        <select id="space" name="space" value={form.space} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}>
          <option value="">-- Select Space (Room/Bed) --</option>
          {loadingSpaces ? (
            <option>Loading spaces...</option>
          ) : (
            spaces.map(space => (
              <option key={space._id} value={space._id}>
                {`Room: ${space.roomNumber}, Bed: ${space.bedNumber}`}
              </option>
            ))
          )}
        </select>
      </div>

      {/* अटैचमेंट अपलोड के लिए इनपुट अभी नहीं जोड़ा गया है, इसे बाद में फाइल अपलोड फंक्शनलिटी के साथ जोड़ेंगे */}

      <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', marginTop: '20px' }}>Submit Complaint</button>
      {submitMessage && (
        <p style={{ marginTop: '15px', color: submitMessage.includes('Error') ? 'red' : 'green', fontWeight: 'bold' }}>
          {submitMessage}
        </p>
      )}
    </form>
  );
};

export default ComplaintForm;