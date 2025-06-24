// 📁 D:\AppDevelopment\instay-app\backend\routes\paymentRoutes.js

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// ➕ Add a new payment
router.post('/', paymentController.addPayment);

// 📋 Get all payments (for admin overview, optional)
router.get('/', paymentController.getAllPayments);

// 🔍 Get a single payment by ID
router.get('/:id', paymentController.getPaymentById);

// ✏️ Update a payment by ID
router.put('/:id', paymentController.updatePayment);

// 🗑️ Delete a payment by ID (use with caution, as discussed)
router.delete('/:id', paymentController.deletePayment);

// 📋 Get payments for a specific student (most common use case)
router.get('/student/:studentId', paymentController.getPaymentsByStudentId);


module.exports = router;