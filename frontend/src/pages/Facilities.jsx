import React from 'react';
import { motion } from 'framer-motion';
import { 
  Tv, Bus, HeartPulse, Laptop, BookOpen, Trophy, Eye, Sparkles, ShieldCheck
} from 'lucide-react';

export default function Facilities() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const facilities = [
    {
      icon: Tv,
      title: 'Digital Classrooms',
      desc: 'All classrooms are equipped with projector displays, interactive boards, digital modules, and high-speed Wi-Fi to support hybrid learning systems.'
    },
    {
      icon: Laptop,
      title: 'Advanced Computer Lab',
      desc: 'Fitted with the latest computer terminals, software development tools, 3D printers, and robotics prototyping hardware kits.'
    },
    {
      icon: BookOpen,
      title: 'Spacious Library',
      desc: 'Hosts over 15,000 reference manuals, textbooks, journals, and electronic magazine databases with quiet reading zones.'
    },
    {
      icon: Bus,
      title: 'Safe Bus Transportation',
      desc: 'Our bus fleet covers the entire city with GPS vehicle tracking, active speed limit monitors, and trained bus staff.'
    },
    {
      icon: Trophy,
      title: 'Grand Sports Ground',
      desc: 'Equipped with professional football fields, synthetic basketball courts, badminton courts, and indoor table-tennis halls.'
    },
    {
      icon: Eye,
      title: 'CCTV Guarded Campus',
      desc: 'Our campus is covered by over 200 security cameras monitored 24/7 in our network operations center to ensure absolute safety.'
    },
    {
      icon: Sparkles,
      title: 'Clean & Green Campus',
      desc: 'Lush gardens, solar powered lighting, active waste recycle plants, and hygienic RO drinking water systems on all floors.'
    },
    {
      icon: HeartPulse,
      title: 'Fully Stocked Medical Room',
      desc: 'Manned by a full-time certified nurse, first-aid kits, diagnostic monitors, and partnership with local emergency clinics.'
    }
  ];

  return (
    <div id="facilities" className="pb-20">
      {/* Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541829019-259276a7f013?q=80&w=1200')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
          >
            School Facilities
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto"
          >
            A safe, modern, and green environment designed to inspire student potential.
          </motion.p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-primary font-bold text-sm uppercase tracking-wider">Campus Amenities</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Modern Infrastructure for Holistic Growth</h2>
            <p className="text-slate-500 text-sm">We provide standard assets that guarantee comfort, safety, and excellent hands-on learning resources.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((fac, idx) => {
              const Icon = fac.icon;
              return (
                <motion.div 
                  key={idx}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                  className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-start hover:bg-white hover:shadow-xl hover:border-primary/10 transition-all duration-300 group"
                >
                  <div className="p-4 bg-white shadow-sm border border-slate-100 group-hover:bg-primary group-hover:text-white text-primary rounded-2xl w-14 h-14 flex items-center justify-center mb-6 transition-all duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-xl mb-3 group-hover:text-primary transition-colors">
                    {fac.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {fac.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Safety callout */}
          <div className="mt-16 bg-blue-50 p-8 rounded-3xl border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 text-primary rounded-2xl shrink-0">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Hygienic and Secure Environment</h4>
                <p className="text-slate-600 text-sm">Regular health checkups, standard fire safety protocols, clean cafeterias, and sanitization schedules are systematically followed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
