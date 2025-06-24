// 📁 frontend/src/pages/spaces/BookSpaceForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const BookSpaceForm = () => {
    const { token } = useAuth();
    const [availableSpaces, setAvailableSpaces] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedSpaceId, setSelectedSpaceId] = useState('');
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [bookingAmount, setBookingAmount] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequiredData = async () => {
            try {
                setLoading(true);
                setError(null);
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };

                // Fetch available spaces
                const spacesRes = await axios.get('http://localhost:5000/api/spaces/available', config);
                setAvailableSpaces(spacesRes.data);

                // Fetch students who are 'Enrolled' and do not have an assigned space or booking
                // This assumes /api/students endpoint can return all students
                // and we filter client-side. If performance is an issue with many students,
                // a dedicated backend endpoint to get 'eligible' students would be better.
                const studentsRes = await axios.get('http://localhost:5000/api/students', config);
                const eligibleStudents = studentsRes.data.filter(student => 
                    student.status === 'Enrolled' && !student.assignedSpace && !student.bookingAmount
                );
                setStudents(eligibleStudents);

            } catch (err) {
                console.error('Error fetching data for booking:', err);
                setError(err.response?.data?.message || 'Failed to load data for booking form.');
                Swal.fire('Error', 'Failed to load required data.', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchRequiredData();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedSpaceId || !selectedStudentId || !bookingAmount) {
            Swal.fire('Error', 'Please select a space, a student, and enter booking amount.', 'error');
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            const response = await axios.post(
                'http://localhost:5000/api/spaces/book',
                { spaceId: selectedSpaceId, studentId: selectedStudentId, bookingAmount: parseFloat(bookingAmount) },
                config
            );

            Swal.fire('Success', response.data.message || 'Space booked successfully!', 'success');

            // Reset form and re-fetch data to update available spaces and student list
            setSelectedSpaceId('');
            setSelectedStudentId('');
            setBookingAmount('');
            
            // Re-fetch data to reflect changes
            const spacesRes = await axios.get('http://localhost:5000/api/spaces/available', config);
            setAvailableSpaces(spacesRes.data);
            const studentsRes = await axios.get('http://localhost:5000/api/students', config);
            const eligibleStudents = studentsRes.data.filter(student => 
                student.status === 'Enrolled' && !student.assignedSpace && !student.bookingAmount
            );
            setStudents(eligibleStudents);

            console.log('Booking successful:', response.data);

        } catch (err) {
            console.error('Booking error:', err);
            const errorMessage = err.response?.data?.message || 'Failed to book space. Please try again.';
            Swal.fire('Error', errorMessage, 'error');
        }
    };

    if (loading) {
        return <div className="form-container">Loading available spaces and students...</div>;
    }

    if (error) {
        return <div className="form-container" style={{ color: 'red' }}>Error: {error}</div>;
    }

    return (
        <div className="form-container">
            <h2>Book a Space</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="student">Select Student:</label>
                    <select
                        id="student"
                        name="student"
                        value={selectedStudentId}
                        onChange={(e) => setSelectedStudentId(e.target.value)}
                        required
                    >
                        <option value="">-- Select a Student --</option>
                        {students.length > 0 ? (
                            students.map(student => (
                                <option key={student._id} value={student._id}>
                                    {student.name} ({student.studentUID})
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>No eligible students available for booking</option>
                        )}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="space">Select Available Space:</label>
                    <select
                        id="space"
                        name="space"
                        value={selectedSpaceId}
                        onChange={(e) => setSelectedSpaceId(e.target.value)}
                        required
                    >
                        <option value="">-- Select a Space --</option>
                        {availableSpaces.length > 0 ? (
                            availableSpaces.map(space => (
                                <option key={space._id} value={space._id}>
                                    Room: {space.roomNumber}, Bed: {space.bedNumber} ({space.sharingType} - Rent: ₹{space.monthlyRent})
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>No spaces available for booking</option>
                        )}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="bookingAmount">Booking Amount:</label>
                    <input
                        type="number"
                        id="bookingAmount"
                        name="bookingAmount"
                        value={bookingAmount}
                        onChange={(e) => setBookingAmount(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Book Space</button>
            </form>
        </div>
    );
};

export default BookSpaceForm;