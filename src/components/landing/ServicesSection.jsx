import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Star, Repeat, Check, ArrowRight } from 'lucide-react';

const content = {
  ro: {
    tag: 'Servicii',
    title: 'Ce ofer',
    subtitle: 'Pachete flexibile create pentru agenda și obiectivele tale specifice.',
    services: [
      {
        icon: Shield,
        name: 'Executive Edge Pilot',
        price: '€350–500',
        duration: '4 săptămâni',
        badge: 'Garanție Refund',
        description: 'Testează metodologia mea fără risc. Dacă nu vezi rezultate, primești banii înapoi.',
        features: [
          'Evaluare completă fitness & energie',
          'Plan personalizat de 4 săptămâni',
          '8 sesiuni de antrenament',
          'Suport WhatsApp nelimitat',
          'Garanție 100% satisfacție'
        ]
      },
      {
        icon: Star,
        name: 'Program Performanță',
        price: '€1,000–1,500',
        duration: '12 săptămâni',
        badge: 'Cel mai popular',
        popular: true,
        description: 'Transformare completă. Energie, focus și reziliență la nivel de vârf.',
        features: [
          'Tot ce include Pilot +',
          'Analiză aprofundată lifestyle',
          '24+ sesiuni de antrenament',
          'Optimizare somn & nutriție',
          'Check-in săptămânal video',
          'Acces prioritar la disponibilități'
        ]
      },
      {
        icon: Repeat,
        name: 'Retainer Lunar',
        price: '€250–450',
        duration: 'lunar',
        badge: 'Mentenanță',
        description: 'Pentru cei care au terminat programul și vor să mențină ritmul.',
        features: [
          '4-6 sesiuni/lună',
          'Ajustări continue ale planului',
          'Suport continuu WhatsApp',
          'Flexibilitate maximă programare',
          'Tarif preferențial'
        ]
      }
    ],
    cta: 'Începe acum'
  },
  en: {
    tag: 'Services',
    title: 'What I offer',
    subtitle: 'Flexible packages created for your specific schedule and goals.',
    services: [
      {
        icon: Shield,
        name: 'Executive Edge Pilot',
        price: '€350–500',
        duration: '4 weeks',
        badge: 'Money-back Guarantee',
        description: 'Test my methodology risk-free. If you don\'t see results, you get your money back.',
        features: [
          'Complete fitness & energy assessment',
          'Personalized 4-week plan',
          '8 training sessions',
          'Unlimited WhatsApp support',
          '100% satisfaction guarantee'
        ]
      },
      {
        icon: Star,
        name: 'Performance Program',
        price: '€1,000–1,500',
        duration: '12 weeks',
        badge: 'Most popular',
        popular: true,
        description: 'Complete transformation. Peak-level energy, focus and resilience.',
        features: [
          'Everything in Pilot +',
          'In-depth lifestyle analysis',
          '24+ training sessions',
          'Sleep & nutrition optimization',
          'Weekly video check-in',
          'Priority scheduling access'
        ]
      },
      {
        icon: Repeat,
        name: 'Monthly Retainer',
        price: '€250–450',
        duration: 'monthly',
        badge: 'Maintenance',
        description: 'For those who completed the program and want to maintain momentum.',
        features: [
          '4-6 sessions/month',
          'Continuous plan adjustments',
          'Ongoing WhatsApp support',
          'Maximum scheduling flexibility',
          'Preferential rate'
        ]
      }
    ],
    cta: 'Get started'
  }
};

const frContent = {
  tag: 'Services',
  title: 'Ce que j\'offre',
  subtitle: 'Forfaits flexibles créés pour votre agenda et vos objectifs spécifiques.',
  services: [
    {
      icon: Shield,
      name: 'Executive Edge Pilot',
      price: '€350–500',
      duration: '4 semaines',
      badge: 'Garantie Remboursement',
      description: 'Testez ma méthodologie sans risque. Pas de résultats = remboursement.',
      features: [
        'Évaluation complète fitness & énergie',
        'Plan personnalisé de 4 semaines',
        '8 séances d\'entraînement',
        'Support WhatsApp illimité',
        'Garantie satisfaction 100%'
      ]
    },
    {
      icon: Star,
      name: 'Programme Performance',
      price: '€1,000–1,500',
      duration: '12 semaines',
      badge: 'Le plus populaire',
      popular: true,
      description: 'Transformation complète. Énergie, focus et résilience au sommet.',
      features: [
        'Tout ce qui est inclus dans Pilot +',
        'Analyse approfondie du style de vie',
        '24+ séances d\'entraînement',
        'Optimisation sommeil & nutrition',
        'Check-in vidéo hebdomadaire',
        'Accès prioritaire aux disponibilités'
      ]
    },
    {
      icon: Repeat,
      name: 'Abonnement Mensuel',
      price: '€250–450',
      duration: 'mensuel',
      badge: 'Maintenance',
      description: 'Pour ceux qui ont terminé le programme et veulent maintenir le rythme.',
      features: [
        '4-6 séances/mois',
        'Ajustements continus du plan',
        'Support WhatsApp continu',
        'Flexibilité maximale de planification',
        'Tarif préférentiel'
      ]
    }
  ],
  cta: 'Commencer maintenant'
};

export default function ServicesSection({ lang }) {
  const t = lang === 'fr' ? frContent : content[lang] || content.en;

  const scrollToSchedule = () => {
    document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-32 bg-slate-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-teal-400 font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            {t.tag}
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6">
            {t.title}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {t.services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative group ${service.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
            >
              <div className={`h-full rounded-3xl p-8 transition-all duration-500 ${
                service.popular 
                  ? 'bg-gradient-to-br from-teal-500 to-emerald-600 shadow-2xl shadow-teal-500/20' 
                  : 'bg-slate-900/50 border border-slate-800 hover:border-slate-700'
              }`}>
                {/* Badge */}
                <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold mb-6 ${
                  service.popular 
                    ? 'bg-white/20 text-white' 
                    : 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                }`}>
                  {service.badge}
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 ${
                  service.popular ? 'bg-white/20' : 'bg-slate-800'
                }`}>
                  <service.icon className={`w-6 h-6 ${service.popular ? 'text-white' : 'text-teal-400'}`} />
                </div>

                {/* Title */}
                <h3 className={`text-xl font-bold mb-2 ${service.popular ? 'text-white' : 'text-white'}`}>
                  {service.name}
                </h3>

                {/* Price */}
                <div className="mb-4">
                  <span className={`text-4xl font-black ${service.popular ? 'text-white' : 'text-white'}`}>
                    {service.price}
                  </span>
                  <span className={`text-sm ml-2 ${service.popular ? 'text-white/70' : 'text-slate-500'}`}>
                    / {service.duration}
                  </span>
                </div>

                {/* Description */}
                <p className={`mb-8 ${service.popular ? 'text-white/80' : 'text-slate-400'}`}>
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        service.popular ? 'text-emerald-200' : 'text-teal-500'
                      }`} />
                      <span className={`text-sm ${service.popular ? 'text-white/90' : 'text-slate-300'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={scrollToSchedule}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
                    service.popular 
                      ? 'bg-white text-teal-700 hover:bg-slate-50' 
                      : 'bg-teal-500/10 text-teal-400 border border-teal-500/30 hover:bg-teal-500/20'
                  }`}
                >
                  {t.cta}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}