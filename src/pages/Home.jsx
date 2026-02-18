import React, { useState, useEffect } from 'react';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import VideoSection from '@/components/landing/VideoSection';
import WhyMeSection from '@/components/landing/WhyMeSection';
import AboutSection from '@/components/landing/AboutSection';
import ClientAvatars from '@/components/landing/ClientAvatars';
import ServicesSection from '@/components/landing/ServicesSection';
import CaseStudies from '@/components/landing/CaseStudies';
import LeadMagnetSection from '@/components/landing/LeadMagnetSection';
import BlogSection from '@/components/landing/BlogSection';
import FAQSection from '@/components/landing/FAQSection';
import LocalSEO from '@/components/landing/LocalSEO';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';
import WhatsAppButton from '@/components/landing/WhatsAppButton';
import TableOfContents from '@/components/landing/TableOfContents';
import GDPRBanner from '@/components/landing/GDPRBanner';
import PerformanceInsights from '@/components/landing/PerformanceInsights';

export default function Home() {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    // Auto-detect language from browser
    const browserLang = navigator.language.slice(0, 2);
    if (['ro', 'en', 'fr'].includes(browserLang)) {
      setLang(browserLang);
    } else {
      setLang('en');
    }
  }, []);

  useEffect(() => {
    const target = sessionStorage.getItem('scrollToSection');
    if (target) {
      sessionStorage.removeItem('scrollToSection');
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // SEO meta tags
    document.title = lang === 'ro' 
      ? 'Rhythm of Leaders | Coaching de Performanță pentru Executivi EU & Online'
      : lang === 'fr'
      ? 'Rhythm of Leaders | Coaching de Performance Dirigeants EU & En Ligne'
      : 'Rhythm of Leaders | Executive Performance Coaching EU & Online';
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', lang === 'ro'
      ? 'Coaching de performanță pentru executivi și fondatori în Europa și online. Energie susținută, focus ascuțit, rezultate în 4 săptămâni.'
      : lang === 'fr'
      ? 'Coaching de performance pour dirigeants et fondateurs en Europe et en ligne. Énergie soutenue, focus aiguisé, résultats en 4 semaines.'
      : 'Performance coaching for executives and founders in EU & online. Sustained energy, sharper focus, results in 4 weeks.'
    );

    // Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', lang === 'ro'
      ? 'coaching executivi bucuresti, personal trainer CEO, fitness lideri, energie productivitate, coaching performanta, antrenor executivi'
      : 'executive coaching bucharest, CEO personal trainer, leadership fitness, energy productivity, performance coaching, executive trainer'
    );

    // Open Graph
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', document.title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', metaDesc.getAttribute('content'));
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, [lang]);

  return (
    <div className="min-h-screen bg-white antialiased">
      <Navbar lang={lang} setLang={setLang} />
      <TableOfContents lang={lang} />
      
      <HeroSection lang={lang} />
      <VideoSection lang={lang} />
      <WhyMeSection lang={lang} />
      <AboutSection lang={lang} />
      <ClientAvatars lang={lang} />
      <ServicesSection lang={lang} />
      <CaseStudies lang={lang} />
      <LeadMagnetSection lang={lang} />
      <BlogSection lang={lang} />
      <FAQSection lang={lang} />
      <LocalSEO lang={lang} />
      <CTASection lang={lang} />
      <Footer lang={lang} />
      
      <WhatsAppButton lang={lang} />
      <GDPRBanner lang={lang} />
    </div>
  );
}