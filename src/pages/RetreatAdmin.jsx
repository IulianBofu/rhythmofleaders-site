import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Eye, EyeOff, Plus, Trash2, Save, Lock } from 'lucide-react';

export default function RetreatAdmin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('locations');
  const [saving, setSaving] = useState(false);

  const ADMIN_PASSWORD = 'Panzer89$$$';

  useEffect(() => {
    if (isAuthenticated) {
      loadConfig();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Parolă greșită');
    }
  };

  const loadConfig = async () => {
    setLoading(true);
    try {
      const configs = await base44.entities.RetreatConfig.list();
      if (configs.length > 0) {
        setConfig(configs[0]);
      } else {
        setConfig(getDefaultConfig());
      }
    } catch (err) {
      console.error('Error loading config:', err);
    } finally {
      setLoading(false);
    }
  };

  const getDefaultConfig = () => ({
    locations: [
      {
        id: 'chamonix',
        name_ro: 'Chamonix, Franța',
        name_en: 'Chamonix, France',
        name_fr: 'Chamonix, France',
        description_ro: 'Alpi, natură spectaculoasă',
        description_en: 'Alps, spectacular nature',
        description_fr: 'Alpes, nature spectaculaire',
        image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        capacity: 8
      },
      {
        id: 'corbu',
        name_ro: 'Corbu, Constanța',
        name_en: 'Corbu, Constanța',
        name_fr: 'Corbu, Constanța',
        description_ro: 'Marea Neagră, relaxare',
        description_en: 'Black Sea, relaxation',
        description_fr: 'Mer Noire, détente',
        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
        capacity: 8
      }
    ],
    room_types: [
      { id: 'shared', name_ro: 'Cameră Dublă', name_en: 'Shared Room', name_fr: 'Chambre Double', price_adjustment_ro: 0, price_adjustment_en: 0, price_adjustment_fr: 0 },
      { id: 'single', name_ro: 'Cameră Single', name_en: 'Single Room', name_fr: 'Chambre Simple', price_adjustment_ro: 300, price_adjustment_en: 300, price_adjustment_fr: 300 }
    ],
    pricing_tiers: [
      { id: 'early_bird', name_ro: 'Early Bird', name_en: 'Early Bird', name_fr: 'Early Bird', base_price_ro: 1499, base_price_en: 1499, base_price_fr: 1499, discount_percentage: 0, spots_available: 3 },
      { id: 'standard', name_ro: 'Standard', name_en: 'Standard', name_fr: 'Standard', base_price_ro: 1799, base_price_en: 1799, base_price_fr: 1799, discount_percentage: 0, spots_available: 3 },
      { id: 'last_minute', name_ro: 'Ultimele Locuri', name_en: 'Last Spots', name_fr: 'Dernières Places', base_price_ro: 1999, base_price_en: 1999, base_price_fr: 1999, discount_percentage: 0, spots_available: 2 }
    ],
    extras: [
      { id: 'extra_night', name_ro: 'Noapte Suplimentară', name_en: 'Extra Night', name_fr: 'Nuit Supplémentaire', price_ro: 200, price_en: 200, price_fr: 200 },
      { id: 'transfer', name_ro: 'Transfer Aeroport', name_en: 'Airport Transfer', name_fr: 'Transfert Aéroport', price_ro: 150, price_en: 150, price_fr: 150 },
      { id: 'private_coaching', name_ro: 'Coaching Privat', name_en: 'Private Coaching', name_fr: 'Coaching Privé', price_ro: 300, price_en: 300, price_fr: 300 }
    ],
    deposit_percentage: 30,
    payment_terms_ro: 'Avans 30%. Restul cu 14 zile înainte.',
    payment_terms_en: '30% deposit. Balance 14 days before.',
    payment_terms_fr: '30% acompte. Solde 14 jours avant.'
  });

  const saveConfig = async () => {
    setSaving(true);
    try {
      if (config.id) {
        await base44.entities.RetreatConfig.update(config.id, config);
      } else {
        await base44.entities.RetreatConfig.create(config);
      }
      alert('Configurație salvată cu succes!');
    } catch (err) {
      console.error('Error saving config:', err);
      alert('Eroare la salvare');
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-teal-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Lock className="w-8 h-8 text-teal-600" />
            <h1 className="text-2xl font-black text-slate-900">Panou Admin</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Parolă Admin
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Introduceți parola"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-slate-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-slate-400" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
            >
              Accesare
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-black text-slate-900">Admin Tabere</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-6 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600"
          >
            Deconectare
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-slate-200">
          {['locations', 'rooms', 'pricing', 'extras'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold border-b-2 transition-all ${
                activeTab === tab
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab === 'locations'
                ? 'Locații'
                : tab === 'rooms'
                ? 'Camere'
                : tab === 'pricing'
                ? 'Preț'
                : 'Extras'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'locations' && (
            <LocationsEditor config={config} setConfig={setConfig} />
          )}
          {activeTab === 'rooms' && (
            <RoomsEditor config={config} setConfig={setConfig} />
          )}
          {activeTab === 'pricing' && (
            <PricingEditor config={config} setConfig={setConfig} />
          )}
          {activeTab === 'extras' && (
            <ExtrasEditor config={config} setConfig={setConfig} />
          )}
        </div>

        {/* Save Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={saveConfig}
            disabled={saving}
            className="flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Se salvează...' : 'Salvează Tot'}
          </button>
        </div>
      </div>
    </div>
  );
}

function LocationsEditor({ config, setConfig }) {
  const addLocation = () => {
    const newLocation = {
      id: `location_${Date.now()}`,
      name_ro: '',
      name_en: '',
      name_fr: '',
      description_ro: '',
      description_en: '',
      description_fr: '',
      image_url: '',
      capacity: 8
    };
    setConfig({
      ...config,
      locations: [...config.locations, newLocation]
    });
  };

  const updateLocation = (idx, field, value) => {
    const updated = [...config.locations];
    updated[idx] = { ...updated[idx], [field]: value };
    setConfig({ ...config, locations: updated });
  };

  const deleteLocation = (idx) => {
    setConfig({
      ...config,
      locations: config.locations.filter((_, i) => i !== idx)
    });
  };

  return (
    <div className="space-y-6">
      {config.locations.map((loc, idx) => (
        <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="ID (ex: chamonix)"
              value={loc.id}
              onChange={(e) => updateLocation(idx, 'id', e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg"
              disabled
            />
            <input
              type="number"
              placeholder="Capacitate"
              value={loc.capacity}
              onChange={(e) => updateLocation(idx, 'capacity', parseInt(e.target.value))}
              className="px-4 py-2 border border-slate-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Nume RO"
              value={loc.name_ro}
              onChange={(e) => updateLocation(idx, 'name_ro', e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Nume EN"
              value={loc.name_en}
              onChange={(e) => updateLocation(idx, 'name_en', e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Nume FR"
              value={loc.name_fr}
              onChange={(e) => updateLocation(idx, 'name_fr', e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="URL Imagine"
              value={loc.image_url}
              onChange={(e) => updateLocation(idx, 'image_url', e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <textarea
              placeholder="Descriere RO"
              value={loc.description_ro}
              onChange={(e) => updateLocation(idx, 'description_ro', e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg"
              rows="3"
            />
            <textarea
              placeholder="Descriere EN"
              value={loc.description_en}
              onChange={(e) => updateLocation(idx, 'description_en', e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg"
              rows="3"
            />
            <textarea
              placeholder="Descriere FR"
              value={loc.description_fr}
              onChange={(e) => updateLocation(idx, 'description_fr', e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg"
              rows="3"
            />
          </div>
          <button
            onClick={() => deleteLocation(idx)}
            className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" /> Șterge
          </button>
        </div>
      ))}
      <button
        onClick={addLocation}
        className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700"
      >
        <Plus className="w-5 h-5" /> Adaugă Locație
      </button>
    </div>
  );
}

function RoomsEditor({ config, setConfig }) {
  const updateRoom = (idx, field, value) => {
    const updated = [...config.room_types];
    updated[idx] = { ...updated[idx], [field]: value };
    setConfig({ ...config, room_types: updated });
  };

  return (
    <div className="space-y-6">
      {config.room_types.map((room, idx) => (
        <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200">
          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Nume RO"
              value={room.name_ro}
              onChange={(e) => updateRoom(idx, 'name_ro', e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Nume EN"
              value={room.name_en}
              onChange={(e) => updateRoom(idx, 'name_en', e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Nume FR"
              value={room.name_fr}
              onChange={(e) => updateRoom(idx, 'name_fr', e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Ajustare preț RO"
              value={room.price_adjustment_ro}
              onChange={(e) => updateRoom(idx, 'price_adjustment_ro', parseInt(e.target.value))}
              className="px-4 py-2 border border-slate-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Ajustare preț EN"
              value={room.price_adjustment_en}
              onChange={(e) => updateRoom(idx, 'price_adjustment_en', parseInt(e.target.value))}
              className="px-4 py-2 border border-slate-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Ajustare preț FR"
              value={room.price_adjustment_fr}
              onChange={(e) => updateRoom(idx, 'price_adjustment_fr', parseInt(e.target.value))}
              className="px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function PricingEditor({ config, setConfig }) {
  const updateTier = (idx, field, value) => {
    const updated = [...config.pricing_tiers];
    updated[idx] = { ...updated[idx], [field]: value };
    setConfig({ ...config, pricing_tiers: updated });
  };

  const updateDeposit = (value) => {
    setConfig({ ...config, deposit_percentage: value });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <label className="block font-semibold text-slate-900 mb-2">Procent Avans</label>
        <input
          type="number"
          value={config.deposit_percentage}
          onChange={(e) => updateDeposit(parseInt(e.target.value))}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg"
        />
      </div>

      {config.pricing_tiers.map((tier, idx) => (
        <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200">
          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Nume RO"
              value={tier.name_ro}
              onChange={(e) => updateTier(idx, 'name_ro', e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Preț RO"
              value={tier.base_price_ro}
              onChange={(e) => updateTier(idx, 'base_price_ro', parseInt(e.target.value))}
              className="px-4 py-2 border border-slate-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Preț EN"
              value={tier.base_price_en}
              onChange={(e) => updateTier(idx, 'base_price_en', parseInt(e.target.value))}
              className="px-4 py-2 border border-slate-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Preț FR"
              value={tier.base_price_fr}
              onChange={(e) => updateTier(idx, 'base_price_fr', parseInt(e.target.value))}
              className="px-4 py-2 border border-slate-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Discount %"
              value={tier.discount_percentage}
              onChange={(e) => updateTier(idx, 'discount_percentage', parseInt(e.target.value))}
              className="px-4 py-2 border border-slate-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Locuri disponibile"
              value={tier.spots_available}
              onChange={(e) => updateTier(idx, 'spots_available', parseInt(e.target.value))}
              className="px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ExtrasEditor({ config, setConfig }) {
  const addExtra = () => {
    const newExtra = {
      id: `extra_${Date.now()}`,
      name_ro: '',
      name_en: '',
      name_fr: '',
      price_ro: 0,
      price_en: 0,
      price_fr: 0
    };
    setConfig({
      ...config,
      extras: [...config.extras, newExtra]
    });
  };

  const updateExtra = (idx, field, value) => {
    const updated = [...config.extras];
    updated[idx] = { ...updated[idx], [field]: value };
    setConfig({ ...config, extras: updated });
  };

  const deleteExtra = (idx) => {
    setConfig({
      ...config,
      extras: config.extras.filter((_, i) => i !== idx)
    });
  };

  return (
    <div className="space-y-6">
      {config.extras.map((extra, idx) => (
        <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Nume RO"
              value={extra.name_ro}
              onChange={(e) => updateExtra(idx, 'name_ro', e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Nume EN"
              value={extra.name_en}
              onChange={(e) => updateExtra(idx, 'name_en', e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Nume FR"
              value={extra.name_fr}
              onChange={(e) => updateExtra(idx, 'name_fr', e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Preț RO"
              value={extra.price_ro}
              onChange={(e) => updateExtra(idx, 'price_ro', parseInt(e.target.value))}
              className="px-4 py-2 border border-slate-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Preț EN"
              value={extra.price_en}
              onChange={(e) => updateExtra(idx, 'price_en', parseInt(e.target.value))}
              className="px-4 py-2 border border-slate-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Preț FR"
              value={extra.price_fr}
              onChange={(e) => updateExtra(idx, 'price_fr', parseInt(e.target.value))}
              className="px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <button
            onClick={() => deleteExtra(idx)}
            className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" /> Șterge
          </button>
        </div>
      ))}
      <button
        onClick={addExtra}
        className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700"
      >
        <Plus className="w-5 h-5" /> Adaugă Extra
      </button>
    </div>
  );
}