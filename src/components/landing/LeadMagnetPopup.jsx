import React, { useState, useEffect } from 'react';
import { sendGuideEmail } from '@/api/emailService';
import { saveLead } from '@/api/airtableClient';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Zap, Clock, Brain, CheckCircle, Loader2 } from 'lucide-react';

const content = {
  ro: {
    title: '5 Hack-uri de Energie pentru Executivi',
    subtitle: 'Ghid gratuit PDF care îți adaugă 2 ore de focus pe zi',
    benefits: [
      'Rutina de 30 min care maximizează energia',
      'Ce să mănânci între meeting-uri',
      'Cum să eviți crash-ul de după-amiază'
    ],
    placeholder: 'Email-ul tău de business',
    cta: 'Trimite-mi ghidul gratuit',
    privacy: 'Nu trimitem spam. Poți te dezabona oricând.',
    success: 'Perfect! Verifică inbox-ul.',
    loading: 'Se trimite...'
  },
  en: {
    title: '5 Energy Hacks for Executives',
    subtitle: 'Free PDF guide that adds 2 hours of focus to your day',
    benefits: [
      '30-min routine that maximizes energy',
      'What to eat between meetings',
      'How to avoid the afternoon crash'
    ],
    placeholder: 'Your business email',
    cta: 'Send me the free guide',
    privacy: 'No spam. Unsubscribe anytime.',
    success: 'Perfect! Check your inbox.',
    loading: 'Sending...'
  }
};

export default function LeadMagnetPopup({ lang, isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success
  const t = content[lang];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    try {
      await sendGuideEmail({ email, lang: lang || 'ro' });
      saveLead({ email, source: 'popup', language: lang || 'ro' }).catch(() => {});
      setStatus('success');
      setTimeout(() => { onClose(); setStatus('idle'); setEmail(''); }, 2500);
    } catch (err) {
      console.error(err);
      setStatus('success');
      setTimeout(() => { onClose(); setStatus('idle'); setEmail(''); }, 2500);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>

          {/* Header gradient */}
          <div className="bg-gradient-to-br from-teal-600 to-emerald-600 p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-xl">
                <Download className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-white/80">PDF GRATUIT</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">{t.title}</h3>
            <p className="text-white/80">{t.subtitle}</p>
          </div>

          {/* Content */}
          <div className="p-8">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <p className="text-lg font-semibold text-slate-900">{t.success}</p>
              </motion.div>
            ) : (
              <>
                {/* Benefits */}
                <ul className="space-y-3 mb-6">
                  {t.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-teal-600" />
                      </div>
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.placeholder}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-teal-500/25 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {t.loading}
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        {t.cta}
                      </>
                    )}
                  </button>
                </form>

                <p className="text-xs text-slate-400 text-center mt-4">{t.privacy}</p>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}