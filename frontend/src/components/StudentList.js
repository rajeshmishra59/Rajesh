// 📁 D:\AppDevelopment\instay-app\frontend\src\components\StudentList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaymentList from './PaymentList'; // ✨ PaymentList कंपोनेंट को इम्पोर्ट करें

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null); // ✨ चयनित छात्र ID को स्टोर करने के लिए

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/students');
        setStudents(response.data);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to fetch students.');
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []); // जब कंपोनेंट माउंट होता है या key बदलता है तब री-फ़ेच करें (Home.js में key prop के कारण)

  // ✨ पेमेंट हिस्ट्री देखने के लिए हैंडलर
  const handleViewPayments = (studentId) => {
    setSelectedStudentId(studentId); // छात्र ID सेट करें
  };

  // ✨ पेमेंट हिस्ट्री मॉडल/पॉपअप को बंद करने के लिए हैंडलर
  const handleClosePayments = () => {
    setSelectedStudentId(null); // चयनित छात्र ID को रीसेट करें
  };

  if (loading) return <p>Loading students...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (students.length === 0) return <p>No students found. Please add some!</p>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {students.map(student => (
          <div key={student._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', textAlign: 'left' }}>
            <h3 style={{ color: '#007bff', marginBottom: '10px' }}>{student.name}</h3>
            <p><strong>Gender:</strong> {student.gender}</p>
            <p><strong>College:</strong> {student.collegeName}</p>
            <p><strong>Admission Year:</strong> {student.admissionYear}</p>
            <p><strong>Guardian:</strong> {student.guardianName} ({student.guardianContact})</p>
            {/* ✨ 'View Payments' बटन */}
            <button 
              onClick={() => handleViewPayments(student._id)}
              style={{ 
                marginTop: '15px', 
                backgroundColor: '#6c757d', 
                color: 'white', 
                padding: '8px 15px', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer', 
                fontSize: '0.9rem' 
              }}
            >
              View Payments
            </button>
          </div>
        ))}
      </div>

      {/* ✨ PaymentList मॉडल/पॉपअप */}
      {selectedStudentId && (
        <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.7)', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            zIndex: 1000 
        }}>
          <div style={{ 
              backgroundColor: 'white', 
              padding: '30px', 
              borderRadius: '10px', 
              maxWidth: '80%', 
              maxHeight: '90%', 
              overflowY: 'auto', 
              position: 'relative' 
          }}>
            <button 
              onClick={handleClosePayments}
              style={{ 
                  position: 'absolute', 
                  top: '10px', 
                  right: '10px', 
                  backgroundColor: 'red', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '50%', 
                  width: '30px', 
                  height: '30px', 
                  cursor: 'pointer', 
                  fontSize: '1.2rem', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center' 
              }}
            >
              &times;
            </button>
            <h3 style={{ marginBottom: '20px', color: '#333' }}>Payment History for {students.find(s => s._id === selectedStudentId)?.name}</h3>
            <PaymentList studentId={selectedStudentId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;