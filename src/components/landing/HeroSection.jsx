import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import Logo from './Logo';

const content = {
  ro: {
    badge: 'Coaching Premium pentru Executivi în EU & Online',
    title1: 'Rhythm of',
    title2: 'Leaders',
    subtitle: 'Partenerul tău de performanță pentru executivi și fondatori din Europa și online care vor mai multă energie, focus ascuțit și reziliență – fără să adauge ore în programul deja plin.',
    cta1: 'Rezervă Acum',
    cta2: 'Vezi video',
    scroll: 'Află mai mult'
  },
  en: {
    badge: 'Premium Executive Coaching in the EU & Online',
    title1: 'Rhythm of',
    title2: 'Leaders',
    subtitle: 'Your performance partner for executives and founders across Europe and online who want more energy, sharper focus and resilience – without adding hours to an already packed schedule.',
    cta1: 'Book Now',
    cta2: 'Watch video',
    scroll: 'Learn more'
  },
  fr: {
    badge: 'Coaching Premium pour Dirigeants en Europe & En Ligne',
    title1: 'Rhythm of',
    title2: 'Leaders',
    subtitle: 'Votre partenaire de performance pour les dirigeants et fondateurs en Europe et en ligne qui veulent plus d\'énergie, un focus aiguisé et de la résilience – sans ajouter d\'heures à un agenda déjà chargé.',
    cta1: 'Réserver',
    cta2: 'Voir la vidéo',
    scroll: 'En savoir plus'
  }
};

export default function HeroSection({ lang }) {
  const t = content[lang] || content.en;
  
  const scrollToSchedule = () => {
    document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-teal-950 to-emerald-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        />
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-white/80 text-sm font-medium tracking-wide">
              {t.badge}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8"
          >
            <span className="text-white">{t.title1}</span>
            <br />
            <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
              {t.title2}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-14 leading-relaxed font-light"
          >
            {t.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button 
              onClick={scrollToSchedule}
              className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full font-semibold text-white shadow-2xl shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-500 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t.cta1}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
            
            <button 
              onClick={() => document.getElementById('video')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 border border-white/20 rounded-full font-medium text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              {t.cta2}
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={() => document.getElementById('why-me')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="flex flex-col items-center gap-3 text-white/40 hover:text-white/60 transition-colors">
            <span className="text-sm tracking-[0.3em] uppercase">{t.scroll}</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}