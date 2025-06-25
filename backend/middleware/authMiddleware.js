// 📁 D:\AppDevelopment\instay-app\backend\middleware\authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
// ✨ UPDATED: Corrected path for ErrorHandler and catchAsyncError ✨
// 'middleware' फ़ोल्डर से 'utils' फ़ोल्डर तक पहुँचने के लिए केवल एक '../' आवश्यक है।
const ErrorHandler = require('../utils/errorHandler'); 
const catchAsyncError = require('../utils/catchAsyncError'); // फ़ाइल का नाम 'catchAsyncError' (singular) है


// Middleware to check if user is authenticated (टोकन को सत्यापित करता है)
// यह catchAsyncError HOC (Higher-Order Component) का उपयोग करता है
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    // कुकीज़ से टोकन लेने का प्रयास करें
    const { token } = req.cookies; 

    // Authorization हेडर से टोकन लेने का प्रयास करें (जैसे 'Bearer TOKEN')
    let authorizationHeader = req.headers.authorization;
    let tokenFromHeader;

    if (authorizationHeader && authorizationHeader.startsWith('Bearer')) {
        tokenFromHeader = authorizationHeader.split(' ')[1];
    }

    // अंतिम टोकन (जो भी उपलब्ध हो)
    const finalToken = token || tokenFromHeader; 

    if (!finalToken) {
        return next(new ErrorHandler('कृपया इस संसाधन तक पहुँचने के लिए लॉगिन करें।', 401));
    }

    try {
        // JWT टोकन को सत्यापित करें
        const decodedData = jwt.verify(finalToken, process.env.JWT_SECRET);
        
        // डिकोड किए गए ID का उपयोग करके यूजर को डेटाबेस से खोजें
        req.user = await User.findById(decodedData.id);

        if (!req.user) {
            return next(new ErrorHandler('प्रमाणीकृत नहीं: उपयोगकर्ता डेटाबेस में नहीं मिला।', 401));
        }

        // टोकन में मौजूद रोल को req.user पर असाइन करें (यह सुनिश्चित करता है कि रोल अपडेटेड हो)
        req.user.role = decodedData.role; 

        next(); // अगले मिडिलवेयर या राउट हैंडलर पर जाएँ

    } catch (error) {
        console.error('टोकन सत्यापन विफल रहा:', error.message); 
        return next(new ErrorHandler('अमान्य या समाप्त हो गया टोकन। कृपया फिर से लॉगिन करें।', 401));
    }
});


// Middleware to authorize user roles (यूजर की भूमिकाओं की जाँच करता है)
exports.authorizeRoles = (...roles) => {
    // सुनिश्चित करें कि अनुमत भूमिकाएं एक फ्लैट सरणी हैं
    const allowedRoles = roles.flat(); 

    return (req, res, next) => {
        // यदि req.user परिभाषित नहीं है या यूजर की भूमिका अनुमत भूमिकाओं में शामिल नहीं है
        if (!req.user || !allowedRoles.includes(req.user.role)) { 
            const userRole = req.user && req.user.role ? req.user.role : 'None';
            return next(
                new ErrorHandler(
                    `भूमिका: ${userRole} को इस संसाधन तक पहुँचने की अनुमति नहीं है।`, 
                    403 // 403 Forbidden स्टेटस कोड
                )
            );
        }
        next(); // अगले मिडिलवेयर या राउट हैंडलर पर जाएँ
    };
};
