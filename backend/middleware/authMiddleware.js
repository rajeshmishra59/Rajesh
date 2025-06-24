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

            // यूजर ID का उपयोग करके यूजर को डेटाबेस से ढूंढें
            const userFromDB = await User.findById(decoded.id).select('-password'); // पासवर्ड को छोड़कर

            if (!userFromDB) {
                // यदि यूजर डेटाबेस में नहीं मिलता है
                return res.status(401).json({ message: 'Not authorized, user not found.' });
            }

            // ✨ UPDATED: req.user को एक प्लेन ऑब्जेक्ट के रूप में सेट करें जिसमें रोल भी शामिल हो ✨
            req.user = {
                _id: userFromDB._id,
                username: userFromDB.username,
                role: decoded.role, // टोकन से सीधे रोल का उपयोग करें, यह अधिक विश्वसनीय है
                // यदि आपको userFromDB से अन्य फ़ील्ड की आवश्यकता है, तो उन्हें यहाँ जोड़ें
            };

            next(); // अगले मिडिलवेयर/राउट हैंडलर पर जाएँ
        } catch (error) {
            console.error('Not authorized, token failed:', error.message);
            res.status(401).json({ message: 'Not authorized, token failed.' });
        }
    } else { // यदि कोई टोकन प्रदान नहीं किया गया है
        res.status(401).json({ message: 'Not authorized, no token.' });
    }
};

// यह सुनिश्चित करने के लिए मिडिलवेयर कि यूजर के पास विशिष्ट भूमिका है
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // अब req.user हमेशा एक प्लेन ऑब्जेक्ट होगा जिसमें req.user.role सही होगा
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: `User role ${req.user && req.user.role ? req.user.role : 'unauthorized'} is not authorized to access this route.` });
        }
        next();
    };
};

module.exports = { protect, authorizeRoles };