// 📁 D:\AppDevelopment\instay-app\backend\controllers\complaintController.js

const Complaint = require('../models/Complaint');
const Student = require('../models/Student'); // छात्र के नाम आदि के लिए इसे पॉपुलेट करना पड़ सकता है

// ➕ Add a new complaint (छात्र द्वारा)
exports.addComplaint = async (req, res) => {
    // req.user JWT मिडिलवेयर से आता है, जिसमें यूजर की ID और रोल होता है
    // हम मान रहे हैं कि छात्र अपने लॉगिन से शिकायत कर रहा है
    const { studentId, category, description, space } = req.body;

    // यदि यूजर छात्र है, तो सुनिश्चित करें कि वह अपनी ही छात्र ID भेज रहा है
    // या हम req.user.student से छात्र ID प्राप्त कर सकते हैं यदि यूजर मॉडल छात्र से जुड़ा है
    if (req.user.role === 'Student' && req.user.student && req.user.student.toString() !== studentId) {
        return res.status(403).json({ message: 'Not authorized to create complaint for another student.' });
    }

    try {
        const newComplaint = new Complaint({
            student: studentId,
            category,
            description,
            space: space || null, // स्पेस वैकल्पिक है
        });
        const savedComplaint = await newComplaint.save();
        res.status(201).json(savedComplaint);
    } catch (err) {
        console.error('Error adding complaint:', err);
        res.status(500).json({ error: 'Failed to add complaint', details: err.message });
    }
};

// 📋 Get all complaints (व्यवस्थापकों/प्रबंधकों के लिए)
exports.getAllComplaints = async (req, res) => {
    try {
        // छात्र के विवरण के साथ पॉपुलेट करें
        const complaints = await Complaint.find()
                                        .populate('student', 'firstName lastName roomNumber assignedSpace -_id') // छात्र के महत्वपूर्ण विवरण पॉपुलेट करें
                                        .populate('space', 'roomNumber bedNumber monthlyRent -_id') // स्पेस विवरण पॉपुलेट करें
                                        .sort({ createdAt: -1 }); // नवीनतम शिकायतें पहले
        res.json(complaints);
    } catch (err) {
        console.error('Error fetching all complaints:', err);
        res.status(500).json({ error: 'Failed to fetch complaints', details: err.message });
    }
};

// 📋 Get complaints by student ID (छात्रों के लिए अपनी शिकायतें देखने हेतु)
exports.getComplaintsByStudent = async (req, res) => {
    const studentId = req.params.studentId;

    // सुनिश्चित करें कि छात्र केवल अपनी ही शिकायतें देख रहा है
    if (req.user.role === 'Student' && req.user.student && req.user.student.toString() !== studentId) {
        return res.status(403).json({ message: 'Not authorized to view complaints for another student.' });
    }

    try {
        const complaints = await Complaint.find({ student: studentId })
                                        .populate('student', 'firstName lastName roomNumber assignedSpace -_id')
                                        .populate('space', 'roomNumber bedNumber monthlyRent -_id')
                                        .sort({ createdAt: -1 });
        res.json(complaints);
    } catch (err) {
        console.error('Error fetching student complaints:', err);
        res.status(500).json({ error: 'Failed to fetch student complaints', details: err.message });
    }
};


// 🔍 Get a single complaint by ID
exports.getComplaintById = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id)
                                        .populate('student', 'firstName lastName roomNumber assignedSpace -_id')
                                        .populate('space', 'roomNumber bedNumber monthlyRent -_id');
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found.' });
        }

        // यदि यह एक छात्र उपयोगकर्ता है, तो सुनिश्चित करें कि वे केवल अपनी शिकायतें देख रहे हैं
        if (req.user.role === 'Student' && req.user.student && complaint.student._id.toString() !== req.user.student.toString()) {
            return res.status(403).json({ message: 'Not authorized to view this complaint.' });
        }

        res.json(complaint);
    } catch (err) {
        console.error('Error fetching complaint by ID:', err);
        res.status(500).json({ error: 'Failed to fetch complaint', details: err.message });
    }
};

// ✏️ Update a complaint by ID (मुख्य रूप से व्यवस्थापक/प्रबंधकों द्वारा स्टेटस आदि अपडेट करने के लिए)
exports.updateComplaint = async (req, res) => {
    const { status, priority, estimatedResolutionTime, adminComments, studentFeedback, attachmentUrl } = req.body;
    try {
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found.' });
        }

        // छात्र केवल अपनी प्रतिक्रिया जोड़ सकते हैं या अपनी शिकायत की विवरण अपडेट कर सकते हैं यदि 'Open' है
        // व्यवस्थापक/प्रबंधक सभी फ़ील्ड अपडेट कर सकते हैं
        if (req.user.role === 'Student') {
            // छात्र केवल अपनी प्रतिक्रिया या विवरण अपडेट कर सकता है
            if (studentFeedback !== undefined) {
                complaint.studentFeedback = studentFeedback;
            }
            if (description !== undefined && complaint.status === 'Open') {
                complaint.description = description;
            }
            // छात्र अन्य फ़ील्ड अपडेट नहीं कर सकते
        } else { // Admin, Manager, Warden
            if (status !== undefined) complaint.status = status;
            if (priority !== undefined) complaint.priority = priority;
            if (estimatedResolutionTime !== undefined) complaint.estimatedResolutionTime = estimatedResolutionTime;
            if (adminComments !== undefined) complaint.adminComments = adminComments;
            if (attachmentUrl !== undefined) complaint.attachmentUrl = attachmentUrl; // जब फ़ाइल अपलोड लागू हो
            // यदि स्थिति 'Resolved' पर सेट की गई है और actualResolutionTime सेट नहीं है, तो उसे अभी सेट करें
            if (status === 'Resolved' && !complaint.actualResolutionTime) {
                complaint.actualResolutionTime = Date.now();
            }
            // यदि स्थिति 'Closed' पर सेट की गई है और actualResolutionTime सेट नहीं है, तो उसे अभी सेट करें
            if (status === 'Closed' && !complaint.actualResolutionTime) {
                complaint.actualResolutionTime = Date.now();
            }
        }

        const updatedComplaint = await complaint.save();
        res.json(updatedComplaint);
    } catch (err) {
        console.error('Error updating complaint:', err);
        res.status(500).json({ error: 'Failed to update complaint', details: err.message });
    }
};

// 🗑️ Delete a complaint by ID (केवल व्यवस्थापक/प्रबंधकों द्वारा)
exports.deleteComplaint = async (req, res) => {
    try {
        // यदि रोल 'Admin' या 'Manager' नहीं है, तो एक्सेस अस्वीकार करें (authorizeRoles मिडिलवेयर द्वारा संभाला जाता है)
        const deletedComplaint = await Complaint.findByIdAndDelete(req.params.id);
        if (!deletedComplaint) {
            return res.status(404).json({ message: 'Complaint not found.' });
        }
        res.json({ message: 'Complaint deleted successfully.' });
    } catch (err) {
        console.error('Error deleting complaint:', err);
        res.status(500).json({ error: 'Failed to delete complaint', details: err.message });
    }
};