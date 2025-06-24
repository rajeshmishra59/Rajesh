// 📁 D:\AppDevelopment\instay-app\backend\routes\complaintRoutes.js

const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware'); // सुरक्षा और भूमिका मिडिलवेयर इम्पोर्ट करें

// ➕ Add a new complaint (छात्र, एडमिन, मैनेजर, वार्डन द्वारा)
// छात्र अपनी शिकायतें दर्ज कर सकते हैं, अन्य भी उनके लिए कर सकते हैं
router.post('/', protect, complaintController.addComplaint);

// 📋 Get all complaints (केवल एडमिन, मैनेजर, वार्डन ही सभी शिकायतें देख सकते हैं)
router.get('/', protect, authorizeRoles('Admin', 'Manager', 'Warden'), complaintController.getAllComplaints);

// 🔍 Get a single complaint by ID (एडमिन, मैनेजर, वार्डन, या संबंधित छात्र)
router.get('/:id', protect, complaintController.getComplaintById);

// 📋 Get complaints by student ID (छात्र अपनी शिकायतें देखें, एडमिन/मैनेजर भी किसी भी छात्र की)
router.get('/student/:studentId', protect, complaintController.getComplaintsByStudent);

// ✏️ Update a complaint by ID (एडमिन, मैनेजर, वार्डन द्वारा स्टेटस/टिप्पणियाँ अपडेट करने के लिए; छात्र अपनी प्रतिक्रिया दे सकते हैं)
router.put('/:id', protect, complaintController.updateComplaint);

// 🗑️ Delete a complaint by ID (केवल एडमिन, मैनेजर द्वारा)
router.delete('/:id', protect, authorizeRoles('Admin', 'Manager'), complaintController.deleteComplaint);

module.exports = router;