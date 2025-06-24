// 📁 D:\AppDevelopment\instay-app\frontend\src\components\Login.js

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // React Router DOM से useNavigate इम्पोर्ट करें

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); // AuthContext से login फंक्शन प्राप्त करें
  const navigate = useNavigate(); // useNavigate हुक का उपयोग करें

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      // सक्सेसफुल लॉगिन के बाद, डैशबोर्ड या किसी अन्य प्रोटेक्टेड रूट पर रीडायरेक्ट करें
      navigate('/dashboard'); // या जहां भी आप उपयोगकर्ता को भेजना चाहते हैं
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: '30px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Login to Instay App</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
          />
        </div>
        {error && <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
        <button
          type="submit"
          style={{
            width: '100%',
            backgroundColor: '#007bff',
            color: 'white',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease'
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;