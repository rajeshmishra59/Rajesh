// 📁 D:\AppDevelopment\instay-app\backend\routes\studentRoutes.js

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
// ✨ UPDATED: authMiddleware.js से सही नाम इम्पोर्ट करें ✨
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authMiddleware'); 

// New route for student enrollment (basic details)
// अब isAuthenticatedUser फंक्शन सीधे मिडिलवेयर के रूप में उपयोग किया गया है
router.post('/enroll', isAuthenticatedUser, studentController.enrollStudent);

// Existing routes (ensure these are present)
// सभी routes में isAuthenticatedUser मिडिलवेयर का उपयोग करें
router.post('/', isAuthenticatedUser, studentController.addStudent); 
router.get('/', isAuthenticatedUser, studentController.getAllStudents);
router.get('/:id', isAuthenticatedUser, studentController.getStudentById);
router.put('/:id', isAuthenticatedUser, studentController.updateStudent);
router.delete('/:id', isAuthenticatedUser, studentController.deleteStudent);

// New route to get students by status
router.get('/status', isAuthenticatedUser, studentController.getStudentsByStatus);


module.exports = router;
