import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { SchoolContext } from '../context/SchoolContext';
import logoImg from '../assets/logo.png';

export default function Navbar() {
  const { settings } = useContext(SchoolContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/#home' },
    { name: 'Gallery', path: '/#gallery' },
    { name: 'About', path: '/#about' },
    { name: 'Academics', path: '/#academics' },
    { name: 'Facilities', path: '/#facilities' },
  ];

  const isActive = (path) => {
    const hash = path.split('#')[1];
    if (!hash) return false;
    return location.hash === `#${hash}` || (location.pathname === '/' && !location.hash && hash === 'home');
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & School Name */}
          <Link to="/" className="flex items-center space-x-2.5 lg:space-x-3 group flex-shrink-0" onClick={() => setIsOpen(false)}>
            <img 
              src={logoImg} 
              alt="A B Public School Logo" 
              className="h-10 lg:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col justify-center">
              <span className="block text-lg lg:text-xl font-bold tracking-tight text-slate-900 group-hover:text-primary transition-colors duration-300 whitespace-nowrap">
                {settings?.schoolName || settings?.gymName || "A B Public School"}
              </span>
              <span className="block text-[10px] lg:text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                Inspire • Lead • Achieve
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Centered) */}
          <div className="hidden lg:flex items-center justify-center space-x-1 xl:space-x-2 flex-grow mx-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-2.5 py-2 xl:px-4 rounded-xl text-xs xl:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  isActive(link.path)
                    ? 'text-primary bg-blue-50'
                    : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-1 left-2.5 right-2.5 xl:left-4 xl:right-4 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Contact Us Button (Right Aligned) */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <Link
              to="/#contact"
              className="flex items-center space-x-1.5 px-5 py-2.5 bg-primary hover:bg-blue-700 text-white rounded-xl text-xs lg:text-sm font-semibold shadow-md shadow-blue-500/25 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
            >
              <span>Contact Us</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <Link
              to="/#contact"
              className="flex items-center space-x-1 px-3.5 py-2 bg-primary text-white rounded-xl text-xs font-semibold shadow-md"
            >
              <span>Contact</span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none transition-colors duration-300"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-[72px] bg-slate-900/40 backdrop-blur-sm lg:hidden z-45" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Menu Drawer */}
      <div className={`fixed top-[72px] right-0 w-80 max-w-xs h-[calc(100vh-72px)] bg-white shadow-2xl z-50 transform transition-transform duration-350 ease-out lg:hidden flex flex-col justify-between ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="px-4 py-6 overflow-y-auto space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                isActive(link.path)
                  ? 'text-primary bg-blue-50/80 border-l-4 border-primary pl-3'
                  : 'text-slate-600 hover:text-primary hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <Link
            to="/#contact"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center space-x-2 w-full py-3 bg-primary hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md transition-all duration-300"
          >
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
