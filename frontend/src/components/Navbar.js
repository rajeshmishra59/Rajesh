// 📁 frontend/src/components/Navbar.js

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Navbar तभी दिखाएं जब यूजर लॉग इन हो
  if (!user) {
    return null;
  }

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      <div
        className="hamburger-menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Sidebar - Conditional Rendering and Class for Mobile */}
      <div
        className={`sidebar ${isOpen ? 'open' : ''}`}
      >
        <div className="sidebar-header">
          <h2 className="sidebar-title">Instay</h2>
          <p className="sidebar-welcome">
            Welcome, {user.username} ({user.role})
          </p>
        </div>

        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            <li className="sidebar-menu-item">
              <NavLink
                to="/dashboard"
                className={({ isActive }) => `sidebar-link ${isActive ? 'active-link' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </NavLink>
            </li>
            {/* Students Menu Item and sub-links */}
            {user && ['Admin', 'Manager', 'Warden'].includes(user.role) && (
              <>
                <li className="sidebar-menu-item">
                  <NavLink
                    to="/students"
                    className={({ isActive }) => `sidebar-link ${isActive ? 'active-link' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Students
                  </NavLink>
                </li>
                {/* Enroll Student link for specific roles */}
                <li className="sidebar-menu-item">
                  <NavLink
                    to="/students/enroll"
                    className={({ isActive }) => `sidebar-link ${isActive ? 'active-link' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Enroll Student
                  </NavLink>
                </li>
              </>
            )}
            {/* Spaces Menu Item and sub-links */}
            {user && ['Admin', 'Manager', 'Warden'].includes(user.role) && (
              <>
                <li className="sidebar-menu-item">
                  <NavLink
                    to="/spaces"
                    className={({ isActive }) => `sidebar-link ${isActive ? 'active-link' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Spaces
                  </NavLink>
                </li>
                {/* NEW Book Space link for specific roles */}
                <li className="sidebar-menu-item">
                  <NavLink
                    to="/spaces/book"
                    className={({ isActive }) => `sidebar-link ${isActive ? 'active-link' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Book Space
                  </NavLink>
                </li>
              </>
            )}
            <li className="sidebar-menu-item">
              <NavLink
                to="/payments"
                className={({ isActive }) => `sidebar-link ${isActive ? 'active-link' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Payments
              </NavLink>
            </li>
            {user && ['Admin', 'Manager', 'Warden'].includes(user.role) && (
              <li className="sidebar-menu-item">
                <NavLink
                  to="/expenses"
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active-link' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  Expenses
                </NavLink>
              </li>
            )}
            <li className="sidebar-menu-item">
              <NavLink
                to="/complaints"
                className={({ isActive }) => `sidebar-link ${isActive ? 'active-link' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Complaints
              </NavLink>
            </li>
            {user && ['Admin', 'Manager', 'Warden'].includes(user.role) && (
              <li className="sidebar-menu-item">
                <NavLink
                  to="/reports"
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active-link' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  Reports
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        {/* Logout बटन नीचे */}
        <div className="sidebar-footer">
          <button
            onClick={logout}
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;