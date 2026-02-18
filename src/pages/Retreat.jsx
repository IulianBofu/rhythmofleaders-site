import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mountain, Calendar, Users, MapPin, Check, X, 
  ChevronDown, ChevronUp, Sun, Moon, Coffee, Zap,
  Heart, Brain, Dumbbell, Wind, Sparkles, Shield,
  Clock, Euro, Star, ArrowRight, Mail, Phone, User
} from 'lucide-react';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const RETREAT_CONFIG = {
  deposit_percentage: 30,
  locations: [
    {
      id: 'chamonix',
      name_ro: 'Chamonix, Franța - Alpi',
      name_en: 'Chamonix, France - Alps',
      name_fr: 'Chamonix, France - Alpes',
      description_ro: 'Alpi francezi, vârfuri impresionante',
      description_en: 'French Alps, impressive peaks',
      description_fr: 'Alpes françaises, sommets impressionnants'
    },
    {
      id: 'corbu',
      name_ro: 'Corbu, CT - Marea Neagră',
      name_en: 'Corbu, CT - Black Sea',
      name_fr: 'Corbu, CT - Mer Noire',
      description_ro: 'Litoral românesc, plaje sălbatice',
      description_en: 'Romanian coast, wild beaches',
      description_fr: 'Côte roumaine, plages sauvages'
    },
    {
      id: 'transfagarasan',
      name_ro: 'Transfăgărășan, România',
      name_en: 'Transfăgărășan, Romania',
      name_fr: 'Transfăgărășan, Roumanie',
      description_ro: 'Cel mai spectaculos drum montan din România',
      description_en: "Romania's most spectacular mountain road",
      description_fr: 'La plus spectaculaire route de montagne de Roumanie'
    }
  ],
  room_types: [
    {
      id: 'shared',
      name_ro: 'Cameră dublă (împărțită)',
      name_en: 'Twin room (shared)',
      name_fr: 'Chambre double (partagée)',
      price_adjustment_ro: 0,
      price_adjustment_en: 0,
      price_adjustment_fr: 0
    },
    {
      id: 'single',
      name_ro: 'Cameră single',
      name_en: 'Single room',
      name_fr: 'Chambre simple',
      price_adjustment_ro: 200,
      price_adjustment_en: 200,
      price_adjustment_fr: 200
    }
  ],
  pricing_tiers: [
    {
      id: 'early_bird',
      name_ro: 'Early Bird',
      name_en: 'Early Bird',
      name_fr: 'Early Bird',
      base_price_ro: 1499,
      base_price_en: 1499,
      base_price_fr: 1499
    },
    {
      id: 'standard',
      name_ro: 'Standard',
      name_en: 'Standard',
      name_fr: 'Standard',
      base_price_ro: 1799,
      base_price_en: 1799,
      base_price_fr: 1799
    },
    {
      id: 'last_spots',
      name_ro: 'Last Spots',
      name_en: 'Last Spots',
      name_fr: 'Dernières Places',
      base_price_ro: 1999,
      base_price_en: 1999,
      base_price_fr: 1999
    }
  ],
  extras: [
    {
      id: 'airport_transfer',
      name_ro: 'Transfer aeroport',
      name_en: 'Airport transfer',
      name_fr: 'Transfert aéroport',
      price_ro: 80,
      price_en: 80,
      price_fr: 80
    },
    {
      id: 'nutrition_plan',
      name_ro: 'Plan nutrițional personalizat',
      name_en: 'Personalized nutrition plan',
      name_fr: 'Plan nutritionnel personnalisé',
      price_ro: 120,
      price_en: 120,
      price_fr: 120
    },
    {
      id: 'equipment',
      name_ro: 'Echipament hiking (împrumut)',
      name_en: 'Hiking equipment (loan)',
      name_fr: 'Équipement randonnée (prêt)',
      price_ro: 50,
      price_en: 50,
      price_fr: 50
    }
  ]
};
import Navbar from '../components/landing/Navbar';
import CostCalculator from '../components/retreat/CostCalculator';
import LocationGallery from '../components/retreat/LocationGallery';
import LocationTestimonials from '../components/retreat/LocationTestimonials';
import ReservationForm from '../components/retreat/ReservationForm';
import { trackRetreatBooking, trackReservationFormSubmit, trackScrollDepth } from '../components/analytics/TrackingEvents';

