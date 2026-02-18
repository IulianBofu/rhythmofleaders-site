import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Plus, Trash2, Save, Lock, Image, GripVertical, X, AlertTriangle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const ADMIN_PASSWORD = 'Panzer89$$$';

export default function RetreatAdmin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('locations');
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    if (isAuthenticated) loadConfig();
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
      const res = await fetch(`${API_URL}/api/retreat-config`, {
        headers: { 'Authorization': 'Basic ' + btoa('admin:' + ADMIN_PASSWORD) }
      });
      if (res.ok) {
        setConfig(await res.json());
      } else {
        setConfig(getDefaultConfig());
      }
    } catch {
      setConfig(getDefaultConfig());
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
        hero_image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        photos: [],
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
        hero_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
        photos: [],
        capacity: 8
      },
      {
        id: 'transfagarasan',
        name_ro: 'Transfăgărășan, România',
        name_en: 'Transfăgărășan, Romania',
        name_fr: 'Transfăgărășan, Roumanie',
        description_ro: 'Cel mai spectaculos drum montan',
        description_en: "Romania's most spectacular mountain road",
        description_fr: 'La plus spectaculaire route de montagne',
        hero_image: '',
        photos: [],
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
    deposit_percentage: 30
  });

  const saveConfig = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/retreat-config`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('admin:' + ADMIN_PASSWORD)
        },
        body: JSON.stringify(config)
      });
      if (res.ok) {
        alert('Configurație salvată cu succes!');
      } else {
        throw new Error('Save failed');
      }
    } catch {
      alert('Eroare la salvare. Verifică conexiunea la server.');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (type, idx) => {
    setDeleteConfirm({ type, idx });
  };

  const executeDelete = () => {
    if (!deleteConfirm) return;
    const { type, idx } = deleteConfirm;
    setConfig({
      ...config,
      [type]: config[type].filter((_, i) => i !== idx)
    });
    setDeleteConfirm(null);
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
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parolă admin"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2" aria-label="Toggle password">
                {showPassword ? <EyeOff className="w-5 h-5 text-slate-400" /> : <Eye className="w-5 h-5 text-slate-400" />}
              </button>
            </div>
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg transition-all">
              Accesare
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (!config || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const tabs = [
    { id: 'locations', label: 'Locații' },
    { id: 'photos', label: 'Poze' },
    { id: 'rooms', label: 'Camere' },
    { id: 'pricing', label: 'Preț' },
    { id: 'extras', label: 'Extras' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-black text-slate-900">Admin Tabere</h1>
          <button onClick={() => setIsAuthenticated(false)} className="px-6 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600">
            Deconectare
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-slate-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'locations' && <LocationsEditor config={config} setConfig={setConfig} onDelete={confirmDelete} />}
          {activeTab === 'photos' && <PhotosEditor config={config} setConfig={setConfig} />}
          {activeTab === 'rooms' && <RoomsEditor config={config} setConfig={setConfig} />}
          {activeTab === 'pricing' && <PricingEditor config={config} setConfig={setConfig} />}
          {activeTab === 'extras' && <ExtrasEditor config={config} setConfig={setConfig} onDelete={confirmDelete} />}
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

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Confirmare ștergere</h3>
            </div>
            <p className="text-slate-600 mb-6">Ești sigur că vrei să ștergi acest element? Acțiunea este ireversibilă.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50">
                Anulează
              </button>
              <button onClick={executeDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700">
                Șterge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LocationsEditor({ config, setConfig, onDelete }) {
  const addLocation = () => {
    setConfig({
      ...config,
      locations: [...config.locations, {
        id: `location_${Date.now()}`,
        name_ro: '', name_en: '', name_fr: '',
        description_ro: '', description_en: '', description_fr: '',
        hero_image: '',
        photos: [],
        capacity: 8
      }]
    });
  };

  const updateLocation = (idx, field, value) => {
    const updated = [...config.locations];
    updated[idx] = { ...updated[idx], [field]: value };
    setConfig({ ...config, locations: updated });
  };

  return (
    <div className="space-y-6">
      {config.locations.map((loc, idx) => (
        <div key={loc.id} className="bg-white rounded-2xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900">{loc.name_ro || loc.id}</h3>
            <span className="text-xs text-slate-400">ID: {loc.id}</span>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Nume RO</label>
              <input type="text" value={loc.name_ro} onChange={(e) => updateLocation(idx, 'name_ro', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Nume EN</label>
              <input type="text" value={loc.name_en} onChange={(e) => updateLocation(idx, 'name_en', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Nume FR</label>
              <input type="text" value={loc.name_fr} onChange={(e) => updateLocation(idx, 'name_fr', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Descriere RO</label>
              <textarea value={loc.description_ro} onChange={(e) => updateLocation(idx, 'description_ro', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" rows="2" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Descriere EN</label>
              <textarea value={loc.description_en} onChange={(e) => updateLocation(idx, 'description_en', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" rows="2" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Descriere FR</label>
              <textarea value={loc.description_fr} onChange={(e) => updateLocation(idx, 'description_fr', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" rows="2" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Hero Image URL</label>
              <input type="text" value={loc.hero_image || ''} onChange={(e) => updateLocation(idx, 'hero_image', e.target.value)} placeholder="https://..." className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
              {loc.hero_image && (
                <img src={loc.hero_image} alt="Hero preview" className="mt-2 h-24 w-full object-cover rounded-lg" />
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Capacitate</label>
              <input type="number" value={loc.capacity} onChange={(e) => updateLocation(idx, 'capacity', parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
          </div>

          <button onClick={() => onDelete('locations', idx)} className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 text-sm">
            <Trash2 className="w-4 h-4" /> Șterge locația
          </button>
        </div>
      ))}
      <button onClick={addLocation} className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700">
        <Plus className="w-5 h-5" /> Adaugă Locație
      </button>
    </div>
  );
}

function PhotosEditor({ config, setConfig }) {
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  const loc = config.locations[selectedLocation];
  if (!loc) return null;

  const photos = loc.photos || [];

  const addPhoto = () => {
    if (!newPhotoUrl.trim()) return;
    const updated = [...config.locations];
    updated[selectedLocation] = {
      ...updated[selectedLocation],
      photos: [...photos, { url: newPhotoUrl.trim(), caption: '' }]
    };
    setConfig({ ...config, locations: updated });
    setNewPhotoUrl('');
  };

  const removePhoto = (photoIdx) => {
    const updated = [...config.locations];
    updated[selectedLocation] = {
      ...updated[selectedLocation],
      photos: photos.filter((_, i) => i !== photoIdx)
    };
    setConfig({ ...config, locations: updated });
  };

  const updateCaption = (photoIdx, caption) => {
    const updated = [...config.locations];
    const updatedPhotos = [...photos];
    updatedPhotos[photoIdx] = { ...updatedPhotos[photoIdx], caption };
    updated[selectedLocation] = { ...updated[selectedLocation], photos: updatedPhotos };
    setConfig({ ...config, locations: updated });
  };

  const movePhoto = (fromIdx, toIdx) => {
    if (toIdx < 0 || toIdx >= photos.length) return;
    const updated = [...config.locations];
    const updatedPhotos = [...photos];
    const [moved] = updatedPhotos.splice(fromIdx, 1);
    updatedPhotos.splice(toIdx, 0, moved);
    updated[selectedLocation] = { ...updated[selectedLocation], photos: updatedPhotos };
    setConfig({ ...config, locations: updated });
  };

  return (
    <div className="space-y-6">
      {/* Location selector */}
      <div className="flex gap-2 flex-wrap">
        {config.locations.map((l, i) => (
          <button
            key={l.id}
            onClick={() => setSelectedLocation(i)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              selectedLocation === i
                ? 'bg-teal-600 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-teal-300'
            }`}
          >
            {l.name_ro || l.id}
          </button>
        ))}
      </div>

      {/* Add photo */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Image className="w-5 h-5 text-teal-600" />
          Galerie foto — {loc.name_ro || loc.id}
        </h3>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={newPhotoUrl}
            onChange={(e) => setNewPhotoUrl(e.target.value)}
            placeholder="URL imagine (https://...)"
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-sm"
            onKeyDown={(e) => e.key === 'Enter' && addPhoto()}
          />
          <button onClick={addPhoto} className="px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 flex items-center gap-1">
            <Plus className="w-4 h-4" /> Adaugă
          </button>
        </div>

        {/* Photo grid */}
        {photos.length === 0 ? (
          <p className="text-center py-8 text-slate-400">Nicio poză adăugată. Adaugă URL-uri de imagini.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, i) => (
              <div key={i} className="relative group rounded-xl overflow-hidden border border-slate-200">
                <img src={photo.url} alt={photo.caption || `Photo ${i + 1}`} className="w-full h-40 object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  {i > 0 && (
                    <button onClick={() => movePhoto(i, i - 1)} className="p-1.5 bg-white rounded-lg text-slate-700 hover:bg-slate-100" title="Move left">
                      ←
                    </button>
                  )}
                  {i < photos.length - 1 && (
                    <button onClick={() => movePhoto(i, i + 1)} className="p-1.5 bg-white rounded-lg text-slate-700 hover:bg-slate-100" title="Move right">
                      →
                    </button>
                  )}
                  <button onClick={() => removePhoto(i)} className="p-1.5 bg-red-500 rounded-lg text-white hover:bg-red-600" title="Delete">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={photo.caption || ''}
                  onChange={(e) => updateCaption(i, e.target.value)}
                  placeholder="Caption..."
                  className="w-full px-2 py-1.5 text-xs border-t border-slate-200 bg-white"
                />
              </div>
            ))}
          </div>
        )}
      </div>
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
        <div key={room.id} className="bg-white rounded-2xl p-6 border border-slate-200">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Nume RO</label>
              <input type="text" value={room.name_ro} onChange={(e) => updateRoom(idx, 'name_ro', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Nume EN</label>
              <input type="text" value={room.name_en} onChange={(e) => updateRoom(idx, 'name_en', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Nume FR</label>
              <input type="text" value={room.name_fr} onChange={(e) => updateRoom(idx, 'name_fr', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Ajustare preț RO (€)</label>
              <input type="number" value={room.price_adjustment_ro} onChange={(e) => updateRoom(idx, 'price_adjustment_ro', parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Ajustare preț EN (€)</label>
              <input type="number" value={room.price_adjustment_en} onChange={(e) => updateRoom(idx, 'price_adjustment_en', parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Ajustare preț FR (€)</label>
              <input type="number" value={room.price_adjustment_fr} onChange={(e) => updateRoom(idx, 'price_adjustment_fr', parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
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

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <label className="block text-xs font-medium text-slate-500 mb-1">Procent Avans (%)</label>
        <input type="number" value={config.deposit_percentage} onChange={(e) => setConfig({ ...config, deposit_percentage: parseInt(e.target.value) || 0 })} className="w-32 px-3 py-2 border border-slate-300 rounded-lg text-sm" />
      </div>

      {config.pricing_tiers.map((tier, idx) => (
        <div key={tier.id} className="bg-white rounded-2xl p-6 border border-slate-200">
          <h4 className="font-bold text-slate-900 mb-4">{tier.name_ro || tier.id}</h4>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Nume RO</label>
              <input type="text" value={tier.name_ro} onChange={(e) => updateTier(idx, 'name_ro', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Nume EN</label>
              <input type="text" value={tier.name_en} onChange={(e) => updateTier(idx, 'name_en', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Nume FR</label>
              <input type="text" value={tier.name_fr} onChange={(e) => updateTier(idx, 'name_fr', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Preț RO (€)</label>
              <input type="number" value={tier.base_price_ro} onChange={(e) => updateTier(idx, 'base_price_ro', parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Preț EN (€)</label>
              <input type="number" value={tier.base_price_en} onChange={(e) => updateTier(idx, 'base_price_en', parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Preț FR (€)</label>
              <input type="number" value={tier.base_price_fr} onChange={(e) => updateTier(idx, 'base_price_fr', parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Discount (%)</label>
              <input type="number" value={tier.discount_percentage} onChange={(e) => updateTier(idx, 'discount_percentage', parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Locuri disponibile</label>
              <input type="number" value={tier.spots_available} onChange={(e) => updateTier(idx, 'spots_available', parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ExtrasEditor({ config, setConfig, onDelete }) {
  const addExtra = () => {
    setConfig({
      ...config,
      extras: [...config.extras, {
        id: `extra_${Date.now()}`,
        name_ro: '', name_en: '', name_fr: '',
        price_ro: 0, price_en: 0, price_fr: 0
      }]
    });
  };

  const updateExtra = (idx, field, value) => {
    const updated = [...config.extras];
    updated[idx] = { ...updated[idx], [field]: value };
    setConfig({ ...config, extras: updated });
  };

  return (
    <div className="space-y-6">
      {config.extras.map((extra, idx) => (
        <div key={extra.id} className="bg-white rounded-2xl p-6 border border-slate-200">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Nume RO</label>
              <input type="text" value={extra.name_ro} onChange={(e) => updateExtra(idx, 'name_ro', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Nume EN</label>
              <input type="text" value={extra.name_en} onChange={(e) => updateExtra(idx, 'name_en', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Nume FR</label>
              <input type="text" value={extra.name_fr} onChange={(e) => updateExtra(idx, 'name_fr', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Preț RO (€)</label>
              <input type="number" value={extra.price_ro} onChange={(e) => updateExtra(idx, 'price_ro', parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Preț EN (€)</label>
              <input type="number" value={extra.price_en} onChange={(e) => updateExtra(idx, 'price_en', parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Preț FR (€)</label>
              <input type="number" value={extra.price_fr} onChange={(e) => updateExtra(idx, 'price_fr', parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
          </div>
          <button onClick={() => onDelete('extras', idx)} className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 text-sm">
            <Trash2 className="w-4 h-4" /> Șterge
          </button>
        </div>
      ))}
      <button onClick={addExtra} className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700">
        <Plus className="w-5 h-5" /> Adaugă Extra
      </button>
    </div>
  );
}
