// 📁 frontend/src/pages/students/EnrollStudentForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const EnrollStudentForm = () => {
    const { user, token } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // क्लाइंट-साइड वैलिडेशन
        if (!formData.name || !formData.phone) {
            Swal.fire('Error', 'Name and Phone Number are required.', 'error');
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            const response = await axios.post('http://localhost:5000/api/students/enroll', formData, config);

            Swal.fire('Success', response.data.message || 'Student enrolled successfully!', 'success');

            // फ़ॉर्म रीसेट करें
            setFormData({
                name: '',
                email: '',
                phone: ''
            });

            console.log('Enrollment successful:', response.data);

        } catch (error) {
            console.error('Enrollment error:', error);
            const errorMessage = error.response?.data?.message || 'Failed to enroll student. Please try again.';
            Swal.fire('Error', errorMessage, 'error');
        }
    };

    if (!user) {
        return <p>Please log in to enroll students.</p>;
    }

    // केवल Admin, Manager, Warden को नामांकन की अनुमति दें
    if (!['Admin', 'Manager', 'Warden'].includes(user.role)) {
        return <p>You do not have permission to enroll students.</p>;
    }

    return (
        <div className="form-container">
            <h2>Enroll New Student</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Student Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Enroll Student</button>
            </form>
        </div>
    );
};

export default EnrollStudentForm;