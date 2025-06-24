// 📁 D:\AppDevelopment\instay-app\backend\controllers\spaceController.js

const Space = require('../models/Space');
const Student = require('../models/Student'); // Student मॉडल भी चाहिए

// New: Get all available spaces (status 'Available')
exports.getAvailableSpaces = async (req, res) => {
    try {
        const availableSpaces = await Space.find({ status: 'Available' }).sort('roomNumber bedNumber');
        res.status(200).json(availableSpaces);
    } catch (error) {
        console.error('Error fetching available spaces:', error);
        res.status(500).json({ message: 'Server error fetching available spaces.', error: error.message });
    }
};

// New: Book a space (changes status to 'Booked', doesn't assign student yet)
// This is for preliminary booking, like when a student pays a booking amount.
exports.bookSpace = async (req, res) => {
    try {
        const { spaceId, studentId, bookingAmount } = req.body;

        if (!spaceId || !studentId || bookingAmount === undefined) {
            return res.status(400).json({ message: 'Space ID, Student ID, and Booking Amount are required.' });
        }

        const space = await Space.findById(spaceId);
        if (!space) {
            return res.status(404).json({ message: 'Space not found.' });
        }

        if (space.status !== 'Available') {
            return res.status(400).json({ message: `Space is not available for booking. Current status: ${space.status}` });
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        // Check if student already has a space or a booked space
        if (student.assignedSpace || student.status === 'Booked' || student.status === 'Active') { // Added 'Active'
            return res.status(400).json({ message: 'Student already has an assigned space or a pending booking.' });
        }

        // Update space status to 'Booked' and reference the student
        // The student's actual 'assignedSpace' and 'status' will be updated in assignSpaceToStudent
        space.status = 'Booked';
        space.occupiedBy = studentId; // Temporarily link for booking
        await space.save();

        // Update student's booking details
        student.status = 'Booked';
        student.bookingAmount = bookingAmount;
        // student.assignedSpace = spaceId; // Do NOT assign space here. This will be done in assignSpaceToStudent
        await student.save();

        res.status(200).json({ message: 'Space booked successfully!', space, student });

    } catch (error) {
        // Handle unique constraint violation for occupiedBy if it occurs (though it shouldn't now with sparse index)
        if (error.code === 11000) {
            return res.status(409).json({ message: 'This space is already booked or occupied by another student.' });
        }
        console.error('Error booking space:', error);
        res.status(500).json({ message: 'Server error during space booking.', error: error.message });
    }
};

// New: Assign a booked space to a student (finalizes assignment, sets isOccupied)
// This will be used after booking and when student confirms full details/check-in
exports.assignSpaceToStudent = async (req, res) => {
    try {
        const { spaceId, studentId, checkInDate } = req.body; // Added checkInDate

        if (!spaceId || !studentId || !checkInDate) { // checkInDate is now required
            return res.status(400).json({ message: 'Space ID, Student ID, and Check-in Date are required for assignment.' });
        }

        const space = await Space.findById(spaceId);
        if (!space) {
            return res.status(404).json({ message: 'Space not found.' });
        }

        // Check if the space is booked by *this* specific student
        if (space.status !== 'Booked' || !space.occupiedBy || !space.occupiedBy.equals(studentId)) {
            return res.status(400).json({ message: 'Space is not booked by this student or is not in a "Booked" status.' });
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        // Ensure the student is in 'Booked' status and matches the space's occupiedBy
        if (student.status !== 'Booked' || !student.assignedSpace || !student.assignedSpace.equals(spaceId)) {
            // This check might be too strict if booking doesn't set assignedSpace.
            // Let's refine based on our workflow: student status should be 'Booked'.
            // The logic above in bookSpace doesn't set assignedSpace, so this check should be adjusted.
            if(student.status !== 'Booked'){
                 return res.status(400).json({ message: 'Student is not in a "Booked" status.' });
            }
        }
        
        // If student already has an assigned space (meaning they are already 'Active' somewhere)
        if (student.assignedSpace && student.status === 'Active') {
            return res.status(400).json({ message: 'Student already has an assigned space and is active.' });
        }


        // Update space details
        space.status = 'Occupied';
        space.isOccupied = true;
        // occupiedBy is already set during booking, ensure it's correct
        // if (!space.occupiedBy || !space.occupiedBy.equals(studentId)) {
        //      space.occupiedBy = studentId; // Ensure occupiedBy is set
        // }
        await space.save();

        // Update student details
        student.assignedSpace = spaceId;
        student.checkInDate = new Date(checkInDate); // Set the actual check-in date
        student.status = 'Active'; // Assuming student becomes 'Active' after space assignment
        await student.save();

        res.status(200).json({ message: 'Space successfully assigned to student!', space, student });

    } catch (error) {
        console.error('Error assigning space to student:', error);
        res.status(500).json({ message: 'Server error during space assignment.', error: error.message });
    }
};


// Existing Space CRUD operations
exports.addSpace = async (req, res) => {
    try {
        const { roomNumber, bedNumber } = req.body;

        // Check if a space with the same room and bed number already exists
        const existingSpace = await Space.findOne({ roomNumber, bedNumber });
        if (existingSpace) {
            return res.status(409).json({ message: 'A space with this room and bed number already exists.' });
        }

        const newSpace = new Space(req.body);
        await newSpace.save();
        res.status(201).json({ message: 'Space added successfully!', space: newSpace });
    } catch (error) {
        console.error('Error adding space:', error);
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

exports.getAllSpaces = async (req, res) => {
    try {
        const spaces = await Space.find().populate('occupiedBy', 'name studentUID'); // Populate student details
        res.status(200).json(spaces);
    } catch (error) {
        console.error('Error fetching spaces:', error);
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

exports.getSpaceById = async (req, res) => {
    try {
        const space = await Space.findById(req.params.id).populate('occupiedBy', 'name studentUID');
        if (!space) {
            return res.status(404).json({ message: 'Space not found.' });
        }
        res.status(200).json(space);
    } catch (error) {
        console.error('Error fetching space by ID:', error);
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

exports.updateSpace = async (req, res) => {
    try {
        const updatedSpace = await Space.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedSpace) {
            return res.status(404).json({ message: 'Space not found.' });
        }
        res.status(200).json({ message: 'Space updated successfully!', space: updatedSpace });
    } catch (error) {
        console.error('Error updating space:', error);
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

exports.deleteSpace = async (req, res) => {
    try {
        const deletedSpace = await Space.findByIdAndDelete(req.params.id);
        if (!deletedSpace) {
            return res.status(404).json({ message: 'Space not found.' });
        }
        res.status(200).json({ message: 'Space deleted successfully!' });
    } catch (error) {
        console.error('Error deleting space:', error);
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};