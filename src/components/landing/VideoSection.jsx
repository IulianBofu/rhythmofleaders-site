import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, TrendingUp, Clock, Target } from 'lucide-react';

const content = {
  ro: {
    tag: 'Video',
    title: 'De ce fitness-ul e avantajul tău secret în business',
    subtitle: '2 minute care îți pot schimba perspectiva asupra performanței',
    stats: [
      { value: '25%', label: 'Creștere energie', icon: TrendingUp },
      { value: '4', label: 'Săptămâni', icon: Clock },
      { value: '30', label: 'Min/sesiune', icon: Target }
    ],
    cta: 'Vezi video'
  },
  en: {
    tag: 'Video',
    title: 'Why fitness is your unfair advantage in business',
    subtitle: '2 minutes that can change your perspective on performance',
    stats: [
      { value: '25%', label: 'Energy boost', icon: TrendingUp },
      { value: '4', label: 'Weeks', icon: Clock },
      { value: '30', label: 'Min/session', icon: Target }
    ],
    cta: 'Watch video'
  },
  fr: {
    tag: 'Vidéo',
    title: 'Pourquoi le fitness est votre avantage injuste en affaires',
    subtitle: '2 minutes qui peuvent changer votre perspective sur la performance',
    stats: [
      { value: '25%', label: 'Boost énergie', icon: TrendingUp },
      { value: '4', label: 'Semaines', icon: Clock },
      { value: '30', label: 'Min/séance', icon: Target }
    ],
    cta: 'Voir la vidéo'
  }
};

export default function VideoSection({ lang }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const t = content[lang] || content.en;

  return (
    <section id="video" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Thumbnail */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-900 shadow-2xl">
              {isPlaying ? (
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <>
                  <img
                    src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=450&fit=crop"
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Play button */}
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center group"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20" />
                      <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-teal-600 ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </button>

                  {/* Duration badge */}
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-lg text-white text-sm font-medium">
                    2:14
                  </div>
                </>
              )}
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <span className="inline-flex items-center gap-2 text-teal-600 font-semibold text-sm tracking-[0.2em] uppercase mb-4">
              <Play className="w-4 h-4" />
              {t.tag}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
              {t.title}
            </h2>
            <p className="text-lg text-slate-500 mb-8">
              {t.subtitle}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {t.stats.map((stat, i) => (
                <div key={i} className="text-center p-4 rounded-2xl bg-slate-50 hover:bg-teal-50 transition-colors">
                  <stat.icon className="w-5 h-5 text-teal-500 mx-auto mb-2" />
                  <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}