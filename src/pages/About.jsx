import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, MapPin, Heart, Shield, Code, Dumbbell, Mountain, Users, Award, Globe, Linkedin, Mail, Calendar } from 'lucide-react';
import Logo from '@/components/landing/Logo';

const content = {
  ro: {
    back: 'Înapoi',
    tag: 'Povestea mea',
    title: 'Iulian Bofu',
    subtitle: 'De la cybersecurity la coaching de performanță',
    intro: 'Sunt un profesionist IT cu peste 10 ani de experiență în cybersecurity și infrastructură cloud, care a descoperit că adevărata performanță vine din echilibrul dintre minte și corp.',
    story: {
      title: 'Cum am ajuns aici',
      p1: 'Cariera mea a început în lumea IT-ului – securitate cibernetică, sisteme complexe, decizii rapide sub presiune. Am lucrat cu companii din România și Franța, gestionând infrastructuri critice și echipe tehnice.',
      p2: 'Dar în spatele succesului profesional, simțeam că ceva lipsea. Zilele de 12+ ore în fața ecranului, meeting-urile interminabile și stresul constant îmi afectau energia și sănătatea.',
      p3: 'Am descoperit că fitness-ul nu e doar despre aspect fizic – e despre performanță mentală, reziliență și capacitatea de a lua decizii mai bune. Am aplicat mentalitatea de problem-solving din IT pentru a-mi optimiza stilul de viață.',
      p4: 'Astăzi, combin experiența din tech cu pasiunea pentru fitness pentru a ajuta alți lideri să găsească același echilibru. Înțeleg presiunile tale pentru că le-am trăit.'
    },
    values: [
      { icon: Code, title: 'Background IT', desc: 'Cybersecurity, cloud infrastructure, mentalitate analitică' },
      { icon: Globe, title: 'România & Franța', desc: 'Experiență internațională, două culturi, o viziune' },
      { icon: Mountain, title: 'Pasiune outdoor', desc: 'Alergare montană, ciclism, tabere în Carpați' },
      { icon: Users, title: 'Focus pe lideri', desc: 'Executivi și fondatori care vor mai mult' }
    ],
    credentials: {
      title: 'Certificări & Experiență',
      items: [
        '10+ ani în IT & Cybersecurity',
        'Certificări fitness internaționale',
        'Experiență cu 50+ executivi',
        'Organizator tabere outdoor'
      ]
    },
    cta: 'Hai să vorbim',
    ctaDesc: 'Programează o consultație gratuită de 30 minute'
  },
  en: {
    back: 'Back',
    tag: 'My story',
    title: 'Iulian Bofu',
    subtitle: 'From cybersecurity to performance coaching',
    intro: 'I\'m an IT professional with over 10 years of experience in cybersecurity and cloud infrastructure, who discovered that true performance comes from the balance between mind and body.',
    story: {
      title: 'How I got here',
      p1: 'My career started in the IT world – cybersecurity, complex systems, rapid decisions under pressure. I worked with companies in Romania and France, managing critical infrastructure and technical teams.',
      p2: 'But behind the professional success, I felt something was missing. 12+ hour days in front of screens, endless meetings and constant stress were affecting my energy and health.',
      p3: 'I discovered that fitness isn\'t just about physical appearance – it\'s about mental performance, resilience and the ability to make better decisions. I applied the problem-solving mentality from IT to optimize my lifestyle.',
      p4: 'Today, I combine tech experience with passion for fitness to help other leaders find the same balance. I understand your pressures because I\'ve lived them.'
    },
    values: [
      { icon: Code, title: 'IT Background', desc: 'Cybersecurity, cloud infrastructure, analytical mindset' },
      { icon: Globe, title: 'Romania & France', desc: 'International experience, two cultures, one vision' },
      { icon: Mountain, title: 'Outdoor passion', desc: 'Mountain running, cycling, Carpathian camps' },
      { icon: Users, title: 'Leader focus', desc: 'Executives and founders who want more' }
    ],
    credentials: {
      title: 'Credentials & Experience',
      items: [
        '10+ years in IT & Cybersecurity',
        'International fitness certifications',
        'Experience with 50+ executives',
        'Outdoor camp organizer'
      ]
    },
    cta: 'Let\'s talk',
    ctaDesc: 'Schedule a free 30-minute consultation'
  },
  fr: {
    back: 'Retour',
    tag: 'Mon histoire',
    title: 'Iulian Bofu',
    subtitle: 'De la cybersécurité au coaching de performance',
    intro: 'Je suis un professionnel IT avec plus de 10 ans d\'expérience en cybersécurité et infrastructure cloud, qui a découvert que la vraie performance vient de l\'équilibre entre l\'esprit et le corps.',
    story: {
      title: 'Comment j\'en suis arrivé là',
      p1: 'Ma carrière a commencé dans le monde IT – cybersécurité, systèmes complexes, décisions rapides sous pression. J\'ai travaillé avec des entreprises en Roumanie et en France, gérant des infrastructures critiques et des équipes techniques.',
      p2: 'Mais derrière le succès professionnel, je sentais qu\'il manquait quelque chose. Des journées de 12+ heures devant les écrans, des réunions interminables et un stress constant affectaient mon énergie et ma santé.',
      p3: 'J\'ai découvert que le fitness n\'est pas seulement une question d\'apparence physique – c\'est une question de performance mentale, de résilience et de capacité à prendre de meilleures décisions.',
      p4: 'Aujourd\'hui, je combine l\'expérience tech avec la passion du fitness pour aider d\'autres leaders à trouver le même équilibre. Je comprends vos pressions car je les ai vécues.'
    },
    values: [
      { icon: Code, title: 'Background IT', desc: 'Cybersécurité, infrastructure cloud, mentalité analytique' },
      { icon: Globe, title: 'Roumanie & France', desc: 'Expérience internationale, deux cultures, une vision' },
      { icon: Mountain, title: 'Passion outdoor', desc: 'Trail running, cyclisme, camps dans les Carpates' },
      { icon: Users, title: 'Focus leaders', desc: 'Dirigeants et fondateurs qui veulent plus' }
    ],
    credentials: {
      title: 'Certifications & Expérience',
      items: [
        '10+ ans en IT & Cybersécurité',
        'Certifications fitness internationales',
        'Expérience avec 50+ dirigeants',
        'Organisateur de camps outdoor'
      ]
    },
    cta: 'Parlons-en',
    ctaDesc: 'Planifiez une consultation gratuite de 30 minutes'
  }
};

