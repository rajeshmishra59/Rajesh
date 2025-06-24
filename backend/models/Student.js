const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  dateOfBirth: { type: Date, required: true },
  collegeName: { type: String, required: true },
  course: { type: String, required: true },
  admissionYear: { type: Number, required: true },

  guardianName: { type: String, required: true },
  guardianContact: { type: String, required: true },
  emergencyContact: { type: String },

  aadharNumber: { type: String },
  address: { type: String },

  email: { type: String },
  phone: { type: String },

  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);
