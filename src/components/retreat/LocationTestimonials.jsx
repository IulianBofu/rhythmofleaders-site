import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = {
  chamonix: {
    ro: [
      {
        name: 'Andrei P.',
        role: 'CEO, Tech Startup',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        text: 'M-am întors cu mai multă claritate decât după orice conferință de business. Combinația de natură, mișcare și coaching mi-a resetat complet perspectiva.',
        rating: 5
      },
      {
        name: 'Maria D.',
        role: 'Marketing Director',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
        text: 'Hiking-urile zilnice m-au forțat să-mi eliberez mintea de to-do lists. Am avut breakthrough-uri în probleme pe care le tot amânam de luni.',
        rating: 5
      },
      {
        name: 'Radu M.',
        role: 'Business Consultant',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        text: 'Prețul pare mare până înțelegi valoarea. Am implementat 2 idei strategice majore care au generat ROI de 10x față de investiție în primele 3 luni.',
        rating: 5
      }
    ],
    en: [
      {
        name: 'Andrei P.',
        role: 'CEO, Tech Startup',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        text: 'I came back with more clarity than after any business conference. The combination of nature, movement and coaching completely reset my perspective.',
        rating: 5
      },
      {
        name: 'Maria D.',
        role: 'Marketing Director',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
        text: 'Daily hikes forced me to clear my mind from to-do lists. I had breakthroughs on issues I\'d been postponing for months.',
        rating: 5
      },
      {
        name: 'Radu M.',
        role: 'Business Consultant',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        text: 'The price seems high until you understand the value. I implemented 2 major strategic ideas that generated 10x ROI on the investment in the first 3 months.',
        rating: 5
      }
    ],
    fr: [
      {
        name: 'Andrei P.',
        role: 'CEO, Startup Tech',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        text: 'Je suis revenu avec plus de clarté qu\'après n\'importe quelle conférence business. La combinaison nature, mouvement et coaching a complètement réinitialisé ma perspective.',
        rating: 5
      },
      {
        name: 'Maria D.',
        role: 'Directrice Marketing',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
        text: 'Les randonnées quotidiennes m\'ont forcé à libérer mon esprit des to-do lists. J\'ai eu des percées sur des problèmes que je repoussais depuis des mois.',
        rating: 5
      },
      {
        name: 'Radu M.',
        role: 'Consultant Business',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        text: 'Le prix semble élevé jusqu\'à ce que vous compreniez la valeur. J\'ai mis en œuvre 2 idées stratégiques majeures qui ont généré un ROI de 10x sur l\'investissement dans les 3 premiers mois.',
        rating: 5
      }
    ]
  },
  corbu: {
    ro: [
      {
        name: 'Alexandra V.',
        role: 'Founder, E-commerce',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        text: 'Combinația de mare și exerciții de respirație mi-au dat energia de care aveam nevoie. M-am întors la business cu o energie pe care nu o simțeam de ani.',
        rating: 5
      },
      {
        name: 'George T.',
        role: 'CFO, Real Estate',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        text: 'Locația relaxantă + coaching aplicat = formula perfectă. Am creat strategia financiară pentru următorii 2 ani în cele 5 zile petrecute acolo.',
        rating: 5
      },
      {
        name: 'Diana S.',
        role: 'Operations Manager',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
        text: 'Grupul mic (8 persoane) a permis discuții profunde. Conexiunile făcute acolo mi-au deschis oportunități de business pe care nu le anticipam.',
        rating: 5
      }
    ],
    en: [
      {
        name: 'Alexandra V.',
        role: 'Founder, E-commerce',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        text: 'The combination of sea and breathing exercises gave me the energy I needed. I returned to business with energy I hadn\'t felt in years.',
        rating: 5
      },
      {
        name: 'George T.',
        role: 'CFO, Real Estate',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        text: 'Relaxing location + applied coaching = perfect formula. I created the financial strategy for the next 2 years in the 5 days spent there.',
        rating: 5
      },
      {
        name: 'Diana S.',
        role: 'Operations Manager',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
        text: 'Small group (8 people) allowed deep discussions. The connections made there opened business opportunities I didn\'t anticipate.',
        rating: 5
      }
    ],
    fr: [
      {
        name: 'Alexandra V.',
        role: 'Fondatrice, E-commerce',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        text: 'La combinaison de la mer et des exercices respiratoires m\'a donné l\'énergie dont j\'avais besoin. Je suis revenue au business avec une énergie que je n\'avais pas ressentie depuis des années.',
        rating: 5
      },
      {
        name: 'George T.',
        role: 'CFO, Immobilier',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        text: 'Lieu relaxant + coaching appliqué = formule parfaite. J\'ai créé la stratégie financière pour les 2 prochaines années en 5 jours passés là-bas.',
        rating: 5
      },
      {
        name: 'Diana S.',
        role: 'Operations Manager',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
        text: 'Petit groupe (8 personnes) a permis des discussions profondes. Les connexions faites là-bas m\'ont ouvert des opportunités business que je n\'anticipais pas.',
        rating: 5
      }
    ]
  }
};

export default function LocationTestimonials({ location, lang }) {
  const title = {
    ro: 'Ce spun participanții',
    en: 'What participants say',
    fr: 'Ce que disent les participants'
  };

  const locationData = testimonials[location] || testimonials.chamonix;
  const currentTestimonials = locationData[lang] || locationData.ro;

  return (
    <div className="py-16">
      <h3 className="text-3xl font-black text-slate-900 text-center mb-12">{title[lang]}</h3>
      
      <div className="grid md:grid-cols-3 gap-8">
        {currentTestimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100"
          >
            <div className="flex items-center gap-4 mb-6">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-slate-900">{testimonial.name}</p>
                <p className="text-sm text-slate-600">{testimonial.role}</p>
              </div>
            </div>

            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <Quote className="w-8 h-8 text-teal-200 mb-3" />
            <p className="text-slate-700 leading-relaxed italic">{testimonial.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}