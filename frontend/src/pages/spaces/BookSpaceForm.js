// 📁 frontend/src/pages/spaces/BookSpaceForm.js

import React, { useState, useEffect } from 'react'; // ✨ FIXED: Changed '=>' to 'from' ✨
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
    const [paymentMode, setPaymentMode] = useState(''); 
    const [paymentDate, setPaymentDate] = useState(''); 
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

                // ✨ UPDATED: Fetch available spaces - Corrected API endpoint URL ✨
                // बैकएंड राउट अब '/api/spaces/admin/spaces/available' है।
                const spacesRes = await axios.get('http://localhost:5000/api/spaces/admin/spaces/available', config);
                setAvailableSpaces(spacesRes.data);

                // Fetch students who are 'Enrolled' and do not have an assigned space or booking
                const studentsRes = await axios.get('http://localhost:5000/api/students', config);
                const eligibleStudents = studentsRes.data.filter(student => 
                    student.status === 'Enrolled' && !student.assignedSpace && !student.bookingAmount
                );
                setStudents(eligibleStudents);

            } catch (err) {
                console.error('Error fetching data for booking:', err);
                setError(err.response?.data?.message || 'Failed to load data for booking form.');
                Swal.fire('Error', err.response?.data?.message || 'Required data could not be loaded. Please check network and permissions.', 'error');
            } finally {
                setLoading(false);
            }
        };

        if (token) { // Ensure token exists before attempting to fetch data
            fetchRequiredData();
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedSpaceId || !selectedStudentId || !bookingAmount || !paymentMode || !paymentDate) {
            Swal.fire('Error', 'Please fill all required fields: Space, Student, Booking Amount, Payment Mode, and Payment Date.', 'error');
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            // ✨ UPDATED: Book Space - Corrected API endpoint URL ✨
            // बैकएंड राउट अब '/api/spaces/admin/space/book' है।
            const response = await axios.post(
                'http://localhost:5000/api/spaces/admin/space/book', // Corrected URL
                { 
                    spaceId: selectedSpaceId, 
                    studentId: selectedStudentId, 
                    bookingAmount: parseFloat(bookingAmount),
                    paymentMode: paymentMode, 
                    paymentDate: paymentDate  
                },
                config
            );

            Swal.fire('Success', response.data.message || 'Space booked successfully!', 'success');

            // Reset form and re-fetch data to update available spaces and student list
            setSelectedSpaceId('');
            setSelectedStudentId('');
            setBookingAmount('');
            setPaymentMode(''); 
            setPaymentDate(''); 
            
            // Re-fetch data to reflect changes
            // ✨ Ensure re-fetch also uses correct URLs ✨
            const spacesRes = await axios.get('http://localhost:5000/api/spaces/admin/spaces/available', config);
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

                <div className="form-group">
                    <label htmlFor="paymentMode">Payment Mode:</label>
                    <select
                        id="paymentMode"
                        name="paymentMode"
                        value={paymentMode}
                        onChange={(e) => setPaymentMode(e.target.value)}
                        required
                    >
                        <option value="">-- Select Payment Mode --</option>
                        <option value="Cash">Cash</option>
                        <option value="Online Transfer">Online Transfer</option>
                        <option value="Card">Card</option>
                        <option value="UPI">UPI</option>
                        <option value="Cheque">Cheque</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="paymentDate">Payment Date:</label>
                    <input
                        type="date"
                        id="paymentDate"
                        name="paymentDate"
                        value={paymentDate}
                        onChange={(e) => setPaymentDate(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Book Space</button>
            </form>
        </div>
    );
};

export default BookSpaceForm;
