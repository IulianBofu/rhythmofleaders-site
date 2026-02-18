import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react';

const content = {
  ro: {
    tag: 'Locații',
    title: 'Unde antrenăm',
    subtitle: 'Flexibilitate totală – în Europa și online',
    locations: [
      { name: 'București & România', desc: 'Sesiuni în persoană în Herăstrău, Băneasa, Pipera, Centru' },
      { name: 'Europa', desc: 'Sesiuni în persoană în orașele majore europene' },
      { name: 'Online Global', desc: 'Coaching video live pentru executivi în călătorie' },
      { name: 'Hibrid', desc: 'Combinație personalizată online + în persoană' }
    ],
    hours: 'Program flexibil: 6:00 - 21:00 (GMT+2)',
    contact: 'Programări: contact@rhythmofleaders.ro'
  },
  en: {
    tag: 'Locations',
    title: 'Where we train',
    subtitle: 'Total flexibility – across Europe and online',
    locations: [
      { name: 'Bucharest & Romania', desc: 'In-person sessions in Herăstrău, Băneasa, Pipera, City Center' },
      { name: 'Europe', desc: 'In-person sessions in major European cities' },
      { name: 'Global Online', desc: 'Live video coaching for traveling executives' },
      { name: 'Hybrid', desc: 'Customized blend of online + in-person' }
    ],
    hours: 'Flexible hours: 6:00 AM - 9:00 PM (GMT+2)',
    contact: 'Bookings: contact@rhythmofleaders.ro'
  },
  fr: {
    tag: 'Emplacements',
    title: 'Où nous entraînons',
    subtitle: 'Flexibilité totale – en Europe et en ligne',
    locations: [
      { name: 'Bucarest & Roumanie', desc: 'Sessions en personne à Herăstrău, Băneasa, Pipera, Centre-ville' },
      { name: 'Europe', desc: 'Sessions en personne dans les grandes villes européennes' },
      { name: 'En Ligne Global', desc: 'Coaching vidéo en direct pour dirigeants en déplacement' },
      { name: 'Hybride', desc: 'Mélange personnalisé en ligne + en personne' }
    ],
    hours: 'Horaires flexibles: 6h00 - 21h00 (GMT+2)',
    contact: 'Réservations: contact@rhythmofleaders.ro'
  }
};

export default function LocalSEO({ lang }) {
  const t = content[lang] || content.en;

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-teal-600 font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            <MapPin className="w-4 h-4" />
            {t.tag}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            {t.title}
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-lg h-[300px] md:h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d91158.10700028836!2d26.0026259!3d44.4379878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f93abf3cad4f%3A0xac0632e37c9ca628!2sBucharest%2C%20Romania!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="București & Ilfov"
            />
          </motion.div>

          {/* Locations list */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4 mb-8">
              {t.locations.map((loc, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <Navigation className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{loc.name}</h3>
                    <p className="text-sm text-slate-500">{loc.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-slate-600">
                <Clock className="w-4 h-4 text-teal-600" />
                {t.hours}
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Phone className="w-4 h-4 text-teal-600" />
                {t.contact}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}