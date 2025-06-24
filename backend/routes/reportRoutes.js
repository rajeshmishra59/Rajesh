// 📁 D:\AppDevelopment\instay-app\backend\routes\reportRoutes.js

const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware'); // सुरक्षा और भूमिका मिडिलवेयर इम्पोर्ट करें

// सभी रिपोर्ट एंडपॉइंट्स को केवल Admin और Manager ही एक्सेस कर सकते हैं
// बाद में, Warden को कुछ रिपोर्ट देखने की अनुमति दी जा सकती है
router.use(protect, authorizeRoles('Admin', 'Manager', 'Warden')); // रिपोर्ट एंडपॉइंट्स को सुरक्षित करें

// Get student report
router.get('/students', reportController.getStudentReport);

// Get payment report
router.get('/payments', reportController.getPaymentReport);

// Get expense report
router.get('/expenses', reportController.getExpenseReport);

// Get complaint summary report
router.get('/complaints/summary', reportController.getComplaintSummary);

// Get space occupancy report
router.get('/spaces/occupancy', reportController.getSpaceOccupancyReport);


module.exports = router;