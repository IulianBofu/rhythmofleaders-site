import React from 'react';
import { motion } from 'framer-motion';
import { Crosshair, Brain, MapPin, Check, X, Briefcase, Heart, Dumbbell } from 'lucide-react';
import PerformanceInsights from './PerformanceInsights';

const content = {
  ro: {
    tag: 'Despre mine',
    title: 'De la burnout la performanță de vârf',
    story: 'Am trecut prin ce treci tu acum. Zile de 14 ore, meeting după meeting, și energia la pământ după prânz. Am încercat tot: sălile premium, aplicațiile, diete la modă. Nimic nu funcționa pentru ritmul meu de viață. Așa că am construit propriul sistem – optimizat pentru lideri ocupați. Acum ajut executivi și fondatori din Europa și online să obțină aceleași rezultate, fără să adauge ore în programul lor.',
    strava: 'Urmărește-mi progresul live pe Strava',
    comparison: {
      title: 'Ce ne diferențiază',
      items: [
        { feature: 'Specializare executivi', us: true, generic: false, gym: false, icon: Briefcase },
        { feature: 'Running + forță + nutriție', us: true, generic: false, gym: false, icon: Dumbbell },
        { feature: 'Limbaj de business & ROI', us: true, generic: false, gym: false, icon: Crosshair },
        { feature: 'Locații flexibile București', us: true, generic: true, gym: false, icon: MapPin },
        { feature: 'Adaptat agendei tale', us: true, generic: true, gym: false, icon: Heart },
        { feature: 'Rezultate în 4 săptămâni', us: true, generic: false, gym: false, icon: Check }
      ]
    },
    expertise: [
      { icon: Crosshair, title: 'Hyper-nișat', desc: 'Doar executivi și fondatori – înțeleg provocările tale unice' },
      { icon: Brain, title: 'Abordare integrată', desc: 'Running, forță, nutriție și recovery – un sistem complet' },
      { icon: MapPin, title: 'Expert local', desc: 'Herăstrău, Băneasa, Pipera – cunosc cele mai bune trasee' }
    ],
    labels: {
      us: 'Rhythm of Leaders',
      generic: 'Trainer generic',
      gym: 'Gym premium'
    }
  },
  en: {
    tag: 'About me',
    title: 'From burnout to peak performance',
    story: 'I went through what you\'re going through now. 14-hour days, meeting after meeting, and energy crashing after lunch. I tried everything: premium gyms, apps, trendy diets. Nothing worked for my pace of life. So I built my own system – optimized for busy leaders. Now I help executives and founders across Europe and online get the same results, without adding hours to their schedule.',
    strava: 'Follow my live progress on Strava',
    comparison: {
      title: 'What sets us apart',
      items: [
        { feature: 'Executive specialization', us: true, generic: false, gym: false, icon: Briefcase },
        { feature: 'Running + strength + nutrition', us: true, generic: false, gym: false, icon: Dumbbell },
        { feature: 'Business language & ROI', us: true, generic: false, gym: false, icon: Crosshair },
        { feature: 'Flexible Bucharest locations', us: true, generic: true, gym: false, icon: MapPin },
        { feature: 'Adapted to your schedule', us: true, generic: true, gym: false, icon: Heart },
        { feature: 'Results in 4 weeks', us: true, generic: false, gym: false, icon: Check }
      ]
    },
    expertise: [
      { icon: Crosshair, title: 'Hyper-niche', desc: 'Only executives and founders – I understand your unique challenges' },
      { icon: Brain, title: 'Integrated approach', desc: 'Running, strength, nutrition and recovery – a complete system' },
      { icon: MapPin, title: 'Local expert', desc: 'Herăstrău, Băneasa, Pipera – I know the best routes' }
    ],
    labels: {
      us: 'Rhythm of Leaders',
      generic: 'Generic trainer',
      gym: 'Premium gym'
    }
  },
  fr: {
    tag: 'À propos de moi',
    title: 'Du burnout à la performance maximale',
    story: 'J\'ai vécu ce que vous vivez maintenant. Journées de 14 heures, réunion après réunion, et l\'énergie au plus bas après le déjeuner. J\'ai tout essayé: salles premium, applications, régimes à la mode. Rien ne fonctionnait pour mon rythme de vie. J\'ai donc construit mon propre système – optimisé pour les dirigeants occupés. Maintenant j\'aide les dirigeants et fondateurs en Europe et en ligne à obtenir les mêmes résultats, sans ajouter d\'heures à leur emploi du temps.',
    strava: 'Suivez ma progression en direct sur Strava',
    comparison: {
      title: 'Ce qui nous différencie',
      items: [
        { feature: 'Spécialisation dirigeants', us: true, generic: false, gym: false, icon: Briefcase },
        { feature: 'Course + force + nutrition', us: true, generic: false, gym: false, icon: Dumbbell },
        { feature: 'Langage business & ROI', us: true, generic: false, gym: false, icon: Crosshair },
        { feature: 'Emplacements flexibles Bucarest', us: true, generic: true, gym: false, icon: MapPin },
        { feature: 'Adapté à votre agenda', us: true, generic: true, gym: false, icon: Heart },
        { feature: 'Résultats en 4 semaines', us: true, generic: false, gym: false, icon: Check }
      ]
    },
    expertise: [
      { icon: Crosshair, title: 'Hyper-niche', desc: 'Seulement dirigeants et fondateurs – je comprends vos défis uniques' },
      { icon: Brain, title: 'Approche intégrée', desc: 'Course, force, nutrition et récupération – un système complet' },
      { icon: MapPin, title: 'Expert local', desc: 'Herăstrău, Băneasa, Pipera – je connais les meilleurs parcours' }
    ],
    labels: {
      us: 'Rhythm of Leaders',
      generic: 'Coach générique',
      gym: 'Salle premium'
    }
  }
};

