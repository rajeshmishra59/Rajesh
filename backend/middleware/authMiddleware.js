// 📁 D:\AppDevelopment\instay-app\backend\middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// यह सुनिश्चित करने के लिए मिडिलवेयर कि यूजर लॉग इन है
const protect = async (req, res, next) => {
    let token;

    // HTTP हेडर में 'Authorization' फ़ील्ड से टोकन की जाँच करें
    // यह 'Bearer TOKEN_STRING' फॉर्मेट में होता है
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 'Bearer' स्ट्रिंग को हटाकर टोकन प्राप्त करें
            token = req.headers.authorization.split(' ')[1];

            // टोकन को सत्यापित करें
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // यूजर ID और रोल को अनुरोध ऑब्जेक्ट में अटैच करें
            // पासवर्ड को छोड़कर यूजर को ढूंढें
            req.user = await User.findById(decoded.id).select('-password');
            req.user.role = decoded.role; // टोकन से रोल भी अटैच करें

            next(); // अगले मिडिलवेयर/राउट हैंडलर पर जाएँ
        } catch (error) {
            console.error('Not authorized, token failed:', error.message);
            res.status(401).json({ message: 'Not authorized, token failed.' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token.' });
    }
};

// यह सुनिश्चित करने के लिए मिडिलवेयर कि यूजर के पास विशिष्ट भूमिका है
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: `User role ${req.user ? req.user.role : 'unauthorized'} is not authorized to access this route.` });
        }
        next();
    };
};

module.exports = { protect, authorizeRoles };