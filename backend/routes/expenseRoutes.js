// 📁 D:\AppDevelopment\instay-app\backend\routes\expenseRoutes.js

const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// ➕ Add a new expense
router.post('/', expenseController.addExpense);

// 📋 Get all expenses
router.get('/', expenseController.getAllExpenses);

// 🔍 Get a single expense by ID
router.get('/:id', expenseController.getExpenseById);

// ✏️ Update an expense by ID
router.put('/:id', expenseController.updateExpense);

// 🗑️ Delete an expense by ID
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;