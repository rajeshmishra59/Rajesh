// 📁 D:\AppDevelopment\instay-app\backend\models\Expense.js

const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now // डिफ़ॉल्ट रूप से वर्तमान तिथि और समय
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
        enum: [ // खर्च की संभावित श्रेणियां
            'Rent & Property',
            'Utilities',
            'Staff Salary',
            'Food & Groceries',
            'Consumables & Supplies',
            'Repairs & Maintenance',
            'Furniture & Appliances',
            'Marketing & Advertising',
            'Miscellaneous'
        ],
        trim: true,
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Bank Transfer', 'UPI', 'Card', 'Other'], // भुगतान के तरीके
        default: 'Cash',
    },
    paidTo: { // किसे भुगतान किया गया
        type: String,
        trim: true,
    },
    remarks: { // कोई अतिरिक्त टिप्पणी
        type: String,
        trim: true,
    },
    voucherImageUrl: { // वाउचर/रसीद के लिए URL
        type: String,
        default: null, // शुरुआत में कोई URL नहीं होगा
    },
}, {
    timestamps: true, // createdAt और updatedAt फ़ील्ड जोड़ता है
});

module.exports = mongoose.model('Expense', expenseSchema);