// 📁 D:\AppDevelopment\instay-app\backend\controllers\studentController.js

const Student = require('../models/Student');
const Space = require('../models/Space'); // Space मॉडल को इम्पोर्ट करें

// ➕ Add a new student
exports.addStudent = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            college,
            currentAddress,
            permanentAddress,
            emergencyContactName,
            emergencyContactPhone,
            dateOfBirth,
            nationality,
            guardianName,
            guardianPhone,
            checkInDate, // नए फ़ील्ड
            bookingAmount, // नए फ़ील्ड
            assignedSpace // नए फ़ील्ड
        } = req.body;

        // फ़ोन नंबर की विशिष्टता की जांच करें
        const existingStudent = await Student.findOne({ phone });
        if (existingStudent) {
            return res.status(400).json({ message: 'A student with this phone number already exists.' });
        }

        let spaceToAssign = null;
        if (assignedSpace) {
            // 1. जांचें कि क्या assignedSpace मौजूद है
            spaceToAssign = await Space.findById(assignedSpace);
            if (!spaceToAssign) {
                return res.status(404).json({ message: 'Assigned space not found.' });
            }
            // 2. जांचें कि क्या assignedSpace पहले से ऑक्यूपाई है
            if (spaceToAssign.isOccupied) {
                return res.status(400).json({ message: `Space ${spaceToAssign.roomNumber}-${spaceToAssign.bedNumber} is already occupied.` });
            }
        } else {
            // यदि कोई स्पेस असाइन नहीं किया गया है, तो भी bookingAmount आवश्यक है
            if (bookingAmount === undefined || bookingAmount === null) {
                return res.status(400).json({ message: 'Booking amount is required.' });
            }
        }

        const newStudent = new Student({
            name,
            email,
            phone,
            college,
            currentAddress,
            permanentAddress,
            emergencyContactName,
            emergencyContactPhone,
            dateOfBirth,
            nationality,
            guardianName,
            guardianPhone,
            checkInDate: checkInDate ? new Date(checkInDate) : null, // दिनांक ऑब्जेक्ट में बदलें
            bookingAmount,
            assignedSpace: spaceToAssign ? spaceToAssign._id : null, // स्पेस ID असाइन करें
            isActive: true, // नया छात्र डिफ़ॉल्ट रूप से सक्रिय है
        });

        const savedStudent = await newStudent.save();

        // यदि स्पेस असाइन किया गया है, तो स्पेस को अपडेट करें
        if (spaceToAssign) {
            spaceToAssign.isOccupied = true;
            spaceToAssign.occupiedBy = savedStudent._id; // छात्र को असाइन करें
            spaceToAssign.status = 'Occupied'; // स्पेस की स्थिति अपडेट करें
            await spaceToAssign.save();
        }

        res.status(201).json(savedStudent);
    } catch (err) {
        console.error('Error adding student:', err);
        // डुप्लिकेट फ़ोन नंबर एरर के लिए विशिष्ट हैंडलिंग (यदि unique: true फ़ोन पर है)
        if (err.code === 11000 && err.keyValue && err.keyValue.phone) {
            return res.status(400).json({ message: `Student with phone number ${err.keyValue.phone} already exists.` });
        }
        res.status(500).json({ error: 'Failed to add student', details: err.message });
    }
};

// 📋 Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find({ isActive: true }) // केवल सक्रिय छात्रों को दिखाएं
            .populate('assignedSpace', 'roomNumber bedNumber sharingType monthlyRent') // असाइन किए गए स्पेस की जानकारी प्राप्त करें
            .sort({ createdAt: -1 }); // नवीनतम पहले
        res.json(students);
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).json({ error: 'Failed to fetch students', details: err.message });
    }
};

// 🔍 Get a single student by ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
            .populate('assignedSpace', 'roomNumber bedNumber sharingType monthlyRent');
        if (!student) {
            return res.status(404).json({ message: 'Student not found.' });
        }
        res.json(student);
    } catch (err) {
        console.error('Error fetching student by ID:', err);
        res.status(500).json({ error: 'Failed to fetch student', details: err.message });
    }
};

