// 📁 D:\AppDevelopment\instay-app\backend\models\Complaint.js

const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', // यह 'Student' मॉडल से लिंक होगा
        required: true,
    },
    // यदि शिकायत किसी विशिष्ट स्पेस/रूम से संबंधित है
    space: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Space', // यह 'Space' मॉडल से लिंक होगा
        default: null, // यह वैकल्पिक है
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Plumbing',
            'Electrical',
            'Cleaning & Housekeeping',
            'Internet & Wi-Fi',
            'Furniture & Appliances',
            'Pest Control',
            'Safety & Security',
            'Food & Mess',
            'Management & Staff',
            'Other'
        ],
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    ticketId: {
        type: String,
        required: true,
        unique: true, // प्रत्येक शिकायत के लिए अद्वितीय टिकट आईडी
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Resolved', 'Closed', 'Rejected'],
        default: 'Open',
    },
    priority: { // वैकल्पिक: प्राथमिकता
        type: String,
        enum: ['Low', 'Medium', 'High', 'Urgent'],
        default: 'Medium',
    },
    estimatedResolutionTime: { // संभावित निष्पादन का समय (व्यवस्थापक द्वारा सेट)
        type: Date,
        default: null,
    },
    actualResolutionTime: { // वास्तविक निष्पादन का समय
        type: Date,
        default: null,
    },
    adminComments: { // व्यवस्थापक/प्रबंधक की टिप्पणियाँ
        type: String,
        trim: true,
        default: '',
    },
    studentFeedback: { // समाधान के बाद छात्र की प्रतिक्रिया
        type: String,
        trim: true,
        default: '',
    },
    attachmentUrl: { // वैकल्पिक: अटैचमेंट (फोटो/वीडियो) का URL
        type: String,
        default: null,
    },
}, {
    timestamps: true, // createdAt और updatedAt फ़ील्ड जोड़ता है
});

// टिकट ID जनरेट करने के लिए प्री-सेव हुक
// यह सुनिश्चित करता है कि एक अद्वितीय ID बनती है
complaintSchema.pre('save', async function(next) {
    if (!this.ticketId) {
        // एक साधारण टाइमस्टैम्प-आधारित ID, जिसे बाद में अधिक मजबूत किया जा सकता है
        this.ticketId = `CMP-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    }
    next();
});

module.exports = mongoose.model('Complaint', complaintSchema);