import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ArrowLeft, ArrowRight, Check, Zap, Target, Brain, Apple, 
  Dumbbell, Users, Video, MapPin, Calendar, Mountain, Bike, 
  Clock, Briefcase, Heart, TrendingUp, ChevronRight
} from 'lucide-react';
import Logo from '@/components/landing/Logo';

const content = {
  ro: {
    back: 'Înapoi',
    tag: 'Prețuri & Pachete',
    title: 'Găsește programul potrivit',
    subtitle: 'Răspunde la câteva întrebări și îți recomandăm cea mai bună opțiune pentru obiectivele tale.',
    steps: {
      goal: {
        title: 'Ce vrei să îmbunătățești?',
        options: [
          { id: 'energy', icon: Zap, label: 'Energie & Vitalitate', desc: 'Mai multă energie pe parcursul zilei' },
          { id: 'performance', icon: TrendingUp, label: 'Performanță fizică', desc: 'Alergare, ciclism, forță' },
          { id: 'wellness', icon: Heart, label: 'Wellness & Stres', desc: 'Reducere stres, echilibru' },
          { id: 'nutrition', icon: Apple, label: 'Nutriție & Greutate', desc: 'Plan alimentar personalizat' }
        ]
      },
      activity: {
        title: 'Ce activitate te atrage?',
        options: [
          { id: 'running', icon: Target, label: 'Alergare', desc: 'Road running sau trail' },
          { id: 'cycling', icon: Bike, label: 'Ciclism', desc: 'Road sau MTB' },
          { id: 'strength', icon: Dumbbell, label: 'Forță', desc: 'Antrenament cu greutăți' },
          { id: 'mixed', icon: Mountain, label: 'Mix complet', desc: 'Combinație de activități' }
        ]
      },
      format: {
        title: 'Cum preferi să lucrăm?',
        options: [
          { id: 'inperson', icon: MapPin, label: 'În persoană', desc: 'București & Ilfov' },
          { id: 'remote', icon: Video, label: 'Remote / Online', desc: 'De oriunde în lume' },
          { id: 'group', icon: Users, label: 'Grup', desc: 'Cu alți lideri' },
          { id: 'camp', icon: Mountain, label: 'Tabere', desc: 'Retreat-uri în Carpați' }
        ]
      },
      time: {
        title: 'Cât timp poți aloca săptămânal?',
        options: [
          { id: '2h', icon: Clock, label: '2-3 ore', desc: 'Program foarte încărcat' },
          { id: '4h', icon: Clock, label: '4-5 ore', desc: 'Program moderat' },
          { id: '6h', icon: Clock, label: '6+ ore', desc: 'Prioritate fitness' }
        ]
      }
    },
    next: 'Continuă',
    prev: 'Înapoi',
    seeResults: 'Vezi recomandarea',
    recommended: 'Recomandat pentru tine',
    allPackages: 'Toate pachetele',
    book: 'Rezervă Acum',
    contact: 'Contactează-ne',
    perSession: '/sesiune',
    perMonth: '/lună',
    perPerson: '/persoană',
    includes: 'Include:',
    packages: {
      pilot: {
        name: 'Executive Edge Pilot',
        price: '€350-500',
        duration: '4 săptămâni',
        desc: 'Testează metodologia fără risc',
        features: ['8 sesiuni de antrenament', 'Plan personalizat', 'Suport WhatsApp', 'Garanție 100%']
      },
      performance: {
        name: 'Program Performanță',
        price: '€1,000-1,500',
        duration: '12 săptămâni',
        desc: 'Transformare completă',
        features: ['24+ sesiuni', 'Optimizare somn & nutriție', 'Check-in săptămânal', 'Acces prioritar'],
        popular: true
      },
      retainer: {
        name: 'Retainer Lunar',
        price: '€250-450',
        duration: 'lunar',
        desc: 'Mentenanță continuă',
        features: ['4-6 sesiuni/lună', 'Ajustări continue', 'Flexibilitate maximă']
      },
      nutrition: {
        name: 'Plan Nutrițional',
        price: '€150-300',
        duration: 'plan complet',
        desc: 'Alimentație optimizată pentru lideri',
        features: ['Analiză obiceiuri alimentare', 'Plan personalizat', 'Rețete simple', 'Suport 4 săptămâni']
      },
      group: {
        name: 'Sesiuni Grup',
        price: '€30-50',
        duration: 'per sesiune',
        desc: 'Antrenament cu alți lideri',
        features: ['Grupuri 4-8 persoane', 'Networking', 'Outdoor București']
      },
      camp: {
        name: 'Tabere Leadership',
        price: '€500-800',
        duration: 'per tabără',
        desc: 'Retreat în Carpați',
        features: ['2-3 zile', 'Cazare inclusă', 'Activități outdoor', 'Workshop-uri leadership']
      },
      remote: {
        name: 'Coaching Remote',
        price: '€200-350',
        duration: 'lunar',
        desc: 'De oriunde în lume',
        features: ['4 sesiuni video/lună', 'Plan digital', 'Suport async', 'Flexibilitate totală']
      }
    }
  },
  en: {
    back: 'Back',
    tag: 'Pricing & Packages',
    title: 'Find the right program',
    subtitle: 'Answer a few questions and we\'ll recommend the best option for your goals.',
    steps: {
      goal: {
        title: 'What do you want to improve?',
        options: [
          { id: 'energy', icon: Zap, label: 'Energy & Vitality', desc: 'More energy throughout the day' },
          { id: 'performance', icon: TrendingUp, label: 'Physical Performance', desc: 'Running, cycling, strength' },
          { id: 'wellness', icon: Heart, label: 'Wellness & Stress', desc: 'Stress reduction, balance' },
          { id: 'nutrition', icon: Apple, label: 'Nutrition & Weight', desc: 'Personalized meal plan' }
        ]
      },
      activity: {
        title: 'What activity attracts you?',
        options: [
          { id: 'running', icon: Target, label: 'Running', desc: 'Road running or trail' },
          { id: 'cycling', icon: Bike, label: 'Cycling', desc: 'Road or MTB' },
          { id: 'strength', icon: Dumbbell, label: 'Strength', desc: 'Weight training' },
          { id: 'mixed', icon: Mountain, label: 'Complete mix', desc: 'Combination of activities' }
        ]
      },
      format: {
        title: 'How do you prefer to work?',
        options: [
          { id: 'inperson', icon: MapPin, label: 'In person', desc: 'Bucharest & Ilfov' },
          { id: 'remote', icon: Video, label: 'Remote / Online', desc: 'From anywhere in the world' },
          { id: 'group', icon: Users, label: 'Group', desc: 'With other leaders' },
          { id: 'camp', icon: Mountain, label: 'Camps', desc: 'Retreats in Carpathians' }
        ]
      },
      time: {
        title: 'How much time can you allocate weekly?',
        options: [
          { id: '2h', icon: Clock, label: '2-3 hours', desc: 'Very busy schedule' },
          { id: '4h', icon: Clock, label: '4-5 hours', desc: 'Moderate schedule' },
          { id: '6h', icon: Clock, label: '6+ hours', desc: 'Fitness priority' }
        ]
      }
    },
    next: 'Continue',
    prev: 'Back',
    seeResults: 'See recommendation',
    recommended: 'Recommended for you',
    allPackages: 'All packages',
    book: 'Book Now',
    contact: 'Contact us',
    perSession: '/session',
    perMonth: '/month',
    perPerson: '/person',
    includes: 'Includes:',
    packages: {
      pilot: {
        name: 'Executive Edge Pilot',
        price: '€350-500',
        duration: '4 weeks',
        desc: 'Test the methodology risk-free',
        features: ['8 training sessions', 'Personalized plan', 'WhatsApp support', '100% guarantee']
      },
      performance: {
        name: 'Performance Program',
        price: '€1,000-1,500',
        duration: '12 weeks',
        desc: 'Complete transformation',
        features: ['24+ sessions', 'Sleep & nutrition optimization', 'Weekly check-in', 'Priority access'],
        popular: true
      },
      retainer: {
        name: 'Monthly Retainer',
        price: '€250-450',
        duration: 'monthly',
        desc: 'Continuous maintenance',
        features: ['4-6 sessions/month', 'Continuous adjustments', 'Maximum flexibility']
      },
      nutrition: {
        name: 'Nutrition Plan',
        price: '€150-300',
        duration: 'complete plan',
        desc: 'Optimized nutrition for leaders',
        features: ['Eating habits analysis', 'Personalized plan', 'Simple recipes', '4 weeks support']
      },
      group: {
        name: 'Group Sessions',
        price: '€30-50',
        duration: 'per session',
        desc: 'Training with other leaders',
        features: ['Groups of 4-8', 'Networking', 'Outdoor Bucharest']
      },
      camp: {
        name: 'Leadership Camps',
        price: '€500-800',
        duration: 'per camp',
        desc: 'Retreat in Carpathians',
        features: ['2-3 days', 'Accommodation included', 'Outdoor activities', 'Leadership workshops']
      },
      remote: {
        name: 'Remote Coaching',
        price: '€200-350',
        duration: 'monthly',
        desc: 'From anywhere in the world',
        features: ['4 video sessions/month', 'Digital plan', 'Async support', 'Total flexibility']
      }
    }
  },
  fr: {
    back: 'Retour',
    tag: 'Tarifs & Forfaits',
    title: 'Trouvez le bon programme',
    subtitle: 'Répondez à quelques questions et nous vous recommanderons la meilleure option.',
    steps: {
      goal: {
        title: 'Que voulez-vous améliorer?',
        options: [
          { id: 'energy', icon: Zap, label: 'Énergie & Vitalité', desc: 'Plus d\'énergie tout au long de la journée' },
          { id: 'performance', icon: TrendingUp, label: 'Performance physique', desc: 'Course, cyclisme, force' },
          { id: 'wellness', icon: Heart, label: 'Bien-être & Stress', desc: 'Réduction du stress, équilibre' },
          { id: 'nutrition', icon: Apple, label: 'Nutrition & Poids', desc: 'Plan alimentaire personnalisé' }
        ]
      },
      activity: {
        title: 'Quelle activité vous attire?',
        options: [
          { id: 'running', icon: Target, label: 'Course', desc: 'Route ou trail' },
          { id: 'cycling', icon: Bike, label: 'Cyclisme', desc: 'Route ou VTT' },
          { id: 'strength', icon: Dumbbell, label: 'Force', desc: 'Musculation' },
          { id: 'mixed', icon: Mountain, label: 'Mix complet', desc: 'Combinaison d\'activités' }
        ]
      },
      format: {
        title: 'Comment préférez-vous travailler?',
        options: [
          { id: 'inperson', icon: MapPin, label: 'En personne', desc: 'Bucarest & Ilfov' },
          { id: 'remote', icon: Video, label: 'À distance', desc: 'De n\'importe où dans le monde' },
          { id: 'group', icon: Users, label: 'Groupe', desc: 'Avec d\'autres leaders' },
          { id: 'camp', icon: Mountain, label: 'Camps', desc: 'Retraites dans les Carpates' }
        ]
      },
      time: {
        title: 'Combien de temps pouvez-vous consacrer par semaine?',
        options: [
          { id: '2h', icon: Clock, label: '2-3 heures', desc: 'Emploi du temps très chargé' },
          { id: '4h', icon: Clock, label: '4-5 heures', desc: 'Emploi du temps modéré' },
          { id: '6h', icon: Clock, label: '6+ heures', desc: 'Priorité fitness' }
        ]
      }
    },
    next: 'Continuer',
    prev: 'Retour',
    seeResults: 'Voir la recommandation',
    recommended: 'Recommandé pour vous',
    allPackages: 'Tous les forfaits',
    book: 'Réserver',
    contact: 'Contactez-nous',
    perSession: '/séance',
    perMonth: '/mois',
    perPerson: '/personne',
    includes: 'Inclut:',
    packages: {
      pilot: {
        name: 'Executive Edge Pilot',
        price: '€350-500',
        duration: '4 semaines',
        desc: 'Testez la méthodologie sans risque',
        features: ['8 séances', 'Plan personnalisé', 'Support WhatsApp', 'Garantie 100%']
      },
      performance: {
        name: 'Programme Performance',
        price: '€1,000-1,500',
        duration: '12 semaines',
        desc: 'Transformation complète',
        features: ['24+ séances', 'Optimisation sommeil & nutrition', 'Check-in hebdomadaire', 'Accès prioritaire'],
        popular: true
      },
      retainer: {
        name: 'Abonnement Mensuel',
        price: '€250-450',
        duration: 'mensuel',
        desc: 'Maintenance continue',
        features: ['4-6 séances/mois', 'Ajustements continus', 'Flexibilité maximale']
      },
      nutrition: {
        name: 'Plan Nutritionnel',
        price: '€150-300',
        duration: 'plan complet',
        desc: 'Nutrition optimisée pour leaders',
        features: ['Analyse habitudes alimentaires', 'Plan personnalisé', 'Recettes simples', 'Support 4 semaines']
      },
      group: {
        name: 'Séances Groupe',
        price: '€30-50',
        duration: 'par séance',
        desc: 'Entraînement avec d\'autres leaders',
        features: ['Groupes 4-8 personnes', 'Networking', 'Outdoor Bucarest']
      },
      camp: {
        name: 'Camps Leadership',
        price: '€500-800',
        duration: 'par camp',
        desc: 'Retraite dans les Carpates',
        features: ['2-3 jours', 'Hébergement inclus', 'Activités outdoor', 'Ateliers leadership']
      },
      remote: {
        name: 'Coaching À Distance',
        price: '€200-350',
        duration: 'mensuel',
        desc: 'De n\'importe où dans le monde',
        features: ['4 séances vidéo/mois', 'Plan digital', 'Support async', 'Flexibilité totale']
      }
    }
  }
};

