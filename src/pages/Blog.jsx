import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Clock, Tag, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

const categoryColors = {
  running: 'bg-blue-100 text-blue-700',
  nutrition: 'bg-green-100 text-green-700',
  strength: 'bg-purple-100 text-purple-700',
  mindset: 'bg-amber-100 text-amber-700',
  business: 'bg-red-100 text-red-700',
  recovery: 'bg-teal-100 text-teal-700'
};

export default function Blog() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  const [lang, setLang] = useState(urlLang || localStorage.getItem('preferredLang') || 'ro');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');


  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blog-posts', lang],
    queryFn: async () => {
      const res = await fetch('/blog/index/posts.json');
      if (!res.ok) return [];
      return await res.json();
    }
  });


  const getLocalizedField = (post, field) => {
    if (lang === 'fr' && post[`${field}_fr`]) return post[`${field}_fr`];
    if (lang === 'en' && post[`${field}_en`]) return post[`${field}_en`];
    return post[`${field}_ro`] || post[`${field}_en`] || '';
  };

  const categories = ['all', 'running', 'nutrition', 'strength', 'mindset', 'business', 'recovery'];

  const categoryLabels = {
    ro: { running: 'Alergare', nutrition: 'Nutriție', strength: 'Forță', mindset: 'Mindset', business: 'Business', recovery: 'Recuperare' },
    en: { running: 'Running', nutrition: 'Nutrition', strength: 'Strength', mindset: 'Mindset', business: 'Business', recovery: 'Recovery' },
    fr: { running: 'Course', nutrition: 'Nutrition', strength: 'Force', mindset: 'État d\'esprit', business: 'Business', recovery: 'Récupération' }
  };


  // Sortez descrescător după dată
  const sortedPosts = posts.slice().sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date));

  const filteredPosts = sortedPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const title = getLocalizedField(post, 'title');
    const excerpt = getLocalizedField(post, 'excerpt');
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const content = {
    ro: {
      title: 'Blog',
      subtitle: 'Insight-uri despre performanță, energie și leadership',
      search: 'Caută articole...',
      readMore: 'Citește mai mult',
      all: 'Toate',
      noResults: 'Nu am găsit articole'
    },
    en: {
      title: 'Blog',
      subtitle: 'Insights on performance, energy and leadership',
      search: 'Search articles...',
      readMore: 'Read more',
      all: 'All',
      noResults: 'No articles found'
    },
    fr: {
      title: 'Blog',
      subtitle: 'Insights sur performance, énergie et leadership',
      search: 'Rechercher articles...',
      readMore: 'Lire plus',
      all: 'Tous',
      noResults: 'Aucun article trouvé'
    }
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      <Navbar lang={lang} setLang={setLang} />
      
      {/* Header */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl font-black text-slate-900 mb-4">{t.title}</h1>
            <p className="text-xl text-slate-600">{t.subtitle}</p>
          </div>

          {/* Search & Filters */}
          <div className="mb-12 space-y-6">
            {/* Search */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-3 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-teal-600 text-white shadow-lg'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat === 'all' ? t.all : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full mx-auto" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">{t.noResults}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  {post.image_url && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={post.image_url}
                        alt={getLocalizedField(post, 'title')}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  <div className="p-8">
                    {/* Category Badge */}
                    {post.category && (
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${categoryColors[post.category]}`}>
                        {post.category}
                      </span>
                    )}

                    <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">
                      {getLocalizedField(post, 'title')}
                    </h2>
                    
                    {getLocalizedField(post, 'excerpt') && (
                      <p className="text-slate-600 mb-4 line-clamp-2">{getLocalizedField(post, 'excerpt')}</p>
                    )}

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.publish_date ? new Date(post.publish_date).toLocaleDateString(lang, { year: 'numeric', month: 'short', day: 'numeric' }) : ''}</span>
                      </div>
                      {post.read_time && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.read_time} min</span>
                        </div>
                      )}
                    </div>

                    <Link
                      to={createPageUrl(`BlogPost?slug=${post.slug}&lang=${lang}`)}
                      className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:gap-3 transition-all"
                    >
                      {t.readMore}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}