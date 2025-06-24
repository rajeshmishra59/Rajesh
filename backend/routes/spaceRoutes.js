// 📁 D:\AppDevelopment\instay-app\backend\routes\spaceRoutes.js

const express = require('express');
const router = express.Router();
const spaceController = require('../controllers/spaceController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware'); // authMiddleware इम्पोर्ट करें

// New: Route to get all available spaces
router.get('/available', protect, authorizeRoles(['Admin', 'Manager', 'Warden']), spaceController.getAvailableSpaces);

// New: Route to book a space (changes status to 'Booked')
router.post('/book', protect, authorizeRoles(['Admin', 'Manager', 'Warden']), spaceController.bookSpace);

// New: Route to assign a space to a student (changes status to 'Occupied')
router.post('/assign', protect, authorizeRoles(['Admin', 'Manager', 'Warden']), spaceController.assignSpaceToStudent);


// Existing CRUD routes for spaces (ensure these are present)
router.post('/', protect, authorizeRoles(['Admin', 'Manager', 'Warden']), spaceController.addSpace);
router.get('/', protect, authorizeRoles(['Admin', 'Manager', 'Warden']), spaceController.getAllSpaces);
router.get('/:id', protect, authorizeRoles(['Admin', 'Manager', 'Warden']), spaceController.getSpaceById);
router.put('/:id', protect, authorizeRoles(['Admin', 'Manager', 'Warden']), spaceController.updateSpace);
router.delete('/:id', protect, authorizeRoles(['Admin']), spaceController.deleteSpace); // Only Admin can delete

module.exports = router;