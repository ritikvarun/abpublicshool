import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Info } from 'lucide-react';
import { SchoolContext } from '../context/SchoolContext';

export default function Gallery() {
  const { gallery, serverUrl } = useContext(SchoolContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const galleryItems = [
    {
      id: 1,
      title: 'School Building & Main Campus',
      category: 'campus',
      src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600',
      desc: 'Our expansive school entrance and administrative blocks.'
    },
    {
      id: 2,
      title: 'Modern Smart Classrooms',
      category: 'academics',
      src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600',
      desc: 'Students engaging with digitised smart board lessons.'
    },
    {
      id: 3,
      title: 'Vast Reference Library',
      category: 'campus',
      src: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=600',
      desc: 'Calm reading and research zone for senior students.'
    },
    {
      id: 4,
      title: 'Chemistry Experiments in Science Lab',
      category: 'labs',
      src: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600',
      desc: 'High school students performing analytical titrations.'
    },
    {
      id: 5,
      title: 'Robotics & Computer Programming Lab',
      category: 'labs',
      src: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600',
      desc: 'Coding session on Python and algorithmic designs.'
    },
    {
      id: 6,
      title: 'Active School Playgrounds',
      category: 'sports',
      src: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?q=80&w=600',
      desc: 'Synthetic fields hosting football tournaments.'
    },
    {
      id: 7,
      title: 'Annual Cultural Function Stage',
      category: 'events',
      src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600',
      desc: 'Stunning choreography showcase during founder\'s day.'
    },
    {
      id: 8,
      title: 'Annual Sports Day Athletics',
      category: 'sports',
      src: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=600',
      desc: 'Track and field racers crossing the finish line.'
    },
    {
      id: 9,
      title: 'Collaborative Student Learning',
      category: 'academics',
      src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600',
      desc: 'Group projects encouraging community discussions.'
    }
  ];

  const filters = [
    { value: 'all', label: 'All Photos' },
    { value: 'campus', label: 'Campus & Library' },
    { value: 'academics', label: 'Academics' },
    { value: 'labs', label: 'Science & Tech Labs' },
    { value: 'events', label: 'Cultural Events' },
    { value: 'sports', label: 'Sports Day' }
  ];

  const combinedItems = (gallery && gallery.length > 0)
    ? gallery.map(item => ({
        id: item._id,
        title: item.title,
        category: item.tag || 'campus',
        src: (item.image || item.src)
          ? ((item.image || item.src).startsWith('http')
              ? (item.image || item.src)
              : `${serverUrl}${(item.image || item.src).startsWith('/') ? (item.image || item.src) : '/' + (item.image || item.src)}`)
          : '',
        desc: item.desc || ''
      }))
    : galleryItems;

  const filteredItems = activeFilter === 'all'
    ? combinedItems
    : combinedItems.filter(item => item.category === activeFilter);

  return (
    <div id="gallery" className="pb-20">


      {/* Filter Options */}
      <section className="py-8 bg-slate-50 border-b border-slate-200 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4.5 py-2 rounded-xl font-semibold text-xs transition-all duration-300 ${
                  activeFilter === filter.value 
                    ? 'bg-primary text-white shadow-md shadow-blue-500/25' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photos Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  onClick={() => setSelectedImage(item)}
                  className="group relative cursor-pointer overflow-hidden rounded-3xl bg-slate-100 border border-slate-200/60 aspect-4/3 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-accent bg-accent/10 border border-accent/20 rounded mb-2 w-max uppercase">
                      {item.category}
                    </span>
                    <h3 className="text-white font-bold text-base leading-snug">{item.title}</h3>
                    <p className="text-slate-300 text-xs mt-1.5 line-clamp-1">{item.desc}</p>
                  </div>
                  
                  {/* Quick Zoom icon */}
                  <div className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-xl text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn className="h-4.5 w-4.5" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2.5 bg-slate-850 hover:bg-slate-800 text-white rounded-full transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-8 bg-slate-950 flex items-center justify-center">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="w-full max-h-[70vh] object-contain"
                  />
                </div>
                <div className="md:col-span-4 p-6 sm:p-8 flex flex-col justify-center text-white space-y-4">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold text-accent bg-accent/10 border border-accent/20 rounded uppercase w-max">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-xl font-bold leading-snug">{selectedImage.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{selectedImage.desc}</p>
                  
                  <div className="flex items-center space-x-2 text-xs text-slate-500 pt-4 border-t border-slate-800">
                    <Info className="h-4.5 w-4.5" />
                    <span>Real-world capture, 2026.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
