// 📁 D:\AppDevelopment\instay-app\backend\models\Student.js

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    // छात्र का पूरा नाम (नामांकन के लिए आवश्यक)
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        // unique: true, // ईमेल अद्वितीय हो सकता है, लेकिन अभी इसे आवश्यक नहीं करते
        // यदि आप चाहते हैं कि हर छात्र का ईमेल अद्वितीय हो, तो इसे uncomment करें
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true, // फ़ोन नंबर अद्वितीय होना चाहिए (नामांकन के लिए मुख्य पहचानकर्ता)
    },
    // ✨ नया फ़ील्ड: हमारी तरफ से एक अद्वितीय छात्र ID ✨
    studentUID: {
        type: String,
        unique: true,
        trim: true,
    },
    
    // ये फ़ील्ड अब नामांकन के समय आवश्यक नहीं हैं, बाद में अपडेट होंगे
    college: {
        type: String,
        trim: true,
    },
    currentAddress: {
        type: String,
        trim: true,
    },
    permanentAddress: {
        type: String,
        trim: true,
    },
    emergencyContactName: {
        type: String,
        trim: true,
    },
    emergencyContactPhone: {
        type: String,
        trim: true,
    },
    dateOfBirth: {
        type: Date,
    },
    nationality: {
        type: String,
        trim: true,
        default: 'Indian', // डिफ़ॉल्ट राष्ट्रीयता
    },
    guardianName: {
        type: String,
        trim: true,
    },
    guardianPhone: {
        type: String,
        trim: true,
    },
    
    // ✨ ये फ़ील्ड अब वैकल्पिक होंगे, बुकिंग/अलॉटमेंट चरण में भर जाएंगे ✨
    checkInDate: { // छात्र के चेक-इन की वास्तविक तिथि
        type: Date,
        default: null,
    },
    checkOutDate: { // छात्र के चेक-आउट की वास्तविक तिथि
        type: Date,
        default: null,
    },
    bookingAmount: { // शुरुआती बुकिंग राशि जो सुरक्षा जमा के रूप में काम करती है
        type: Number,
        default: 0,
        min: 0,
    },
    // ✨ NEW: Payment Mode Field for Booking ✨
    paymentMode: {
        type: String,
        enum: ['Cash', 'Online Transfer', 'Card', 'UPI', 'Cheque', 'Other'], // भुगतान के प्रकार
        default: null,
    },
    // ✨ NEW: Payment Date Field for Booking ✨
    paymentDate: {
        type: Date,
        default: null,
    },
    assignedSpace: { // छात्र को असाइन किया गया बेड/कमरा
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Space',
        default: null, // जब तक कोई स्पेस असाइन न हो, तब तक null
    },
    isActive: { // यह ट्रैक करने के लिए कि छात्र वर्तमान में रह रहा है या नहीं (सॉफ्ट-डिलीट के बजाय)
        type: Boolean,
        default: true,
    },
    // ✨ नया फ़ील्ड: छात्र की वर्तमान स्थिति ✨
    status: {
        type: String,
        enum: ['Enrolled', 'Booked', 'Active', 'Checked Out', 'Left'], // 'Left' जोड़ा ताकि पता चले कि छात्र हॉस्टल से चला गया
        default: 'Enrolled', // शुरुआती स्थिति 'Enrolled'
    },
}, {
    timestamps: true, // createdAt और updatedAt फ़ील्ड जोड़ता है
});

// ✨ नया: छात्रUID जनरेट करने के लिए प्री-सेव हुक ✨
studentSchema.pre('save', async function(next) {
    // केवल तभी जनरेट करें जब studentUID नया हो
    if (this.isNew && !this.studentUID) {
        // एक साधारण अल्फ़ान्यूमेरिक ID जनरेट करें
        this.studentUID = `STU-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    }
    next();
});

module.exports = mongoose.model('Student', studentSchema);