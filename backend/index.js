// 📁 D:\AppDevelopment\instay-app\backend\index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // .env फ़ाइल से पर्यावरण चर लोड करें

// Routes को इम्पोर्ट करें
const studentRoutes = require('./routes/studentRoutes');
const spaceRoutes = require('./routes/spaceRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/authRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const reportRoutes = require('./routes/reportRoutes'); // ✨ नया: Report Routes इम्पोर्ट करें ✨

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // CORS सक्षम करें ताकि फ्रंटएंड से अनुरोध स्वीकार किए जा सकें
app.use(express.json()); // JSON फॉर्मेट में आने वाली रिक्वेस्ट बॉडी को पार्स करने के लिए

// MongoDB से कनेक्ट करें
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB')) // सफलता पर लॉग करें
    .catch(err => console.error('❌ MongoDB connection error:', err)); // विफलता पर एरर लॉग करें

// विभिन्न मॉड्यूल के लिए रूट्स का उपयोग करें
app.use('/api/students', studentRoutes); // छात्र संबंधित API
app.use('/api/spaces', spaceRoutes);     // स्पेस संबंधित API
app.use('/api/payments', paymentRoutes); // भुगतान संबंधित API
app.use('/api/expenses', expenseRoutes); // खर्च संबंधित API
app.use('/api/auth', authRoutes);        // प्रमाणीकरण संबंधित API
app.use('/api/complaints', complaintRoutes); // शिकायत संबंधित API
app.use('/api/reports', reportRoutes);      // ✨ नया: रिपोर्ट संबंधित API ✨

// रूट URL पर एक बेसिक प्रतिक्रिया (यह पुष्टि करने के लिए कि सर्वर चल रहा है)
app.get('/', (req, res) => {
    res.send('Instay App Backend is running!');
});

// सर्वर को निर्दिष्ट पोर्ट पर सुनना शुरू करें
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});