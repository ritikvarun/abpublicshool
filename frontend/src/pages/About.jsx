import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { SchoolContext } from '../context/SchoolContext';

export default function About() {
  const { settings, teachers, serverUrl } = useContext(SchoolContext);
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div id="about" className="pb-20">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
          >
            About Our School
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto"
          >
            Nurturing knowledge, character, and leadership qualities in every child since 2006.
          </motion.p>
        </div>
      </section>

      {/* History and Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-6"
            >
              <span className="text-primary font-bold text-sm uppercase tracking-wider">Our Legacy</span>
              <h2 className="text-3xl font-extrabold text-slate-900">Over 20 Years of Academic Dedication</h2>
              <p className="text-slate-600 leading-relaxed">
                Founded in 2006, A B Public School has evolved into one of the region's premier educational institutions. We have consistently set benchmarks in educational quality, combining physical classrooms with dynamic modern learning suites.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Our approach emphasizes balanced development. We encourage students to challenge their intellectual potential while embodying characteristics of empathy, tolerance, and respect.
              </p>
            </motion.div>
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="grid grid-cols-2 gap-4"
            >
              <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 space-y-2">
                <h3 className="text-2xl font-bold text-primary">20+</h3>
                <h4 className="font-bold text-slate-900 text-sm">Years of Excellence</h4>
                <p className="text-slate-500 text-xs">Delivering proven education and career milestones.</p>
              </div>
              <div className="p-6 rounded-3xl bg-amber-50 border border-amber-100 space-y-2">
                <h3 className="text-2xl font-bold text-amber-600">100%</h3>
                <h4 className="font-bold text-slate-900 text-sm">Board Pass Rate</h4>
                <p className="text-slate-500 text-xs">Consistent record in CBSE board examinations.</p>
              </div>
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-2 col-span-2">
                <h3 className="text-2xl font-bold text-slate-800">50+</h3>
                <h4 className="font-bold text-slate-900 text-sm">Extra-Curricular Awards</h4>
                <p className="text-slate-500 text-xs">Excellence in district and national level debates, sports, and science exhibitions.</p>
              </div>
            </motion.div>
          </div>

          {/* Principal message */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-100">
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="h-44 w-44 rounded-full bg-primary/10 overflow-hidden border-4 border-white shadow-xl mb-4">
                <img 
                  src={settings?.principalImage || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400"} 
                  alt={`${settings?.principalName || "Dr. Anita Sen"}, Principal`}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">{settings?.principalName || "Dr. Anita Sen"}</h3>
              <p className="text-primary text-xs font-semibold">Principal, {settings?.schoolName || settings?.gymName || "A B Public School"}</p>
            </div>
            <div className="lg:col-span-8 space-y-4">
              <span className="text-amber-500 text-6xl font-serif leading-none select-none">“</span>
              <h3 className="text-2xl font-bold text-slate-900">Message from the Principal</h3>
              <p className="text-slate-600 text-sm leading-relaxed italic whitespace-pre-wrap">
                "{settings?.principalMessage || "Welcome to A B Public School. We believe that every student has unique talents waiting to be unlocked. Our objective is to guide them to discover their capabilities, support their educational journey, and foster a deep sense of social responsibility. We ensure our curriculum adapts to global changes while staying rooted in core values."}"
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Our Expert Teachers Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold text-sm uppercase tracking-wider block">Faculty members</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">Our Dedicated Educators</h2>
            <p className="text-slate-500 mt-4">Meet our team of highly qualified, experienced, and passionate teachers who guide our students towards conceptual clarity and excellence.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {((teachers && teachers.length > 0) ? teachers : [
              {
                _id: '1',
                name: 'Dr. Ramesh Kumar',
                role: 'Physics HOD',
                exp: '12 Yrs Exp',
                image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400',
                certs: ['M.Sc Physics', 'Ph.D']
              },
              {
                _id: '2',
                name: 'Sonia Sharma',
                role: 'Chemistry HOD',
                exp: '8 Yrs Exp',
                image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400',
                certs: ['M.Sc Chemistry', 'B.Ed']
              },
              {
                _id: '3',
                name: 'Amit Patel',
                role: 'Mathematics Expert',
                exp: '10 Yrs Exp',
                image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400',
                certs: ['M.Sc Maths', 'B.Ed']
              },
              {
                _id: '4',
                name: 'Priyanka Verma',
                role: 'Biology Teacher',
                exp: '6 Yrs Exp',
                image: 'https://images.unsplash.com/photo-1580894732444-8fecef2271ff?q=80&w=400',
                certs: ['M.Sc Zoology']
              }
            ]).map((teacher, idx) => (
              <motion.div
                key={teacher._id || teacher.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-64 bg-slate-200 relative overflow-hidden">
                  <img 
                    src={teacher.image.startsWith('http') ? teacher.image : `${serverUrl}${teacher.image}`} 
                    alt={teacher.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-slate-900/80 backdrop-blur text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {teacher.exp}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-extrabold text-slate-900 text-lg leading-snug">{teacher.name}</h3>
                  <p className="text-primary text-xs font-semibold uppercase">{teacher.role}</p>
                  
                  {teacher.certs && teacher.certs.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-3 border-t border-slate-200/60 mt-3">
                      {teacher.certs.map((c, i) => (
                        <span key={i} className="text-[10px] text-slate-600 bg-slate-200/50 px-2 py-0.5 rounded">
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
