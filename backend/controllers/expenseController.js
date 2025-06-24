// 📁 D:\AppDevelopment\instay-app\backend\controllers\expenseController.js

const Expense = require('../models/Expense'); // Expense मॉडल को इम्पोर्ट करें

// ➕ Add a new expense
exports.addExpense = async (req, res) => {
    try {
        const newExpense = new Expense(req.body);
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (err) {
        console.error('Error adding expense:', err);
        res.status(500).json({ error: 'Failed to add expense', details: err.message });
    }
};

// 📋 Get all expenses
exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ date: -1, createdAt: -1 }); // नवीनतम खर्च पहले
        res.json(expenses);
    } catch (err) {
        console.error('Error fetching expenses:', err);
        res.status(500).json({ error: 'Failed to fetch expenses', details: err.message });
    }
};

// 🔍 Get a single expense by ID
exports.getExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found.' });
        }
        res.json(expense);
    } catch (err) {
        console.error('Error fetching expense by ID:', err);
        res.status(500).json({ error: 'Failed to fetch expense', details: err.message });
    }
};

// ✏️ Update an expense by ID
exports.updateExpense = async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // 'new: true' अपडेटेड डॉक्यूमेंट लौटाता है, 'runValidators: true' स्कीमा वैलिडेशन चलाता है
        );
        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found.' });
        }
        res.json(updatedExpense);
    } catch (err) {
        console.error('Error updating expense:', err);
        res.status(500).json({ error: 'Failed to update expense', details: err.message });
    }
};

// 🗑️ Delete an expense by ID
exports.deleteExpense = async (req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found.' });
        }
        res.json({ message: 'Expense deleted successfully.' });
    } catch (err) {
        console.error('Error deleting expense:', err);
        res.status(500).json({ error: 'Failed to delete expense', details: err.message });
    }
};