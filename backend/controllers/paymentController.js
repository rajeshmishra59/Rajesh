// 📁 D:\AppDevelopment\instay-app\backend\controllers\paymentController.js

const Payment = require('../models/Payment'); // Payment मॉडल को इम्पोर्ट करें
const Student = require('../models/Student'); // Student मॉडल को भी इम्पोर्ट करें ताकि हम studentId को वैलिडेट कर सकें

// ➕ Add New Payment
exports.addPayment = async (req, res) => {
    try {
        const { student, amount, paymentDate, paymentMethod, transactionId, description } = req.body;

        // सुनिश्चित करें कि संदर्भित छात्र मौजूद है
        const existingStudent = await Student.findById(student);
        if (!existingStudent) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        const newPayment = new Payment({
            student,
            amount,
            paymentDate: paymentDate || Date.now(), // यदि paymentDate प्रदान नहीं किया गया है तो वर्तमान तिथि का उपयोग करें
            paymentMethod,
            transactionId,
            description
        });

        const savedPayment = await newPayment.save();
        res.status(201).json(savedPayment);
    } catch (err) {
        console.error('Error adding payment:', err);
        if (err.code === 11000 && err.keyPattern && err.keyPattern.transactionId) {
            return res.status(400).json({ message: 'Duplicate Transaction ID.' });
        }
        res.status(500).json({ error: 'Failed to add payment', details: err.message });
    }
};

// 📋 Get Payments for a Specific Student
exports.getPaymentsByStudentId = async (req, res) => {
    try {
        const { studentId } = req.params;

        // सुनिश्चित करें कि छात्र मौजूद है
        const existingStudent = await Student.findById(studentId);
        if (!existingStudent) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        const payments = await Payment.find({ student: studentId })
                                      .sort({ paymentDate: -1, createdAt: -1 }) // तिथि के अनुसार नए से पुराने तक सॉर्ट करें
                                      .populate('student', 'name email phone'); // छात्र के नाम और ईमेल को भी पॉपुलेट करें

        res.json(payments);
    } catch (err) {
        console.error('Error fetching payments by student ID:', err);
        res.status(500).json({ error: 'Failed to fetch payments', details: err.message });
    }
};

// 🔍 Get Single Payment by ID
exports.getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findById(id).populate('student', 'name email phone');
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found.' });
        }
        res.json(payment);
    } catch (err) {
        console.error('Error fetching payment by ID:', err);
        res.status(500).json({ error: 'Failed to fetch payment', details: err.message });
    }
};

// ✏️ Update Payment
exports.updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPayment = await Payment.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPayment) {
            return res.status(404).json({ message: 'Payment not found.' });
        }
        res.json(updatedPayment);
    } catch (err) {
        console.error('Error updating payment:', err);
        res.status(500).json({ error: 'Failed to update payment', details: err.message });
    }
};

// 🗑️ Delete Payment (Optional: Hard Delete for Payments, or use isActive if needed)
// भुगतान के लिए सॉफ्ट डिलीट आमतौर पर अच्छा नहीं माना जाता है क्योंकि भुगतान रिकॉर्ड अपरिवर्तनीय होते हैं।
// लेकिन अगर आप चाहें तो आप isActive फ्लैग जोड़ सकते हैं।
exports.deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPayment = await Payment.findByIdAndDelete(id);
        if (!deletedPayment) {
            return res.status(404).json({ message: 'Payment not found.' });
        }
        res.json({ message: 'Payment deleted successfully.' });
    } catch (err) {
        console.error('Error deleting payment:', err);
        res.status(500).json({ error: 'Failed to delete payment', details: err.message });
    }
};

// 📈 Get All Payments (Optional: For admin dashboard)
// यह सभी भुगतानों को प्राप्त करने के लिए है, न कि किसी विशिष्ट छात्र के लिए।
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find()
                                      .sort({ paymentDate: -1, createdAt: -1 })
                                      .populate('student', 'name email phone collegeName'); // छात्र की जानकारी पॉपुलेट करें
        res.json(payments);
    } catch (err) {
        console.error('Error fetching all payments:', err);
        res.status(500).json({ error: 'Failed to fetch all payments', details: err.message });
    }
};