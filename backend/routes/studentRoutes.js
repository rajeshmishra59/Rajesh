// 📁 D:\AppDevelopment\instay-app\backend\routes\studentRoutes.js

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
// ✨ UPDATED: Corrected import for authMiddleware ✨
// authMiddleware एक ऑब्जेक्ट है जिसमें protect और authorizeRoles फंक्शन्स हैं।
// हमें सीधे protect फंक्शन का उपयोग करना होगा।
const { protect, authorizeRoles } = require('../middleware/authMiddleware'); 

// New route for student enrollment (basic details)
// अब protect फंक्शन सीधे मिडलवेयर के रूप में उपयोग किया गया है
router.post('/enroll', protect, studentController.enrollStudent);

// Existing routes (ensure these are present)
// सभी routes में protect मिडलवेयर का उपयोग करें
router.post('/', protect, studentController.addStudent); 
router.get('/', protect, studentController.getAllStudents);
router.get('/:id', protect, studentController.getStudentById);
router.put('/:id', protect, studentController.updateStudent);
router.delete('/:id', protect, studentController.deleteStudent);

// New route to get students by status
router.get('/status', protect, studentController.getStudentsByStatus);


module.exports = router;