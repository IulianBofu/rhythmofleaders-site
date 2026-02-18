import React, { useState } from 'react';
import { Euro, Users, Home, Plus } from 'lucide-react';

export default function CostCalculator({ lang }) {
  const [roomType, setRoomType] = useState('twin');
  const [pricing, setPricing] = useState('standard');
  const [extras, setExtras] = useState({
    extraNight: false,
    airportTransfer: false,
    privateCoaching: false
  });

  const content = {
    ro: {
      title: 'Calculator Preț',
      subtitle: 'Personalizează experiența ta',
      room: 'Tip Cameră',
      roomSingle: 'Single',
      roomTwin: 'Twin/Double',
      pricing: 'Tarif',
      extras: 'Servicii Extra',
      extraNight: 'Noapte suplimentară (+€120)',
      airportTransfer: 'Transfer aeroport (+€80)',
      privateCoaching: 'Sesiune 1:1 extra (+€150)',
      total: 'Total Estimat',
      note: 'Prețul final va fi confirmat la rezervare'
    },
    en: {
      title: 'Price Calculator',
      subtitle: 'Customize your experience',
      room: 'Room Type',
      roomSingle: 'Single',
      roomTwin: 'Twin/Double',
      pricing: 'Pricing',
      extras: 'Extra Services',
      extraNight: 'Extra night (+€120)',
      airportTransfer: 'Airport transfer (+€80)',
      privateCoaching: 'Extra 1:1 session (+€150)',
      total: 'Estimated Total',
      note: 'Final price will be confirmed upon booking'
    },
    fr: {
      title: 'Calculateur Prix',
      subtitle: 'Personnalisez votre expérience',
      room: 'Type Chambre',
      roomSingle: 'Single',
      roomTwin: 'Twin/Double',
      pricing: 'Tarif',
      extras: 'Services Extra',
      extraNight: 'Nuit supplémentaire (+€120)',
      airportTransfer: 'Transfert aéroport (+€80)',
      privateCoaching: 'Séance 1:1 extra (+€150)',
      total: 'Total Estimé',
      note: 'Le prix final sera confirmé lors de la réservation'
    }
  };

  const t = content[lang];

  const basePrices = {
    early: 1499,
    standard: 1799,
    last: 1999
  };

  const calculateTotal = () => {
    let total = basePrices[pricing];
    
    // Single room supplement
    if (roomType === 'single') {
      total += 200;
    }

    // Extras
    if (extras.extraNight) total += 120;
    if (extras.airportTransfer) total += 80;
    if (extras.privateCoaching) total += 150;

    return total;
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-200">
      <h3 className="text-2xl font-black text-slate-900 mb-2">{t.title}</h3>
      <p className="text-slate-600 mb-8">{t.subtitle}</p>

      <div className="space-y-6">
        {/* Room Type */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3">{t.room}</label>
          <div className="grid grid-cols-2 gap-3">
            {['twin', 'single'].map((type) => (
              <button
                key={type}
                onClick={() => setRoomType(type)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  roomType === type
                    ? 'border-teal-600 bg-teal-50'
                    : 'border-slate-200 hover:border-teal-300'
                }`}
              >
                <Home className={`w-6 h-6 mx-auto mb-2 ${roomType === type ? 'text-teal-600' : 'text-slate-400'}`} />
                <p className={`font-semibold ${roomType === type ? 'text-teal-900' : 'text-slate-700'}`}>
                  {type === 'twin' ? t.roomTwin : t.roomSingle}
                </p>
                {type === 'single' && <p className="text-xs text-slate-500 mt-1">+€200</p>}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Tier */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3">{t.pricing}</label>
          <div className="space-y-2">
            {[
              { id: 'early', label: 'Early Bird', price: 1499 },
              { id: 'standard', label: 'Standard', price: 1799 },
              { id: 'last', label: 'Last Spots', price: 1999 }
            ].map((tier) => (
              <button
                key={tier.id}
                onClick={() => setPricing(tier.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all flex justify-between items-center ${
                  pricing === tier.id
                    ? 'border-teal-600 bg-teal-50'
                    : 'border-slate-200 hover:border-teal-300'
                }`}
              >
                <span className={`font-semibold ${pricing === tier.id ? 'text-teal-900' : 'text-slate-700'}`}>
                  {tier.label}
                </span>
                <span className={`font-bold ${pricing === tier.id ? 'text-teal-600' : 'text-slate-500'}`}>
                  €{tier.price}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Extras */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3">{t.extras}</label>
          <div className="space-y-2">
            {[
              { id: 'extraNight', label: t.extraNight },
              { id: 'airportTransfer', label: t.airportTransfer },
              { id: 'privateCoaching', label: t.privateCoaching }
            ].map((extra) => (
              <label
                key={extra.id}
                className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={extras[extra.id]}
                  onChange={(e) => setExtras({ ...extras, [extra.id]: e.target.checked })}
                  className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
                />
                <span className="text-slate-700 flex-1">{extra.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="border-t-2 border-slate-200 pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-bold text-slate-900">{t.total}</span>
            <div className="flex items-center gap-2">
              <Euro className="w-6 h-6 text-teal-600" />
              <span className="text-3xl font-black text-teal-600">{calculateTotal()}</span>
            </div>
          </div>
          <p className="text-xs text-slate-500">{t.note}</p>
        </div>
      </div>
    </div>
  );
}