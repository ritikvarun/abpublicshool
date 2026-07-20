import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, User, Hash, Phone, BookOpen, MessageSquare, Send 
} from 'lucide-react';
import { SchoolContext } from '../context/SchoolContext';

export default function Login() {
  const { settings } = useContext(SchoolContext);
  const [formData, setFormData] = useState({
    studentName: '',
    rollNo: '',
    classSection: '',
    parentName: '',
    phone: '',
    message: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!formData.studentName.trim()) {
      setError('Please enter the Student Name.');
      return;
    }
    if (!formData.classSection.trim()) {
      setError('Please enter the Class & Section.');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Please enter your contact number.');
      return;
    }
    if (!formData.message.trim()) {
      setError('Please enter your message/query.');
      return;
    }

    // Format WhatsApp message
    const formattedMsg = `*SCHOOL INQUIRY / PORTAL HELP*
-----------------------------
*Student Name:* ${formData.studentName}
*Roll/Admission No:* ${formData.rollNo || 'N/A'}
*Class & Section:* ${formData.classSection}
*Parent Name:* ${formData.parentName || 'N/A'}
*Contact Number:* ${formData.phone}
*Date:* ${new Date().toLocaleDateString()}

*Message/Query:*
${formData.message}`;

    // Format phone number (remove all non-digit characters)
    const rawPhone = settings?.ownerPhone || settings?.receptionPhone || settings?.contactPhone || '+91 98765 43210';
    let cleanedPhone = rawPhone.replace(/\D/g, '');
    if (cleanedPhone.length === 10) {
      cleanedPhone = `91${cleanedPhone}`;
    }

    // Open WhatsApp URL
    const waUrl = `https://api.whatsapp.com/send?phone=${cleanedPhone}&text=${encodeURIComponent(formattedMsg)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="pt-28 pb-20 min-h-[95vh] bg-slate-950 text-slate-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full bg-slate-900/40 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative z-10 space-y-8"
      >
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex bg-primary text-white p-3.5 rounded-2xl shadow-lg shadow-blue-500/25 mb-2">
            <GraduationCap className="h-8 w-8 text-accent" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Student Support Desk</h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-sm mx-auto">
            Fill out the form below. On submit, your query will be sent directly to our administration via WhatsApp.
          </p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-red-500/10 border border-red-500/25 rounded-2xl text-red-400 text-xs text-center font-medium"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Student Name */}
            <div className="space-y-2">
              <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider">Student Name <span className="text-accent">*</span></label>
              <div className="relative">
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  placeholder="e.g. John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-primary rounded-xl text-sm focus:outline-none text-white focus:ring-2 focus:ring-blue-500/20 transition-all"
                  required
                />
                <User className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-500" />
              </div>
            </div>

            {/* Roll / Admission No */}
            <div className="space-y-2">
              <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider">Roll / Admission No.</label>
              <div className="relative">
                <input
                  type="text"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleInputChange}
                  placeholder="e.g. AB-5412"
                  className="w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-primary rounded-xl text-sm focus:outline-none text-white focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <Hash className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-500" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Class & Section */}
            <div className="space-y-2">
              <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider">Class & Section <span className="text-accent">*</span></label>
              <div className="relative">
                <input
                  type="text"
                  name="classSection"
                  value={formData.classSection}
                  onChange={handleInputChange}
                  placeholder="e.g. X - B"
                  className="w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-primary rounded-xl text-sm focus:outline-none text-white focus:ring-2 focus:ring-blue-500/20 transition-all"
                  required
                />
                <BookOpen className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-500" />
              </div>
            </div>

            {/* Parent's Name */}
            <div className="space-y-2">
              <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider">Parent / Guardian Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  placeholder="e.g. Mr. Robert Doe"
                  className="w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-primary rounded-xl text-sm focus:outline-none text-white focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <User className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-500" />
              </div>
            </div>
          </div>

          {/* Contact Number */}
          <div className="space-y-2">
            <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider">WhatsApp / Contact Number <span className="text-accent">*</span></label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g. +91 98765 43210"
                className="w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-primary rounded-xl text-sm focus:outline-none text-white focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              />
              <Phone className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-500" />
            </div>
          </div>

          {/* Message / Query */}
          <div className="space-y-2">
            <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider">Your Message / Query <span className="text-accent">*</span></label>
            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Write your query or assistance request here..."
                rows="4"
                className="w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-primary rounded-xl text-sm focus:outline-none text-white focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                required
              />
              <MessageSquare className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-500" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-primary hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Send className="h-4.5 w-4.5" />
            <span>Send via WhatsApp</span>
          </button>
        </form>

        <div className="pt-4 border-t border-slate-800/80 text-center text-[10px] text-slate-500 uppercase tracking-wider leading-relaxed">
          Need immediate support? Please use the official contact channels on the main page.
        </div>
      </motion.div>
    </div>
  );
}