const content = {
  ro: {
    nav: {
      schedule: 'Program',
      pricing: 'Prețuri',
      faq: 'FAQ',
      book: 'Rezervă',
      locations: 'Locații'
    },
    hero: {
      badge: 'Tabără Intensivă 5 Zile',
      title: 'Transformă-ți Corpul, Energia & Afacerea în 5 Zile',
      subtitle: 'Coaching intensiv în natură',
      locations: {
        chamonix: 'Chamonix, Franța - Alpi',
        corbu: 'Corbu, CT - Marea Neagră',
        transfagarasan: 'Transfăgărășan, România'
      },
      duration: '5-7 zile',
      capacity: 'Max 8 persoane',
      cta: 'Rezervă Consultația Gratuită',
      dateNote: '📅 Data plecării va fi anunțată curând',
      selectLocation: 'Alege Locația'
    },
    problems: {
      title: 'Recunoști aceste provocări?',
      subtitle: 'Antreprenorii de succes se confruntă zilnic cu aceste realități',
      items: [
        {
          title: 'Sănătate neglijată',
          desc: 'Afacerea e pe primul loc, corpul e pe ultimul'
        },
        {
          title: 'Energie inconsistentă',
          desc: 'Diminețile sunt OK, dar după-amiezele sunt devastatoare'
        },
        {
          title: 'Stres cronic',
          desc: 'Tensiune constantă fără recuperare reală'
        },
        {
          title: 'Obiceiuri dezaliniate',
          desc: 'Știi ce trebuie făcut, dar nu o faci consecvent'
        },
        {
          title: 'Lipsă de claritate',
          desc: 'Înotând în informații, dar fără direcție clară'
        },
        {
          title: 'Performance plateau',
          desc: 'Stagnat în energie, focus și rezultate'
        }
      ]
    },
    solution: {
      title: 'Soluția: 5 Zile. Coaching Intensiv. Transformare Reală.',
      subtitle: 'Un format unic care combină natura, mișcarea și coaching pentru breakthrough',
      items: [
        {
          icon: Mountain,
          title: 'Daily Hikes + Breathing',
          desc: 'Mișcare funcțională în natură cu breathing work pentru reziliență mentală'
        },
        {
          icon: Brain,
          title: '3M Model Coaching',
          desc: 'Mindset, Metabolism, Movement - framework-ul care funcționează pentru executivi'
        },
        {
          icon: Heart,
          title: 'Motivational Interviewing',
          desc: 'Sesiuni 1:1 de identificare a blocajelor reale și crearea planului de acțiune'
        },
        {
          icon: Wind,
          title: 'Recovery Protocols',
          desc: 'Tehnici de recuperare pentru somn, energie și focus susținut'
        },
        {
          icon: Users,
          title: 'Group + 1:1 Coaching',
          desc: 'Comunitate de high-performers + atenție personalizată'
        },
        {
          icon: Sparkles,
          title: 'Knowledge Base',
          desc: 'Framework-uri practice: nutriție, antrenament, obiceiuri de energie'
        }
      ]
    },
    schedule: {
      title: 'Program Zilnic',
      subtitle: 'Fiecare zi construiește pe progresul anterior',
      days: [
        {
          day: 'Ziua 1',
          title: 'Arrival & Assessment',
          activities: [
            '14:00 - Check-in & Welcome',
            '16:00 - Baseline Assessment (energie, focus, obiceiuri)',
            '18:00 - Orientation Hike (ușor)',
            '19:30 - Cină',
            '20:30 - Vision Session: De ce ești aici?'
          ]
        },
        {
          day: 'Ziua 2',
          title: 'Mindset Foundation',
          activities: [
            '07:00 - Morning Hike + Breathing Work',
            '09:00 - Mic dejun',
            '10:00 - Workshop: 3M Model - Mindset',
            '12:00 - Prânz',
            '14:00 - 1:1 Coaching Sessions',
            '16:00 - Recovery Protocol Training',
            '19:00 - Cină',
            '20:00 - Group Reflection'
          ]
        },
        {
          day: 'Ziua 3',
          title: 'Metabolism Mastery',
          activities: [
            '07:00 - Sunrise Hike (medium intensity)',
            '09:00 - Mic dejun',
            '10:00 - Workshop: Nutriție pentru Energie Susținută',
            '12:00 - Prânz',
            '14:00 - Strength Fundamentals Session',
            '16:00 - 1:1 Coaching Sessions',
            '19:00 - Cină',
            '20:00 - Planning Session: Habit Stacking'
          ]
        },
        {
          day: 'Ziua 4',
          title: 'Movement Integration',
          activities: [
            '07:00 - Challenge Hike (high intensity)',
            '09:00 - Mic dejun',
            '10:00 - Workshop: Movement for Executives',
            '12:00 - Prânz',
            '14:00 - Business Integration Workshop',
            '16:00 - Final 1:1 Coaching',
            '19:00 - Celebration Dinner',
            '20:00 - Transformation Stories'
          ]
        },
        {
          day: 'Ziua 5',
          title: 'Integration & Departure',
          activities: [
            '07:00 - Final Sunrise Hike',
            '09:00 - Mic dejun',
            '10:00 - 90-Day Action Plan Creation',
            '12:00 - Prânz de Închidere',
            '14:00 - Departure',
            '+ Follow-up: 2 sesiuni 1:1 în următoarele 60 de zile'
          ]
        }
      ]
    },
    included: {
      title: 'Ce Este Inclus',
      yes: [
        'Cazare 4 nopți (cameră single/twin)',
        '5 zile de coaching intensiv',
        'Toate mesele (mic dejun, prânz, cină)',
        'Daily hiking & breathing sessions',
        'Workshops & training materials',
        '3 sesiuni 1:1 coaching',
        'Recovery protocols & tools',
        '2 follow-up sessions (60 zile)',
        'Access to knowledge base',
        'Community support group'
      ],
      no: [
        'Transport până la destinație',
        'Echipament personal (hiking boots, etc)',
        'Asigurare de călătorie',
        'Cheltuieli personale'
      ]
    },
    pricing: {
      title: 'Investiție',
      subtitle: 'Trei opțiuni pentru fiecare etapă de rezervare',
      plans: [
        {
          name: 'Early Bird',
          price: '1.499',
          spots: 'Primele 3 locuri',
          badge: null
        },
        {
          name: 'Standard',
          price: '1.799',
          spots: 'Următoarele 3 locuri',
          badge: 'POPULAR'
        },
        {
          name: 'Last Spots',
          price: '1.999',
          spots: 'Ultimele 2 locuri',
          badge: null
        }
      ],
      payment: '💳 Opțiune: Payment plan în 3 tranșe',
      cta: 'Rezervă Acum',
      note: 'Locuri limitate pentru calitate maximă'
    },
    faq: {
      title: 'Întrebări Frecvente',
      items: [
        {
          q: 'Trebuie să fiu atlet?',
          a: 'Nu. Programul se adaptează la nivelul tău actual. Hiking-urile sunt scalabile, iar coaching-ul este personalizat. Dacă poți merge 30 min continuu, ești pregătit.'
        },
        {
          q: 'Pot veni dacă am o rănire veche?',
          a: 'Da, în majoritatea cazurilor. Vom face o pre-evaluare înainte și adaptăm programul. Nu oferim tratament medical, dar modificăm mișcarea conform limitărilor tale.'
        },
        {
          q: 'Ce se întâmplă după tabără?',
          a: 'Primești un plan de 90 zile + 2 sesiuni 1:1 follow-up în următoarele 60 de zile. Plus acces la grup privat pentru accountability și suport continuu.'
        },
        {
          q: 'Garantați rezultate?',
          a: 'Garantez că vei pleca cu claritate totală asupra ce trebuie să faci și cum. Rezultatele depind de execuția ta după tabără. 85% din participanți raportează 25%+ creștere în energie la 30 de zile.'
        },
        {
          q: 'Ce dacă am restricții alimentare?',
          a: 'Menționează orice restricții (vegetarian, alergii, etc) la înscriere. Vom acomoda 99% din cazuri cu meniuri adaptate.'
        },
        {
          q: 'Cât de mult merg pe zi?',
          a: 'Între 2-4 ore de hiking/zi, scalabil după nivel. Nu este despre distanță, ci despre mișcare consecventă + natură + coaching în paralel.'
        }
      ]
    },
    cta: {
      title: 'Gata să te transformi?',
      subtitle: 'Locuri limitate. Următoarea grupă pornește curând.',
      button: 'Rezervă Consultația Gratuită',
      subtext: '30 min. Fără obligații. Doar verificăm dacă e potrivit pentru tine.'
    },
    form: {
      title: 'Programează Consultația Gratuită',
      name: 'Nume Complet',
      email: 'Email',
      phone: 'Telefon (WhatsApp)',
      message: 'De ce vrei să participi?',
      submit: 'Trimite Cererea',
      success: 'Cerere trimisă! Te contactez în 24h.',
      error: 'Eroare. Încearcă din nou sau scrie direct la iulian@rhythmofleaders.pro'
    }
  },
  en: {
    nav: {
      schedule: 'Schedule',
      pricing: 'Pricing',
      faq: 'FAQ',
      book: 'Book Now',
      locations: 'Locations'
    },
    hero: {
      badge: '5-Day Intensive Retreat',
      title: 'Transform Your Body, Energy & Business in 5 Days',
      subtitle: 'Intensive coaching in nature',
      locations: {
        chamonix: 'Chamonix, France - Alps',
        corbu: 'Corbu, CT - Black Sea',
        transfagarasan: 'Transfăgărășan, Romania'
      },
      duration: '5-7 days',
      capacity: 'Max 8 people',
      cta: 'Book Free Consultation',
      dateNote: '📅 Departure date will be announced soon',
      selectLocation: 'Choose Location'
    },
    problems: {
      title: 'Do you recognize these challenges?',
      subtitle: 'Successful entrepreneurs face these realities daily',
      items: [
        {
          title: 'Neglected health',
          desc: 'Business first, body last'
        },
        {
          title: 'Inconsistent energy',
          desc: 'Mornings are OK, afternoons are devastating'
        },
        {
          title: 'Chronic stress',
          desc: 'Constant tension without real recovery'
        },
        {
          title: 'Misaligned habits',
          desc: 'You know what to do, but don\'t do it consistently'
        },
        {
          title: 'Lack of clarity',
          desc: 'Swimming in information but no clear direction'
        },
        {
          title: 'Performance plateau',
          desc: 'Stuck in energy, focus and results'
        }
      ]
    },
    solution: {
      title: 'The Solution: 5 Days. Intensive Coaching. Real Transformation.',
      subtitle: 'A unique format combining nature, movement and coaching for breakthrough',
      items: [
        {
          icon: Mountain,
          title: 'Daily Hikes + Breathing',
          desc: 'Functional movement in nature with breathing work for mental resilience'
        },
        {
          icon: Brain,
          title: '3M Model Coaching',
          desc: 'Mindset, Metabolism, Movement - the framework that works for executives'
        },
        {
          icon: Heart,
          title: 'Motivational Interviewing',
          desc: '1:1 sessions to identify real blocks and create action plan'
        },
        {
          icon: Wind,
          title: 'Recovery Protocols',
          desc: 'Recovery techniques for sleep, energy and sustained focus'
        },
        {
          icon: Users,
          title: 'Group + 1:1 Coaching',
          desc: 'High-performer community + personalized attention'
        },
        {
          icon: Sparkles,
          title: 'Knowledge Base',
          desc: 'Practical frameworks: nutrition, training, energy habits'
        }
      ]
    },
    schedule: {
      title: 'Daily Schedule',
      subtitle: 'Each day builds on previous progress',
      days: [
        {
          day: 'Day 1',
          title: 'Arrival & Assessment',
          activities: [
            '14:00 - Check-in & Welcome',
            '16:00 - Baseline Assessment (energy, focus, habits)',
            '18:00 - Orientation Hike (easy)',
            '19:30 - Dinner',
            '20:30 - Vision Session: Why are you here?'
          ]
        },
        {
          day: 'Day 2',
          title: 'Mindset Foundation',
          activities: [
            '07:00 - Morning Hike + Breathing Work',
            '09:00 - Breakfast',
            '10:00 - Workshop: 3M Model - Mindset',
            '12:00 - Lunch',
            '14:00 - 1:1 Coaching Sessions',
            '16:00 - Recovery Protocol Training',
            '19:00 - Dinner',
            '20:00 - Group Reflection'
          ]
        },
        {
          day: 'Day 3',
          title: 'Metabolism Mastery',
          activities: [
            '07:00 - Sunrise Hike (medium intensity)',
            '09:00 - Breakfast',
            '10:00 - Workshop: Nutrition for Sustained Energy',
            '12:00 - Lunch',
            '14:00 - Strength Fundamentals Session',
            '16:00 - 1:1 Coaching Sessions',
            '19:00 - Dinner',
            '20:00 - Planning Session: Habit Stacking'
          ]
        },
        {
          day: 'Day 4',
          title: 'Movement Integration',
          activities: [
            '07:00 - Challenge Hike (high intensity)',
            '09:00 - Breakfast',
            '10:00 - Workshop: Movement for Executives',
            '12:00 - Lunch',
            '14:00 - Business Integration Workshop',
            '16:00 - Final 1:1 Coaching',
            '19:00 - Celebration Dinner',
            '20:00 - Transformation Stories'
          ]
        },
        {
          day: 'Day 5',
          title: 'Integration & Departure',
          activities: [
            '07:00 - Final Sunrise Hike',
            '09:00 - Breakfast',
            '10:00 - 90-Day Action Plan Creation',
            '12:00 - Closing Lunch',
            '14:00 - Departure',
            '+ Follow-up: 2 x 1:1 sessions in next 60 days'
          ]
        }
      ]
    },
    included: {
      title: 'What\'s Included',
      yes: [
        'Accommodation 4 nights (single/twin room)',
        '5 days intensive coaching',
        'All meals (breakfast, lunch, dinner)',
        'Daily hiking & breathing sessions',
        'Workshops & training materials',
        '3 x 1:1 coaching sessions',
        'Recovery protocols & tools',
        '2 follow-up sessions (60 days)',
        'Knowledge base access',
        'Community support group'
      ],
      no: [
        'Transport to destination',
        'Personal equipment (hiking boots, etc)',
        'Travel insurance',
        'Personal expenses'
      ]
    },
    pricing: {
      title: 'Investment',
      subtitle: 'Three options for each booking stage',
      plans: [
        {
          name: 'Early Bird',
          price: '1.499',
          spots: 'First 3 spots',
          badge: null
        },
        {
          name: 'Standard',
          price: '1.799',
          spots: 'Next 3 spots',
          badge: 'POPULAR'
        },
        {
          name: 'Last Spots',
          price: '1.999',
          spots: 'Final 2 spots',
          badge: null
        }
      ],
      payment: '💳 Option: Payment plan in 3 installments',
      cta: 'Book Now',
      note: 'Limited spots for maximum quality'
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          q: 'Do I need to be an athlete?',
          a: 'No. The program adapts to your current level. Hikes are scalable and coaching is personalized. If you can walk 30 min continuously, you\'re ready.'
        },
        {
          q: 'Can I come if I have an old injury?',
          a: 'Yes, in most cases. We\'ll do a pre-evaluation and adapt the program. We don\'t provide medical treatment, but we modify movement according to your limitations.'
        },
        {
          q: 'What happens after the retreat?',
          a: 'You get a 90-day plan + 2 x 1:1 follow-up sessions in the next 60 days. Plus access to private group for accountability and ongoing support.'
        },
        {
          q: 'Do you guarantee results?',
          a: 'I guarantee you\'ll leave with total clarity on what to do and how. Results depend on your execution after. 85% of participants report 25%+ increase in energy at 30 days.'
        },
        {
          q: 'What if I have dietary restrictions?',
          a: 'Mention any restrictions (vegetarian, allergies, etc) at registration. We\'ll accommodate 99% of cases with adapted menus.'
        },
        {
          q: 'How much walking per day?',
          a: 'Between 2-4 hours hiking/day, scalable by level. It\'s not about distance, but consistent movement + nature + coaching in parallel.'
        }
      ]
    },
    cta: {
      title: 'Ready to transform?',
      subtitle: 'Limited spots. Next group starting soon.',
      button: 'Book Free Consultation',
      subtext: '30 min. No obligations. Just checking if it\'s right for you.'
    },
    form: {
      title: 'Schedule Free Consultation',
      name: 'Full Name',
      email: 'Email',
      phone: 'Phone (WhatsApp)',
      message: 'Why do you want to participate?',
      submit: 'Send Request',
      success: 'Request sent! I\'ll contact you within 24h.',
      error: 'Error. Try again or write directly to iulian@rhythmofleaders.pro'
    }
  },
  fr: {
    nav: {
      schedule: 'Programme',
      pricing: 'Tarifs',
      faq: 'FAQ',
      book: 'Réserver',
      locations: 'Lieux'
    },
    hero: {
      badge: 'Retraite Intensive 5 Jours',
      title: 'Transformez Votre Corps, Énergie & Business en 5 Jours',
      subtitle: 'Coaching intensif dans la nature',
      locations: {
        chamonix: 'Chamonix, France - Alpes',
        corbu: 'Corbu, CT - Mer Noire',
        transfagarasan: 'Transfăgărășan, Roumanie'
      },
      duration: '5-7 jours',
      capacity: 'Max 8 personnes',
      cta: 'Réserver Consultation Gratuite',
      dateNote: '📅 La date de départ sera annoncée bientôt',
      selectLocation: 'Choisir le Lieu'
    },
    problems: {
      title: 'Reconnaissez-vous ces défis?',
      subtitle: 'Les entrepreneurs à succès font face à ces réalités quotidiennement',
      items: [
        { title: 'Santé négligée', desc: 'Business en premier, corps en dernier' },
        { title: 'Énergie inconstante', desc: 'Les matins vont bien, les après-midis sont dévastateurs' },
        { title: 'Stress chronique', desc: 'Tension constante sans vraie récupération' },
        { title: 'Habitudes désalignées', desc: 'Vous savez quoi faire, mais ne le faites pas régulièrement' },
        { title: 'Manque de clarté', desc: 'Nager dans l\'information mais pas de direction claire' },
        { title: 'Plateau de performance', desc: 'Bloqué en énergie, focus et résultats' }
      ]
    },
    solution: {
      title: 'La Solution: 5 Jours. Coaching Intensif. Vraie Transformation.',
      subtitle: 'Un format unique combinant nature, mouvement et coaching pour percée',
      items: [
        { icon: Mountain, title: 'Randonnées + Respiration', desc: 'Mouvement fonctionnel dans la nature avec travail respiratoire pour résilience mentale' },
        { icon: Brain, title: 'Coaching Modèle 3M', desc: 'Mindset, Métabolisme, Mouvement - le framework qui fonctionne pour les dirigeants' },
        { icon: Heart, title: 'Entretien Motivationnel', desc: 'Sessions 1:1 pour identifier les vrais blocages et créer plan d\'action' },
        { icon: Wind, title: 'Protocoles Récupération', desc: 'Techniques de récupération pour sommeil, énergie et focus soutenu' },
        { icon: Users, title: 'Coaching Groupe + 1:1', desc: 'Communauté de hauts performers + attention personnalisée' },
        { icon: Sparkles, title: 'Base de Connaissances', desc: 'Frameworks pratiques: nutrition, entraînement, habitudes d\'énergie' }
      ]
    },
    schedule: {
      title: 'Programme Quotidien',
      subtitle: 'Chaque jour s\'appuie sur les progrès précédents',
      days: [
        { day: 'Jour 1', title: 'Arrivée & Évaluation', activities: ['14:00 - Enregistrement & Bienvenue', '16:00 - Évaluation Baseline (énergie, focus, habitudes)', '18:00 - Randonnée d\'Orientation (facile)', '19:30 - Dîner', '20:30 - Session Vision: Pourquoi êtes-vous ici?'] },
        { day: 'Jour 2', title: 'Fondation Mindset', activities: ['07:00 - Randonnée Matinale + Travail Respiration', '09:00 - Petit déjeuner', '10:00 - Workshop: Modèle 3M - Mindset', '12:00 - Déjeuner', '14:00 - Sessions Coaching 1:1', '16:00 - Formation Protocole Récupération', '19:00 - Dîner', '20:00 - Réflexion de Groupe'] },
        { day: 'Jour 3', title: 'Maîtrise Métabolisme', activities: ['07:00 - Randonnée Lever du Soleil (intensité moyenne)', '09:00 - Petit déjeuner', '10:00 - Workshop: Nutrition pour Énergie Soutenue', '12:00 - Déjeuner', '14:00 - Session Fondamentaux Force', '16:00 - Sessions Coaching 1:1', '19:00 - Dîner', '20:00 - Session Planification: Empilement Habitudes'] },
        { day: 'Jour 4', title: 'Intégration Mouvement', activities: ['07:00 - Randonnée Challenge (haute intensité)', '09:00 - Petit déjeuner', '10:00 - Workshop: Mouvement pour Dirigeants', '12:00 - Déjeuner', '14:00 - Workshop Intégration Business', '16:00 - Coaching Final 1:1', '19:00 - Dîner Célébration', '20:00 - Histoires de Transformation'] },
        { day: 'Jour 5', title: 'Intégration & Départ', activities: ['07:00 - Dernière Randonnée Lever Soleil', '09:00 - Petit déjeuner', '10:00 - Création Plan Action 90 Jours', '12:00 - Déjeuner de Clôture', '14:00 - Départ', '+ Suivi: 2 sessions 1:1 dans les 60 prochains jours'] }
      ]
    },
    included: {
      title: 'Ce qui est Inclus',
      yes: ['Hébergement 4 nuits (chambre simple/double)', '5 jours coaching intensif', 'Tous les repas (petit déjeuner, déjeuner, dîner)', 'Sessions randonnée & respiration quotidiennes', 'Workshops & matériel formation', '3 sessions coaching 1:1', 'Protocoles & outils récupération', '2 sessions suivi (60 jours)', 'Accès base connaissances', 'Groupe soutien communautaire'],
      no: ['Transport vers destination', 'Équipement personnel (chaussures randonnée, etc)', 'Assurance voyage', 'Dépenses personnelles']
    },
    pricing: {
      title: 'Investissement',
      subtitle: 'Trois options pour chaque étape de réservation',
      plans: [
        { name: 'Early Bird', price: '1.499', spots: 'Premières 3 places', badge: null },
        { name: 'Standard', price: '1.799', spots: 'Prochaines 3 places', badge: 'POPULAIRE' },
        { name: 'Dernières Places', price: '1.999', spots: 'Dernières 2 places', badge: null }
      ],
      payment: '💳 Option: Plan de paiement en 3 versements',
      cta: 'Réserver Maintenant',
      note: 'Places limitées pour qualité maximale'
    },
    faq: {
      title: 'Questions Fréquentes',
      items: [
        { q: 'Dois-je être athlète?', a: 'Non. Le programme s\'adapte à votre niveau actuel. Les randonnées sont évolutives et le coaching personnalisé. Si vous pouvez marcher 30 min en continu, vous êtes prêt.' },
        { q: 'Puis-je venir avec une ancienne blessure?', a: 'Oui, dans la plupart des cas. Nous ferons une pré-évaluation et adapterons le programme. Nous n\'offrons pas de traitement médical, mais modifions le mouvement selon vos limitations.' },
        { q: 'Que se passe-t-il après la retraite?', a: 'Vous obtenez un plan de 90 jours + 2 sessions 1:1 de suivi dans les 60 prochains jours. Plus accès au groupe privé pour responsabilité et soutien continu.' },
        { q: 'Garantissez-vous des résultats?', a: 'Je garantis que vous partirez avec une clarté totale sur quoi faire et comment. Les résultats dépendent de votre exécution après. 85% des participants rapportent 25%+ d\'augmentation d\'énergie à 30 jours.' },
        { q: 'Et si j\'ai des restrictions alimentaires?', a: 'Mentionnez toute restriction (végétarien, allergies, etc) à l\'inscription. Nous accommoderons 99% des cas avec menus adaptés.' },
        { q: 'Combien de marche par jour?', a: 'Entre 2-4 heures randonnée/jour, évolutif par niveau. Ce n\'est pas la distance, mais le mouvement constant + nature + coaching en parallèle.' }
      ]
    },
    cta: {
      title: 'Prêt à vous transformer?',
      subtitle: 'Places limitées. Prochain groupe démarre bientôt.',
      button: 'Réserver Consultation Gratuite',
      subtext: '30 min. Sans obligation. Juste vérifier si c\'est bon pour vous.'
    },
    form: {
      title: 'Planifier Consultation Gratuite',
      name: 'Nom Complet',
      email: 'Email',
      phone: 'Téléphone (WhatsApp)',
      message: 'Pourquoi voulez-vous participer?',
      submit: 'Envoyer Demande',
      success: 'Demande envoyée! Je vous contacte sous 24h.',
      error: 'Erreur. Réessayez ou écrivez directement à iulian@rhythmofleaders.pro'
    }
  }
};

