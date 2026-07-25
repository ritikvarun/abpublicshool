import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SchoolContext } from '../context/SchoolContext';
import schoolHeroImg from '../assets/school_campus_hero.png';

// Section components imports
import About from './About';
import Academics from './Academics';
import Facilities from './Facilities';
import Gallery from './Gallery';
import Contact from './Contact';

export default function Home() {
  const { settings, notices, serverUrl } = useContext(SchoolContext);

  const getHeroBg = () => {
    if (settings?.heroBgPhoto) {
      if (settings.heroBgPhoto.startsWith('http')) {
        return settings.heroBgPhoto;
      }
      return `${serverUrl}${settings.heroBgPhoto}`;
    }
    return schoolHeroImg;
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };




  return (
    <div id="home" className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-slate-950 overflow-hidden">
        {/* Visual Background with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-65" 
          style={{ backgroundImage: `url(${getHeroBg()})` }}
        />
        <div className="absolute inset-0 bg-slate-950/55" />
        
        {/* Floating background shapes */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-float" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 lg:py-32">
          <div className="max-w-3xl">

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6"
            >
              <span className="block text-2xl sm:text-3xl text-blue-400 font-bold mb-2 uppercase tracking-wider">A B Public School</span>
              Empowering Young Minds for a <span className="text-accent">Brighter Tomorrow</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl"
            >
              Providing quality education with modern learning methods, experienced teachers, and a safe environment. We mold leaders of the next generation.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link 
                to="/#contact" 
                className="px-8 py-4 bg-primary hover:bg-blue-700 text-white rounded-2xl font-semibold shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                Apply Now
              </Link>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Single Page Sections */}
      <Gallery />
      <About />
      <Academics />
      <Facilities />
      <Contact />



    </div>
  );
}
