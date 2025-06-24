// 📁 D:\AppDevelopment\instay-app\backend\controllers\authController.js

const User = require('../models/User');
const generateToken = require('../utils/generateToken'); // JWT जनरेटर को इम्पोर्ट करें

// 🔑 Register a new user (केवल पहला एडमिन यूजर बनाने के लिए इस्तेमाल किया जा सकता है, या रोल के आधार पर प्रतिबंधित किया जा सकता है)
exports.registerUser = async (req, res) => {
    const { username, password, role, studentId } = req.body;

    // सुनिश्चित करें कि केवल एक 'Admin' यूजर ही शुरू में बनाया जाए, या विशिष्ट भूमिकाओं को प्रतिबंधित करें
    // आप बाद में एक बेहतर रजिस्ट्रेशन फ्लो लागू कर सकते हैं जहां Admin ही अन्य यूजर्स बना सके
    if (role === 'Admin') {
        const adminExists = await User.findOne({ role: 'Admin' });
        if (adminExists) {
            return res.status(400).json({ message: 'Admin user already exists. Cannot create another Admin directly.' });
        }
    }

    try {
        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const user = await User.create({
            username,
            password, // पासवर्ड pre-save हुक द्वारा हैश किया जाएगा
            role: role || 'Student', // यदि कोई भूमिका प्रदान नहीं की जाती है, तो डिफ़ॉल्ट 'Student'
            student: studentId || null, // यदि छात्र उपयोगकर्ता है तो studentId जोड़ें
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                role: user.role,
                token: generateToken(user._id, user.role), // JWT जनरेट करें
                student: user.student,
            });
        } else {
            res.status(400).json({ message: 'Invalid user data.' });
        }
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Server error during registration.', details: error.message });
    }
};

// 🔒 Authenticate user & get token (login)
exports.authUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                role: user.role,
                token: generateToken(user._id, user.role), // JWT जनरेट करें
                student: user.student,
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password.' });
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ error: 'Server error during authentication.', details: error.message });
    }
};

// 👤 Get user profile (authenticated user only)
exports.getUserProfile = async (req, res) => {
    // req.user JWT मिडिलवेयर से आता है जो यूजर ID और रोल को अटैच करता है
    const user = await User.findById(req.user.id).select('-password'); // पासवर्ड को छोड़कर

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            role: user.role,
            student: user.student,
        });
    } else {
        res.status(404).json({ message: 'User not found.' });
    }
};