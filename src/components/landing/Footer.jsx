import React from 'react';
import { Linkedin, Mail, Heart, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';

const content = {
  ro: {
    brand: 'Coaching de performanță pentru executivi București & Ilfov',
    links: {
      services: 'Servicii',
      blog: 'Blog',
      contact: 'Contact'
    },
    copyright: 'Toate drepturile rezervate.',
    madeWith: 'Creat cu',
    in: 'în București'
  },
  en: {
    brand: 'Executive performance coaching Bucharest & Ilfov',
    links: {
      services: 'Services',
      blog: 'Blog',
      contact: 'Contact'
    },
    copyright: 'All rights reserved.',
    madeWith: 'Made with',
    in: 'in Bucharest'
  }
};

const frContent = {
  brand: 'Coaching de performance pour dirigeants Bucarest & International',
  links: {
    services: 'Services',
    blog: 'Blog',
    contact: 'Contact'
  },
  copyright: 'Tous droits réservés.',
  madeWith: 'Créé avec',
  in: 'à Bucarest'
};

export default function Footer({ lang }) {
  const t = lang === 'fr' ? frContent : content[lang] || content.en;
  const currentYear = new Date().getFullYear();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <Logo light />
            </div>
            <p className="text-slate-400 max-w-sm mb-6">
              {t.brand}
            </p>
            <div className="flex gap-3">
              <a 
                href="https://www.linkedin.com/in/iulianbofu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:iulian@rhythmofleaders.pro"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Links</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollTo('services')} 
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 group"
                >
                  {t.links.services}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('blog')} 
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 group"
                >
                  {t.links.blog}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('schedule')} 
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 group"
                >
                  {t.links.contact}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-slate-400">
              <li>
                <a href="mailto:iulian@rhythmofleaders.pro" className="hover:text-white transition-colors">
                  iulian@rhythmofleaders.pro
                </a>
              </li>
              <li>
                <a href="tel:+40750497638" className="hover:text-white transition-colors">
                  +40 750 497 638
                </a>
              </li>
              <li>București & EU</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <p>© {currentYear} Rhythm of Leaders. {t.copyright}</p>
              <span className="hidden md:inline">•</span>
              <p>CUI: RO53532866</p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <a 
                href="https://anpc.ro/ce-este-sal/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-teal-400 hover:text-teal-300 transition-colors"
              >
                {lang === 'ro' ? 'SAL - ANPC' : lang === 'fr' ? 'SAL - ANPC' : 'SAL - ANPC'}
              </a>
              <span className="hidden md:inline">•</span>
              <p className="flex items-center gap-1">
                {t.madeWith} <Heart className="w-4 h-4 text-red-500 fill-red-500" /> {t.in}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}