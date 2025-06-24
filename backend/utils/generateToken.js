// 📁 D:\AppDevelopment\instay-app\backend\utils\generateToken.js

const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
    // JWT_SECRET को .env फ़ाइल से लिया जाएगा
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '1d', // टोकन 1 दिन में एक्सपायर हो जाएगा
    });
};

module.exports = generateToken;