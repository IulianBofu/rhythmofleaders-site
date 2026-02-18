import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

import { useQuery } from '@tanstack/react-query';

const categoryLabels = {
  ro: {
    productivity: 'Productivitate',
    energy: 'Energie',
    wellness: 'Wellness',
    mindset: 'Mindset',
    quick_tips: 'Tips rapide',
    running: 'Alergare',
    nutrition: 'Nutriție',
    strength: 'Forță',
    business: 'Business',
    recovery: 'Recuperare'
  },
  en: {
    productivity: 'Productivity',
    energy: 'Energy',
    wellness: 'Wellness',
    mindset: 'Mindset',
    quick_tips: 'Quick Tips',
    running: 'Running',
    nutrition: 'Nutrition',
    strength: 'Strength',
    business: 'Business',
    recovery: 'Recovery'
  },
  fr: {
    productivity: 'Productivité',
    energy: 'Énergie',
    wellness: 'Bien-être',
    mindset: 'État d\'esprit',
    quick_tips: 'Conseils rapides',
    running: 'Course',
    nutrition: 'Nutrition',
    strength: 'Force',
    business: 'Business',
    recovery: 'Récupération'
  }
};

const content = {
  ro: {
    tag: 'Blog',
    title: 'Insights pentru lideri',
    subtitle: 'Articole despre performanță, energie și mindset pentru executivi.',
    readTime: 'min citire',
    readMore: 'Citește',
    viewAll: 'Vezi toate articolele'
  },
  en: {
    tag: 'Blog',
    title: 'Insights for leaders',
    subtitle: 'Articles about performance, energy and mindset for executives.',
    readTime: 'min read',
    readMore: 'Read',
    viewAll: 'View all articles'
  },
  fr: {
    tag: 'Blog',
    title: 'Insights pour leaders',
    subtitle: 'Articles sur la performance, l\'énergie et le mindset pour dirigeants.',
    readTime: 'min lecture',
    readMore: 'Lire',
    viewAll: 'Voir tous les articles'
  }
};

// Fallback articles if no posts in DB
const fallbackArticles = {
  ro: [
    {
      title: 'De ce CEO-ii de succes fac mișcare dimineața',
      excerpt: 'Studiile arată că 80% dintre executivii de top au o rutină matinală care include activitate fizică.',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop',
      date: '5 Feb 2025',
      readTime: 5,
      category: 'productivity',
      slug: 'ceo-morning-exercise'
    },
    {
      title: '3 exerciții de 5 minute care îți pot salva ziua',
      excerpt: 'Micro-antrenamente care îți restabilesc focusul și energia în câteva minute.',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop',
      date: '1 Feb 2025',
      readTime: 4,
      category: 'quick_tips',
      slug: '5-minute-exercises'
    },
    {
      title: 'Somnul ca strategie de business',
      excerpt: 'De ce liderii moderni pun somnul în centrul performanței lor profesionale.',
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&h=400&fit=crop',
      date: '28 Ian 2025',
      readTime: 7,
      category: 'wellness',
      slug: 'sleep-business-strategy'
    },
    {
      title: 'Cum să-ți menții energia în zilele de 12+ ore',
      excerpt: 'Ghid practic pentru managementul energiei când programul nu-ți permite pauze.',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop',
      date: '22 Ian 2025',
      readTime: 6,
      category: 'energy',
      slug: 'maintain-energy-long-days'
    },
    {
      title: 'Mindset de atlet pentru sala de boardroom',
      excerpt: 'Ce poți învăța de la sportivii de performanță și cum să aplici mentalitatea lor în business.',
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop',
      date: '15 Ian 2025',
      readTime: 8,
      category: 'mindset',
      slug: 'athlete-mindset-boardroom'
    }
  ],
  en: [
    {
      title: 'Why successful CEOs exercise in the morning',
      excerpt: 'Studies show 80% of top executives have a morning routine that includes physical activity.',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop',
      date: 'Feb 5, 2025',
      readTime: 5,
      category: 'productivity',
      slug: 'ceo-morning-exercise'
    },
    {
      title: '3 five-minute exercises that can save your day',
      excerpt: 'Micro-workouts that restore your focus and energy in just minutes.',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop',
      date: 'Feb 1, 2025',
      readTime: 4,
      category: 'quick_tips',
      slug: '5-minute-exercises'
    },
    {
      title: 'Sleep as a business strategy',
      excerpt: 'Why modern leaders put sleep at the center of their professional performance.',
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&h=400&fit=crop',
      date: 'Jan 28, 2025',
      readTime: 7,
      category: 'wellness',
      slug: 'sleep-business-strategy'
    },
    {
      title: 'How to maintain energy on 12+ hour days',
      excerpt: 'Practical guide to energy management when your schedule doesn\'t allow breaks.',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop',
      date: 'Jan 22, 2025',
      readTime: 6,
      category: 'energy',
      slug: 'maintain-energy-long-days'
    },
    {
      title: 'Athlete mindset for the boardroom',
      excerpt: 'What you can learn from performance athletes and apply to leadership.',
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop',
      date: 'Jan 15, 2025',
      readTime: 8,
      category: 'mindset',
      slug: 'athlete-mindset-boardroom'
    }
  ]
};

