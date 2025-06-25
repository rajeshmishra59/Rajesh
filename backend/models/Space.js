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
        // ✨ महत्वपूर्ण: 'unique: true' को यहाँ से हटा दिया गया है
        // यह अब केवल नीचे 'spaceSchema.index()' में परिभाषित है
        sparse: true // ✨ यह लाइन सक्रिय (uncommented) होनी चाहिए और बिल्कुल ऐसी ही होनी चाहिए।
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

// सुनिश्चित करें कि roomNumber + bedNumber संयोजन अद्वितीय है
// यह "R101 B1" को दो बार होने से रोकता है।
spaceSchema.index({ roomNumber: 1, bedNumber: 1 }, { unique: true });

// ✨ सुनिश्चित करें कि एक छात्र को एक से अधिक बेड असाइन न किया जाए।
// यह इंडेक्स केवल गैर-शून्य 'occupiedBy' मानों पर लागू होता है
// और यह अब डुप्लीकेट चेतावनी का कारण नहीं बनेगा।
spaceSchema.index({ occupiedBy: 1 }, { unique: true, sparse: true });


module.exports = mongoose.model('Space', spaceSchema);