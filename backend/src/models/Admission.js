import mongoose from 'mongoose';

const admissionSchema = new mongoose.Schema({
    studentName:    { type: String, required: true },
    dateOfBirth:    { type: String, required: true },
    classSeeking:   { type: String, required: true },
    parentName:     { type: String, required: true },
    parentPhone:    { type: String, required: true },
    parentEmail:    { type: String, required: true },
    previousSchool: { type: String, default: '' },
    address:        { type: String, required: true },
    status:         { type: String, enum: ['pending', 'reviewed', 'accepted', 'rejected'], default: 'pending' },
}, { timestamps: true });

const Admission = mongoose.model('Admission', admissionSchema);
export default Admission;
