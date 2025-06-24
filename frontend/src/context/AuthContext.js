// 📁 D:\AppDevelopment\instay-app\frontend\src\context\AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // localStorage से यूजर और टोकन की शुरुआती स्थिति प्राप्त करें
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true); // लोडिंग स्थिति

    // जब कंपोनेंट माउंट हो या यूजर/टोकन बदले तो localStorage को अपडेट करें
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
        if (token) {
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Axios डिफॉल्ट हेडर सेट करें
        } else {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization']; // Axios हेडर से हटा दें
        }
        setLoading(false); // डेटा लोड होने के बाद लोडिंग खत्म करें
    }, [user, token]);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            setUser(response.data);
            setToken(response.data.token);
            return response.data; // सक्सेस डेटा रिटर्न करें
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
            throw error.response ? error.response.data : new Error('Login failed'); // एरर को फिर से थ्रो करें
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    // लोडिंग होने पर किसी भी UI को रेंडर न करें
    if (loading) {
        return <div>Loading authentication...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);