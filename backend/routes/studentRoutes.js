// 📁 D:\AppDevelopment\instay-app\backend\routes\studentRoutes.js

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController'); // studentController को इम्पोर्ट करें

// ➕ Add a new student
router.post('/', studentController.addStudent);

// 📋 Get all students
router.get('/', studentController.getAllStudents); // यहाँ एरर आ रही थी (लाइन 9)

// 🔍 Get a single student by ID
router.get('/:id', studentController.getStudentById);

// ✏️ Update a student by ID
router.put('/:id', studentController.updateStudent);

// 🗑️ Delete (Soft Delete) a student by ID
router.delete('/:id', studentController.deleteStudent); // सुनिश्चित करें कि यह सही नाम है

module.exports = router;