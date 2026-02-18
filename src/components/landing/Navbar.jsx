import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import Logo from './Logo';

const content = {
  ro: {
    links: ['Avantaje', 'Servicii', 'Blog', 'Contact'],
    pages: { despre: 'Despre', preturi: 'Prețuri', tabere: 'Retreat & Camps' },
    cta: 'Rezervă Acum'
  },
  en: {
    links: ['Benefits', 'Services', 'Blog', 'Contact'],
    pages: { despre: 'About', preturi: 'Pricing', tabere: 'Retreat & Camps' },
    cta: 'Book Now'
  },
  fr: {
    links: ['Avantages', 'Services', 'Blog', 'Contact'],
    pages: { despre: 'À propos', preturi: 'Tarifs', tabere: 'Retraite & Camps' },
    cta: 'Réserver'
  }
};

const anchors = ['why-me', 'services', 'blog', 'schedule'];

export default function Navbar({ lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const t = content[lang] || content.en;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save language preference
  useEffect(() => {
    localStorage.setItem('preferredLang', lang);
  }, [lang]);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const isOnHome = location.pathname === '/' || location.pathname === createPageUrl('Home');
    if (isOnHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      sessionStorage.setItem('scrollToSection', id);
      navigate(createPageUrl('Home'));
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white/90 backdrop-blur-sm shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to={createPageUrl('Home')}>
            <Logo light={!scrolled} />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Page links */}
            <div className="flex items-center gap-1">
              <Link 
                to={createPageUrl('About')} 
                className={`px-3 py-2 text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-white/80 hover:text-white'}`}
              >
                {t.pages.despre}
              </Link>
              <Link 
                to={createPageUrl('Pricing')} 
                className={`px-3 py-2 text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-white/80 hover:text-white'}`}
              >
                {t.pages.preturi}
              </Link>
              <Link 
                to={createPageUrl('Retreat')} 
                className={`px-3 py-2 text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-white/80 hover:text-white'}`}
              >
                {t.pages.tabere}
              </Link>
            </div>

            {/* Anchor links */}
            {t.links.map((link, i) => (
              <button
                key={link}
                onClick={() => scrollTo(anchors[i])}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {link}
              </button>
            ))}

            {/* Language */}
            <div className="flex items-center gap-1 ml-4">
              {['ro', 'en', 'fr'].map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 text-xs font-bold rounded transition-colors ${
                    lang === l 
                      ? 'bg-teal-100 text-teal-700'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* CTA */}
            <a
              href="https://calendly.com/iulian-cyberbuildsolutions/30min?back=1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full text-white font-semibold text-sm shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-105 transition-all"
            >
              {t.cta}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-900"
            aria-label={mobileOpen ? 'Închide meniu' : 'Deschide meniu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100"
          >
            <div className="px-6 py-4 space-y-2">
              {/* Page links */}
              <Link 
                to={createPageUrl('About')} 
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-slate-700 font-medium"
              >
                {t.pages.despre}
              </Link>
              <Link 
                to={createPageUrl('Pricing')} 
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-slate-700 font-medium"
              >
                {t.pages.preturi}
              </Link>
              <Link 
                to={createPageUrl('Retreat')} 
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-slate-700 font-medium"
              >
                {t.pages.tabere}
              </Link>
              
              <div className="border-t border-slate-100 pt-2">
                {t.links.map((link, i) => (
                  <button
                    key={link}
                    onClick={() => scrollTo(anchors[i])}
                    className="block w-full text-left py-3 text-slate-600"
                  >
                    {link}
                  </button>
                ))}
              </div>

              {/* Language */}
              <div className="flex items-center gap-2 py-3">
                {['ro', 'en', 'fr'].map(l => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setMobileOpen(false); }}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                      lang === l ? 'bg-teal-100 text-teal-700' : 'text-slate-500'
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* CTA */}
              <a
                href="https://calendly.com/iulian-cyberbuildsolutions/30min?back=1"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl text-white font-semibold text-center"
              >
                {t.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}