import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true }, // E.g., designation or subject
  exp: { type: String, required: true },  // Experience, e.g. "8 Years"
  image: { type: String, required: true }, // Image URL (Cloudinary or local upload path)
  instagram: { type: String, default: '' },
  twitter: { type: String, default: '' },
  certs: { type: [String], default: [] }, // Qualifications, e.g., ["M.Sc Chemistry", "B.Ed"]
  themeColor: { type: String, default: 'lime' } // lime | cyan | pink
}, { timestamps: true });

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;
