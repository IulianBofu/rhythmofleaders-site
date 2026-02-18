import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const content = {
  ro: {
    tag: 'Întrebări frecvente',
    title: 'Răspunsuri la întrebările tale',
    faqs: [
      {
        q: 'Nu am timp nici pentru mine. Cum o să fac și sport?',
        a: 'Exact pentru asta am construit programul. Sesiunile sunt de 30-45 minute și se integrează în agenda ta existentă. Fac antrenamente la 6 dimineața, în pauza de prânz, sau după ultima ședință. 3 sesiuni pe săptămână sunt suficiente pentru rezultate vizibile în 4 săptămâni.'
      },
      {
        q: 'Pare scump. Cum justific investiția?',
        a: 'Pilotul de €350 înseamnă €12/zi pentru 4 săptămâni. Dacă câștigi doar 1 oră extra de productivitate pe zi, ROI-ul e evident. Clienții mei raportează în medie +2 ore de focus/zi. Asta e echivalentul unui angajat part-time – la o fracțiune din cost.'
      },
      {
        q: 'Am mai încercat să fac sport și am renunțat. De ce ar fi diferit?',
        a: 'Pentru că eu nu sunt un trainer care îți dă un plan și dispare. Sunt un partener de accountability care înțelege că tu ai priorități mai mari decât fitness-ul. Adaptez totul la viața ta reală, nu invers. Plus, garanția de refund elimină riscul: dacă nu vezi rezultate în pilot, primești banii înapoi.'
      },
      {
        q: 'Ce se întâmplă dacă am travel sau zile nebune?',
        a: 'Le planificăm împreună. Am programe pentru hotel (cu zero echipament), antrenamente de 15 minute pentru zile de criză, și flexibilitate totală la reprogramări. Clienții mei travel 50%+ din timp și tot obțin rezultate.'
      },
      {
        q: 'Lucrez și cu începători?',
        a: 'Absolut. Mulți clienți nu au făcut sport de ani de zile. Începem de unde ești tu acum, nu de unde "ar trebui" să fii. Progresul e personalizat și adaptat nivelului tău actual.'
      },
      {
        q: 'Ce include exact pilotul de 4 săptămâni?',
        a: 'Evaluare completă (fitness, energie, lifestyle), plan personalizat, 8 sesiuni de antrenament 1:1, suport WhatsApp nelimitat, și garanție 100% satisfacție. E tot ce ai nevoie ca să vezi dacă abordarea mea funcționează pentru tine.'
      }
    ]
  },
  en: {
    tag: 'FAQ',
    title: 'Answers to your questions',
    faqs: [
      {
        q: 'I don\'t have time for myself. How will I exercise?',
        a: 'That\'s exactly why I built this program. Sessions are 30-45 minutes and integrate into your existing schedule. I do workouts at 6am, during lunch, or after your last meeting. 3 sessions per week are enough for visible results in 4 weeks.'
      },
      {
        q: 'It seems expensive. How do I justify the investment?',
        a: 'The €350 pilot is €12/day for 4 weeks. If you gain just 1 extra hour of productivity per day, the ROI is obvious. My clients report an average of +2 hours of focus/day. That\'s equivalent to a part-time employee – at a fraction of the cost.'
      },
      {
        q: 'I\'ve tried exercise before and quit. Why would this be different?',
        a: 'Because I\'m not a trainer who gives you a plan and disappears. I\'m an accountability partner who understands you have bigger priorities than fitness. I adapt everything to your real life, not the other way around. Plus, the money-back guarantee eliminates risk.'
      },
      {
        q: 'What if I travel or have crazy days?',
        a: 'We plan together. I have hotel programs (zero equipment), 15-minute crisis-day workouts, and total rescheduling flexibility. My clients travel 50%+ of the time and still get results.'
      },
      {
        q: 'Do you work with beginners?',
        a: 'Absolutely. Many clients haven\'t exercised in years. We start from where you are now, not where you "should" be. Progress is personalized and adapted to your current level.'
      },
      {
        q: 'What exactly does the 4-week pilot include?',
        a: 'Complete assessment (fitness, energy, lifestyle), personalized plan, 8 1:1 training sessions, unlimited WhatsApp support, and 100% satisfaction guarantee. It\'s everything you need to see if my approach works for you.'
      }
    ]
  },
  fr: {
    tag: 'FAQ',
    title: 'Réponses à vos questions',
    faqs: [
      {
        q: 'Je n\'ai pas de temps pour moi. Comment vais-je faire du sport?',
        a: 'C\'est exactement pourquoi j\'ai construit ce programme. Les sessions durent 30-45 minutes et s\'intègrent dans votre emploi du temps existant. Je fais des entraînements à 6h du matin, pendant la pause déjeuner, ou après la dernière réunion. 3 sessions par semaine suffisent pour des résultats visibles en 4 semaines.'
      },
      {
        q: 'Ça semble cher. Comment justifier l\'investissement?',
        a: 'Le pilote à €350 représente €12/jour pendant 4 semaines. Si vous gagnez juste 1 heure de productivité supplémentaire par jour, le ROI est évident. Mes clients rapportent en moyenne +2 heures de focus/jour. C\'est l\'équivalent d\'un employé à temps partiel – à une fraction du coût.'
      },
      {
        q: 'J\'ai déjà essayé le sport et j\'ai abandonné. Pourquoi ce serait différent?',
        a: 'Parce que je ne suis pas un coach qui vous donne un plan et disparaît. Je suis un partenaire de responsabilité qui comprend que vous avez des priorités plus importantes que le fitness. J\'adapte tout à votre vraie vie, pas l\'inverse. De plus, la garantie satisfait ou remboursé élimine le risque.'
      },
      {
        q: 'Et si je voyage ou ai des journées folles?',
        a: 'Nous planifions ensemble. J\'ai des programmes hôtel (zéro équipement), des entraînements de 15 minutes pour jours de crise, et flexibilité totale pour reprogrammer. Mes clients voyagent 50%+ du temps et obtiennent quand même des résultats.'
      },
      {
        q: 'Travaillez-vous avec des débutants?',
        a: 'Absolument. Beaucoup de clients n\'ont pas fait de sport depuis des années. Nous commençons d\'où vous êtes maintenant, pas d\'où vous "devriez" être. La progression est personnalisée et adaptée à votre niveau actuel.'
      },
      {
        q: 'Qu\'est-ce qui est exactement inclus dans le pilote de 4 semaines?',
        a: 'Évaluation complète (fitness, énergie, lifestyle), plan personnalisé, 8 sessions d\'entraînement 1:1, support WhatsApp illimité, et garantie satisfaction 100%. C\'est tout ce dont vous avez besoin pour voir si mon approche fonctionne pour vous.'
      }
    ]
  }
};

export default function FAQSection({ lang }) {
  const [openIndex, setOpenIndex] = useState(0);
  const t = content[lang] || content.en;

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-teal-600 font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            <HelpCircle className="w-4 h-4" />
            {t.tag}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">
            {t.title}
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {t.faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-slate-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${
                    openIndex === i ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}