function getRecommendedPackages(selections) {
  const packages = [];
  
  if (selections.format === 'camp') {
    packages.push('camp');
  } else if (selections.format === 'group') {
    packages.push('group');
  } else if (selections.format === 'remote') {
    packages.push('remote');
  } else {
    // In person
    if (selections.time === '2h') {
      packages.push('pilot');
    } else {
      packages.push('performance');
    }
  }
  
  if (selections.goal === 'nutrition') {
    packages.push('nutrition');
  }
  
  return packages.length > 0 ? packages : ['pilot'];
}

export default function Pricing() {
  const [lang, setLang] = useState('en');
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const browserLang = navigator.language.slice(0, 2);
    if (['ro', 'en', 'fr'].includes(browserLang)) {
      setLang(browserLang);
    }
  }, []);

  const t = content[lang];
  const stepKeys = ['goal', 'activity', 'format', 'time'];
  const currentStepKey = stepKeys[step];
  const currentStep = t.steps[currentStepKey];
  const progress = ((step + 1) / stepKeys.length) * 100;

  const handleSelect = (id) => {
    setSelections({ ...selections, [currentStepKey]: id });
  };

  const handleNext = () => {
    if (step < stepKeys.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const recommendedPackages = getRecommendedPackages(selections);

  const PackageCard = ({ pkg, isRecommended }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative p-6 rounded-2xl ${isRecommended ? 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white' : 'bg-white border border-slate-200'}`}
    >
      {pkg.popular && (
        <span className={`absolute -top-3 left-6 px-3 py-1 text-xs font-bold rounded-full ${isRecommended ? 'bg-white text-teal-700' : 'bg-teal-500 text-white'}`}>
          ⭐ Popular
        </span>
      )}
      <h3 className={`text-xl font-bold mb-1 ${isRecommended ? 'text-white' : 'text-slate-900'}`}>{pkg.name}</h3>
      <p className={`text-sm mb-4 ${isRecommended ? 'text-white/80' : 'text-slate-500'}`}>{pkg.desc}</p>
      <div className="mb-4">
        <span className={`text-3xl font-black ${isRecommended ? 'text-white' : 'text-slate-900'}`}>{pkg.price}</span>
        <span className={`text-sm ml-2 ${isRecommended ? 'text-white/70' : 'text-slate-400'}`}>/ {pkg.duration}</span>
      </div>
      <p className={`text-xs font-medium mb-2 ${isRecommended ? 'text-white/70' : 'text-slate-400'}`}>{t.includes}</p>
      <ul className="space-y-2 mb-6">
        {pkg.features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <Check className={`w-4 h-4 flex-shrink-0 ${isRecommended ? 'text-emerald-200' : 'text-teal-500'}`} />
            <span className={isRecommended ? 'text-white/90' : 'text-slate-600'}>{f}</span>
          </li>
        ))}
      </ul>
      <a
        href="https://calendly.com/iulian-cyberbuildsolutions/30min?back=1"
        target="_blank"
        rel="noopener noreferrer"
        className={`block w-full py-3 rounded-xl font-semibold text-center transition-all ${
          isRecommended 
            ? 'bg-white text-teal-700 hover:bg-slate-50' 
            : 'bg-teal-500 text-white hover:bg-teal-600'
        }`}
      >
        {t.book}
      </a>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
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

      {!showResults ? (
        /* Multi-step Quiz */
        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-slate-500 mb-2">
              <span>{step + 1} / {stepKeys.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-3xl font-black text-slate-900 mb-8">{currentStep.title}</h2>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {currentStep.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    className={`p-6 rounded-2xl border-2 text-left transition-all ${
                      selections[currentStepKey] === option.id
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <option.icon className={`w-8 h-8 mb-3 ${selections[currentStepKey] === option.id ? 'text-teal-600' : 'text-slate-400'}`} />
                    <h3 className="font-bold text-slate-900 mb-1">{option.label}</h3>
                    <p className="text-sm text-slate-500">{option.desc}</p>
                  </button>
                ))}
              </div>

              <div className="flex justify-between">
                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-2 px-6 py-3 text-slate-600 hover:text-slate-900"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    {t.prev}
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={!selections[currentStepKey]}
                  className={`ml-auto flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${
                    selections[currentStepKey]
                      ? 'bg-teal-600 text-white hover:bg-teal-700'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {step === stepKeys.length - 1 ? t.seeResults : t.next}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* Results */
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Recommended */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">✨</span> {t.recommended}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {recommendedPackages.map((pkgKey) => (
                <PackageCard key={pkgKey} pkg={t.packages[pkgKey]} isRecommended />
              ))}
            </div>
          </div>

          {/* All packages */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{t.allPackages}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(t.packages).map(([key, pkg]) => (
                <PackageCard key={key} pkg={pkg} isRecommended={false} />
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => { setShowResults(false); setStep(0); setSelections({}); }}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              ← Refă selecția
            </button>
          </div>
        </div>
      )}
    </div>
  );
}