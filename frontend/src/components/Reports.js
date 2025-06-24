// 📁 D:\AppDevelopment\instay-app\frontend\src\components\Reports.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Report = () => {
    const { user } = useAuth();
    const [reportType, setReportType] = useState('');
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Filters for payments
    const [paymentStudentId, setPaymentStudentId] = useState('');
    const [paymentStartDate, setPaymentStartDate] = useState('');
    const [paymentEndDate, setPaymentEndDate] = useState('');
    const [students, setStudents] = useState([]); // For student dropdown in payment filter

    // Filters for expenses
    const [expenseCategory, setExpenseCategory] = useState('');
    const [expenseStartDate, setExpenseStartDate] = useState('');
    const [expenseEndDate, setExpenseEndDate] = useState('');
    const expenseCategories = ['Rent', 'Utilities', 'Food', 'Maintenance', 'Salaries', 'Other'];

    // Filters for complaints
    const [complaintStatus, setComplaintStatus] = useState('');
    const [complaintCategory, setComplaintCategory] = useState('');
    const complaintStatuses = ['Open', 'In Progress', 'Resolved', 'Closed', 'Rejected'];
    const complaintCategories = [
        'Plumbing', 'Electrical', 'Cleaning & Housekeeping', 'Internet & Wi-Fi',
        'Furniture & Appliances', 'Pest Control', 'Safety & Security',
        'Food & Mess', 'Management & Staff', 'Other'
    ];


    useEffect(() => {
        // Fetch students for payment report filter if user is Admin/Manager/Warden
        if (user && ['Admin', 'Manager', 'Warden'].includes(user.role)) {
            const fetchStudents = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/students');
                    setStudents(response.data);
                } catch (err) {
                    console.error('Error fetching students for report filter:', err);
                }
            };
            fetchStudents();
        }
    }, [user]);

    const fetchReport = async () => {
        setLoading(true);
        setError('');
        setReportData(null); // Clear previous report data

        try {
            let url = '';
            let params = {};

            switch (reportType) {
                case 'students':
                    url = 'http://localhost:5000/api/reports/students';
                    break;
                case 'payments':
                    url = 'http://localhost:5000/api/reports/payments';
                    if (paymentStudentId) params.studentId = paymentStudentId;
                    if (paymentStartDate) params.startDate = paymentStartDate;
                    if (paymentEndDate) params.endDate = paymentEndDate;
                    break;
                case 'expenses':
                    url = 'http://localhost:5000/api/reports/expenses';
                    if (expenseCategory) params.category = expenseCategory;
                    if (expenseStartDate) params.startDate = expenseStartDate;
                    if (expenseEndDate) params.endDate = expenseEndDate;
                    break;
                case 'complaints':
                    url = 'http://localhost:5000/api/reports/complaints/summary';
                    if (complaintStatus) params.status = complaintStatus;
                    if (complaintCategory) params.category = complaintCategory;
                    break;
                case 'spaceOccupancy':
                    url = 'http://localhost:5000/api/reports/spaces/occupancy';
                    break;
                default:
                    setError('Please select a report type.');
                    setLoading(false);
                    return;
            }

            const response = await axios.get(url, { params });
            setReportData(response.data);

        } catch (err) {
            console.error('Error fetching report:', err.response ? err.response.data : err.message);
            setError(`Failed to fetch report: ${err.response && err.response.data && err.response.data.message ? err.response.data.message : err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const renderReportContent = () => {
        if (loading) return <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading report...</p>;
        if (error) return <p style={{ textAlign: 'center', color: 'red', marginTop: '20px' }}>{error}</p>;
        if (!reportData) return <p style={{ textAlign: 'center', marginTop: '20px' }}>Select a report type and click "Generate Report".</p>;

        switch (reportType) {
            case 'students':
                return (
                    <div style={{ marginTop: '30px' }}>
                        <h4 style={{ marginBottom: '15px' }}>Student Report</h4>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f2f2f2' }}>
                                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Name</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Email</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Phone</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Room</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Bed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.map(student => (
                                    <tr key={student._id}>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.firstName} {student.lastName}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.email}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.phone}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.assignedSpace?.roomNumber || 'N/A'}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.assignedSpace?.bedNumber || 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'payments':
                return (
                    <div style={{ marginTop: '30px' }}>
                        <h4 style={{ marginBottom: '15px' }}>Payment Report</h4>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f2f2f2' }}>
                                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Student Name</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Amount</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Payment Date</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Payment For</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Method</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.map(payment => (
                                    <tr key={payment._id}>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{payment.student ? `${payment.student.firstName} ${payment.student.lastName}` : 'N/A'}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>₹{payment.amount}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{payment.paymentFor}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{payment.paymentMethod}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'expenses':
                return (
                    <div style={{ marginTop: '30px' }}>
                        <h4 style={{ marginBottom: '15px' }}>Expense Report</h4>
                        <p><strong>Total Expenses:</strong> ₹{reportData.totalAmount}</p>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', marginTop: '15px' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f2f2f2' }}>
                                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Category</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Amount</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Description</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.expenses.map(expense => (
                                    <tr key={expense._id}>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{expense.category}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>₹{expense.amount}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{expense.description}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(expense.expenseDate).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'complaints':
                return (
                    <div style={{ marginTop: '30px' }}>
                        <h4 style={{ marginBottom: '15px' }}>Complaint Summary Report (by Status)</h4>
                        <table style={{ width: '50%', borderCollapse: 'collapse', fontSize: '0.9rem', margin: '0 auto' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f2f2f2' }}>
                                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Status</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.map(summary => (
                                    <tr key={summary._id}>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{summary._id}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{summary.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'spaceOccupancy':
                return (
                    <div style={{ marginTop: '30px' }}>
                        <h4 style={{ marginBottom: '15px' }}>Space Occupancy Report</h4>
                        <p><strong>Total Spaces:</strong> {reportData.totalSpaces}</p>
                        <p><strong>Occupied Spaces:</strong> {reportData.occupiedSpaces}</p>
                        <p><strong>Available Spaces:</strong> {reportData.availableSpaces}</p>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', marginTop: '15px' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f2f2f2' }}>
                                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Room Number</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Bed Number</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>Occupied?</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Occupant Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.occupancyDetails.map(space => (
                                    <tr key={space._id}>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{space.roomNumber}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{space.bedNumber}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{space.isOccupied ? 'Yes' : 'No'}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{space.occupantName || 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ maxWidth: 1000, margin: '40px auto', padding: '20px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Reports Dashboard</h3>

            <div style={{ marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                    <label htmlFor="reportType" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Select Report Type:</label>
                    <select
                        id="reportType"
                        value={reportType}
                        onChange={(e) => {
                            setReportType(e.target.value);
                            setReportData(null); // Clear data when report type changes
                            setError('');
                            // Reset filters when report type changes
                            setPaymentStudentId('');
                            setPaymentStartDate('');
                            setPaymentEndDate('');
                            setExpenseCategory('');
                            setExpenseStartDate('');
                            setExpenseEndDate('');
                            setComplaintStatus('');
                            setComplaintCategory('');
                        }}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    >
                        <option value="">-- Choose Report --</option>
                        <option value="students">Student Report</option>
                        <option value="payments">Payment Report</option>
                        <option value="expenses">Expense Report</option>
                        <option value="complaints">Complaint Summary Report</option>
                        <option value="spaceOccupancy">Space Occupancy Report</option>
                    </select>
                </div>

                {reportType === 'payments' && (
                    <>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="paymentStudent" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Student (Optional):</label>
                            <select
                                id="paymentStudent"
                                value={paymentStudentId}
                                onChange={(e) => setPaymentStudentId(e.target.value)}
                                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                            >
                                <option value="">All Students</option>
                                {students.map(s => (
                                    <option key={s._id} value={s._id}>{`${s.firstName} ${s.lastName}`}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="paymentStartDate" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Start Date:</label>
                            <input
                                type="date"
                                id="paymentStartDate"
                                value={paymentStartDate}
                                onChange={(e) => setPaymentStartDate(e.target.value)}
                                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="paymentEndDate" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>End Date:</label>
                            <input
                                type="date"
                                id="paymentEndDate"
                                value={paymentEndDate}
                                onChange={(e) => setPaymentEndDate(e.target.value)}
                                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                    </>
                )}

                {reportType === 'expenses' && (
                    <>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="expenseCategory" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Category (Optional):</label>
                            <select
                                id="expenseCategory"
                                value={expenseCategory}
                                onChange={(e) => setExpenseCategory(e.target.value)}
                                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                            >
                                <option value="">All Categories</option>
                                {expenseCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="expenseStartDate" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Start Date:</label>
                            <input
                                type="date"
                                id="expenseStartDate"
                                value={expenseStartDate}
                                onChange={(e) => setExpenseStartDate(e.target.value)}
                                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="expenseEndDate" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>End Date:</label>
                            <input
                                type="date"
                                id="expenseEndDate"
                                value={expenseEndDate}
                                onChange={(e) => setExpenseEndDate(e.target.value)}
                                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                    </>
                )}

                {reportType === 'complaints' && (
                    <>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="complaintStatus" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Status (Optional):</label>
                            <select
                                id="complaintStatus"
                                value={complaintStatus}
                                onChange={(e) => setComplaintStatus(e.target.value)}
                                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                            >
                                <option value="">All Statuses</option>
                                {complaintStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="complaintCategory" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Category (Optional):</label>
                            <select
                                id="complaintCategory"
                                value={complaintCategory}
                                onChange={(e) => setComplaintCategory(e.target.value)}
                                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                            >
                                <option value="">All Categories</option>
                                {complaintCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                    </>
                )}
                <button
                    onClick={fetchReport}
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        minWidth: '150px' // Make button consistent width
                    }}
                    disabled={loading || !reportType}
                >
                    {loading ? 'Generating...' : 'Generate Report'}
                </button>
            </div>
            {renderReportContent()}
        </div>
    );
};

export default Report;