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

                // Fetch available spaces - Corrected API endpoint URL
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

        if (token) {
            fetchRequiredData();
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedSpaceId || !selectedStudentId || !bookingAmount || !paymentMode || !paymentDate) {
            Swal.fire('Error', 'कृपया सभी आवश्यक फ़ील्ड भरें: स्पेस, छात्र, बुकिंग राशि, भुगतान मोड और भुगतान तिथि।', 'error');
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            // Book Space - Corrected API endpoint URL
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

            Swal.fire('Success', response.data.message || 'स्पेस सफलतापूर्वक बुक किया गया!', 'success');

            // Reset form and re-fetch data to update available spaces and student list
            setSelectedSpaceId('');
            setSelectedStudentId('');
            setBookingAmount('');
            setPaymentMode('');
            setPaymentDate('');

            // Re-fetch data to reflect changes
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
            const errorMessage = err.response?.data?.message || 'स्पेस बुक करने में विफल। कृपया पुनः प्रयास करें।';
            Swal.fire('Error', errorMessage, 'error');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-inter">
                <div className="bg-white p-8 rounded-lg shadow-xl text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-lg font-semibold text-gray-700">उपलब्ध स्पेसेस और छात्रों को लोड किया जा रहा है...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-inter">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative shadow-xl">
                    <strong className="font-bold">त्रुटि!</strong>
                    <span className="block sm:inline ml-2">{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-4 flex items-center justify-center font-inter">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md md:max-w-lg lg:max-w-xl">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img
                        src={`${process.env.PUBLIC_URL}/InstayLogo.jpeg`} // लोगो के लिए सही पाथ। यह सार्वजनिक फ़ोल्डर में होना चाहिए।
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x50/cccccc/333333?text=Logo%20Error"; }}
                        alt="Instay Logo"
                        className="h-12 object-contain"
                    />
                </div>
                
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">स्पेस बुक करें</h2>
                <p className="text-gray-600 mb-8 text-center">छात्रों के लिए उपलब्ध सह-जीवन स्थान बुक करें।</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="student" className="block text-gray-700 text-sm font-semibold mb-2">छात्र चुनें:</label>
                        <select
                            id="student"
                            name="student"
                            value={selectedStudentId}
                            onChange={(e) => setSelectedStudentId(e.target.value)}
                            required
                            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900 appearance-none transition-all duration-300 ease-in-out hover:border-blue-400 cursor-pointer"
                        >
                            <option value="">-- एक छात्र चुनें --</option>
                            {students.length > 0 ? (
                                students.map(student => (
                                    <option key={student._id} value={student._id} className="p-2">
                                        {student.name} ({student.studentUID})
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled className="text-gray-500">कोई पात्र छात्र बुकिंग के लिए उपलब्ध नहीं है</option>
                            )}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="space" className="block text-gray-700 text-sm font-semibold mb-2">उपलब्ध स्पेस चुनें:</label>
                        <select
                            id="space"
                            name="space"
                            value={selectedSpaceId}
                            onChange={(e) => setSelectedSpaceId(e.target.value)}
                            required
                            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900 appearance-none transition-all duration-300 ease-in-out hover:border-blue-400 cursor-pointer"
                        >
                            <option value="">-- एक स्पेस चुनें --</option>
                            {availableSpaces.length > 0 ? (
                                availableSpaces.map(space => (
                                    <option key={space._id} value={space._id} className="p-2">
                                        कमरा: {space.roomNumber}, बेड: {space.bedNumber} ({space.sharingType} - किराया: ₹{space.monthlyRent})
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled className="text-gray-500">कोई स्पेस बुकिंग के लिए उपलब्ध नहीं है</option>
                            )}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="bookingAmount" className="block text-gray-700 text-sm font-semibold mb-2">बुकिंग राशि:</label>
                        <input
                            type="number"
                            id="bookingAmount"
                            name="bookingAmount"
                            value={bookingAmount}
                            onChange={(e) => setBookingAmount(e.target.value)}
                            required
                            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 transition-all duration-300 ease-in-out hover:border-blue-400"
                            placeholder="जैसे 5000"
                        />
                    </div>

                    <div>
                        <label htmlFor="paymentMode" className="block text-gray-700 text-sm font-semibold mb-2">भुगतान मोड:</label>
                        <select
                            id="paymentMode"
                            name="paymentMode"
                            value={paymentMode}
                            onChange={(e) => setPaymentMode(e.target.value)}
                            required
                            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900 appearance-none transition-all duration-300 ease-in-out hover:border-blue-400 cursor-pointer"
                        >
                            <option value="">-- भुगतान मोड चुनें --</option>
                            <option value="Cash">नकद</option>
                            <option value="Online Transfer">ऑनलाइन ट्रांसफर</option>
                            <option value="Card">कार्ड</option>
                            <option value="UPI">यूपीआई</option>
                            <option value="Cheque">चेक</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="paymentDate" className="block text-gray-700 text-sm font-semibold mb-2">भुगतान तिथि:</label>
                        <input
                            type="date"
                            id="paymentDate"
                            name="paymentDate"
                            value={paymentDate}
                            onChange={(e) => setPaymentDate(e.target.value)}
                            required
                            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 transition-all duration-300 ease-in-out hover:border-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                        स्पेस बुक करें
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookSpaceForm;
