// 📁 D:\AppDevelopment\instay-app\frontend\src\components\StudentForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  name: '',
  email: '',
  phone: '',
  college: '',
  currentAddress: '',
  permanentAddress: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
  dateOfBirth: '',
  nationality: 'Indian',
  guardianName: '',
  guardianPhone: '',
  checkInDate: '',       // नया फ़ील्ड
  bookingAmount: '',     // नया फ़ील्ड
  assignedSpace: '',     // नया फ़ील्ड (Space ID)
};

const StudentForm = ({ onSuccess }) => {
  const [form, setForm] = useState(initialState);
  const [submitMessage, setSubmitMessage] = useState('');
  const [availableSpaces, setAvailableSpaces] = useState([]); // उपलब्ध स्पेस स्टोर करने के लिए

  // उपलब्ध स्पेस को फ़ेच करें जब कंपोनेंट माउंट होता है
  useEffect(() => {
    const fetchAvailableSpaces = async () => {
      try {
        // केवल 'Available' स्टेटस वाले स्पेस को फ़ेच करें
        const response = await axios.get('http://localhost:5000/api/spaces?status=Available');
        setAvailableSpaces(response.data);
      } catch (err) {
        console.error('Error fetching available spaces:', err);
        setSubmitMessage('Error fetching available spaces. Please try again.');
      }
    };
    fetchAvailableSpaces();
  }, []); // खाली डिपेंडेंसी एरे का मतलब है कि यह केवल एक बार चलेगा

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev.form, [name]: value })); // prev.form हटा दिया
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage('');

    try {
      // सुनिश्चित करें कि bookingAmount एक वैध संख्या है
      const parsedBookingAmount = parseFloat(form.bookingAmount);
      if (isNaN(parsedBookingAmount) || parsedBookingAmount <= 0) {
        setSubmitMessage('Error: Booking amount must be a positive number.');
        return;
      }

      // डेटा भेजने के लिए एक ऑब्जेक्ट तैयार करें
      const dataToSend = {
        ...form,
        bookingAmount: parsedBookingAmount, // पार्स की गई राशि का उपयोग करें
        // यदि assignedSpace खाली स्ट्रिंग है, तो उसे null भेजें
        assignedSpace: form.assignedSpace === '' ? null : form.assignedSpace,
      };

      // यदि checkInDate खाली है, तो उसे null भेजें
      if (dataToSend.checkInDate === '') {
        dataToSend.checkInDate = null;
      }

      await axios.post('http://localhost:5000/api/students', dataToSend);
      setSubmitMessage('Student added successfully!');
      setForm(initialState); // फॉर्म रीसेट करें

      // Spaces को भी रीफ़्रेश करने की ज़रूरत है क्योंकि एक स्पेस अब 'Occupied' हो सकता है
      // इसके लिए हम Home.js में StudentForm को onSpaceAssigned prop दे सकते हैं,
      // लेकिन अभी के लिए, हम केवल onSuccess का उपयोग कर रहे हैं।
      // Home.js में onStudentAdded StudentList को रीफ्रेश करेगा, और SpaceList को भी रीफ्रेश करने की आवश्यकता होगी
      // यदि आप Home.js में SpaceList के लिए एक refreshKey पास कर रहे हैं।
      if (onSuccess) onSuccess(); // StudentList को रीफ्रेश करने के लिए ट्रिगर करें

      // स्पेस लिस्ट को रीफ़्रेश करने के लिए उपलब्ध स्पेस को फिर से फ़ेच करें
      const response = await axios.get('http://localhost:5000/api/spaces?status=Available');
      setAvailableSpaces(response.data);

    } catch (err) {
      console.error('Error adding student:', err.response ? err.response.data : err.message);
      setSubmitMessage(`Error adding student: ${err.response && err.response.data && err.response.data.message ? err.response.data.message : 'Please check the form data and backend.'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: '0 auto', padding: '20px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
      <h3 style={{ marginBottom: '20px', color: '#333' }}>Add New Student</h3>

      {/* Existing fields */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name:</label>
        <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
        <input type="email" id="email" name="email" value={form.email} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone:</label>
        <input type="text" id="phone" name="phone" value={form.phone} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="college" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>College:</label>
        <input type="text" id="college" name="college" value={form.college} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="currentAddress" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Current Address:</label>
        <textarea id="currentAddress" name="currentAddress" value={form.currentAddress} onChange={handleChange} rows="3" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}></textarea>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="permanentAddress" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Permanent Address:</label>
        <textarea id="permanentAddress" name="permanentAddress" value={form.permanentAddress} onChange={handleChange} rows="3" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}></textarea>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="emergencyContactName" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Emergency Contact Name:</label>
        <input type="text" id="emergencyContactName" name="emergencyContactName" value={form.emergencyContactName} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="emergencyContactPhone" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Emergency Contact Phone:</label>
        <input type="text" id="emergencyContactPhone" name="emergencyContactPhone" value={form.emergencyContactPhone} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="dateOfBirth" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Date of Birth:</label>
        <input type="date" id="dateOfBirth" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="nationality" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nationality:</label>
        <input type="text" id="nationality" name="nationality" value={form.nationality} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="guardianName" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Guardian Name:</label>
        <input type="text" id="guardianName" name="guardianName" value={form.guardianName} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="guardianPhone" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Guardian Phone:</label>
        <input type="text" id="guardianPhone" name="guardianPhone" value={form.guardianPhone} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
      </div>

      {/* ✨ नए फ़ील्ड्स यहाँ से शुरू होते हैं ✨ */}
      <hr style={{ margin: '30px 0', borderColor: '#eee' }} />
      <h4 style={{ marginBottom: '15px', color: '#555' }}>Co-Living Details</h4>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="checkInDate" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Check-in Date:</label>
        <input type="date" id="checkInDate" name="checkInDate" value={form.checkInDate} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="bookingAmount" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Booking Amount (Security Deposit):</label>
        <input type="number" id="bookingAmount" name="bookingAmount" value={form.bookingAmount} onChange={handleChange} required step="0.01" min="0" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="assignedSpace" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Assign Space:</label>
        <select
          id="assignedSpace"
          name="assignedSpace"
          value={form.assignedSpace}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        >
          <option value="">-- Select an Available Space --</option>
          {availableSpaces.map(space => (
            <option key={space._id} value={space._id}>
              Room: {space.roomNumber} - Bed: {space.bedNumber} ({space.sharingType}) - Rent: ₹{space.monthlyRent.toFixed(2)}
            </option>
          ))}
        </select>
        {availableSpaces.length === 0 && <p style={{ color: 'orange', fontSize: '0.9em', marginTop: '5px' }}>No available spaces found. Please add spaces first!</p>}
      </div>
      {/* ✨ नए फ़ील्ड्स यहाँ समाप्त होते हैं ✨ */}

      <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', marginTop: '20px' }}>Add Student</button>
      {submitMessage && (
        <p style={{ marginTop: '15px', color: submitMessage.includes('Error') ? 'red' : 'green', fontWeight: 'bold' }}>
          {submitMessage}
        </p>
      )}
    </form>
  );
};

export default StudentForm;