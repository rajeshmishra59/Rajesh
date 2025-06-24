// 📁 D:\AppDevelopment\instay-app\frontend\src\App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // useAuth को अब सीधे App में इस्तेमाल नहीं करेंगे

import Login from './components/Login';
import Navbar from './components/Navbar';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import SpaceForm from './components/SpaceForm';
import SpaceList from './components/SpaceList';
import PaymentForm from './components/PaymentForm';
import PaymentList from './components/PaymentList';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ComplaintForm from './components/ComplaintForm';
import ComplaintList from './components/ComplaintList';
import Reports from './components/Reports';

// एक प्रोटेक्टेड राउट कंपोनेंट जो चेक करता है कि यूजर लॉग इन है या नहीं
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth(); // यह useAuth अब AuthProvider के अंदर है, तो ठीक काम करेगा

  if (loading) {
    return <div>Loading application...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    alert("You don't have permission to access this page.");
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div
      className="main-content"
      style={{ paddingLeft: '220px', paddingRight: '20px', paddingTop: '20px' }}
    >
      {children}
    </div>
  );
};

// एक नया डैशबोर्ड कंपोनेंट
const Dashboard = () => (
    <div style={{ paddingLeft: '220px', paddingRight: '20px', paddingTop: '20px' }}>
        <h2 style={{ textAlign: 'center', color: '#555' }}>Welcome to your Dashboard!</h2>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
            From here, you can navigate to different sections using the sidebar.
        </p>
    </div>
);


function App() {
  // const { user } = useAuth(); // ✨ यह लाइन हटा दी गई है या टिप्पणी की गई है ✨

  return (
    <Router>
      <AuthProvider>
        {/* Navbar को यहां सीधे रेंडर करें, वह खुद useAuth() को अंदर एक्सेस कर लेगा */}
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* डैशबोर्ड रूट */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          {/* Student Management Routes (केवल Admin, Manager, Warden) */}
          <Route path="/students" element={
            <ProtectedRoute allowedRoles={['Admin', 'Manager', 'Warden']}>
                <h2 style={{ textAlign: 'center', color: '#555', marginBottom: '30px' }}>Student Management</h2>
                <StudentForm />
                <StudentList />
            </ProtectedRoute>
          } />

          {/* Space Management Routes (केवल Admin, Manager, Warden) */}
          <Route path="/spaces" element={
            <ProtectedRoute allowedRoles={['Admin', 'Manager', 'Warden']}>
                <h2 style={{ textAlign: 'center', color: '#555', marginBottom: '30px' }}>Space Management</h2>
                <SpaceForm />
                <SpaceList />
            </ProtectedRoute>
          } />

          {/* Payment Management Routes (सभी, छात्र अपनी, एडमिन/मैनेजर सभी की) */}
          <Route path="/payments" element={
            <ProtectedRoute>
                <h2 style={{ textAlign: 'center', color: '#555', marginBottom: '30px' }}>Payment Management</h2>
                <PaymentForm />
                <PaymentList />
            </ProtectedRoute>
          } />

          {/* Expense Management Routes (केवल Admin, Manager, Warden) */}
          <Route path="/expenses" element={
            <ProtectedRoute allowedRoles={['Admin', 'Manager', 'Warden']}>
                <h2 style={{ textAlign: 'center', color: '#555', marginBottom: '30px' }}>Expense Management</h2>
                <ExpenseForm />
                <ExpenseList />
            </ProtectedRoute>
          } />

          {/* Complaint Management Routes (सभी) */}
          <Route path="/complaints" element={
            <ProtectedRoute>
                <h2 style={{ textAlign: 'center', color: '#555', marginBottom: '30px' }}>Complaint Management</h2>
                <ComplaintForm />
                <ComplaintList />
            </ProtectedRoute>
          } />

          {/* Reports Routes (केवल Admin, Manager, Warden) */}
          <Route path="/reports" element={
            <ProtectedRoute allowedRoles={['Admin', 'Manager', 'Warden']}>
                <h2 style={{ textAlign: 'center', color: '#555', marginBottom: '30px' }}>Reports Dashboard</h2>
                <Reports />
            </ProtectedRoute>
          } />

          {/* '/' को '/dashboard' पर रीडायरेक्ट करें यदि लॉग इन है, अन्यथा /login पर */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          {/* किसी भी अज्ञात रूट के लिए /dashboard पर रीडायरेक्ट */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;