export default function BlogSection({ lang }) {
  const t = content[lang] || content.en;


  // Blog posts - preia din posts.json
  const { data: dbPosts = [] } = useQuery({
    queryKey: ['blogposts-public', lang],
    queryFn: async () => {
      const res = await fetch('/blog/index/posts.json');
      if (!res.ok) return [];
      return await res.json();
    },
    staleTime: 1000 * 60 * 10,
  });

  // Use DB posts if available, otherwise fallback
  const getLocalizedField = (post, field) => {
    if (lang === 'fr' && post[`${field}_fr`]) return post[`${field}_fr`];
    if (lang === 'ro' && post[`${field}_ro`]) return post[`${field}_ro`];
    return post[`${field}_en`] || post[`${field}_ro`];
  };

  const getDateLocale = () => {
    if (lang === 'fr') return 'fr-FR';
    if (lang === 'ro') return 'ro-RO';
    return 'en-US';
  };


  // Filtrare și mapare articole pentru limba selectată
  const articles = dbPosts.length > 0
    ? dbPosts.map(post => ({
        title: post[`title_${lang}`] || post[`title_en`] || post[`title_ro`] || '',
        excerpt: post[`excerpt_${lang}`] || post[`excerpt_en`] || post[`excerpt_ro`] || '',
        image: post.image_url || 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop',
        date: post.publish_date ? new Date(post.publish_date).toLocaleDateString(getDateLocale(), { year: 'numeric', month: 'short', day: 'numeric' }) : '',
        readTime: post.read_time || 5,
        category: post.category || 'productivity',
        slug: post.slug
      }))
    : fallbackArticles[lang] || fallbackArticles.en;

  const [featured, ...rest] = articles;

  return (
    <section id="blog" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 text-teal-600 font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            <BookOpen className="w-4 h-4" />
            {t.tag}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
            {t.title}
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Featured + Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Article */}
          {featured && (
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link to={createPageUrl('BlogPost') + `?slug=${featured.slug}`}>
                <div className="relative h-full rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-teal-50 text-teal-600 text-xs font-semibold rounded-full">
                        {categoryLabels[lang][featured.category] || featured.category}
                      </span>
                      <div className="flex items-center gap-1 text-slate-400 text-sm">
                        <Clock className="w-4 h-4" />
                        {featured.readTime} {t.readTime}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">
                      {featured.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed mb-4">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">{featured.date}</span>
                      <span className="flex items-center gap-1 text-teal-600 font-semibold text-sm group-hover:gap-2 transition-all">
                        {t.readMore} <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Other Articles */}
          <div className="grid gap-4">
            {rest.map((article, index) => (
              <motion.article
                key={article.slug || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link to={createPageUrl('BlogPost') + `?slug=${article.slug}`}>
                  <div className="flex gap-4 p-4 rounded-2xl bg-white hover:shadow-xl transition-all duration-500 cursor-pointer">
                    <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded">
                          {categoryLabels[lang][article.category] || article.category}
                        </span>
                        <span className="text-xs text-slate-400">{article.readTime} {t.readTime}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2 text-sm">
                        {article.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">{article.date}</p>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}