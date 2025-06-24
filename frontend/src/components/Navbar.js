// 📁 D:\AppDevelopment\instay-app\frontend\src\components\Navbar.js

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // मोबाइल मेनू के लिए स्टेट

  // Navbar तभी दिखाएं जब यूजर लॉग इन हो
  if (!user) {
    return null;
  }

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      <div
        className="hamburger-menu" // App.css में स्टाइल होगा
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'none', // बड़ी स्क्रीन पर छिपा दें, CSS Media Query इसे दिखाएगा
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1100, // Navbar से ऊपर
          cursor: 'pointer',
          color: '#2c3e50', // Hamburger icon color
        }}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Sidebar - Conditional Rendering and Class for Mobile */}
      <div
        className={`sidebar ${isOpen ? 'open' : ''}`} // App.css में स्टाइल होगा
        style={{
          width: '200px',
          backgroundColor: '#2c3e50',
          color: 'white',
          padding: '20px 0',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
          zIndex: 1000,
          transition: 'transform 0.3s ease-in-out', // स्लाइड-आउट इफेक्ट के लिए
        }}
      >
        <div style={{ padding: '0 20px', marginBottom: '30px' }}>
          <h2 style={{ margin: '0', fontSize: '1.8rem', textAlign: 'center' }}>Instay</h2>
          <p style={{ margin: '5px 0 0', fontSize: '0.9rem', textAlign: 'center', color: '#bdc3c7' }}>
            Welcome, {user.username} ({user.role})
          </p>
        </div>

        <nav style={{ flexGrow: 1 }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '10px' }}>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => isActive ? 'active-link' : ''}
                onClick={() => setIsOpen(false)} // लिंक क्लिक करने पर मेनू बंद करें
                style={{
                  display: 'block',
                  padding: '12px 20px',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  transition: 'background-color 0.3s ease',
                }}
              >
                Dashboard
              </NavLink>
            </li>
            {/* एडमिन/मैनेजर/वार्डन के लिए ही स्टूडेंट मैनेजमेंट दिखाएं */}
            {user && ['Admin', 'Manager', 'Warden'].includes(user.role) && (
              <li style={{ marginBottom: '10px' }}>
                <NavLink
                  to="/students"
                  className={({ isActive }) => isActive ? 'active-link' : ''}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  Students
                </NavLink>
              </li>
            )}
            {/* एडमिन/मैनेजर/वार्डन के लिए ही स्पेस मैनेजमेंट दिखाएं */}
            {user && ['Admin', 'Manager', 'Warden'].includes(user.role) && (
              <li style={{ marginBottom: '10px' }}>
                <NavLink
                  to="/spaces"
                  className={({ isActive }) => isActive ? 'active-link' : ''}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  Spaces
                </NavLink>
              </li>
            )}
            {/* सभी के लिए पेमेंट दिखाएं, छात्र अपनी, एडमिन/मैनेजर सभी की */}
            <li style={{ marginBottom: '10px' }}>
              <NavLink
                to="/payments"
                className={({ isActive }) => isActive ? 'active-link' : ''}
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'block',
                  padding: '12px 20px',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  transition: 'background-color 0.3s ease',
                }}
              >
                Payments
              </NavLink>
            </li>
            {/* एडमिन/मैनेजर/वार्डन के लिए ही एक्सपेंस दिखाएं */}
            {user && ['Admin', 'Manager', 'Warden'].includes(user.role) && (
              <li style={{ marginBottom: '10px' }}>
                <NavLink
                  to="/expenses"
                  className={({ isActive }) => isActive ? 'active-link' : ''}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  Expenses
                </NavLink>
              </li>
            )}
            {/* शिकायतें सभी के लिए */}
            <li style={{ marginBottom: '10px' }}>
              <NavLink
                to="/complaints"
                className={({ isActive }) => isActive ? 'active-link' : ''}
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'block',
                  padding: '12px 20px',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  transition: 'background-color 0.3s ease',
                }}
              >
                Complaints
              </NavLink>
            </li>
            {/* एडमिन/मैनेजर/वार्डन के लिए ही रिपोर्ट्स दिखाएं */}
            {user && ['Admin', 'Manager', 'Warden'].includes(user.role) && (
              <li style={{ marginBottom: '10px' }}>
                <NavLink
                  to="/reports"
                  className={({ isActive }) => isActive ? 'active-link' : ''}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  Reports
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        {/* Logout बटन नीचे */}
        <div style={{ padding: '0 20px', marginTop: 'auto' }}>
          <button
            onClick={logout}
            style={{
              width: '100%',
              padding: '12px 20px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              transition: 'background-color 0.3s ease',
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;