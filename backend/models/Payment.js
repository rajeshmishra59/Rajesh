// 📁 D:\AppDevelopment\instay-app\backend\models\Payment.js

const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    student: { // यह फील्ड छात्र ID को स्टोर करेगा जिससे हम भुगतान को छात्र से जोड़ सकें
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', // 'Student' आपके Student मॉडल का नाम है
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0 // सुनिश्चित करें कि राशि नकारात्मक न हो
    },
    paymentDate: {
        type: Date,
        default: Date.now // डिफ़ॉल्ट रूप से वर्तमान तिथि और समय
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Online Transfer', 'Card', 'Cheque', 'Other'], // भुगतान के तरीके
        default: 'Cash'
    },
    transactionId: { // ऑनलाइन लेनदेन के लिए वैकल्पिक
        type: String,
        unique: true, // यदि ट्रांज़ैक्शन ID यूनिक होना चाहिए
        sparse: true // यदि यह खाली हो सकता है, तो खाली मानों के लिए यूनिक इंडेक्स लागू न करें
    },
    description: { // भुगतान का विवरण
        type: String,
        trim: true // अग्रणी/अनुगामी रिक्त स्थान हटाएँ
    },
    // भविष्य के लिए: आप paymentStatus, createdBy, आदि जैसे फ़ील्ड जोड़ सकते हैं
}, {
    timestamps: true // createdAt और updatedAt फ़ील्ड जोड़ें
});

module.exports = mongoose.model('Payment', paymentSchema);