// ✏️ Update student
exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            assignedSpace, // असाइन किया गया स्पेस भी अपडेट किया जा सकता है
            isActive, // isActive स्थिति भी अपडेट की जा सकती है (उदाहरण के लिए चेक-आउट पर)
            ...otherUpdates // बाकी सभी अपडेट
        } = req.body;

        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        // यदि assignedSpace अपडेट किया जा रहा है
        if (assignedSpace && String(assignedSpace) !== String(student.assignedSpace)) {
            // यदि छात्र के पास पहले से एक स्पेस था, तो उसे अनऑक्यूपाई करें
            if (student.assignedSpace) {
                const oldSpace = await Space.findById(student.assignedSpace);
                if (oldSpace) {
                    oldSpace.isOccupied = false;
                    oldSpace.occupiedBy = null;
                    oldSpace.status = 'Available';
                    await oldSpace.save();
                }
            }

            // नया स्पेस असाइन करें
            const newSpace = await Space.findById(assignedSpace);
            if (!newSpace) {
                return res.status(404).json({ message: 'New assigned space not found.' });
            }
            if (newSpace.isOccupied) {
                return res.status(400).json({ message: `Space ${newSpace.roomNumber}-${newSpace.bedNumber} is already occupied.` });
            }

            newSpace.isOccupied = true;
            newSpace.occupiedBy = student._id; // छात्र को असाइन करें
            newSpace.status = 'Occupied';
            await newSpace.save();

            student.assignedSpace = newSpace._id;
        } else if (assignedSpace === null && student.assignedSpace) { // यदि स्पेस को हटा दिया गया है (चेक-आउट पर)
            const oldSpace = await Space.findById(student.assignedSpace);
            if (oldSpace) {
                oldSpace.isOccupied = false;
                oldSpace.occupiedBy = null;
                oldSpace.status = 'Available';
                await oldSpace.save();
            }
            student.assignedSpace = null;
        }

        // isActive को अपडेट करें
        if (typeof isActive === 'boolean' && isActive !== student.isActive) {
            student.isActive = isActive;
            // यदि isActive false हो रहा है (चेक-आउट), तो checkOutDate भी सेट करें
            if (!isActive && !student.checkOutDate) {
                student.checkOutDate = new Date();
            }
        }

        // बाकी सभी फ़ील्ड्स को अपडेट करें
        Object.assign(student, otherUpdates);

        // यदि checkInDate अपडेट हो रही है, तो सुनिश्चित करें कि यह एक Date ऑब्जेक्ट है
        if (req.body.checkInDate && !(req.body.checkInDate instanceof Date)) {
            student.checkInDate = new Date(req.body.checkInDate);
        }
        
        // यदि checkOutDate अपडेट हो रही है, तो सुनिश्चित करें कि यह एक Date ऑब्जेक्ट है
        if (req.body.checkOutDate && !(req.body.checkOutDate instanceof Date)) {
            student.checkOutDate = new Date(req.body.checkOutDate);
        }

        const updatedStudent = await student.save();
        res.json(updatedStudent);
    } catch (err) {
        console.error('Error updating student:', err);
        // फ़ोन नंबर डुप्लिकेट एरर हैंडलिंग
        if (err.code === 11000 && err.keyValue && err.keyValue.phone) {
            return res.status(400).json({ message: `Student with phone number ${err.keyValue.phone} already exists.` });
        }
        res.status(500).json({ error: 'Failed to update student', details: err.message });
    }
};

// 🗑️ Delete student (Soft Delete)
exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        // यदि छात्र किसी स्पेस पर असाइन किया गया है, तो उसे अनअसाइन करें
        if (student.assignedSpace) {
            const assignedSpace = await Space.findById(student.assignedSpace);
            if (assignedSpace) {
                assignedSpace.isOccupied = false;
                assignedSpace.occupiedBy = null;
                assignedSpace.status = 'Available';
                await assignedSpace.save();
            }
        }

        // छात्र को निष्क्रिय करें (सॉफ्ट डिलीट) और checkOutDate सेट करें
        student.isActive = false;
        student.checkOutDate = new Date(); // डिलीट करते समय चेक-आउट तिथि सेट करें
        student.assignedSpace = null; // असाइन किया गया स्पेस हटा दें
        await student.save();

        res.json({ message: 'Student marked as inactive (soft deleted) and space released successfully.' });
    } catch (err) {
        console.error('Error soft deleting student:', err);
        res.status(500).json({ error: 'Failed to soft delete student', details: err.message });
    }
};