// 📁 D:\AppDevelopment\instay-app\backend\models\User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // पासवर्ड हैशिंग के लिए

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // यूजरनेम अद्वितीय होना चाहिए
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: { // उपयोगकर्ता की भूमिका (एक्सेस कंट्रोल के लिए)
        type: String,
        enum: ['Admin', 'Manager', 'Warden', 'Student'], // संभावित भूमिकाएँ
        default: 'Student', // डिफ़ॉल्ट भूमिका 'Student'
        required: true,
    },
    // छात्र के लिए, हम स्टूडेंट मॉडल से इसे लिंक कर सकते हैं (वैकल्पिक)
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        default: null, // यदि यह एक छात्र उपयोगकर्ता है, तो यह स्टूडेंट ID होगी
    }
}, {
    timestamps: true, // createdAt और updatedAt फ़ील्ड जोड़ता है
});

// पासवर्ड सेव करने से पहले उसे हैश करें
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) { // केवल तभी हैश करें जब पासवर्ड बदला गया हो या नया हो
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// पासवर्ड की तुलना करने के लिए एक विधि (login के लिए)
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);