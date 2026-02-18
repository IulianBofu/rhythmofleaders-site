import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Building2, Users, ArrowRight } from 'lucide-react';

const content = {
  ro: {
    tag: 'Pentru cine',
    title: 'Te regăsești aici?',
    subtitle: 'Cele 3 tipuri de lideri cu care lucrez cel mai bine',
    avatars: [
      {
        icon: Rocket,
        title: 'Fondator în creștere',
        pain: '"Am energie pentru business, dar corp lăsat de izbeliște"',
        challenges: ['Zile imprevizibile', 'Mese la ore aiurea', 'Stres constant de funding'],
        solution: 'Sesiuni flexibile care se adaptează haosului startup-ului tău',
        result: 'Fără crash-uri înainte de call-urile cu investitorii'
      },
      {
        icon: Building2,
        title: 'Corporate High-Flyer',
        pain: '"Știu că ar trebui să fac sport, dar nu am timp"',
        challenges: ['Calendar blocat 8-19', 'Travel frecvent', 'Presiune de performanță'],
        solution: 'Antrenamente de 30 min între meeting-uri, oriunde te afli',
        result: 'Mai multă energie pentru deciziile importante'
      },
      {
        icon: Users,
        title: 'Părinte-Executiv',
        pain: '"Prioritizez familia și munca, eu sunt pe ultimul loc"',
        challenges: ['Dimineți cu copiii', 'Seri cu familia', 'Zero timp personal'],
        solution: 'Rutine eficiente care nu fură timp de la ce contează',
        result: 'Model de sănătate pentru copii + energie pentru toți'
      }
    ],
    cta: 'Asta sunt eu'
  },
  en: {
    tag: 'Who it\'s for',
    title: 'Do you see yourself here?',
    subtitle: 'The 3 types of leaders I work best with',
    avatars: [
      {
        icon: Rocket,
        title: 'Growth-Driven Founder',
        pain: '"I have energy for business, but my body is neglected"',
        challenges: ['Unpredictable days', 'Meals at random hours', 'Constant funding stress'],
        solution: 'Flexible sessions that adapt to your startup chaos',
        result: 'No crashes before investor calls'
      },
      {
        icon: Building2,
        title: 'Corporate High-Flyer',
        pain: '"I know I should exercise, but I don\'t have time"',
        challenges: ['Calendar blocked 8-7', 'Frequent travel', 'Performance pressure'],
        solution: '30-min workouts between meetings, wherever you are',
        result: 'More energy for important decisions'
      },
      {
        icon: Users,
        title: 'Parent-Executive',
        pain: '"I prioritize family and work, I come last"',
        challenges: ['Mornings with kids', 'Evenings with family', 'Zero personal time'],
        solution: 'Efficient routines that don\'t steal time from what matters',
        result: 'Health role model for kids + energy for everyone'
      }
    ],
    cta: 'That\'s me'
  },
  fr: {
    tag: 'Pour qui',
    title: 'Vous vous reconnaissez ici?',
    subtitle: 'Les 3 types de leaders avec qui je travaille le mieux',
    avatars: [
      {
        icon: Rocket,
        title: 'Fondateur en croissance',
        pain: '"J\'ai de l\'énergie pour le business, mais mon corps est négligé"',
        challenges: ['Journées imprévisibles', 'Repas à heures irrégulières', 'Stress constant de financement'],
        solution: 'Sessions flexibles qui s\'adaptent au chaos de votre startup',
        result: 'Pas de crash avant les appels avec investisseurs'
      },
      {
        icon: Building2,
        title: 'Cadre Corporate',
        pain: '"Je sais que je devrais faire du sport, mais je n\'ai pas le temps"',
        challenges: ['Agenda bloqué 8h-19h', 'Voyages fréquents', 'Pression de performance'],
        solution: 'Entraînements de 30 min entre réunions, où que vous soyez',
        result: 'Plus d\'énergie pour les décisions importantes'
      },
      {
        icon: Users,
        title: 'Parent-Dirigeant',
        pain: '"Je priorise famille et travail, je passe en dernier"',
        challenges: ['Matins avec les enfants', 'Soirs en famille', 'Zéro temps personnel'],
        solution: 'Routines efficaces qui ne volent pas de temps à ce qui compte',
        result: 'Modèle de santé pour les enfants + énergie pour tous'
      }
    ],
    cta: 'C\'est moi'
  }
};

export default function ClientAvatars({ lang }) {
  const t = content[lang] || content.en;

  const scrollToSchedule = () => {
    document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-teal-600 font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            {t.tag}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Avatar Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {t.avatars.map((avatar, i) => (
            <motion.div
              key={avatar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:border-teal-200 hover:shadow-xl transition-all">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center mb-6 shadow-lg shadow-teal-500/20">
                  <avatar.icon className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-3">{avatar.title}</h3>

                {/* Pain quote */}
                <p className="text-slate-600 italic mb-6 text-sm">{avatar.pain}</p>

                {/* Challenges */}
                <div className="mb-6">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    {lang === 'ro' ? 'Provocări:' : lang === 'fr' ? 'Défis:' : 'Challenges:'}
                  </p>
                  <ul className="space-y-1">
                    {avatar.challenges.map((c, j) => (
                      <li key={j} className="text-sm text-slate-500 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solution */}
                <div className="p-4 bg-teal-50 rounded-xl mb-4">
                  <p className="text-sm text-teal-700">{avatar.solution}</p>
                </div>

                {/* Result */}
                <p className="text-sm font-semibold text-emerald-600">→ {avatar.result}</p>

                {/* CTA */}
                <button
                  onClick={scrollToSchedule}
                  className="mt-6 w-full py-3 border border-teal-200 rounded-xl text-teal-600 font-semibold text-sm hover:bg-teal-50 transition-colors flex items-center justify-center gap-2 group/btn"
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