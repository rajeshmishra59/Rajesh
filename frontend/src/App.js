// 📁 frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/Login';
// ✨ UPDATED: DashboardPage का इम्पोर्ट 'pages/Home' से हटा दिया गया है
// import DashboardPage from './pages/Home'; // हटा दिया गया
import StudentList from './components/StudentList';
import EnrollStudentForm from './pages/students/EnrollStudentForm';
import SpaceList from './components/SpaceList';
import BookSpaceForm from './pages/spaces/BookSpaceForm'; 
import PaymentList from './components/PaymentList';
import ExpenseList from './components/ExpenseList';
import ComplaintList from './components/ComplaintList';
import ReportPage from './components/Reports';
import Navbar from './components/Navbar';
import './App.css';

// ✨ NEW IMPORT: अपने नए Dashboard कंपोनेंट को इम्पोर्ट करें ✨
import Dashboard from './pages/dashboard/Dashboard'; 

// PrivateRoute Component
const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            {/* Private Routes */}
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  {/* ✨ UPDATED: DashboardPage के बजाय सीधे नए Dashboard कंपोनेंट का उपयोग करें ✨ */}
                  <Dashboard /> 
                </PrivateRoute>
              } 
            />
            <Route 
              path="/students" 
              element={
                <PrivateRoute allowedRoles={['Admin', 'Manager', 'Warden', 'Student']}>
                  <StudentList />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/students/enroll" 
              element={
                <PrivateRoute allowedRoles={['Admin', 'Manager', 'Warden']}>
                  <EnrollStudentForm />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/spaces" 
              element={
                <PrivateRoute allowedRoles={['Admin', 'Manager', 'Warden']}>
                  <SpaceList />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/spaces/book" 
              element={
                <PrivateRoute allowedRoles={['Admin', 'Manager', 'Warden']}>
                  <BookSpaceForm />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/payments" 
              element={
                <PrivateRoute allowedRoles={['Admin', 'Manager', 'Warden', 'Student']}>
                  <PaymentList />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/expenses" 
              element={
                <PrivateRoute allowedRoles={['Admin', 'Manager']}>
                  <ExpenseList />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/complaints" 
              element={
                <PrivateRoute allowedRoles={['Admin', 'Manager', 'Warden', 'Student']}>
                  <ComplaintList />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/reports" 
              element={
                <PrivateRoute allowedRoles={['Admin', 'Manager']}>
                  <ReportPage />
                </PrivateRoute>
              } 
            />

            {/* Default redirect to login or dashboard based on auth status */}
            <Route 
              path="*" 
              element={
                <AuthConsumer />
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

// Helper component to decide initial redirect
const AuthConsumer = () => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading app...</div>;
  return user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

export default App;
