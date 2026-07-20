import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, ClipboardCheck, UserCheck, HelpCircle, CheckCircle2, 
  ChevronRight, Calendar, Info, ShieldAlert
} from 'lucide-react';
import { SchoolContext } from '../context/SchoolContext';

export default function Admissions() {
  const { settings, submitAdmission } = useContext(SchoolContext);
  const [formData, setFormData] = useState({
    studentName: '',
    dateOfBirth: '',
    classSeeking: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    previousSchool: '',
    address: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const steps = [
    { 
      icon: FileText, 
      title: '1. Fill Admission Form', 
      desc: 'Complete the online application form with valid student details and select the class.' 
    },
    { 
      icon: ClipboardCheck, 
      title: '2. Document Verification', 
      desc: 'Submit student birth proof, transfer certificate, prior marksheet, and address proofs.' 
    },
    { 
      icon: UserCheck, 
      title: '3. Admission Confirmation', 
      desc: 'Undergo interaction round (for senior classes), secure fee verification, and get enrolled.' 
    }
  ];

  const documents = [
    'Original Birth Certificate of the student',
    'Transfer Certificate (TC) from the previous school (if applicable)',
    'Report Card/Progress Report of the qualifying exam',
    '3 passport-size photographs of the student',
    '1 passport-size photograph of both parents/guardians',
    'Aadhaar Card copy of the student and parents',
    'Address proof (Electricity Bill / Passport / Aadhar)'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await submitAdmission(formData);
    setLoading(false);
    if (result.success) {
      setSubmitted(true);
      setFormData({
        studentName: '',
        dateOfBirth: '',
        classSeeking: '',
        parentName: '',
        parentPhone: '',
        parentEmail: '',
        previousSchool: '',
        address: '',
      });
    } else {
      alert(result.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div id="admissions" className="pb-20">
      {/* Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
          >
            Admissions Open 2026-27
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto"
          >
            Empower your child's academic future. Start the enrollment process today.
          </motion.p>
        </div>
      </section>

      {/* Admission steps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold text-sm uppercase tracking-wider">How to Apply</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Simple 3-Step Enrollment Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-slate-100 -z-10" />
            
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 relative group hover:bg-white hover:shadow-xl transition-all duration-300">
                  <div className="p-4 bg-primary text-white rounded-2xl w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-slate-900 transition-colors duration-300 shadow-md">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-3">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Admissions Guidelines & Form */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left side checklist */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                  <Info className="h-5.5 w-5.5 text-primary" />
                  <span>Important Documents</span>
                </h3>
                <p className="text-slate-500 text-sm">Please keep self-attested photocopies of these documents ready for verification:</p>
                <ul className="space-y-3">
                  {documents.map((doc, i) => (
                    <li key={i} className="flex items-start space-x-3 text-sm text-slate-600">
                      <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex space-x-4">
                <ShieldAlert className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Age Eligibility Criteria</h4>
                  <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                    Nursery: Candidate must be 3+ years of age as of March 31, 2026. Class I: Candidate must be 6+ years of age. Criteria for subsequent classes increment accordingly.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Online Admission Inquiry</h3>
              <p className="text-slate-500 text-sm mb-8">Submit details below and our admissions registrar will contact you shortly.</p>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-8 text-center space-y-4"
                  >
                    <div className="inline-flex p-4 bg-green-50 text-green-600 rounded-full mb-2">
                      <CheckCircle2 className="h-12 w-12 animate-bounce" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900">Application Submitted!</h4>
                    <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                      Thank you for submitting the enquiry. Registration ID reference <strong>#ABS2026-{Math.floor(Math.random() * 90000 + 10000)}</strong> has been generated and sent to your email. We will reach out to you within 2 working days.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold shadow hover:bg-blue-700 transition-colors"
                    >
                      Fill Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-700 text-xs font-bold mb-2">Student Name *</label>
                        <input
                          type="text"
                          name="studentName"
                          value={formData.studentName}
                          onChange={handleInputChange}
                          required
                          placeholder="Full Name"
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 text-xs font-bold mb-2">Date of Birth *</label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-700 text-xs font-bold mb-2">Class Seeking Admission *</label>
                        <select
                          name="classSeeking"
                          value={formData.classSeeking}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                        >
                          <option value="">Select Class</option>
                          <option value="nursery">Nursery / Prep</option>
                          <option value="kindergarten">Kindergarten</option>
                          <option value="class-1-5">Class I - V</option>
                          <option value="class-6-8">Class VI - VIII</option>
                          <option value="class-9-10">Class IX - X</option>
                          <option value="class-11-12">Class XI - XII</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-700 text-xs font-bold mb-2">Previous School Attended</label>
                        <input
                          type="text"
                          name="previousSchool"
                          value={formData.previousSchool}
                          onChange={handleInputChange}
                          placeholder="School Name"
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="sm:col-span-1">
                        <label className="block text-slate-700 text-xs font-bold mb-2">Parent/Guardian Name *</label>
                        <input
                          type="text"
                          name="parentName"
                          value={formData.parentName}
                          onChange={handleInputChange}
                          required
                          placeholder="Name"
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <label className="block text-slate-700 text-xs font-bold mb-2">Contact Phone *</label>
                        <input
                          type="tel"
                          name="parentPhone"
                          value={formData.parentPhone}
                          onChange={handleInputChange}
                          required
                          placeholder="Phone Number"
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <label className="block text-slate-700 text-xs font-bold mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="parentEmail"
                          value={formData.parentEmail}
                          onChange={handleInputChange}
                          required
                          placeholder="Email"
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 text-xs font-bold mb-2">Residential Address *</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        rows="3"
                        placeholder="Current Address"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-primary hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      {loading ? (
                        <>
                          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Inquiry Form</span>
                          <ChevronRight className="h-5 w-5" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
