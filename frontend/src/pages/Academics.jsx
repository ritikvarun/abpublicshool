import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, FlaskConical, BookOpen, Laptop, Globe2, MessageSquare
} from 'lucide-react';

export default function Academics() {
  const wings = [
    {
      title: 'Pre-Primary (Nursery & Prep)',
      desc: 'Focuses on sensory learning, cognitive skills, language discovery, and play-based physical coordination.',
      age: '3 - 5 Years',
      method: 'Montessori & Activity-based Learning'
    },
    {
      title: 'Primary Wing (Classes I - V)',
      desc: 'Nurtures foundational reading, writing, mathematical competencies, environmental observations, and artistic exploration.',
      age: '6 - 10 Years',
      method: 'Experiential Project-based Learning'
    },
    {
      title: 'Senior Secondary (Classes VI - XII)',
      desc: 'Builds core concepts in sciences, secondary language fluency, computer programming basics, and historical inquiries.',
      age: '11 - 18 Years',
      method: 'Interactive Inquiry-based Lessons'
    }
  ];

  const subjects = [
    { icon: Calculator, name: 'Mathematics', desc: 'From basic algebra to calculus, building analytical problem-solving skills.', color: 'border-blue-200 text-blue-600 bg-blue-50' },
    { icon: FlaskConical, name: 'Science', desc: 'Physics, chemistry, and biology taught with laboratory experiments.', color: 'border-green-200 text-green-600 bg-green-50' },
    { icon: BookOpen, name: 'English Lit.', desc: 'Focusing on comprehension, creative writing, speech, and classic literature.', color: 'border-indigo-200 text-indigo-600 bg-indigo-50' },
    { icon: Laptop, name: 'Computer Science', desc: 'Teaching digital literacy, python coding, algorithms, and AI concepts.', color: 'border-purple-200 text-purple-600 bg-purple-50' },
    { icon: Globe2, name: 'Social Science', desc: 'Understanding geography, civics, history, and financial economies.', color: 'border-amber-200 text-amber-600 bg-amber-50' },
    { icon: MessageSquare, name: 'Hindi & Languages', desc: 'Grammar, vocabulary, essays, and regional literature appreciation.', color: 'border-rose-200 text-rose-600 bg-rose-50' }
  ];

  return (
    <div id="academics" className="pb-20">
      {/* Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
          >
            Academic Excellence
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto"
          >
            Fostering critical thinking, conceptual clarity, and lifetime learning capabilities.
          </motion.p>
        </div>
      </section>

      {/* Main Academics Content (Single Page, No Tabs) */}
      <section className="py-16 bg-white space-y-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          {/* Section 1: Academic Structure / Curriculum */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl font-extrabold text-slate-900">Academic Structure</h2>
              <p className="text-slate-500 text-sm">Our educational wings are structured to address stage-specific psychological and intellectual requirements.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {wings.map((wing, idx) => (
                <div key={idx} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-900">{wing.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{wing.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap gap-4 text-xs font-semibold text-slate-600">
                    <div>
                      <span className="text-slate-400">Age: </span>
                      <span>{wing.age}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Methodology: </span>
                      <span>{wing.method}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Section Divider */}
          <div className="border-t border-slate-100" />

          {/* Section 2: Subjects Taught */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl font-extrabold text-slate-900">Subjects Taught</h2>
              <p className="text-slate-500 text-sm">We provide standard core subjects with updated textbooks and interactive assignments in compliance with CBSE & UP Board guidelines.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((sub, idx) => {
                const Icon = sub.icon;
                return (
                  <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-start space-x-4">
                    <div className={`p-3 rounded-2xl border shrink-0 ${sub.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-slate-900 text-base">{sub.name}</h3>
                      <p className="text-slate-500 text-xs leading-relaxed">{sub.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>



        </div>
      </section>
    </div>
  );
}
