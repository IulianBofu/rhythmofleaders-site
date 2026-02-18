import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Timer, Coffee, BatteryCharging, CheckCircle, Loader2, Send } from 'lucide-react';
import { saveLead } from '@/api/airtableClient';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const content = {
  ro: {
    tag: 'Resursă gratuită',
    title: '5 Hack-uri de Energie pentru Agenda Încărcată',
    subtitle: 'Ghidul PDF care îți adaugă 2 ore de focus pe zi – folosit de 200+ executivi',
    benefits: [
      { icon: Timer, text: 'Rutina de 30 min care înlocuiește 2 ore la sală' },
      { icon: Coffee, text: 'Ce să comanzi la business lunch pentru energie constantă' },
      { icon: BatteryCharging, text: 'Cum să eviți crash-ul de 15:00 fără cafea extra' }
    ],
    placeholder: 'Email-ul tău de business',
    cta: 'Descarcă gratuit',
    privacy: 'Nu trimitem spam. Datele tale sunt în siguranță.',
    success: 'Verifică inbox-ul! Ghidul e pe drum 🚀',
    loading: 'Se trimite...'
  },
  en: {
    tag: 'Free resource',
    title: '5 Energy Hacks for the Packed Schedule',
    subtitle: 'The PDF guide that adds 2 hours of focus to your day – used by 200+ executives',
    benefits: [
      { icon: Timer, text: '30-min routine that replaces 2 hours at the gym' },
      { icon: Coffee, text: 'What to order at business lunch for constant energy' },
      { icon: BatteryCharging, text: 'How to avoid the 3PM crash without extra coffee' }
    ],
    placeholder: 'Your business email',
    cta: 'Download free',
    privacy: 'No spam. Your data is safe.',
    success: 'Check your inbox! Guide is on its way 🚀',
    loading: 'Sending...'
  },
  fr: {
    tag: 'Ressource gratuite',
    title: '5 Astuces Énergie pour l\'Agenda Chargé',
    subtitle: 'Le guide PDF qui ajoute 2 heures de focus à votre journée – utilisé par 200+ dirigeants',
    benefits: [
      { icon: Timer, text: 'Routine de 30 min qui remplace 2 heures en salle' },
      { icon: Coffee, text: 'Quoi commander au déjeuner business pour une énergie constante' },
      { icon: BatteryCharging, text: 'Comment éviter le crash de 15h sans café supplémentaire' }
    ],
    placeholder: 'Votre email professionnel',
    cta: 'Télécharger gratuit',
    privacy: 'Pas de spam. Vos données sont en sécurité.',
    success: 'Vérifiez votre boîte mail! Guide en route 🚀',
    loading: 'Envoi...'
  }
};

export default function LeadMagnetSection({ lang }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const t = content[lang] || content.en;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    try {
      await fetch(`${API_URL}/api/guide`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, lang })
      });

      saveLead({
        email,
        source:   'lead_magnet',
        status:   'new',
        language: lang,
        notes:    `PDF Guide | ${new Date().toLocaleString()}`,
      }).catch(() => {});

      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
      setStatus('success');
      setEmail('');
    }
  };

  return (
    <section id="lead-magnet" className="py-20 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent" />
      
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-500/10 rounded-full text-teal-400 text-sm font-medium mb-6">
              <Download className="w-4 h-4" />
              {t.tag}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              {t.title}
            </h2>
            <p className="text-lg text-white/60 mb-8">
              {t.subtitle}
            </p>

            <ul className="space-y-4">
              {t.benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-4 text-white/80">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-teal-400" />
                  </div>
                  {benefit.text}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              {status === 'success' ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <p className="text-xl font-bold text-slate-900">{t.success}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl mb-4 shadow-lg shadow-teal-500/30">
                      <Download className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">PDF Gratuit</h3>
                  </div>
                  
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.placeholder}
                    required
                    className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all text-lg"
                  />
                  
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl font-bold text-white text-lg hover:shadow-lg hover:shadow-teal-500/25 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {t.cta}
                      </>
                    )}
                  </button>
                  
                  <p className="text-xs text-slate-400 text-center">{t.privacy}</p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
