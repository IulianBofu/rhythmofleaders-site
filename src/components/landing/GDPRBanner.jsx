import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Check, Settings } from 'lucide-react';

const content = {
  ro: {
    title: 'Folosim cookies',
    description: 'Acest site folosește cookies pentru a îmbunătăți experiența ta. Acceptând, ești de acord cu politica noastră de confidențialitate.',
    acceptAll: 'Accept toate',
    acceptNecessary: 'Doar necesare',
    customize: 'Personalizează',
    privacy: 'Politica de confidențialitate',
    settings: {
      title: 'Setări cookies',
      necessary: {
        title: 'Necesare',
        desc: 'Esențiale pentru funcționarea site-ului',
        required: true
      },
      analytics: {
        title: 'Analitice',
        desc: 'Ne ajută să îmbunătățim site-ul',
        required: false
      },
      marketing: {
        title: 'Marketing',
        desc: 'Pentru conținut personalizat',
        required: false
      },
      save: 'Salvează preferințele'
    }
  },
  en: {
    title: 'We use cookies',
    description: 'This site uses cookies to improve your experience. By accepting, you agree to our privacy policy.',
    acceptAll: 'Accept all',
    acceptNecessary: 'Only necessary',
    customize: 'Customize',
    privacy: 'Privacy policy',
    settings: {
      title: 'Cookie settings',
      necessary: {
        title: 'Necessary',
        desc: 'Essential for site functionality',
        required: true
      },
      analytics: {
        title: 'Analytics',
        desc: 'Help us improve the site',
        required: false
      },
      marketing: {
        title: 'Marketing',
        desc: 'For personalized content',
        required: false
      },
      save: 'Save preferences'
    }
  },
  fr: {
    title: 'Nous utilisons des cookies',
    description: 'Ce site utilise des cookies pour améliorer votre expérience. En acceptant, vous acceptez notre politique de confidentialité.',
    acceptAll: 'Accepter tout',
    acceptNecessary: 'Seulement nécessaires',
    customize: 'Personnaliser',
    privacy: 'Politique de confidentialité',
    settings: {
      title: 'Paramètres des cookies',
      necessary: {
        title: 'Nécessaires',
        desc: 'Essentiels pour le fonctionnement du site',
        required: true
      },
      analytics: {
        title: 'Analytiques',
        desc: 'Nous aident à améliorer le site',
        required: false
      },
      marketing: {
        title: 'Marketing',
        desc: 'Pour du contenu personnalisé',
        required: false
      },
      save: 'Enregistrer les préférences'
    }
  }
};

export default function GDPRBanner({ lang }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  });
  const t = content[lang] || content.en;

  useEffect(() => {
    const consent = localStorage.getItem('gdpr_consent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const saveConsent = (type) => {
    localStorage.setItem('gdpr_consent', JSON.stringify({
      type,
      preferences,
      date: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    setPreferences({ necessary: true, analytics: true, marketing: true });
    saveConsent('all');
  };

  const handleAcceptNecessary = () => {
    setPreferences({ necessary: true, analytics: false, marketing: false });
    saveConsent('necessary');
  };

  const handleSavePreferences = () => {
    saveConsent('custom');
    setShowSettings(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
      >
        <div className="max-w-4xl mx-auto">
          {showSettings ? (
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900">{t.settings.title}</h3>
                <button onClick={() => setShowSettings(false)} aria-label="Close settings" className="p-2 hover:bg-slate-100 rounded-lg">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {['necessary', 'analytics', 'marketing'].map((key) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-slate-900">{t.settings[key].title}</p>
                      <p className="text-sm text-slate-500">{t.settings[key].desc}</p>
                    </div>
                    <button
                      onClick={() => !t.settings[key].required && setPreferences(p => ({ ...p, [key]: !p[key] }))}
                      disabled={t.settings[key].required}
                      className={`w-12 h-7 rounded-full transition-colors relative ${
                        preferences[key] ? 'bg-teal-500' : 'bg-slate-300'
                      } ${t.settings[key].required ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        preferences[key] ? 'left-6' : 'left-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSavePreferences}
                className="w-full py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition-colors"
              >
                {t.settings.save}
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-2 bg-teal-100 rounded-xl flex-shrink-0">
                    <Cookie className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{t.title}</h3>
                    <p className="text-sm text-slate-500">{t.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setShowSettings(true)}
                    className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    {t.customize}
                  </button>
                  <button
                    onClick={handleAcceptNecessary}
                    className="px-4 py-2.5 text-sm font-medium text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
                  >
                    {t.acceptNecessary}
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-4 py-2.5 text-sm font-semibold text-white bg-teal-500 hover:bg-teal-600 rounded-xl transition-colors flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    {t.acceptAll}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}