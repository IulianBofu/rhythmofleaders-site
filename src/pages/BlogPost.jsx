import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { trackBlogPostView, trackBlogCTAClick } from '../components/analytics/TrackingEvents';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

export default function BlogPost() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  const urlLang = urlParams.get('lang') || localStorage.getItem('preferredLang') || 'ro';
  const [lang, setLang] = useState(urlLang);


  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const res = await fetch('/blog/index/posts.json');
      if (!res.ok) return [];
      const allPosts = await res.json();
      // Caută articolul după slug
      return allPosts.filter(p => p.slug === slug);
    }
  });

  const post = posts[0];

  const getLocalizedField = (field) => {
    if (!post) return '';
    if (lang === 'fr' && post[`${field}_fr`]) return post[`${field}_fr`];
    if (lang === 'en' && post[`${field}_en`]) return post[`${field}_en`];
    return post[`${field}_ro`] || post[`${field}_en`];
  };

  // Track blog post view
  useEffect(() => {
    if (post) {
      trackBlogPostView(post.slug, getLocalizedField('title'), post.category);
    }
  }, [post, lang]);

  // Set SEO meta tags
  useEffect(() => {
    if (!post) return;

    const title = getLocalizedField('title');
    const excerpt = getLocalizedField('excerpt');

    // Set title
    document.title = `${title} | Rhythm of Leaders`;

    // Set meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', excerpt || '');

    // Set canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    const canonicalUrl = `https://rhythmofleaders.com/blog/${post.slug}`;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // Keywords
    let keywords = document.querySelector('meta[name="keywords"]');
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.name = 'keywords';
      document.head.appendChild(keywords);
    }
    const kwList = lang === 'ro' 
      ? 'coaching executivi, performanță business, energie lideri, productivity CEO'
      : lang === 'fr'
      ? 'coaching dirigeants, performance business, énergie leaders, productivité CEO'
      : 'executive coaching, business performance, leader energy, CEO productivity';
    keywords.setAttribute('content', kwList);

    // Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', excerpt || '');

    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', post.image_url || 'https://rhythmofleaders.com/og-image.jpg');

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', canonicalUrl);

    // Twitter Card
    let twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (!twitterCard) {
      twitterCard = document.createElement('meta');
      twitterCard.name = 'twitter:card';
      document.head.appendChild(twitterCard);
    }
    twitterCard.setAttribute('content', 'summary_large_image');
  }, [post, lang]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-4">Articol negăsit</h1>
          <Link to={createPageUrl('Blog')} className="text-teal-600 hover:underline">
            ← Înapoi la blog
          </Link>
        </div>
      </div>
    );
  }

  const tags = post.tags ? post.tags.split(',').map(t => t.trim()) : [];

  const backText = {
    ro: 'Înapoi la blog',
    en: 'Back to blog',
    fr: 'Retour au blog'
  };

  const ctaText = {
    ro: {
      title: 'Vrei să optimizezi energia și performanța?',
      subtitle: 'Programează o consultație gratuită de 30 minute',
      button: 'Hai să vorbim'
    },
    en: {
      title: 'Want to optimize your energy and performance?',
      subtitle: 'Schedule a free 30-minute consultation',
      button: 'Let\'s talk'
    },
    fr: {
      title: 'Envie d\'optimiser votre énergie et performance?',
      subtitle: 'Planifiez une consultation gratuite de 30 minutes',
      button: 'Discutons ensemble'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      <Navbar lang={lang} setLang={setLang} />
      
      <article className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            to={createPageUrl(`Blog?lang=${lang}`)}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-teal-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {backText[lang]}
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            {post.category && (
              <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-6">
                {post.category}
              </span>
            )}

            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
              {getLocalizedField('title')}
            </h1>

            {getLocalizedField('excerpt') && (
              <p className="text-xl text-slate-600 mb-6">{getLocalizedField('excerpt')}</p>
            )}

            {/* Meta */}
            <div className="flex items-center gap-6 text-slate-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(post.publish_date).toLocaleDateString(lang, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              {post.read_time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{post.read_time} {lang === 'ro' ? 'min citire' : lang === 'fr' ? 'min lecture' : 'min read'}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Cover Image */}
          {post.image_url && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-12 rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src={post.image_url}
                alt={getLocalizedField('title')}
                className="w-full aspect-[21/9] object-cover"
              />
            </motion.div>
          )}

          {/* Decorative divider */}
          <div className="flex items-center gap-4 my-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-300 to-transparent" />
            <div className="w-2 h-2 rounded-full bg-teal-400" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-300 to-transparent" />
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="prose prose-xl prose-slate max-w-none mb-12
                       prose-headings:font-black prose-headings:text-slate-900
                       prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:tracking-tight
                       prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
                       prose-p:text-slate-700 prose-p:leading-loose prose-p:mb-6
                       prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline
                       prose-strong:text-slate-900 prose-strong:font-bold
                       prose-ul:my-6 prose-ul:space-y-2 prose-ol:my-6 prose-ol:space-y-2
                       prose-li:text-slate-700
                       prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8
                       prose-blockquote:border-l-4 prose-blockquote:border-teal-500 prose-blockquote:bg-teal-50/50 prose-blockquote:rounded-r-xl prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:italic prose-blockquote:text-slate-600
                       first-letter:text-5xl first-letter:font-black first-letter:text-teal-600 first-letter:float-left first-letter:mr-3 first-letter:mt-1"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            dangerouslySetInnerHTML={{ __html: getLocalizedField('content') }}
          />

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex items-center gap-3 flex-wrap pt-8 border-t border-slate-200">
              <Tag className="w-5 h-5 text-slate-400" />
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 p-10 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-3xl text-center">
            <h3 className="text-3xl font-black text-white mb-4">
              {ctaText[lang].title}
            </h3>
            <p className="text-white/90 mb-6 text-lg">
              {ctaText[lang].subtitle}
            </p>
            <Link
              to={createPageUrl('Home')}
              onClick={() => trackBlogCTAClick(slug, 'consultation_cta')}
              className="inline-block px-8 py-4 bg-white text-teal-600 font-bold rounded-full hover:scale-105 transition-transform shadow-lg"
            >
              {ctaText[lang].button}
            </Link>
          </div>
        </div>
      </article>

      <Footer lang={lang} />
    </div>
  );
}