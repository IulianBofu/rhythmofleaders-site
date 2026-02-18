import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Calendar, Sparkles, ArrowRight, Zap, Check } from 'lucide-react';
import { saveLead } from '@/api/airtableClient';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function MicroChallengeButton({ lang, t }) {
  const [email, setEmail] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);

    try {
      // Generate personalized micro-challenge based on current day
      const dayOfWeek = new Date().getDay();
      const challenges = {
        ro: [
          { day: 'Luni', challenge: '10 minute de alergare ușoară dimineața', duration: '5 luni pentru 10K', level: 'începător' },
          { day: 'Marți', challenge: '15 genuflexiuni + 15 flotări', duration: '3 luni pentru forță', level: 'intermediar' },
          { day: 'Miercuri', challenge: '30 minute plimbare rapidă la prânz', duration: '2 luni pentru energie constantă', level: 'începător' },
          { day: 'Joi', challenge: 'Planificare mese pentru 3 zile', duration: '4 săptămâni pentru obiceiuri nutriționale', level: 'începător' },
          { day: 'Vineri', challenge: '20 minute yoga sau stretching', duration: '6 săptămâni pentru flexibilitate', level: 'toate nivelurile' },
          { day: 'Sâmbătă', challenge: '5K alergare sau 30 min cycling', duration: '4 luni pentru semi-maraton', level: 'intermediar' },
          { day: 'Duminică', challenge: 'Recovery: plimbare 45 min + hidratare', duration: 'continuu pentru performanță', level: 'toate nivelurile' }
        ],
        en: [
          { day: 'Monday', challenge: '10 min easy morning run', duration: '5 months to 10K', level: 'beginner' },
          { day: 'Tuesday', challenge: '15 squats + 15 push-ups', duration: '3 months to strength', level: 'intermediate' },
          { day: 'Wednesday', challenge: '30 min brisk walk at lunch', duration: '2 months to sustained energy', level: 'beginner' },
          { day: 'Thursday', challenge: 'Plan meals for 3 days', duration: '4 weeks to nutrition habits', level: 'beginner' },
          { day: 'Friday', challenge: '20 min yoga or stretching', duration: '6 weeks to flexibility', level: 'all levels' },
          { day: 'Saturday', challenge: '5K run or 30 min cycling', duration: '4 months to half-marathon', level: 'intermediate' },
          { day: 'Sunday', challenge: 'Recovery: 45 min walk + hydration', duration: 'continuous for performance', level: 'all levels' }
        ],
        fr: [
          { day: 'Lundi', challenge: '10 min course facile le matin', duration: '5 mois pour 10K', level: 'débutant' },
          { day: 'Mardi', challenge: '15 squats + 15 pompes', duration: '3 mois pour la force', level: 'intermédiaire' },
          { day: 'Mercredi', challenge: '30 min marche rapide à midi', duration: '2 mois pour énergie constante', level: 'débutant' },
          { day: 'Jeudi', challenge: 'Planifier repas pour 3 jours', duration: '4 semaines pour habitudes nutrition', level: 'débutant' },
          { day: 'Vendredi', challenge: '20 min yoga ou étirements', duration: '6 semaines pour flexibilité', level: 'tous niveaux' },
          { day: 'Samedi', challenge: '5K course ou 30 min vélo', duration: '4 mois pour semi-marathon', level: 'intermédiaire' },
          { day: 'Dimanche', challenge: 'Récupération: marche 45 min + hydratation', duration: 'continu pour performance', level: 'tous niveaux' }
        ]
      };

      const todayChallenge = challenges[lang][dayOfWeek];
      
      // Create lead
      // Salveaza lead
      saveLead({
        email,
        source: 'micro_challenge',
        language: lang,
        notes: `${todayChallenge.day} - ${todayChallenge.challenge}`,
      }).catch(() => {});

      // Trimite emailul cu challenge-ul
      await fetch(`${API_URL}/api/microchallenge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          lang,
          challenge: {
            title:     `${todayChallenge.day}: ${todayChallenge.challenge}`,
            challenge: todayChallenge.challenge,
            duration:  todayChallenge.duration,
            level:     todayChallenge.level,
          }
        })
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Failed to send challenge:', err);
      setSubmitted(true); // arata succes chiar daca emailul nu merge - lead-ul e deja salvat
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl font-semibold text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group"
      >
        <Sparkles className="w-5 h-5" />
        {t.originalCta.button}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    );
  }

  if (submitted) {
    return (
      <div className="text-center py-4">
        <div className="inline-flex items-center gap-2 text-emerald-400 mb-2">
          <Check className="w-5 h-5" />
          <span className="font-semibold">{lang === 'ro' ? 'Verifică inbox-ul!' : lang === 'fr' ? 'Vérifiez votre boîte mail!' : 'Check your inbox!'}</span>
        </div>
        <p className="text-white/60 text-sm">
          {lang === 'ro' ? 'Challenge-ul tău personalizat te așteaptă!' : lang === 'fr' ? 'Votre défi personnalisé vous attend!' : 'Your personalized challenge awaits!'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={lang === 'ro' ? 'Email-ul tău' : lang === 'fr' ? 'Votre email' : 'Your email'}
        required
        className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            {lang === 'ro' ? 'Trimite challenge-ul' : lang === 'fr' ? 'Envoyer le défi' : 'Send challenge'}
          </>
        )}
      </button>
    </form>
  );
}

const content = {
  ro: {
    badge: 'Consultație gratuită',
    title: 'Ești gata să conduci cu mai multă energie?',
    subtitle: '20 de minute. Fără obligații. Fără pitch. Doar o conversație onestă despre obiectivele tale.',
    cta: 'Hai să vorbim',
    originalCta: {
      title: 'Sau începe cu un micro-challenge',
      description: '5 zile. 5 minute/zi. Experimentează ce înseamnă să ai energie constantă.',
      button: 'Trimite-mi challenge-ul gratuit'
    },
    alternative: 'Preferi să mă contactezi direct?',
    linkedin: 'Conectează-te pe LinkedIn'
  },
  en: {
    badge: 'Free consultation',
    title: 'Ready to lead with more energy?',
    subtitle: '20 minutes. No obligations. No pitch. Just an honest conversation about your goals.',
    cta: 'Let\'s talk',
    originalCta: {
      title: 'Or start with a micro-challenge',
      description: '5 days. 5 minutes/day. Experience what constant energy feels like.',
      button: 'Send me the free challenge'
    },
    alternative: 'Prefer to contact me directly?',
    linkedin: 'Connect on LinkedIn'
  }
};

const frContent = {
  badge: 'Consultation gratuite',
  title: 'Prêt à diriger avec plus d\'énergie?',
  subtitle: '20 minutes. Sans obligation. Sans pitch. Juste une conversation honnête sur vos objectifs.',
  cta: 'Parlons-en',
  originalCta: {
    title: 'Ou commencez par un micro-challenge',
    description: '5 jours. 5 minutes/jour. Expérimentez ce que signifie avoir une énergie constante.',
    button: 'Envoyez-moi le challenge gratuit'
  },
  alternative: 'Préférez me contacter directement?',
  linkedin: 'Connectez-vous sur LinkedIn'
};

export default function CTASection({ lang }) {
  const t = lang === 'fr' ? frContent : content[lang] || content.en;

  useEffect(() => {
    // Listen for Calendly events to capture email
    const handleCalendlyEvent = (e) => {
      if (e.data.event === 'calendly.event_scheduled') {
        const inviteeEmail = e.data.payload?.invitee?.email;
        if (inviteeEmail) {
          // Save to CRM
          saveLead({
            email: inviteeEmail,
            source: 'calendly',
            status: 'new',
            language: lang,
            notes: 'Booked consultation via Calendly',
          }).catch(err => console.error('Failed to save lead:', err));
        }
      }
    };

    window.addEventListener('message', handleCalendlyEvent);
    return () => window.removeEventListener('message', handleCalendlyEvent);
  }, [lang]);

  return (
    <section id="schedule" className="py-32 relative overflow-hidden">
      {/* Premium dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-teal-950 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8">
            <Calendar className="w-4 h-4 text-teal-400" />
            <span className="text-white/70 text-sm font-medium">{t.badge}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
            {t.title}
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Calendly Embed */}
          <motion.div 
            className="rounded-3xl overflow-hidden shadow-2xl shadow-black/30"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <iframe
              src="https://calendly.com/iulian-cyberbuildsolutions/30min?back=1&hide_gdpr_banner=1&background_color=ffffff&text_color=1f2937&primary_color=0f766e"
              width="100%"
              height="700"
              frameBorder="0"
              title="Programează o consultație"
              className="w-full bg-white"
            />
          </motion.div>

          {/* Original CTA + LinkedIn */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Micro-challenge Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/30">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{t.originalCta.title}</h3>
              </div>
              <p className="text-white/60 mb-6 leading-relaxed">
                {t.originalCta.description}
              </p>
              <MicroChallengeButton lang={lang} t={t} />
            </div>

            {/* LinkedIn Alternative */}
            <div className="text-center">
              <p className="text-white/40 mb-4 text-sm">{t.alternative}</p>
              <a 
              href="https://www.linkedin.com/in/iulianbofu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300"
              >
              <Linkedin className="w-5 h-5" />
              {t.linkedin}
              </a>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {[
                { value: '100%', label: lang === 'ro' ? 'Confidențial' : 'Confidential' },
                { value: '20', label: lang === 'ro' ? 'Minute' : 'Minutes' },
                { value: '0€', label: lang === 'ro' ? 'Obligații' : 'Obligations' }
              ].map((item) => (
                <div key={item.label} className="text-center p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-2xl font-black text-white">{item.value}</div>
                  <div className="text-xs text-white/40 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}