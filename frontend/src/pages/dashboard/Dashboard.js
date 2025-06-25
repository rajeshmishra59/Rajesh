// 📁 frontend/src/pages/dashboard/Dashboard.js

import React, { useState, useEffect } from 'react';
// यदि आप axios का उपयोग कर रहे हैं तो इसे इम्पोर्ट करें, अभी यह केवल प्लेसहोल्डर डेटा का उपयोग कर रहा है
// import axios from 'axios'; 
// import { useAuth } from '../../context/AuthContext'; // यदि प्रमाणीकरण की आवश्यकता हो

const Dashboard = () => {
    // const { token } = useAuth(); // यदि आप प्रमाणीकृत API कॉल कर रहे हैं
    const [activeTab, setActiveTab] = useState('dashboard'); // डिफ़ॉल्ट रूप से 'Dashboard' टैब सक्रिय

    // भविष्य में API से डेटा लाने के लिए यहाँ useEffect का उपयोग किया जा सकता है
    useEffect(() => {
        // const fetchDashboardData = async () => {
        //     try {
        //         // उदाहरण:
        //         // const response = await axios.get('http://localhost:5000/api/dashboard-data', {
        //         //     headers: { Authorization: `Bearer ${token}` }
        //         // });
        //         // setData(response.data);
        //     } catch (error) {
        //         console.error('Error fetching dashboard data:', error);
        //     }
        // };

        // if (token) {
        //     fetchDashboardData();
        // }
    }, [/* token */]); // token या अन्य निर्भरताएँ यहाँ जोड़ी जा सकती हैं

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        // मुख्य कंटेनर जो Instay.html के body और .container को मिलाता है
        <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-4 flex items-center justify-center font-inter">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-gray-800 to-blue-500 text-white p-8 text-center rounded-t-2xl">
                    <h1 className="text-4xl font-light mb-2">📊 Instay Coliving Excel Monitor</h1>
                    <p className="text-xl opacity-90">Complete Business Monitoring System for Ahmedabad Operations</p>
                </div>

                {/* Tabs Section */}
                <div className="flex bg-gray-200 border-b-4 border-blue-500 overflow-x-auto whitespace-nowrap">
                    <button
                        className={`px-6 py-4 cursor-pointer text-sm font-semibold transition-all duration-300 ${
                            activeTab === 'dashboard' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-700 hover:text-white'
                        } rounded-tr-lg`} // थोड़ा गोलाकार किनारा
                        onClick={() => handleTabClick('dashboard')}
                    >
                        📈 Dashboard
                    </button>
                    <button
                        className={`px-6 py-4 cursor-pointer text-sm font-semibold transition-all duration-300 ${
                            activeTab === 'occupancy' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-700 hover:text-white'
                        }`}
                        onClick={() => handleTabClick('occupancy')}
                    >
                        🏠 Occupancy Tracker
                    </button>
                    <button
                        className={`px-6 py-4 cursor-pointer text-sm font-semibold transition-all duration-300 ${
                            activeTab === 'revenue' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-700 hover:text-white'
                        }`}
                        onClick={() => handleTabClick('revenue')}
                    >
                        💰 Revenue Tracker
                    </button>
                    <button
                        className={`px-6 py-4 cursor-pointer text-sm font-semibold transition-all duration-300 ${
                            activeTab === 'expenses' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-700 hover:text-white'
                        }`}
                        onClick={() => handleTabClick('expenses')}
                    >
                        📋 Expense Manager
                    </button>
                    <button
                        className={`px-6 py-4 cursor-pointer text-sm font-semibold transition-all duration-300 ${
                            activeTab === 'profitability' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-700 hover:text-white'
                        }`}
                        onClick={() => handleTabClick('profitability')}
                    >
                        📊 P&L Analysis
                    </button>
                    <button
                        className={`px-6 py-4 cursor-pointer text-sm font-semibold transition-all duration-300 ${
                            activeTab === 'formulas' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-700 hover:text-white'
                        }`}
                        onClick={() => handleTabClick('formulas')}
                    >
                        🔢 Excel Formulas
                    </button>
                    <button
                        className={`px-6 py-4 cursor-pointer text-sm font-semibold transition-all duration-300 ${
                            activeTab === 'setup' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-700 hover:text-white'
                        } rounded-tl-lg`} {/* थोड़ा गोलाकार किनारा */}
                        onClick={() => handleTabClick('setup')}
                    >
                        ⚙️ Setup Guide
                    </button>
                </div>

                {/* Tab Content Areas */}
                <div className="p-8">
                    {/* Dashboard Tab Content */}
                    {activeTab === 'dashboard' && (
                        <div id="dashboard-content">
                            <div className="bg-red-500 text-white p-4 my-5 rounded-lg font-semibold text-lg">📈 Real-Time Dashboard KPIs</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
                                <div className="bg-orange-500 text-white p-6 rounded-xl text-center shadow-md transform hover:scale-105 transition-transform duration-300">
                                    <h3 className="text-lg mb-2 font-light">Total Revenue Target</h3>
                                    <div className="text-3xl font-bold mb-1">₹3,96,000</div>
                                    <small>36 students × ₹11,000</small>
                                </div>
                                <div className="bg-orange-500 text-white p-6 rounded-xl text-center shadow-md transform hover:scale-105 transition-transform duration-300">
                                    <h3>Current Occupancy</h3>
                                    <div className="text-3xl font-bold">---%</div>
                                    <small>To be calculated from tracker</small>
                                </div>
                                <div className="bg-orange-500 text-white p-6 rounded-xl text-center shadow-md transform hover:scale-105 transition-transform duration-300">
                                    <h3>Monthly Profit</h3>
                                    <div className="value">₹---</div>
                                    <small>Revenue - Expenses</small>
                                </div>
                                <div className="bg-orange-500 text-white p-6 rounded-xl text-center shadow-md transform hover:scale-105 transition-transform duration-300">
                                    <h3>Profit Margin</h3>
                                    <div className="text-3xl font-bold">---%</div>
                                    <small>Target: 25%+ </small>
                                </div>
                            </div>

                            <div className="bg-red-500 text-white p-4 my-5 rounded-lg font-semibold text-lg">🎯 Key Metrics Summary</div>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse my-5 bg-white rounded-lg shadow-md">
                                    <thead>
                                        <tr>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">KPI</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Current Value</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Target</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Status</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Excel Formula</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Occupancy Rate</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">Input Required</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">95%+</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">🟡</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=COUNTIF(OccupancySheet!C:C,"Occupied")/36*100'}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Collection Efficiency</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">Input Required</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">95%+</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">🟡</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=RevenueSheet!TotalCollected/RevenueSheet!TotalBilled*100'}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Expense Ratio</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">Input Required</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">&lt;75%</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">🟡</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=ExpenseSheet!TotalExpenses/RevenueSheet!TotalRevenue*100'}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Average Stay Duration</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">Input Required</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">6+ months</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">🟡</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=AVERAGE(OccupancySheet!StayDuration)'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Occupancy Tracker Tab Content */}
                    {activeTab === 'occupancy' && (
                        <div id="occupancy-content">
                            <div className="bg-red-500 text-white p-4 my-5 rounded-lg font-semibold text-lg">🏠 Student Occupancy Tracking Sheet</div>
                            <div className="bg-blue-100 border-l-4 border-blue-500 p-5 my-5 rounded-md">
                                <h4 className="text-gray-800 mb-3 text-base font-semibold">📝 How to Use This Sheet:</h4>
                                <ul className="list-disc ml-5 text-gray-700 text-sm">
                                    <li>Update student status daily (Occupied/Vacant/Notice Period)</li>
                                    <li>Track move-in and move-out dates</li>
                                    <li>Monitor security deposits and advance payments</li>
                                    <li>Excel will automatically calculate occupancy rates</li>
                                </ul>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse my-5 bg-white rounded-lg shadow-md">
                                    <thead>
                                        <tr>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Bed No.</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Flat</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Room Type</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Student Name</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Status</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Move-in Date</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Move-out Date</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Monthly Rent</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Security Deposit</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Advance Paid</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Stay Duration (Days)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Sample Data */}
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">001</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">Flat A - 3BHK</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">Single</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">[Student Name]</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">Occupied</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">01-Jun-2025</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">-</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">₹11,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹22,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹11,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=TODAY()-F2'}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">002</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">Flat A - 3BHK</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">Single</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">[Student Name]</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">Occupied</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">15-May-2025</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">-</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">₹11,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹22,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹11,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=TODAY()-F3'}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">003</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">Flat A - 3BHK</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">Shared</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">Vacant</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">Vacant</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">-</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">-</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">₹11,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">-</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">-</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'0'}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="11" className="p-3 text-center bg-gray-100 font-semibold text-gray-700">
                                                Continue for all 36 beds across 6-9 flats...
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-red-500 text-white p-4 my-5 rounded-lg font-semibold text-lg">📊 Occupancy Summary</div>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse my-5 bg-white rounded-lg shadow-md">
                                    <thead>
                                        <tr>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Metric</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Formula</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Total Beds</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=COUNT(A:A)-1'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">36</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Occupied Beds</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=COUNTIF(E:E,"Occupied")'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">Input Required</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Vacant Beds</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=COUNTIF(E:E,"Vacant")'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">Input Required</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Occupancy Rate</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=B15/B14*100'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">Calculate</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Revenue Tracker Tab Content */}
                    {activeTab === 'revenue' && (
                        <div id="revenue-content">
                            <div className="bg-red-500 text-white p-4 my-5 rounded-lg font-semibold text-lg">💰 Monthly Revenue Tracking</div>
                            <div className="bg-blue-100 border-l-4 border-blue-500 p-5 my-5 rounded-md">
                                <h4 className="text-gray-800 mb-3 text-base font-semibold">💡 Revenue Tracking Instructions:</h4>
                                <ul className="list-disc ml-5 text-gray-700 text-sm">
                                    <li>Update payment status daily</li>
                                    <li>Track advance payments and security deposits separately</li>
                                    <li>Monitor late payment fees</li>
                                    <li>Excel will calculate collection efficiency automatically</li>
                                </ul>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse my-5 bg-white rounded-lg shadow-md">
                                    <thead>
                                        <tr>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Month</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Bed No.</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Student Name</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Billed Amount</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Amount Collected</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Payment Date</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Outstanding</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Late Fee</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Payment Status</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Days Overdue</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">June 2025</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">001</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">[Student Name]</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">₹11,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹11,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">01-Jun-2025</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=D2-E2'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹0</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=IF(G2=0,"Paid","Pending")'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=IF(G2>0,TODAY()-F2,0)'}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">June 2025</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">002</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">[Student Name]</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">₹11,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹8,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">05-Jun-2025</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=D3-E3'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹100</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=IF(G3=0,"Paid","Pending")'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=IF(G3>0,TODAY()-F3,0)'}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="10" className="p-3 text-center bg-gray-100 font-semibold text-gray-700">
                                                Continue for all occupied beds...
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-red-500 text-white p-4 my-5 rounded-lg font-semibold text-lg">📈 Revenue Summary</div>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse my-5 bg-white rounded-lg shadow-md">
                                    <thead>
                                        <tr>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Revenue Metric</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Excel Formula</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Total Billed</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=SUM(D:D)'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹---</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Total Collected</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=SUM(E:E)'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹---</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Outstanding Amount</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=SUM(G:G)'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹---</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Late Fees Collected</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=SUM(H:H)'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹---</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Collection Efficiency</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=B16/B15*100&"%'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">---%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Expense Manager Tab Content */}
                    {activeTab === 'expenses' && (
                        <div id="expenses-content">
                            <div className="bg-red-500 text-white p-4 my-5 rounded-lg font-semibold text-lg">📋 Monthly Expense Management</div>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse my-5 bg-white rounded-lg shadow-md">
                                    <thead>
                                        <tr>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Expense Category</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Sub-Category</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Budgeted Amount</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Actual Amount</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Variance</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">% of Revenue</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-orange-200"> {/* Light orange for section header */}
                                            <td colSpan="7" className="p-3 font-semibold text-center text-gray-800">FIXED COSTS</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Property Rent</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">Flat A (3BHK)</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹25,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹25,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=D4-C4'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=D4/396000*100&"%'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">Monthly rent</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Property Rent</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">Flat B (3BHK)</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹25,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹25,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=D5-C5'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=D5/396000*100&"%'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">Monthly rent</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Property Rent</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">Flat C (2BHK)</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹20,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹20,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=D6-C6'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=D6/396000*100&"%'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">Monthly rent</td>
                                        </tr>
                                        <tr className="bg-red-200"> {/* Light red for section header */}
                                            <td colSpan="7" className="p-3 font-semibold text-center text-gray-800">VARIABLE COSTS</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Utilities</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">Electricity</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹15,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹18,500</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=D8-C8'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=D8/396000*100&"%'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">Summer spike</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Utilities</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">Water</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹3,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹2,800</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=D9-C9'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=D9/396000*100&"%'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">All flats</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Utilities</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">Internet/WiFi</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹5,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹4,800</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=D10-C10'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=D10/396000*100&"%'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">High-speed plans</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Maintenance</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">Housekeeping</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹8,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹8,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=D11-C11'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=D11/396000*100&"%'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">Weekly cleaning</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Maintenance</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">Repairs & AMC</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹5,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹7,200</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=D12-C12'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=D12/396000*100&"%'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">AC servicing</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Staff</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">Security</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹6,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹6,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=D13-C13'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=D13/396000*100&"%'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">Night watchman</td>
                                        </tr>
                                        <tr className="bg-purple-200"> {/* Light purple for section header */}
                                            <td colSpan="7" className="p-3 font-semibold text-center text-gray-800">OTHER EXPENSES</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Marketing</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">Online Ads</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹3,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹2,500</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=D15-C15'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=D15/396000*100&"%'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">Facebook/Google</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Insurance</td>
                                            <td className="p-3 border-b border-gray-200 text-sm">Property Insurance</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹2,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹2,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=D16-C16'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=D16/396000*100&"%'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">Annual premium</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-red-500 text-white p-4 my-5 rounded-lg font-semibold text-lg">💼 Expense Summary</div>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse my-5 bg-white rounded-lg shadow-md">
                                    <thead>
                                        <tr>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Summary Item</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Excel Formula</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Amount</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">% of Revenue</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Total Fixed Costs</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=SUM(D4:D6)'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹70,000</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=C19/396000*100&"%'}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Total Variable Costs</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=SUM(D8:D13)'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹47,300</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=C20/396000*100&"%'}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm">Total Other Expenses</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=SUM(D15:D16)'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹4,500</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=C21/396000*100&"%'}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm font-bold">TOTAL EXPENSES</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=C19+C20+C21'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-bold">₹1,21,800</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-semibold text-green-700">{'=C22/396000*100&"%'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Profit & Loss Analysis Tab Content */}
                    {activeTab === 'profitability' && (
                        <div id="profitability-content">
                            <div className="bg-red-500 text-white p-4 my-5 rounded-lg font-semibold text-lg">📊 Profit & Loss Analysis</div>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse my-5 bg-white rounded-lg shadow-md">
                                    <thead>
                                        <tr>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">P&L Item</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Current Month</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Previous Month</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">YTD Average</th>
                                            <th className="bg-blue-500 text-white p-3 text-left text-sm font-semibold">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm font-bold">Total Revenue</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-bold">₹---</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹---</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹---</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">From Revenue Tracker</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-b border-gray-200 text-sm font-bold">Total Expenses</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-bold">₹---</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹---</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹---</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">From Expense Manager</td>
                                        </tr>
                                        <tr className="bg-green-100">
                                            <td className="p-3 border-b border-gray-200 text-sm font-bold text-green-700">Net Profit</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-bold text-green-700">{'=B3-B4'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹---</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">₹---</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium"></td>
                                        </tr>
                                        <tr className="bg-green-100">
                                            <td className="p-3 border-b border-gray-200 text-sm font-bold text-green-700">Profit Margin (%)</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-green-100 font-bold text-green-700">{'=B5/B3*100&"%'}</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">---%</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">---%</td>
                                            <td className="p-3 border-b border-gray-200 text-sm bg-yellow-100 font-medium">Target: 25%+</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Excel Formulas Tab Content */}
                    {activeTab === 'formulas' && (
                        <div id="formulas-content">
                            <div className="bg-red-500 text-white p-4 my-5 rounded-lg font-semibold text-lg">🔢 Key Excel Formulas</div>
                            <div className="instructions">
                                <h4 className="text-gray-800 mb-3 text-base font-semibold">📝 Important Formulas for Calculation:</h4>
                                <ul className="list-disc ml-5 text-gray-700 text-sm">
                                    <li>**Occupancy Rate:** {'`=COUNTIF(OccupancySheet!C:C,"Occupied")/TotalBeds*100`'}</li>
                                    <li>**Collection Efficiency:** {'`=RevenueSheet!TotalCollected/RevenueSheet!TotalBilled*100`'}</li>
                                    <li>**Expense Ratio:** {'`=ExpenseSheet!TotalExpenses/RevenueSheet!TotalRevenue*100`'}</li>
                                    <li>**Net Profit:** {'`=TotalRevenue - TotalExpenses`'}</li>
                                    <li>**Profit Margin:** {'`=(Net Profit / Total Revenue) * 100`'}</li>
                                    <li>**Days Overdue:** {'`=IF(Outstanding>0,TODAY()-PaymentDate,0)`'}</li>
                                </ul>
                                <p className="mt-4 text-gray-700 text-sm">ये बुनियादी सूत्र हैं। आप अपनी विशिष्ट आवश्यकताओं के अनुसार उन्हें अनुकूलित कर सकते हैं।</p>
                            </div>
                        </div>
                    )}

                    {/* Setup Guide Tab Content */}
                    {activeTab === 'setup' && (
                        <div id="setup-content">
                            <div className="bg-red-500 text-white p-4 my-5 rounded-lg font-semibold text-lg">⚙️ Setup Guide</div>
                            <div className="instructions">
                                <h4 className="text-gray-800 mb-3 text-base font-semibold">🚀 Getting Started with Instay Excel Monitor:</h4>
                                <ul className="list-decimal ml-5 text-gray-700 text-sm">
                                    <li>**Step 1: Download the Excel Template:** Go to the "Download" section and get the latest Excel file.</li>
                                    <li>**Step 2: Populate Data:** Fill in your student, revenue, and expense data in the respective sheets.</li>
                                    <li>**Step 3: Monitor Dashboards:** The formulas will automatically update KPIs. Use this web portal to view real-time data.</li>
                                    <li>**Step 4: Regular Updates:** Ensure data in the Excel file is updated regularly for accurate reporting.</li>
                                </ul>
                                <p className="mt-4 text-gray-700 text-sm">किसी भी प्रश्न या समर्थन के लिए, अपनी Instay टीम से संपर्क करें।</p>
                            </div>
                            <div className="bg-green-500 text-white p-6 my-5 rounded-lg text-center">
                                <h3 className="text-xl font-bold mb-4">डाउनलोड करें:</h3>
                                <a href="https://placehold.co/100x50/2ecc71/ffffff?text=Download%20Excel" download="Instay_Monitoring_Template.xlsx"
                                   className="inline-block bg-white text-green-600 px-6 py-3 rounded-full text-base font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
                                    डाउनलोड एक्सेल टेम्पलेट
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
