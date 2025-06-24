// 📁 D:\AppDevelopment\instay-app\backend\models\Space.js

const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true,
        trim: true,
        uppercase: true, // Rooms might be R101, R102 etc.
    },
    bedNumber: { // Unique identifier for a specific bed within a room
        type: String,
        required: true,
        trim: true,
        uppercase: true, // E.g., B1, B2, B3
    },
    sharingType: { // Type of sharing for this specific bed/space
        type: String,
        enum: ['Single', 'Double', 'Triple', 'Quad'], // You can add more as needed
        required: true,
    },
    monthlyRent: { // Rent for this specific bed (e.g., per bed in a double-sharing room)
        type: Number,
        required: true,
        min: 0,
    },
    isOccupied: { // Flag to quickly check if this bed is occupied
        type: Boolean,
        default: false,
    },
    occupiedBy: { // Reference to the student occupying this bed
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        default: null,
        // ✨ UNIQUE: TRUE को यहाँ से हटा दें!
        // unique: true, // <-- यह समस्या पैदा कर रहा था
        // हम इस लॉजिक को कंट्रोलर में हैंडल करेंगे जब हम छात्र को स्पेस असाइन करेंगे।
        sparse: true // यह ठीक है, null मानों को इंडेक्स नहीं करेगा
    },
    status: { // More detailed status for the bed
        type: String,
        enum: ['Available', 'Occupied', 'Under Maintenance', 'Booked'], // 'Booked' for advance bookings
        default: 'Available',
    },
    description: { // Any additional notes about the space
        type: String,
        trim: true,
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt
});

// Ensure that roomNumber + bedNumber combination is unique
// This prevents having "R101 B1" twice.
spaceSchema.index({ roomNumber: 1, bedNumber: 1 }, { unique: true });

// ✨ वैकल्पिक (लेकिन अनुशंसित): एक छात्र को एक से अधिक बेड असाइन न किया जाए,
// इसे एक अलग इंडेक्स के रूप में हैंडल करें जो केवल गैर-शून्य मानों पर लागू होता है
spaceSchema.index({ occupiedBy: 1 }, { unique: true, sparse: true });


module.exports = mongoose.model('Space', spaceSchema);