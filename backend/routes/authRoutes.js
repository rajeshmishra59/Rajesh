// 📁 D:\AppDevelopment\instay-app\backend\routes\authRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUserProfile } = require('../controllers/authController');
// ✨ UPDATED: authMiddleware.js से सही नाम इम्पोर्ट करें ✨
const { isAuthenticatedUser } = require('../middleware/authMiddleware'); 

// पब्लिक राउट्स
router.post('/register', registerUser); // यूजर रजिस्टर करें
router.post('/login', authUser);       // यूजर लॉग इन करें

// प्रोटेक्टेड राउट्स (केवल लॉग इन यूजर ही एक्सेस कर सकते हैं)
// अब isAuthenticatedUser फंक्शन सीधे मिडिलवेयर के रूप में उपयोग किया गया है
router.get('/profile', isAuthenticatedUser, getUserProfile); // यूजर प्रोफाइल प्राप्त करें

module.exports = router;
