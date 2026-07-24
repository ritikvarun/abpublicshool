import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Clock, ChevronDown, 
  HelpCircle, Globe2, FileText, ClipboardCheck, UserCheck
} from 'lucide-react';
import { SchoolContext } from '../context/SchoolContext';

export default function Contact() {
  const { settings, submitInquiry } = useContext(SchoolContext);
  const [openFaq, setOpenFaq] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert("Please fill in your Name, Phone Number, and Address.");
      return;
    }

    // Submit inquiry to backend
    if (submitInquiry) {
      submitInquiry(formData);
    }

    // Format WhatsApp message
    const whatsappMsg = `🎓 *NEW SCHOOL INQUIRY / ADMISSION* 🎓\n` +
      `--------------------------------------\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `📍 *Address:* ${formData.address}\n` +
      (formData.message ? `📝 *Query/Class:* ${formData.message}\n` : '') +
      `--------------------------------------\n` +
      `Sent via A B Public School Website`;

    // Target phone number from settings, env or default
    const rawPhone = settings?.whatsappNumber || settings?.ownerPhone || settings?.receptionPhone || settings?.contactPhone || '919876543210';
    let cleanPhone = rawPhone.replace(/\D/g, '');
    if (cleanPhone.length === 10) cleanPhone = '91' + cleanPhone;

    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMsg)}`;
    window.open(waUrl, '_blank');
    setSubmitted(true);
  };

  const steps = [
    { 
      icon: FileText, 
      title: '1. Fill Admission Form', 
      desc: 'Complete the online application form with valid student details and select the class.' 
    },
    { 
      icon: ClipboardCheck, 
      title: '2. Document Verification', 
      desc: 'Submit student birth proof, transfer certificate, prior marksheet, and address records.' 
    },
    { 
      icon: UserCheck, 
      title: '3. Admission Confirmation', 
      desc: 'Undergo interaction round, secure fee verification, and get seat allotted.' 
    }
  ];

  const faqs = [
    {
      q: 'What are the school timings?',
      a: 'Pre-Primary (Nursery & Prep): 08:30 AM to 12:30 PM (Mon-Fri).\nPrimary to Middle School (Class I - VIII): 07:50 AM to 02:15 PM (Mon-Sat, 2nd & 4th Saturdays are holidays).'
    },
    {
      q: 'Does the school provide bus services for all locations?',
      a: 'Yes, we provide transportation across major sectors in Delhi NCR. All buses are equipped with GPS tracking, speed governors, and female attendants.'
    },
    {
      q: 'What is the teacher-to-student ratio?',
      a: 'We maintain an average classroom ratio of 1:25. This ensures that every child receives proper individual support and tutoring.'
    },
    {
      q: 'How does the school handle medical emergencies?',
      a: 'We have a fully functional medical room with a full-time certified nurse. In case of major emergencies, we have an active tie-up with local multi-specialty hospitals located within 1 km of the school.'
    }
  ];

  const toggleFaq = (idx) => {
    if (openFaq === idx) {
      setOpenFaq(null);
    } else {
      setOpenFaq(idx);
    }
  };

  return (
    <div id="contact" className="pb-20">
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
      <section className="py-20 bg-white border-b border-slate-100">
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

      {/* Main Container */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          {/* WhatsApp Direct Inquiry Form */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-blue-900/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  💬 Direct WhatsApp Inquiry
                </span>
                <h3 className="text-3xl font-extrabold text-white leading-tight">
                  Send Instant Admission Query
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Fill in your basic details to connect directly with our admission desk on WhatsApp. We will respond with prospectus, fee structure, and seat availability.
                </p>
                <div className="pt-2 text-xs text-slate-400 flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                  <span>Admission Desk Online & Responding</span>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-xl">
                {submitted ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                      ✓
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">Inquiry Sent via WhatsApp!</h4>
                    <p className="text-slate-500 text-xs max-w-md mx-auto">
                      Your inquiry message has been formatted and opened in WhatsApp. If it didn't open automatically, click below to try again.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                          WhatsApp Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone No."
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                          Residential Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="address"
                          placeholder="Address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                        Class / Specific Query (Optional)
                      </label>
                      <textarea
                        name="message"
                        rows="2"
                        placeholder="Class / Query"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                    >
                      <span>Send Inquiry on WhatsApp</span>
                      <span className="text-lg">💬</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4 text-center max-w-3xl mx-auto mb-12">
            <span className="text-primary font-bold text-sm uppercase tracking-wider">Get in Touch</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Reach Us Directly</h2>
            <p className="text-slate-500 text-sm">Have a question? Feel free to contact our administrative offices during working hours.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Campus Location */}
            <div className="flex flex-col items-center text-center p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="p-4 bg-blue-50 text-primary rounded-2xl mb-4">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Campus Location</h4>
              <p className="text-slate-500 text-xs leading-relaxed">{settings?.contactAddress || "Sector 15, Institutional Area, New Delhi, Pin - 110001, India"}</p>
            </div>

            {/* Phone Enquiries */}
            <div className="flex flex-col items-center text-center p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="p-4 bg-blue-50 text-primary rounded-2xl mb-4">
                <Phone className="h-6 w-6 text-accent" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Phone Enquiries</h4>
              <p className="text-slate-500 text-xs leading-relaxed">{settings?.contactPhone || "+91 11 2345 6789, +91 98765 43210"}</p>
            </div>

            {/* Email Queries */}
            <div className="flex flex-col items-center text-center p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="p-4 bg-blue-50 text-primary rounded-2xl mb-4">
                <Mail className="h-6 w-6 text-accent" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Email Queries</h4>
              <p className="text-slate-500 text-xs leading-relaxed">{settings?.contactEmail || "info@abpublicschool.edu.in"}</p>
            </div>

            {/* Office Timings */}
            <div className="flex flex-col items-center text-center p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="p-4 bg-blue-50 text-primary rounded-2xl mb-4">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Office Timings</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Monday - Saturday: 08:30 AM to 02:30 PM</p>
            </div>
          </div>

          {/* Map Simulation */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
              <Globe2 className="h-6 w-6 text-primary" />
              <span>Campus Map Location</span>
            </h3>
            
            {/* Styled Map Placeholder */}
            <div className="relative h-[380px] w-full rounded-3xl overflow-hidden border border-slate-200 shadow-inner bg-sky-100 flex items-center justify-center">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-60 filter saturate-50 contrast-125" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800')` }}
              />
              <div className="absolute inset-0 bg-blue-500/10" />
              
              <div className="relative z-10 text-center bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-slate-100 max-w-sm space-y-4">
                <div className="inline-flex p-3 bg-blue-50 text-primary rounded-2xl animate-bounce">
                  <MapPin className="h-7 w-7 text-accent" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-slate-950">A B Public School</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">Sector 15, Institutional Area, New Delhi, India</p>
                </div>
                <button 
                  onClick={() => window.open('https://maps.google.com', '_blank')}
                  className="w-full py-2.5 bg-primary hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors shadow"
                >
                  Open Google Maps
                </button>
              </div>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-3">
              <span className="text-primary font-bold text-sm uppercase tracking-wider">Got Questions?</span>
              <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-100 transition-colors focus:outline-none"
                  >
                    <span className="flex items-center space-x-2.5">
                      <HelpCircle className="h-5 w-5 text-primary shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 border-t border-slate-100 text-slate-500 text-sm leading-relaxed whitespace-pre-line bg-white/50">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
