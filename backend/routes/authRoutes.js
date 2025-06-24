// 📁 D:\AppDevelopment\instay-app\backend\routes\authRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware'); // ऑथेंटिकेशन मिडिलवेयर को इम्पोर्ट करें

// पब्लिक राउट्स
router.post('/register', registerUser); // यूजर रजिस्टर करें
router.post('/login', authUser);       // यूजर लॉग इन करें

// प्रोटेक्टेड राउट्स (केवल लॉग इन यूजर ही एक्सेस कर सकते हैं)
router.get('/profile', protect, getUserProfile); // यूजर प्रोफाइल प्राप्त करें

module.exports = router;