export default function Retreat() {
  const [lang, setLang] = useState('ro');
  const [location, setLocation] = useState('chamonix');
  const [openDay, setOpenDay] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', location: 'chamonix' });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Scroll depth tracking
  useEffect(() => {
    let tracked25 = false, tracked50 = false, tracked75 = false, tracked100 = false;
    
    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrolled > 25 && !tracked25) { trackScrollDepth('retreat', 25); tracked25 = true; }
      if (scrolled > 50 && !tracked50) { trackScrollDepth('retreat', 50); tracked50 = true; }
      if (scrolled > 75 && !tracked75) { trackScrollDepth('retreat', 75); tracked75 = true; }
      if (scrolled > 90 && !tracked100) { trackScrollDepth('retreat', 100); tracked100 = true; }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const retreatConfig = RETREAT_CONFIG;

  const t = content[lang];

  const handleBookingSuccess = (bookingData) => {
    setShowBookingModal(false);
    setBookingConfirmation(bookingData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${API_URL}/api/consultation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          message: formData.message,
          lang,
        }),
      });
      if (!response.ok) throw new Error('Failed');

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '', location: 'chamonix' });

      setTimeout(() => {
        setShowForm(false);
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      <Navbar lang={lang} setLang={setLang} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-100 to-emerald-100 rounded-full mb-6">
              <Mountain className="w-4 h-4 text-teal-700" />
              <span className="text-teal-800 font-semibold text-sm">{t.hero.badge}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
              {t.hero.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12">
              {t.hero.subtitle}
            </p>

            {/* Location Selector */}
            <div className="mb-12 max-w-3xl mx-auto">
              <p className="text-slate-600 font-semibold mb-4">{t.hero.selectLocation}</p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { id: 'chamonix', label: t.hero.locations.chamonix, icon: Mountain },
                  { id: 'corbu', label: t.hero.locations.corbu, icon: Sun },
                  { id: 'transfagarasan', label: t.hero.locations.transfagarasan, icon: Mountain }
                ].map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setLocation(loc.id)}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      location === loc.id
                        ? 'border-teal-600 bg-teal-50 shadow-lg'
                        : 'border-slate-200 bg-white hover:border-teal-300'
                    }`}
                  >
                    <loc.icon className={`w-8 h-8 mx-auto mb-2 ${location === loc.id ? 'text-teal-600' : 'text-slate-400'}`} />
                    <p className={`font-bold ${location === loc.id ? 'text-teal-900' : 'text-slate-700'}`}>{loc.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
              {[
                { icon: Calendar, label: t.hero.duration },
                { icon: Users, label: t.hero.capacity }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="p-6 bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                >
                  <item.icon className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                  <p className="text-slate-900 font-bold">{item.label}</p>
                </motion.div>
              ))}
            </div>

            <button 
              onClick={() => setShowForm(true)}
              className="px-10 py-5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-lg font-bold rounded-full shadow-2xl shadow-teal-500/30 hover:scale-105 hover:shadow-teal-500/50 transition-all duration-300 inline-flex items-center gap-3"
            >
              {t.hero.cta}
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-amber-700 mt-6 font-medium">{t.hero.dateNote}</p>
          </motion.div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{t.problems.title}</h2>
            <p className="text-xl text-slate-400">{t.problems.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.problems.items.map((item, i) => (
              <motion.div
                key={i}
                className="p-8 bg-slate-800/50 border border-slate-700 rounded-3xl hover:bg-slate-800 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <X className="w-8 h-8 text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">{t.solution.title}</h2>
            <p className="text-xl text-slate-600">{t.solution.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.solution.items.map((item, i) => (
              <motion.div
                key={i}
                className="p-8 bg-gradient-to-br from-white to-teal-50 rounded-3xl shadow-xl border border-teal-100 hover:shadow-2xl hover:scale-105 transition-all"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section id="schedule" className="py-20 px-6 bg-gradient-to-br from-slate-900 to-teal-900">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{t.schedule.title}</h2>
            <p className="text-xl text-slate-300">{t.schedule.subtitle}</p>
          </motion.div>

          <div className="space-y-4">
            {t.schedule.days.map((day, i) => (
              <motion.div
                key={i}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <button
                  onClick={() => setOpenDay(openDay === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full">
                      <span className="text-white font-bold">{day.day}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{day.title}</h3>
                  </div>
                  {openDay === i ? (
                    <ChevronUp className="w-6 h-6 text-white" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-white" />
                  )}
                </button>
                
                {openDay === i && (
                  <div className="px-6 pb-6 space-y-2">
                    {day.activities.map((activity, j) => (
                      <div key={j} className="flex items-start gap-3 py-2">
                        <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">{activity}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 text-center mb-16">{t.included.title}</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Included */}
            <div className="p-10 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl border border-emerald-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-600 rounded-full">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Inclus</h3>
              </div>
              <ul className="space-y-3">
                {t.included.yes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not Included */}
            <div className="p-10 bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl border border-red-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-600 rounded-full">
                  <X className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Nu este inclus</h3>
              </div>
              <ul className="space-y-3">
                {t.included.no.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery & Calculator */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <LocationGallery location={location} lang={lang} />
            <CostCalculator lang={lang} />
          </div>
          
          <LocationTestimonials location={location} lang={lang} />
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-slate-900 mb-4">
              {lang === 'ro' ? 'Rezervă Acum' : lang === 'fr' ? 'Réservez Maintenant' : 'Book Now'}
            </h2>
            <p className="text-xl text-slate-600">
              {lang === 'ro' ? 'Completează formularul și primești confirmare imediată' : lang === 'fr' ? 'Remplissez le formulaire et recevez confirmation immédiate' : 'Fill out the form and get instant confirmation'}
            </p>
          </div>

          <ReservationForm 
            lang={lang} 
            retreatConfig={retreatConfig}
            onSuccess={handleBookingSuccess}
          />
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{t.pricing.title}</h2>
            <p className="text-xl text-slate-300 mb-2">{t.pricing.subtitle}</p>
            <p className="text-amber-400 font-medium">{t.pricing.payment}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {t.pricing.plans.map((plan, i) => (
              <motion.div
                key={i}
                className={`relative p-10 rounded-3xl border-2 ${
                  plan.badge 
                    ? 'bg-gradient-to-br from-amber-500 to-orange-500 border-amber-400 shadow-2xl shadow-amber-500/30 scale-105' 
                    : 'bg-white/5 backdrop-blur-sm border-white/10'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-slate-900 text-amber-400 text-sm font-bold rounded-full">
                    {plan.badge}
                  </div>
                )}
                
                <h3 className={`text-2xl font-black mb-2 ${plan.badge ? 'text-white' : 'text-white'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.badge ? 'text-white/80' : 'text-slate-400'}`}>
                  {plan.spots}
                </p>
                
                <div className="flex items-baseline gap-2 mb-8">
                  <span className={`text-5xl font-black ${plan.badge ? 'text-white' : 'text-white'}`}>
                    €{plan.price}
                  </span>
                </div>

                <button 
                  onClick={() => setShowForm(true)}
                  className={`w-full py-4 rounded-xl font-bold transition-all ${
                    plan.badge
                      ? 'bg-slate-900 text-amber-400 hover:bg-slate-800'
                      : 'bg-white text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {t.pricing.cta}
                </button>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-slate-400 text-sm">{t.pricing.note}</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 text-center mb-16">{t.faq.title}</h2>
          
          <div className="space-y-4">
            {t.faq.items.map((item, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
                >
                  <span className="text-lg font-bold text-slate-900 pr-4">{item.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-6 h-6 text-teal-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-slate-600 leading-relaxed">{item.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 bg-gradient-to-br from-teal-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">{t.cta.title}</h2>
            <p className="text-xl text-white/90 mb-12">{t.cta.subtitle}</p>
            
            <button 
              onClick={() => setShowForm(true)}
              className="px-12 py-6 bg-white text-teal-600 text-xl font-black rounded-full shadow-2xl hover:scale-105 hover:shadow-white/50 transition-all inline-flex items-center gap-3"
            >
              {t.cta.button}
              <ArrowRight className="w-6 h-6" />
            </button>
            
            <p className="text-white/80 mt-6 text-sm">{t.cta.subtext}</p>
          </motion.div>
        </div>
      </section>

      {/* Terms & Conditions Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-slate-900 mb-8">
            {lang === 'ro' ? 'Termeni și Condiții' : lang === 'fr' ? 'Conditions Générales' : 'Terms & Conditions'}
          </h2>
          
          <div className="bg-white rounded-3xl p-8 shadow-lg space-y-6 text-slate-700">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {lang === 'ro' ? '1. Rezervare și Plată' : lang === 'fr' ? '1. Réservation et Paiement' : '1. Booking & Payment'}
              </h3>
              <p className="leading-relaxed">
                {lang === 'ro' 
                  ? 'Rezervarea devine definitivă după plata avansului de 30% din costul total. Restul sumei se achită cu 14 zile înainte de data plecării. Acceptăm plăți în rate conform planului convenit.'
                  : lang === 'fr'
                  ? 'La réservation devient définitive après paiement d\'un acompte de 30% du coût total. Le solde est dû 14 jours avant la date de départ. Nous acceptons les paiements échelonnés selon le plan convenu.'
                  : 'Booking becomes final after 30% deposit payment. Balance due 14 days before departure. Installment plans accepted as agreed.'}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {lang === 'ro' ? '2. Anulare și Rambursare' : lang === 'fr' ? '2. Annulation et Remboursement' : '2. Cancellation & Refund'}
              </h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>{lang === 'ro' ? 'Cu 30+ zile înainte: 100% rambursare' : lang === 'fr' ? '30+ jours avant: 100% remboursement' : '30+ days before: 100% refund'}</li>
                <li>{lang === 'ro' ? '15-29 zile înainte: 50% rambursare' : lang === 'fr' ? '15-29 jours avant: 50% remboursement' : '15-29 days before: 50% refund'}</li>
                <li>{lang === 'ro' ? 'Sub 14 zile: fără rambursare (posibilitate transfer la alt participant)' : lang === 'fr' ? 'Moins de 14 jours: pas de remboursement (transfert possible)' : 'Under 14 days: no refund (transfer option available)'}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {lang === 'ro' ? '3. Responsabilitate' : lang === 'fr' ? '3. Responsabilité' : '3. Liability'}
              </h3>
              <p className="leading-relaxed">
                {lang === 'ro'
                  ? 'Participanții sunt responsabili pentru propria sănătate și asigurare. Este obligatorie prezentarea certificatului medical care atestă capacitatea de efort fizic. Nu oferim servicii medicale și recomandăm asigurare de călătorie.'
                  : lang === 'fr'
                  ? 'Les participants sont responsables de leur propre santé et assurance. Certificat médical obligatoire attestant la capacité d\'effort physique. Nous ne fournissons pas de services médicaux et recommandons une assurance voyage.'
                  : 'Participants responsible for own health and insurance. Medical certificate required attesting physical capacity. We do not provide medical services and recommend travel insurance.'}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {lang === 'ro' ? '4. Modificări Program' : lang === 'fr' ? '4. Modifications Programme' : '4. Program Changes'}
              </h3>
              <p className="leading-relaxed">
                {lang === 'ro'
                  ? 'Ne rezervăm dreptul de a modifica programul în funcție de condiții meteo, siguranță sau circumstanțe de forță majoră. Participanții vor fi informați imediat despre orice modificare.'
                  : lang === 'fr'
                  ? 'Nous nous réservons le droit de modifier le programme en fonction des conditions météorologiques, de la sécurité ou de circonstances de force majeure. Les participants seront informés immédiatement.'
                  : 'We reserve the right to modify program due to weather, safety, or force majeure. Participants will be informed immediately of any changes.'}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {lang === 'ro' ? '5. Cod de Conduită' : lang === 'fr' ? '5. Code de Conduite' : '5. Code of Conduct'}
              </h3>
              <p className="leading-relaxed">
                {lang === 'ro'
                  ? 'Participanții se angajează să respecte instructorii, ceilalți participanți și locațiile vizitate. Comportament inadecvat poate duce la excludere fără rambursare.'
                  : lang === 'fr'
                  ? 'Les participants s\'engagent à respecter les instructeurs, autres participants et les sites visités. Un comportement inapproprié peut entraîner l\'exclusion sans remboursement.'
                  : 'Participants commit to respecting instructors, other participants, and visited locations. Inappropriate behavior may result in exclusion without refund.'}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-500">
                {lang === 'ro'
                  ? 'Prin rezervare, confirmați că ați citit și acceptat termenii și condițiile.'
                  : lang === 'fr'
                  ? 'En réservant, vous confirmez avoir lu et accepté les conditions générales.'
                  : 'By booking, you confirm you have read and accepted the terms and conditions.'}
              </p>
              <p className="text-sm text-slate-500 mt-2">
                CUI: RO53532866 | {lang === 'ro' ? 'Contact' : 'Contact'}: +40 750 497 638
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Confirmation Modal */}
      {bookingConfirmation && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div 
            className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-emerald-600" />
              </div>
              
              <h2 className="text-3xl font-black text-slate-900 mb-4">
                {lang === 'ro' ? 'Rezervare Confirmată!' : lang === 'fr' ? 'Réservation Confirmée!' : 'Booking Confirmed!'}
              </h2>
              
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 mb-6 text-left">
                <h3 className="font-bold text-slate-900 mb-4">
                  {lang === 'ro' ? 'Detalii Rezervare' : lang === 'fr' ? 'Détails Réservation' : 'Booking Details'}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600">{lang === 'ro' ? 'Nume' : lang === 'fr' ? 'Nom' : 'Name'}:</span>
                    <span className="font-semibold text-slate-900">{bookingConfirmation.formData.participant_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">{lang === 'ro' ? 'Total' : 'Total'}:</span>
                    <span className="font-bold text-teal-600">€{bookingConfirmation.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">{lang === 'ro' ? 'Avans (30%)' : lang === 'fr' ? 'Acompte (30%)' : 'Deposit (30%)'}:</span>
                    <span className="font-bold text-slate-900">€{bookingConfirmation.deposit}</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 mb-6">
                {lang === 'ro' 
                  ? 'Am trimis un email cu detaliile complete. Te contactăm în maxim 24 ore pentru finalizarea rezervării.'
                  : lang === 'fr'
                  ? 'Nous avons envoyé un email avec tous les détails. Nous vous contacterons sous 24h pour finaliser.'
                  : 'We sent an email with full details. We will contact you within 24 hours to finalize.'}
              </p>

              <button
                onClick={() => setBookingConfirmation(null)}
                className="px-8 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
              >
                {lang === 'ro' ? 'Închide' : lang === 'fr' ? 'Fermer' : 'Close'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div 
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-slate-900">{t.form.title}</h3>
              <button 
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            {submitStatus === 'success' ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-emerald-600" />
                </div>
                <p className="text-lg font-bold text-slate-900">{t.form.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t.form.name}</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t.form.email}</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t.form.phone}</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t.hero.selectLocation}</label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="chamonix">{t.hero.locations.chamonix}</option>
                    <option value="corbu">{t.hero.locations.corbu}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t.form.message}</label>
                  <textarea
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                {submitStatus === 'error' && (
                  <p className="text-red-600 text-sm">{t.form.error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50"
                >
                  {submitting ? '...' : t.form.submit}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <p className="text-slate-400">© 2026 Rhythm of Leaders. All rights reserved.</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-slate-500">
            <span>CUI: RO53532866</span>
            <span className="hidden md:inline">•</span>
            <span>{lang === 'ro' ? 'Contact' : lang === 'fr' ? 'Contact' : 'Contact'}: +40 750 497 638</span>
            <span className="hidden md:inline">•</span>
            <a 
              href="https://anpc.ro/ce-este-sal/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300 transition-colors"
            >
              {lang === 'ro' ? 'Soluționare Online Litigii (SAL) - ANPC' : lang === 'fr' ? 'Résolution Litiges en Ligne - ANPC' : 'Online Dispute Resolution (SAL) - ANPC'}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}