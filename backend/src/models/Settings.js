import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  // Name & Brand
  schoolName: { type: String, default: 'A B Public School' },
  gymName: { type: String, default: 'A B Public School' }, // Alias for gym admin compatibility
  logoText: { type: String, default: 'ABPS' },

  // Hero Section Customization
  heroTitle1: { type: String, default: 'Empowering Young Minds' },
  heroTitle2: { type: String, default: 'for a Brighter Tomorrow' },
  heroSubheadline: { type: String, default: 'Providing quality education with modern learning methods, experienced teachers, and a safe environment.' },

  // Statistics counts (supports both gym and school fields)
  happyStudents: { type: String, default: '1500+' },
  membersActive: { type: String, default: '1500+' }, // gym alias
  
  expertTeachers: { type: String, default: '80+' },
  eliteCoaches: { type: String, default: '80+' }, // gym alias
  
  smartClassrooms: { type: String, default: '30+' },
  successRate: { type: String, default: '100% Board Pass' }, // gym alias (could be board pass rate)
  
  yearsOfExcellence: { type: String, default: '8+' },
  aboutYears: { type: String, default: '8' }, // gym alias

  // Contact Info
  contactEmail: { type: String, default: 'info@abpublicschool.edu.in' },
  contactPhone: { type: String, default: '+91 11 2345 6789' },
  contactAddress: { type: String, default: 'Sector 15, Institutional Area, New Delhi - 110001, India' },
  instagramId: { type: String, default: 'abpublicschool' },
  ownerPhone: { type: String, default: '+91 98765 43210' },
  receptionPhone: { type: String, default: '+91 11 2345 6789' },
  whatsappNumber: { type: String, default: '919876543210' },
  mapUrl: { type: String, default: '' },

  // Principal Message Info
  principalName: { type: String, default: 'Mr. Sonu Sir' },
  principalMessage: { type: String, default: 'Welcome to A B Public School. We believe that every student has unique talents waiting to be unlocked. Our objective is to guide them to discover their capabilities, support their educational journey, and foster a deep sense of social responsibility. We ensure our curriculum adapts to global changes while staying rooted in core values.' },
  principalImage: { type: String, default: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400' },

  // Mock Pricing for admin compatibility
  basicPrice: { type: String, default: 'Free' },
  basicPeriod: { type: String, default: 'Admission Prospectus' },
  standardPrice: { type: String, default: 'Contact Us' },
  standardPeriod: { type: String, default: 'Quarterly Fees' },
  elitePrice: { type: String, default: 'Inquire' },
  elitePeriod: { type: String, default: 'Annual Enrollment' },

  // About Section Photo
  aboutPhoto: { type: String, default: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000' },
  heroBgPhoto: { type: String, default: '' }
}, { timestamps: true });

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
