// 📁 D:\AppDevelopment\instay-app\backend\controllers\reportController.js

const Student = require('../models/Student');
const Payment = require('../models/Payment');
const Expense = require('../models/Expense');
const Complaint = require('../models/Complaint');
const Space = require('../models/Space');

// Get all students report
exports.getStudentReport = async (req, res) => {
    try {
        const students = await Student.find().populate('assignedSpace').sort({ roomNumber: 1, bedNumber: 1 });
        res.json(students);
    } catch (error) {
        console.error('Error fetching student report:', error);
        res.status(500).json({ message: 'Failed to fetch student report', details: error.message });
    }
};

// Get all payments report (optionally by student or date range)
exports.getPaymentReport = async (req, res) => {
    const { studentId, startDate, endDate } = req.query;
    let query = {};

    if (studentId) {
        query.student = studentId;
    }
    if (startDate && endDate) {
        query.paymentDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
    } else if (startDate) {
        query.paymentDate = { $gte: new Date(startDate) };
    } else if (endDate) {
        query.paymentDate = { $lte: new Date(endDate) };
    }

    try {
        const payments = await Payment.find(query).populate('student', 'firstName lastName').sort({ paymentDate: -1 });
        res.json(payments);
    } catch (error) {
        console.error('Error fetching payment report:', error);
        res.status(500).json({ message: 'Failed to fetch payment report', details: error.message });
    }
};

// Get expense report (optionally by category or date range)
exports.getExpenseReport = async (req, res) => {
    const { category, startDate, endDate } = req.query;
    let query = {};

    if (category) {
        query.category = category;
    }
    if (startDate && endDate) {
        query.expenseDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
    } else if (startDate) {
        query.expenseDate = { $gte: new Date(startDate) };
    } else if (endDate) {
        query.expenseDate = { $lte: new Date(endDate) };
    }

    try {
        const expenses = await Expense.find(query).sort({ expenseDate: -1 });
        const totalExpenses = await Expense.aggregate([
            { $match: query },
            { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
        ]);

        res.json({
            expenses: expenses,
            totalAmount: totalExpenses.length > 0 ? totalExpenses[0].totalAmount : 0
        });
    } catch (error) {
        console.error('Error fetching expense report:', error);
        res.status(500).json({ message: 'Failed to fetch expense report', details: error.message });
    }
};

// Get complaint summary report (by status or category)
exports.getComplaintSummary = async (req, res) => {
    const { status, category } = req.query;
    let query = {};

    if (status) {
        query.status = status;
    }
    if (category) {
        query.category = category;
    }

    try {
        const summary = await Complaint.aggregate([
            { $match: query },
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);
        res.json(summary);
    } catch (error) {
        console.error('Error fetching complaint summary:', error);
        res.status(500).json({ message: 'Failed to fetch complaint summary', details: error.message });
    }
};

// Get space occupancy report
exports.getSpaceOccupancyReport = async (req, res) => {
    try {
        const totalSpaces = await Space.countDocuments();
        const occupiedSpaces = await Student.countDocuments({ assignedSpace: { $ne: null } });

        const spaces = await Space.find().sort({ roomNumber: 1, bedNumber: 1 });
        const students = await Student.find({ assignedSpace: { $ne: null } }).select('firstName lastName assignedSpace');

        const occupancyDetails = spaces.map(space => {
            const occupant = students.find(student => student.assignedSpace && student.assignedSpace.toString() === space._id.toString());
            return {
                _id: space._id,
                roomNumber: space.roomNumber,
                bedNumber: space.bedNumber,
                isOccupied: !!occupant,
                occupantName: occupant ? `${occupant.firstName} ${occupant.lastName}` : null
            };
        });

        res.json({
            totalSpaces,
            occupiedSpaces,
            availableSpaces: totalSpaces - occupiedSpaces,
            occupancyDetails
        });

    } catch (error) {
        console.error('Error fetching space occupancy report:', error);
        res.status(500).json({ message: 'Failed to fetch space occupancy report', details: error.message });
    }
};