export default function AboutSection({ lang }) {
  const t = content[lang] || content.en;

  return (
    <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <span className="inline-block text-teal-600 font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            {t.tag}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            {t.title}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            {t.story}
          </p>
          
          {/* Strava Feed */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block"
          >
            <a
              href="https://www.strava.com/athletes/83578564"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"/>
              </svg>
              {t.strava}
            </a>
          </motion.div>
        </motion.div>

        {/* Expertise cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {t.expertise.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mb-16"
        >
          <div className="group relative px-8 py-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-blue-900">ISSA Certified</p>
                <p className="text-xs text-blue-700">Personal Trainer</p>
              </div>
            </div>
          </div>
          
          <a
            href="https://www.mcmillanrunning.com/find-your-coach/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 bg-gradient-to-br from-orange-50 to-red-100 rounded-2xl border-2 border-orange-200 shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-orange-900">McMillan Running</p>
                <p className="text-xs text-orange-700">Certified Coach</p>
              </div>
            </div>
          </a>

          <div className="group relative px-8 py-4 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-2xl border-2 border-emerald-200 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-900">ACSM Expertise</p>
                <p className="text-xs text-emerald-700">Exercise Science</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile-friendly Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-6 md:p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">{t.comparison.title}</h3>
          
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-4 px-4 text-left text-slate-500 font-medium"></th>
                  <th className="py-4 px-4 text-center text-teal-600 font-bold">{t.labels.us}</th>
                  <th className="py-4 px-4 text-center text-slate-400 font-medium">{t.labels.generic}</th>
                  <th className="py-4 px-4 text-center text-slate-400 font-medium">{t.labels.gym}</th>
                </tr>
              </thead>
              <tbody>
                {t.comparison.items.map((row, i) => (
                  <tr key={i} className="border-b border-slate-50">
                    <td className="py-4 px-4 text-slate-700 font-medium flex items-center gap-2">
                      <row.icon className="w-4 h-4 text-slate-400" />
                      {row.feature}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${row.us ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                        {row.us ? <Check className="w-5 h-5 text-emerald-600" /> : <X className="w-5 h-5 text-slate-400" />}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${row.generic ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                        {row.generic ? <Check className="w-5 h-5 text-emerald-600" /> : <X className="w-5 h-5 text-slate-400" />}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${row.gym ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                        {row.gym ? <Check className="w-5 h-5 text-emerald-600" /> : <X className="w-5 h-5 text-slate-400" />}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {t.comparison.items.map((row, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <row.icon className="w-5 h-5 text-teal-600" />
                  <span className="font-semibold text-slate-900">{row.feature}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className={`p-2 rounded-lg ${row.us ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-400'}`}>
                    <div className="font-bold mb-1">{row.us ? '✓' : '✗'}</div>
                    <div className="truncate">Rhythm</div>
                  </div>
                  <div className={`p-2 rounded-lg ${row.generic ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-400'}`}>
                    <div className="font-bold mb-1">{row.generic ? '✓' : '✗'}</div>
                    <div className="truncate">Generic</div>
                  </div>
                  <div className={`p-2 rounded-lg ${row.gym ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-400'}`}>
                    <div className="font-bold mb-1">{row.gym ? '✓' : '✗'}</div>
                    <div className="truncate">Gym</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Performance Insights Section */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <PerformanceInsights lang={lang} />
      </div>
    </section>
  );
}