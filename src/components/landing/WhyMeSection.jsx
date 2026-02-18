import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, MapPin } from 'lucide-react';

const content = {
  ro: {
    tag: 'Avantaje',
    title: 'De ce eu?',
    subtitle: 'Nu doar antrenament – un sistem complet de performanță adaptat stilului de viață al unui lider.',
    benefits: [
      {
        icon: Zap,
        title: 'Sustained Energy',
        stat: '+2h',
        statLabel: 'focus/zi',
        description: 'Transformă oboseala în energie constantă pe tot parcursul zilei. Fără crash-uri, fără cafele în exces.'
      },
      {
        icon: Clock,
        title: 'Time-Efficient',
        stat: '3×',
        statLabel: '30-45 min/săpt',
        description: 'Rezultate maxime în timp minim. Antrenamente optimizate pentru agenda ta încărcată.'
      },
      {
        icon: MapPin,
        title: 'Local Expert',
        stat: '100%',
        statLabel: 'flexibilitate',
        description: 'Cunoaștere profundă a parcurilor, gym-urilor corporate și locațiilor premium din București/Ilfov.'
      }
    ]
  },
  en: {
    tag: 'Benefits',
    title: 'Why me?',
    subtitle: 'Not just training – a complete performance system tailored to a leader\'s lifestyle.',
    benefits: [
      {
        icon: Zap,
        title: 'Sustained Energy',
        stat: '+2h',
        statLabel: 'focus/day',
        description: 'Transform fatigue into constant energy throughout the day. No crashes, no excess coffee.'
      },
      {
        icon: Clock,
        title: 'Time-Efficient',
        stat: '3×',
        statLabel: '30-45 min/week',
        description: 'Maximum results in minimum time. Workouts optimized for your packed schedule.'
      },
      {
        icon: MapPin,
        title: 'Local Expert',
        stat: '100%',
        statLabel: 'flexibility',
        description: 'Deep knowledge of parks, corporate gyms and premium locations in Bucharest/Ilfov.'
      }
    ]
  }
};

const frContent = {
  tag: 'Avantages',
  title: 'Pourquoi moi?',
  subtitle: 'Pas seulement de l\'entraînement – un système de performance complet adapté au style de vie d\'un leader.',
  benefits: [
    {
      icon: Zap,
      title: 'Énergie Soutenue',
      stat: '+2h',
      statLabel: 'focus/jour',
      description: 'Transformez la fatigue en énergie constante tout au long de la journée. Pas de crash, pas de café en excès.'
    },
    {
      icon: Clock,
      title: 'Efficace en Temps',
      stat: '3×',
      statLabel: '30-45 min/sem',
      description: 'Résultats maximum en temps minimum. Entraînements optimisés pour votre agenda chargé.'
    },
    {
      icon: MapPin,
      title: 'Expert Local',
      stat: '100%',
      statLabel: 'flexibilité',
      description: 'Connaissance approfondie des parcs, gyms corporate et emplacements premium à Bucarest/Ilfov.'
    }
  ]
};

export default function WhyMeSection({ lang }) {
  const t = lang === 'fr' ? frContent : content[lang] || content.en;

  return (
    <section id="why-me" className="py-32 bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-50/50 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-teal-600 font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            {t.tag}
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
            {t.title}
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8">
          {t.benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full p-10 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:border-teal-200 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-500">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 mb-8 shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform duration-500">
                  <benefit.icon className="w-8 h-8 text-white" strokeWidth={2} />
                </div>

                {/* Stat */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-black text-slate-900">{benefit.stat}</span>
                  <span className="text-slate-400 font-medium">{benefit.statLabel}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Hover accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}