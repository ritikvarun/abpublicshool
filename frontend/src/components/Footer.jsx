import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { SchoolContext } from '../context/SchoolContext';

export default function Footer() {
  const { settings } = useContext(SchoolContext);
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/#home' },
    { name: 'Gallery', path: '/#gallery' },
    { name: 'About Us', path: '/#about' },
    { name: 'Academics', path: '/#academics' },
    { name: 'Facilities', path: '/#facilities' },
  ];

  const socialLinks = [
    { 
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ), 
      href: '#', 
      label: 'Facebook', 
      color: 'hover:bg-blue-600' 
    },
    { 
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ), 
      href: '#', 
      label: 'Twitter', 
      color: 'hover:bg-sky-500' 
    },
    { 
      icon: (props) => (
        <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" {...props}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      ), 
      href: '#', 
      label: 'Instagram', 
      color: 'hover:bg-pink-600' 
    },
    { 
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ), 
      href: '#', 
      label: 'Youtube', 
      color: 'hover:bg-red-600' 
    }
  ];


  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-primary text-white p-2 rounded-xl">
                <GraduationCap className="h-6 w-6 text-accent" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-accent transition-colors duration-300">
                {settings?.schoolName || settings?.gymName || "A B Public School"}
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering young minds with quality education, modern infrastructure, and a values-based curriculum. Over 20 years of academic excellence.
            </p>
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className={`p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all duration-300 hover:-translate-y-1 ${social.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base uppercase tracking-wider mb-6 pb-2 border-b border-slate-800 inline-block">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-accent hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-bold text-base uppercase tracking-wider mb-6 pb-2 border-b border-slate-800 inline-block">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>{settings?.contactAddress || "Sector 15, institutional Area, New Delhi, Pin - 110001, India"}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <span>{settings?.contactPhone || "+91 11 2345 6789, +91 98765 43210"}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <span>{settings?.contactEmail || "info@abpublicschool.edu.in"}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Notice Box */}
          <div>
            <h3 className="text-white font-bold text-base uppercase tracking-wider mb-6 pb-2 border-b border-slate-800 inline-block">
              Newsletter
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Subscribe to stay updated with monthly circulars and school events.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700/60 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-primary placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1 top-1 p-2 bg-primary hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p className="mb-4 md:mb-0">
            &copy; {currentYear} {settings?.schoolName || settings?.gymName || "A B Public School"}. All Rights Reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