export default function About() {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const browserLang = navigator.language.slice(0, 2);
    if (['ro', 'en', 'fr'].includes(browserLang)) {
      setLang(browserLang);
    }
  }, []);

  const t = content[lang];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to={createPageUrl('Home')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-5 h-5" />
            {t.back}
          </Link>
          <Logo />
          <div className="flex items-center gap-1">
            {['ro', 'en', 'fr'].map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${lang === l ? 'bg-teal-100 text-teal-700' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-500/20 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="inline-block text-teal-400 font-semibold text-sm tracking-[0.2em] uppercase mb-4">
                {t.tag}
              </span>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
                {t.title}
              </h1>
              <p className="text-2xl text-teal-300 font-medium mb-6">
                {t.subtitle}
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                {t.intro}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=600&fit=crop"
                  alt="Iulian Bofu"
                  className="w-full h-full object-cover mix-blend-luminosity opacity-80"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">10+ ani</p>
                    <p className="text-sm text-slate-500">IT & Fitness</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black text-slate-900 mb-8">{t.story.title}</h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>{t.story.p1}</p>
              <p>{t.story.p2}</p>
              <p>{t.story.p3}</p>
              <p className="text-slate-900 font-medium">{t.story.p4}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-slate-500">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-8">{t.credentials.title}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {t.credentials.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-4 bg-teal-50 rounded-xl"
              >
                <Award className="w-5 h-5 text-teal-600 flex-shrink-0" />
                <span className="text-slate-700 font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-teal-500 to-emerald-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-white mb-4">{t.cta}</h2>
          <p className="text-white/80 text-lg mb-8">{t.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/iulian-cyberbuildsolutions/30min?back=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-teal-700 font-bold rounded-xl hover:shadow-xl transition-all"
            >
              <Calendar className="w-5 h-5" />
              {t.cta}
            </a>
            <a
              href="https://www.linkedin.com/in/iulianbofu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}