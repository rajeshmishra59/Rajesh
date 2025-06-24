// 📁 D:\AppDevelopment\instay-app\frontend\src\pages\Home.js

import React, { useState } from 'react';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';
import PaymentForm from '../components/PaymentForm';
import SpaceForm from '../components/SpaceForm'; // ✨ SpaceForm को इम्पोर्ट करें
import SpaceList from '../components/SpaceList'; // ✨ SpaceList को इम्पोर्ट करें

const Home = () => {
  const [refreshStudentsKey, setRefreshStudentsKey] = useState(0); 
  const [refreshSpacesKey, setRefreshSpacesKey] = useState(0);   // ✨ Spaces के लिए अलग key

  const handleStudentAdded = () => {
    setRefreshStudentsKey(oldKey => oldKey + 1); 
  };

  const handlePaymentAdded = () => {
    // PaymentList अब StudentList के भीतर है और सीधे studentId पर निर्भर करता है,
    // इसलिए यहाँ किसी विशिष्ट key को टॉगल करने की आवश्यकता नहीं है
  };

  // ✨ नया फंक्शन: जब कोई Space जोड़ा जाता है तो इसे कॉल किया जाएगा
  const handleSpaceAdded = () => {
    setRefreshSpacesKey(oldKey => oldKey + 1);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>🎓 Instay Student Dashboard</h1>

      {/* स्पेस सेक्शन */}
      <h2 style={{ color: '#555', marginBottom: '20px' }}>Add New Co-Living Space (Bed)</h2>
      <SpaceForm onSpaceAdded={handleSpaceAdded} /> {/* ✨ SpaceForm को जोड़ें */}

      <h2 style={{ color: '#555', marginTop: '50px', marginBottom: '20px' }}>Available Co-Living Spaces</h2>
      <SpaceList refreshKey={refreshSpacesKey} /> {/* ✨ SpaceList को जोड़ें */}

      {/* स्टूडेंट सेक्शन */}
      <h2 style={{ color: '#555', marginTop: '50px', marginBottom: '20px' }}>Add New Student</h2>
      <StudentForm onSuccess={handleStudentAdded} /> 

      <h2 style={{ color: '#555', marginTop: '50px', marginBottom: '20px' }}>Current Students</h2>
      <StudentList key={refreshStudentsKey} />

      {/* पेमेंट सेक्शन */}
      <h2 style={{ color: '#555', marginTop: '50px', marginBottom: '20px' }}>Add New Payment</h2>
      <PaymentForm onPaymentAdded={handlePaymentAdded} /> 

      <h2 style={{ color: '#555', marginTop: '50px', marginBottom: '20px' }}>Payment History (View via Student List)</h2>
      {/* PaymentList/History कंपोनेंट को यहां रेंडर किया जाएगा */}
    </div>
  );
};

export default Home;