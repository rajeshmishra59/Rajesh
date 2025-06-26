// 📁 backend/routes/studentRoutes.js

const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authMiddleware.js');
const {
    addStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    // कोई भी student-controller functions यहाँ import करें
} = require('../controllers/studentController');

const router = express.Router();

// Student CRUD routes
router.post('/admin/student/new', isAuthenticatedUser, authorizeRoles('Admin', 'Manager'), addStudent);
router.get('/', isAuthenticatedUser, authorizeRoles('Admin', 'Manager', 'Warden'), getAllStudents);
router.get('/:id', isAuthenticatedUser, authorizeRoles('Admin', 'Manager', 'Warden'), getStudentById);
router.put('/admin/student/:id', isAuthenticatedUser, authorizeRoles('Admin', 'Manager'), updateStudent);
router.delete('/admin/student/:id', isAuthenticatedUser, authorizeRoles('Admin'), deleteStudent);

module.exports = router;
