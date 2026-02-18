import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, X } from 'lucide-react';

const content = {
  ro: {
    title: 'Navigare',
    sections: [
      { id: 'why-me', label: 'Avantaje' },
      { id: 'about', label: 'Despre mine' },
      { id: 'services', label: 'Servicii' },
      { id: 'results', label: 'Rezultate' },
      { id: 'testimonials', label: 'Testimoniale' },
      { id: 'blog', label: 'Blog' },
      { id: 'faq', label: 'FAQ' },
      { id: 'schedule', label: 'Contact' }
    ]
  },
  en: {
    title: 'Navigation',
    sections: [
      { id: 'why-me', label: 'Benefits' },
      { id: 'about', label: 'About' },
      { id: 'services', label: 'Services' },
      { id: 'results', label: 'Results' },
      { id: 'testimonials', label: 'Testimonials' },
      { id: 'blog', label: 'Blog' },
      { id: 'faq', label: 'FAQ' },
      { id: 'schedule', label: 'Contact' }
    ]
  },
  fr: {
    title: 'Navigation',
    sections: [
      { id: 'why-me', label: 'Avantages' },
      { id: 'about', label: 'À propos' },
      { id: 'services', label: 'Services' },
      { id: 'results', label: 'Résultats' },
      { id: 'testimonials', label: 'Témoignages' },
      { id: 'blog', label: 'Blog' },
      { id: 'faq', label: 'FAQ' },
      { id: 'schedule', label: 'Contact' }
    ]
  }
};

export default function TableOfContents({ lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const t = content[lang] || content.en;

  useEffect(() => {
    const handleScroll = () => {
      const sections = t.sections.map(s => document.getElementById(s.id)).filter(Boolean);
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= scrollPos) {
          setActiveSection(t.sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [t.sections]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      {/* Toggle button - hidden on mobile */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg border border-slate-200 hover:shadow-xl transition-all"
      >
        {isOpen ? <X className="w-5 h-5 text-slate-600" /> : <List className="w-5 h-5 text-slate-600" />}
      </motion.button>

      {/* TOC Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed left-6 top-1/2 -translate-y-1/2 z-30 ml-14 hidden lg:block"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 min-w-[180px]">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">
                {t.title}
              </p>
              <nav className="space-y-1">
                {t.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      activeSection === section.id
                        ? 'bg-teal-50 text-teal-700 font-semibold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}