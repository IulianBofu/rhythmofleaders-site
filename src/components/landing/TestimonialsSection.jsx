import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const content = {
  ro: {
    tag: 'Testimoniale',
    title: 'Ce spun clienții',
    subtitle: 'Lideri care au ales să investească în cea mai importantă resursă – ei înșiși.',
    testimonials: [
      {
        name: 'Radu M.',
        role: 'Founder & CEO, Tech Startup',
        quote: 'În primele 3 săptămâni am observat o schimbare radicală în nivelul meu de energie. Acum iau decizii mai clare și nu mai am acel "crash" de după-amiază. ROI-ul e evident.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      {
        name: 'Maria D.',
        role: 'General Manager, Multinațională',
        quote: 'Sceptică la început – nu aveam timp nici pentru mine. Dar antrenamentele de 30 de minute s-au integrat perfect în rutina mea. Sunt mai rezistentă la stres și dorm mult mai bine.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face'
      },
      {
        name: 'Alexandru P.',
        role: 'CFO, Real Estate',
        quote: 'Am încercat tot: gym-uri premium, aplicații, personal traineri. Diferența aici e că înțelege viața unui executiv. Flexibilitate totală și rezultate măsurabile.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }
    ]
  },
  en: {
    tag: 'Testimonials',
    title: 'What clients say',
    subtitle: 'Leaders who chose to invest in their most important resource – themselves.',
    testimonials: [
      {
        name: 'Radu M.',
        role: 'Founder & CEO, Tech Startup',
        quote: 'In the first 3 weeks I noticed a radical change in my energy level. Now I make clearer decisions and no longer have that afternoon crash. The ROI is obvious.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      {
        name: 'Maria D.',
        role: 'General Manager, Multinational',
        quote: 'Skeptical at first – I didn\'t even have time for myself. But the 30-minute workouts fit perfectly into my routine. I\'m more stress-resistant and sleep much better.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face'
      },
      {
        name: 'Alexandru P.',
        role: 'CFO, Real Estate',
        quote: 'I\'ve tried everything: premium gyms, apps, personal trainers. The difference here is understanding an executive\'s life. Total flexibility and measurable results.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }
    ]
  },
  fr: {
    tag: 'Témoignages',
    title: 'Ce que disent les clients',
    subtitle: 'Des leaders qui ont choisi d\'investir dans leur ressource la plus importante – eux-mêmes.',
    testimonials: [
      {
        name: 'Radu M.',
        role: 'Fondateur & CEO, Startup Tech',
        quote: 'En 3 semaines j\'ai remarqué un changement radical dans mon niveau d\'énergie. Maintenant je prends des décisions plus claires et je n\'ai plus ce crash de l\'après-midi. Le ROI est évident.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      {
        name: 'Maria D.',
        role: 'Directrice Générale, Multinationale',
        quote: 'Sceptique au début – je n\'avais même pas de temps pour moi. Mais les entraînements de 30 minutes s\'intègrent parfaitement dans ma routine. Je suis plus résistante au stress et je dors beaucoup mieux.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face'
      },
      {
        name: 'Alexandru P.',
        role: 'CFO, Immobilier',
        quote: 'J\'ai tout essayé: salles premium, applications, entraîneurs personnels. La différence ici c\'est la compréhension de la vie d\'un dirigeant. Flexibilité totale et résultats mesurables.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }
    ]
  }
};

export default function TestimonialsSection({ lang }) {
  const t = content[lang] || content.en;

  return (
    <section id="testimonials" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-100/50 via-transparent to-transparent" />
      
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

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {t.testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 relative">
                {/* Quote icon */}
                <Quote className="absolute top-6 right-6 w-10 h-10 text-teal-100" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-slate-700 leading-relaxed mb-8 relative z-10">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover ring-4 ring-white shadow-lg"
                  />
                  <div>
                    <div className="font-bold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}