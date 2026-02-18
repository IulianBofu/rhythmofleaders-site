import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Target, Award, ArrowUpRight } from 'lucide-react';

const content = {
  ro: {
    tag: 'Rezultate reale',
    title: 'Transformări măsurabile',
    subtitle: 'Studii de caz anonimizate de la clienți reali',
    cases: [
      {
        name: 'Radu M.',
        role: 'Founder, Tech Startup',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        quote: 'Am închis o rundă de €200K la 3 luni după ce am început programul. Coincidență? Nu cred.',
        metrics: [
          { label: 'Energie', before: '5/10', after: '8/10', change: '+60%' },
          { label: 'Focus zilnic', before: '4h', after: '7h', change: '+75%' },
          { label: 'Greutate', before: '92kg', after: '84kg', change: '-8kg' }
        ],
        duration: '12 săptămâni'
      },
      {
        name: 'Maria D.',
        role: 'General Manager, Multinațională',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
        quote: 'Prima dată în 10 ani când mă simt energică la 18:00. Copiii mei au observat diferența.',
        metrics: [
          { label: 'Somn', before: '5h', after: '7h', change: '+40%' },
          { label: 'Stres', before: '9/10', after: '5/10', change: '-44%' },
          { label: 'Productivitate', before: 'medie', after: 'excelentă', change: '↑' }
        ],
        duration: '8 săptămâni'
      },
      {
        name: 'Alexandru P.',
        role: 'CFO, Real Estate',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        quote: 'ROI-ul cel mai bun pe care l-am făcut anul ăsta. Și am făcut multe investiții.',
        metrics: [
          { label: 'Energie', before: '4/10', after: '9/10', change: '+125%' },
          { label: 'Body fat', before: '28%', after: '21%', change: '-7%' },
          { label: 'Claritate decizii', before: 'OK', after: 'Sharpe', change: '↑↑' }
        ],
        duration: '16 săptămâni'
      }
    ],
    stats: [
      { value: '94%', label: 'Continuă după pilot' },
      { value: '+2h', label: 'Focus/zi în medie' },
      { value: '4', label: 'Săptămâni până la rezultate' }
    ]
  },
  en: {
    tag: 'Real results',
    title: 'Measurable transformations',
    subtitle: 'Anonymized case studies from real clients',
    cases: [
      {
        name: 'Radu M.',
        role: 'Founder, Tech Startup',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        quote: 'I closed a €200K round 3 months after starting the program. Coincidence? I don\'t think so.',
        metrics: [
          { label: 'Energy', before: '5/10', after: '8/10', change: '+60%' },
          { label: 'Daily focus', before: '4h', after: '7h', change: '+75%' },
          { label: 'Weight', before: '92kg', after: '84kg', change: '-8kg' }
        ],
        duration: '12 weeks'
      },
      {
        name: 'Maria D.',
        role: 'General Manager, Multinational',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
        quote: 'First time in 10 years I feel energetic at 6PM. My kids noticed the difference.',
        metrics: [
          { label: 'Sleep', before: '5h', after: '7h', change: '+40%' },
          { label: 'Stress', before: '9/10', after: '5/10', change: '-44%' },
          { label: 'Productivity', before: 'average', after: 'excellent', change: '↑' }
        ],
        duration: '8 weeks'
      },
      {
        name: 'Alexandru P.',
        role: 'CFO, Real Estate',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        quote: 'Best ROI I\'ve made this year. And I\'ve made many investments.',
        metrics: [
          { label: 'Energy', before: '4/10', after: '9/10', change: '+125%' },
          { label: 'Body fat', before: '28%', after: '21%', change: '-7%' },
          { label: 'Decision clarity', before: 'OK', after: 'Sharp', change: '↑↑' }
        ],
        duration: '16 weeks'
      }
    ],
    stats: [
      { value: '94%', label: 'Continue after pilot' },
      { value: '+2h', label: 'Focus/day average' },
      { value: '4', label: 'Weeks to results' }
    ]
  },
  fr: {
    tag: 'Résultats réels',
    title: 'Transformations mesurables',
    subtitle: 'Études de cas anonymisées de vrais clients',
    cases: [
      {
        name: 'Radu M.',
        role: 'Fondateur, Startup Tech',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        quote: 'J\'ai clôturé un tour de €200K 3 mois après avoir commencé le programme. Coïncidence? Je ne pense pas.',
        metrics: [
          { label: 'Énergie', before: '5/10', after: '8/10', change: '+60%' },
          { label: 'Focus quotidien', before: '4h', after: '7h', change: '+75%' },
          { label: 'Poids', before: '92kg', after: '84kg', change: '-8kg' }
        ],
        duration: '12 semaines'
      },
      {
        name: 'Maria D.',
        role: 'Directrice Générale, Multinationale',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
        quote: 'Première fois en 10 ans que je me sens énergique à 18h. Mes enfants ont remarqué la différence.',
        metrics: [
          { label: 'Sommeil', before: '5h', after: '7h', change: '+40%' },
          { label: 'Stress', before: '9/10', after: '5/10', change: '-44%' },
          { label: 'Productivité', before: 'moyenne', after: 'excellente', change: '↑' }
        ],
        duration: '8 semaines'
      },
      {
        name: 'Alexandru P.',
        role: 'CFO, Immobilier',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        quote: 'Meilleur ROI que j\'ai fait cette année. Et j\'ai fait beaucoup d\'investissements.',
        metrics: [
          { label: 'Énergie', before: '4/10', after: '9/10', change: '+125%' },
          { label: 'Masse grasse', before: '28%', after: '21%', change: '-7%' },
          { label: 'Clarté décisions', before: 'OK', after: 'Sharp', change: '↑↑' }
        ],
        duration: '16 semaines'
      }
    ],
    stats: [
      { value: '94%', label: 'Continuent après pilote' },
      { value: '+2h', label: 'Focus/jour en moyenne' },
      { value: '4', label: 'Semaines pour résultats' }
    ]
  }
};

export default function CaseStudies({ lang }) {
  const t = content[lang] || content.en;

  return (
    <section id="results" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-teal-400 font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            {t.tag}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 mb-16"
        >
          {t.stats.map((stat, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-3xl md:text-4xl font-black text-teal-400">{stat.value}</div>
              <div className="text-sm text-white/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Case study cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {t.cases.map((caseStudy, i) => (
            <motion.div
              key={caseStudy.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
            >
              {/* Profile */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={caseStudy.image}
                  alt={caseStudy.name}
                  loading="lazy"
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-teal-500/30"
                />
                <div>
                  <h3 className="font-bold text-white">{caseStudy.name}</h3>
                  <p className="text-sm text-white/50">{caseStudy.role}</p>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-white/80 italic mb-6 text-sm leading-relaxed">
                "{caseStudy.quote}"
              </blockquote>

              {/* Metrics */}
              <div className="space-y-3 mb-4">
                {caseStudy.metrics.map((metric, j) => (
                  <div key={j} className="flex items-center justify-between text-sm">
                    <span className="text-white/50">{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white/40 line-through">{metric.before}</span>
                      <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                      <span className="text-white font-semibold">{metric.after}</span>
                      <span className="text-emerald-400 text-xs font-bold">{metric.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Duration badge */}
              <div className="inline-flex px-3 py-1 bg-teal-500/10 rounded-full text-teal-400 text-xs font-medium">
                {caseStudy.duration}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}