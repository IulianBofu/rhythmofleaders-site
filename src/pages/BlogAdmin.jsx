// (deleted)
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { blogApi } from '@/api/blogApi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Save,
  Lock,
  Edit,
  CheckCircle,
  XCircle,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

function slugify(input = '') {
  return String(input)
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/[^a-z0-9]+/g, '-') // non-alnum -> -
    .replace(/^-+|-+$/g, '') // trim -
    .replace(/-{2,}/g, '-');
}

function toDateInputValue(value) {
  if (!value) return new Date().toISOString().slice(0, 10);
  // Already YYYY-MM-DD
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  // ISO string
  if (typeof value === 'string') return value.slice(0, 10);
  // Date object
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return new Date().toISOString().slice(0, 10);
}

export default function BlogAdmin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  // IMPORTANT: this is not secure (client-side). Keep for now, but move to server auth later.
  const ADMIN_PASSWORD = 'Panzer89$$$';

  const queryClient = useQueryClient();


  const {
    data: posts = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['blog-admin'],
    queryFn: () => blogApi.getAll(),
    enabled: isAuthenticated,
  });

  const deleteMutation = useMutation(
    async (id) => blogApi.remove(id),
    {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blog-admin'] }),
    }
  );

  const togglePublishMutation = useMutation(
    async (vars) => {
      if (!vars) return;
      const { id, published } = vars;
      return blogApi.update(id, { published }).then(() => ({ id, published }));
    },
    {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blog-admin'] }),
    }
  );

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Parolă greșită');
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
            <h1 className="text-2xl font-black text-slate-900">Blog Admin</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Parolă Admin</label>
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
                  onClick={() => setShowPassword((v) => !v)}
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

  if (showEditor) {
    return (
      <BlogEditor
        post={editingPost}
        onClose={() => {
          setShowEditor(false);
          setEditingPost(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-black text-slate-900">Blog Admin</h1>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setEditingPost(null);
                setShowEditor(true);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg"
            >
              <Plus className="w-5 h-5" /> Articol Nou
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-6 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600"
            >
              Deconectare
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="bg-white rounded-2xl p-6 shadow border border-slate-200">
            Se încarcă…
          </div>
        )}

        {isError && (
          <div className="bg-white rounded-2xl p-6 shadow border border-red-200 text-red-600">
            Eroare la încărcarea articolelor.
          </div>
        )}

        <div className="space-y-4">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-xl font-bold text-slate-900 truncate">
                      {post.title_ro || post.title_en || 'Fără titlu'}
                    </h3>
                    {post.published ? (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Publicat
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> Draft
                      </span>
                    )}
                  </div>

                  <p className="text-slate-600 mb-2 line-clamp-2">
                    {post.excerpt_ro || post.excerpt_en || ''}
                  </p>

                  <div className="flex gap-4 text-sm text-slate-500 flex-wrap">
                    <span>Categorie: {post.category || '-'}</span>
                    <span>Slug: {post.slug || '-'}</span>
                    {post.publish_date && (
                      <span>Data: {new Date(post.publish_date).toLocaleDateString('ro-RO')}</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setEditingPost(post);
                      setShowEditor(true);
                    }}
                    className="p-2 hover:bg-teal-50 rounded-lg transition-colors"
                    title="Editează"
                  >
                    <Edit className="w-5 h-5 text-teal-600" />
                  </button>

                  <button
                    onClick={() =>
                      togglePublishMutation.mutate({ id: post.id, published: !post.published })
                    }
                    className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                    title={post.published ? 'Trece la Draft' : 'Publică'}
                  >
                    {post.published ? (
                      <XCircle className="w-5 h-5 text-amber-600" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    )}
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Sigur vrei să ștergi acest articol?')) {
                        deleteMutation.mutate(post.id);
                      }
                    }}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Șterge"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BlogEditor({ post, onClose }) {
  const queryClient = useQueryClient();

  const initial = useMemo(
    () => ({
      title_ro: post?.title_ro || '',
      title_en: post?.title_en || '',
      title_fr: post?.title_fr || '',
      excerpt_ro: post?.excerpt_ro || '',
      excerpt_en: post?.excerpt_en || '',
      excerpt_fr: post?.excerpt_fr || '',
      content_ro: post?.content_ro || '',
      content_en: post?.content_en || '',
      content_fr: post?.content_fr || '',
      slug: post?.slug || '',
      category: post?.category || 'running',
      image_url: post?.image_url || '',
      tags: post?.tags || '',
      read_time: typeof post?.read_time === 'number' ? post.read_time : 5,
      published: !!post?.published,
      publish_date: toDateInputValue(post?.publish_date),
    }),
    [post]
  );

  const [formData, setFormData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('ro');

  const saveMutation = useMutation(
    async (data) => {
      if (!data) return;
      const payload = {
        ...data,
        slug: data.slug || slugify(data.title_ro || data.title_en || data.title_fr),
        read_time: Number.isFinite(data.read_time) ? data.read_time : 0,
      };

      if (post?.id) {
        await blogApi.update(post.id, payload);
        return payload;
      }
      await blogApi.create(payload);
      return payload;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['blog-admin'] });
        onClose();
      },
    }
  );

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveMutation.mutateAsync(formData);
    } finally {
      setSaving(false);
    }
  };

  // Remove AI generation for now (or re-implement with backend if needed)
  // You can add a placeholder or keep the button disabled

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-lg">
              <ArrowLeft className="w-6 h-6 text-slate-600" />
            </button>
            <h1 className="text-4xl font-black text-slate-900">
              {post ? 'Editează Articol' : 'Articol Nou'}
            </h1>
          </div>

          <div className="flex gap-4">
            <button
              disabled
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold opacity-50 cursor-not-allowed"
            >
              <Sparkles className="w-5 h-5" />
              AI (doar local)
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Se salvează...' : 'Salvează'}
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-6 border-b border-slate-200">
          {['ro', 'en', 'fr'].map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveTab(lang)}
              className={`px-6 py-3 font-semibold border-b-2 transition-all ${
                activeTab === lang
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-slate-600'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Info Bază</h3>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-2">Slug URL</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData((p) => ({ ...p, slug: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  placeholder="articol-despre-alergare"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-2">Categorie</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                >
                  <option value="running">Running</option>
                  <option value="nutrition">Nutrition</option>
                  <option value="strength">Strength</option>
                  <option value="mindset">Mindset</option>
                  <option value="business">Business</option>
                  <option value="recovery">Recovery</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-2">Timp Citire (min)</label>
                <input
                  type="number"
                  value={formData.read_time}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, read_time: Number(e.target.value) || 0 }))
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-semibold text-slate-700 mb-2">URL Imagine</label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) => setFormData((p) => ({ ...p, image_url: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-2">Data Publicare</label>
                <input
                  type="date"
                  value={formData.publish_date}
                  onChange={(e) => setFormData((p) => ({ ...p, publish_date: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block font-semibold text-slate-700 mb-2">Tags (CSV)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData((p) => ({ ...p, tags: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  placeholder="energie, focus, executivi"
                />
              </div>

              <div className="flex items-center gap-3 md:col-span-3">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData((p) => ({ ...p, published: e.target.checked }))}
                  className="w-5 h-5 rounded accent-teal-600"
                />
                <label className="font-semibold text-slate-700">Publicat</label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Conținut {activeTab.toUpperCase()}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-2">Titlu</label>
                <input
                  type="text"
                  value={formData[`title_${activeTab}`]}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, [`title_${activeTab}`]: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-2">Excerpt</label>
                <textarea
                  rows={3}
                  value={formData[`excerpt_${activeTab}`]}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, [`excerpt_${activeTab}`]: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-2">Conținut (HTML)</label>
                <ReactQuill
                  theme="snow"
                  value={formData[`content_${activeTab}`]}
                  onChange={(value) =>
                    setFormData((p) => ({ ...p, [`content_${activeTab}`]: value }))
                  }
                  className="h-96 mb-16"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
