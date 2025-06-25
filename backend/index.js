// 📁 D:\AppDevelopment\instay-app\backend\index.js

const express = require('express');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database'); // आपकी डेटाबेस कनेक्शन फ़ाइल
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // ✨ NEW: cookie-parser इम्पोर्ट करें ✨

// राउट्स इम्पोर्ट करें
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const spaceRoutes = require('./routes/spaceRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
// अन्य राउट्स जिन्हें आपने बनाया हो, उन्हें भी यहाँ इम्पोर्ट करें
// const paymentRoutes = require('./routes/paymentRoutes');
// const expenseRoutes = require('./routes/expenseRoutes');
// const reportRoutes = require('./routes/reportRoutes');


// Config
// ✨ UPDATED: .env फ़ाइल का पाथ ठीक किया गया।
// यदि .env फ़ाइल सीधे 'backend' फ़ोल्डर में है जहाँ index.js चलता है,
// तो पाथ को केवल '.env' या कुछ भी नहीं होना चाहिए।
dotenv.config({ path: '.env' }); 

// डेटाबेस से कनेक्ट करें
connectDatabase();

const app = express();

// मिडिलवेयर्स
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // ✨ NEW: cookie-parser मिडिलवेयर का उपयोग करें ✨
app.use(cors({
    origin: 'http://localhost:3000', // अपने फ्रंटएंड के URL को अनुमति दें
    credentials: true // कुकीज़ भेजने की अनुमति दें
}));


// राउट्स का उपयोग करें
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/spaces', spaceRoutes);
app.use('/api/complaints', complaintRoutes);
// अन्य राउट्स का उपयोग करें
// app.use('/api/payments', paymentRoutes);
// app.use('/api/expenses', expenseRoutes);
// app.use('/api/reports', reportRoutes);


// सर्वर शुरू करें
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => { // server इंस्टेंस को कैप्चर करें
    console.log(`🚀 सर्वर पोर्ट ${PORT} पर चल रहा है`);
});

// अनहैंडल्ड प्रॉमिस रिजेक्शन
process.on('unhandledRejection', (err) => {
    console.error(`त्रुटि: ${err.message}`);
    console.log('अनहैंडल्ड प्रॉमिस रिजेक्शन के कारण सर्वर को बंद कर रहा है');
    server.close(() => {
        process.exit(1);
    });
});
