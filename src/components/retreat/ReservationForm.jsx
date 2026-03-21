import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import { base44 } from '@/api/base44Client';
import { Euro, Users, Home, Zap, ChevronDown, Check } from 'lucide-react';
import { saveLead } from '@/api/airtableClient';

const API_URL = import.meta.env.VITE_API_URL ?? '';

export default function ReservationForm({ lang, retreatConfig, onSuccess }) {
  const [formData, setFormData] = useState({
    participant_name: '',
    participant_email: '',
    participant_phone: '',
    camp_location: 'chamonix',
    room_type: 'shared',
    pricing_tier: 'early_bird',
    extras: [],
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [total, setTotal] = useState(0);

  const labels = {
    ro: { name: 'Nume Complet', email: 'Email', phone: 'Telefon', location: 'Locație', room: 'Tip Cameră', tier: 'Tier Preț', extras: 'Extras', message: 'Mesaj', submit: 'Rezervă Acum', deposit: 'Avans 30%', total: 'Total' },
    en: { name: 'Full Name', email: 'Email', phone: 'Phone', location: 'Location', room: 'Room Type', tier: 'Pricing Tier', extras: 'Extras', message: 'Message', submit: 'Book Now', deposit: '30% Deposit', total: 'Total' },
    fr: { name: 'Nom Complet', email: 'Email', phone: 'Téléphone', location: 'Lieu', room: 'Type Chambre', tier: 'Tier Prix', extras: 'Extras', message: 'Message', submit: 'Réserver', deposit: 'Acompte 30%', total: 'Total' }
  };

  const t = labels[lang] || labels.en;

  useEffect(() => {
    calculateTotal();
  }, [formData, retreatConfig]);

  const calculateTotal = () => {
    if (!retreatConfig) return;

    const tier = retreatConfig.pricing_tiers.find(t => t.id === formData.pricing_tier);
    const room = retreatConfig.room_types.find(r => r.id === formData.room_type);

    if (!tier || !room) return;

    const langKey = lang === 'ro' ? 'ro' : lang === 'fr' ? 'fr' : 'en';
    const basePrice = tier[`base_price_${langKey}`];
    const roomAdj = room[`price_adjustment_${langKey}`];
    
    let price = basePrice + roomAdj;

    const selectedExtras = formData.extras.filter(e => e.selected);
    selectedExtras.forEach(extra => {
      const extraData = retreatConfig.extras.find(x => x.id === extra.id);
      if (extraData) {
        price += extraData[`price_${langKey}`];
      }
    });

    setTotal(Math.round(price));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const deposit = Math.round(total * (retreatConfig.deposit_percentage / 100));


      // Send reservation to backend
      const response = await fetch(`${API_URL}/api/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participant_name: formData.participant_name,
          participant_email: formData.participant_email,
          participant_phone: formData.participant_phone,
          camp_location: formData.camp_location,
          room_type: formData.room_type,
          pricing_tier: formData.pricing_tier,
          extras: formData.extras.filter(e => e.selected).map(e => e.id),
          total_estimate: total,
          status: 'pending',
          payment_status: 'unpaid',
          notes: formData.message
        })
      });
      if (!response.ok) throw new Error('Failed to submit reservation');

      const emailContent = `
${lang === 'ro' ? 'Bună,' : lang === 'fr' ? 'Bonjour,' : 'Hello,'}

${lang === 'ro' ? 'Rezervarea ta a fost primită cu succes! Iată detaliile:' : lang === 'fr' ? 'Votre réservation a été reçue avec succès! Voici les détails:' : 'Your booking has been received successfully! Here are the details:'}

${lang === 'ro' ? 'Locație' : lang === 'fr' ? 'Lieu' : 'Location'}: ${retreatConfig.locations.find(l => l.id === formData.camp_location)?.[`name_${lang}`]}
${lang === 'ro' ? 'Cameră' : lang === 'fr' ? 'Chambre' : 'Room'}: ${retreatConfig.room_types.find(r => r.id === formData.room_type)?.[`name_${lang}`]}
${lang === 'ro' ? 'Total' : lang === 'fr' ? 'Total' : 'Total'}: €${total}
${lang === 'ro' ? 'Avans (30%)' : lang === 'fr' ? 'Acompte (30%)' : 'Deposit (30%)'}: €${Math.round(total * 0.3)}

${lang === 'ro' ? 'Plata se face la: iulian@rhythmofleaders.pro' : lang === 'fr' ? 'Paiement à: iulian@rhythmofleaders.pro' : 'Payment to: iulian@rhythmofleaders.pro'}

${lang === 'ro' ? 'Te contactez curând!' : lang === 'fr' ? 'On vous contactera bientôt!' : 'We will contact you soon!'}

Rhythm of Leaders Team
      `;

      // Optionally: send confirmation email here via backend or 3rd party

      saveLead({
        email: formData.participant_email,
        name: formData.participant_name,
        phone: formData.participant_phone,
        source: 'retreat_booking',
        language: lang,
        notes: `Location: ${formData.camp_location} | Room: ${formData.room_type} | Tier: ${formData.pricing_tier} | Total: €${total}`,
      }).catch(() => {});

      onSuccess({ total, deposit, formData });
    } catch (err) {
      console.error('Reservation error:', err);
      alert('Eroare la rezervare');
    } finally {
      setSubmitting(false);
    }
  };

  if (!retreatConfig) return null;

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-8 shadow-xl space-y-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Basic Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold text-slate-900 mb-2">{t.name}</label>
          <input
            type="text"
            required
            value={formData.participant_name}
            onChange={(e) => setFormData({ ...formData, participant_name: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-900 mb-2">{t.email}</label>
          <input
            type="email"
            required
            value={formData.participant_email}
            onChange={(e) => setFormData({ ...formData, participant_email: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block font-semibold text-slate-900 mb-2">{t.phone}</label>
          <input
            type="tel"
            required
            value={formData.participant_phone}
            onChange={(e) => setFormData({ ...formData, participant_phone: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Location Selection */}
      <div>
        <label className="block font-semibold text-slate-900 mb-3">{t.location}</label>
        <div className="grid md:grid-cols-2 gap-4">
          {retreatConfig.locations.map((loc) => (
            <button
              key={loc.id}
              type="button"
              onClick={() => setFormData({ ...formData, camp_location: loc.id })}
              className={`p-4 rounded-2xl border-2 transition-all text-left ${
                formData.camp_location === loc.id
                  ? 'border-teal-600 bg-teal-50'
                  : 'border-slate-200 hover:border-teal-300'
              }`}
            >
              <p className="font-bold text-slate-900">{loc[`name_${lang}`]}</p>
              <p className="text-sm text-slate-600">{loc[`description_${lang}`]}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Room & Pricing */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold text-slate-900 mb-2">{t.room}</label>
          <select
            value={formData.room_type}
            onChange={(e) => setFormData({ ...formData, room_type: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500"
          >
            {retreatConfig.room_types.map((room) => (
              <option key={room.id} value={room.id}>
                {room[`name_${lang}`]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold text-slate-900 mb-2">{t.tier}</label>
          <select
            value={formData.pricing_tier}
            onChange={(e) => setFormData({ ...formData, pricing_tier: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500"
          >
            {retreatConfig.pricing_tiers.map((tier) => (
              <option key={tier.id} value={tier.id}>
                {tier[`name_${lang}`]} - €{tier[`base_price_${lang}`]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Extras */}
      <div>
        <label className="block font-semibold text-slate-900 mb-3">{t.extras}</label>
        <div className="space-y-2">
          {retreatConfig.extras.map((extra) => (
            <label key={extra.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.extras.find(e => e.id === extra.id)?.selected || false}
                onChange={(e) => {
                  const updated = formData.extras.filter(ex => ex.id !== extra.id);
                  if (e.target.checked) {
                    updated.push({ id: extra.id, selected: true });
                  }
                  setFormData({ ...formData, extras: updated });
                }}
                className="w-5 h-5 rounded accent-teal-600"
              />
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{extra[`name_${lang}`]}</p>
              </div>
              <p className="font-bold text-teal-600">€{extra[`price_${lang}`]}</p>
            </label>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block font-semibold text-slate-900 mb-2">{t.message}</label>
        <textarea
          rows="4"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500"
          placeholder={lang === 'ro' ? 'Observații speciale...' : lang === 'fr' ? 'Observations spéciales...' : 'Special notes...'}
        />
      </div>

      {/* Price Summary */}
      <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 border border-teal-200">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-700">{t.total}</span>
            <span className="text-3xl font-black text-teal-600">€{total}</span>
          </div>
          <div className="border-t border-teal-200 pt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">{t.deposit}</span>
              <span className="font-bold text-slate-900">€{Math.round(total * 0.3)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <Check className="w-5 h-5" />
        {submitting ? '...' : t.submit}
      </button>
    </motion.form>
  );
}