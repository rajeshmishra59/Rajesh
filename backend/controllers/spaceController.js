// 📁 D:\AppDevelopment\instay-app\backend\controllers\spaceController.js

const Space = require('../models/Space'); // Space मॉडल को इम्पोर्ट करें

// ➕ Add a New Space (Bed)
exports.addSpace = async (req, res) => {
    try {
        const newSpace = new Space(req.body);
        const savedSpace = await newSpace.save();
        res.status(201).json(savedSpace);
    } catch (err) {
        console.error('Error adding space:', err);
        // यदि roomNumber और bedNumber का संयोजन अद्वितीय नहीं है तो विशिष्ट एरर हैंडलिंग
        if (err.code === 11000 && err.keyValue) {
            if (err.keyValue.occupiedBy) { // यदि यह occupiedBy के कारण एक डुप्लिकेट एरर है
                return res.status(400).json({ message: 'This bed is already occupied by another student.' });
            }
            if (err.keyValue.roomNumber && err.keyValue.bedNumber) { // यदि यह roomNumber+bedNumber के कारण है
                return res.status(400).json({ message: `Space with Room ${err.keyValue.roomNumber} and Bed ${err.keyValue.bedNumber} already exists.` });
            }
        }
        res.status(500).json({ error: 'Failed to add space', details: err.message });
    }
};

// 📋 Get All Spaces
exports.getAllSpaces = async (req, res) => {
    try {
        // आप यहां फ़िल्टरिंग जोड़ सकते हैं, जैसे ?status=Available
        const filter = {};
        if (req.query.status) {
            filter.status = req.query.status;
        }
        if (req.query.sharingType) {
            filter.sharingType = req.query.sharingType;
        }

        const spaces = await Space.find(filter)
                                  .populate('occupiedBy', 'name email phone') // यदि कोई छात्र इस स्थान पर है तो उसकी जानकारी भी प्राप्त करें
                                  .sort({ roomNumber: 1, bedNumber: 1 }); // रूम और बेड नंबर से सॉर्ट करें
        res.json(spaces);
    } catch (err) {
        console.error('Error fetching spaces:', err);
        res.status(500).json({ error: 'Failed to fetch spaces', details: err.message });
    }
};

// 🔍 Get a Single Space by ID
exports.getSpaceById = async (req, res) => {
    try {
        const space = await Space.findById(req.params.id).populate('occupiedBy', 'name email phone');
        if (!space) {
            return res.status(404).json({ message: 'Space not found.' });
        }
        res.json(space);
    } catch (err) {
        console.error('Error fetching space by ID:', err);
        res.status(500).json({ error: 'Failed to fetch space', details: err.message });
    }
};

// ✏️ Update Space
exports.updateSpace = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedSpace = await Space.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedSpace) {
            return res.status(404).json({ message: 'Space not found.' });
        }
        res.json(updatedSpace);
    } catch (err) {
        console.error('Error updating space:', err);
        // डुप्लिकेट key एरर के लिए विशिष्ट हैंडलिंग (उदाहरण के लिए, यदि आप एक ऐसे छात्र को असाइन करने का प्रयास करते हैं जो पहले से ही कहीं और है)
        if (err.code === 11000 && err.keyValue && err.keyValue.occupiedBy) {
            return res.status(400).json({ message: 'The student you are trying to assign is already occupying another bed.' });
        }
        res.status(500).json({ error: 'Failed to update space', details: err.message });
    }
};

// 🗑️ Delete Space (Use with caution: Deleting a space should ideally not happen if students are associated)
exports.deleteSpace = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSpace = await Space.findByIdAndDelete(id);
        if (!deletedSpace) {
            return res.status(404).json({ message: 'Space not found.' });
        }
        res.json({ message: 'Space deleted successfully.' });
    } catch (err) {
        console.error('Error deleting space:', err);
        res.status(500).json({ error: 'Failed to delete space', details: err.message });
    }
};