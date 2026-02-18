import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { trackGalleryImageClick } from '../analytics/TrackingEvents';

const galleries = {
  chamonix: [
    { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200', caption: 'Mont Blanc Massif' },
    { url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200', caption: 'Morning Hike Trail' },
    { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200', caption: 'Alpine Views' },
    { url: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200', caption: 'Mountain Lodge' },
    { url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200', caption: 'Sunset Peak' },
    { url: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1200', caption: 'Valley Trail' }
  ],
  corbu: [
    { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200', caption: 'Black Sea Beach' },
    { url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200', caption: 'Coastal Sunrise' },
    { url: 'https://images.unsplash.com/photo-1566562096057-52d0645977ca?w=1200', caption: 'Beach Workout' },
    { url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200', caption: 'Seaside Path' },
    { url: 'https://images.unsplash.com/photo-1516815231560-8f41ec531527?w=1200', caption: 'Sunset Session' },
    { url: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200', caption: 'Ocean View' }
  ]
};

export default function LocationGallery({ location, lang }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const images = galleries[location] || galleries.chamonix;

  const content = {
    ro: { title: 'Galerie', close: 'Închide' },
    en: { title: 'Gallery', close: 'Close' },
    fr: { title: 'Galerie', close: 'Fermer' }
  };

  const t = content[lang];

  const nextImage = () => {
    setSelectedImage((selectedImage + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((selectedImage - 1 + images.length) % images.length);
  };

  return (
    <div>
      <h3 className="text-2xl font-black text-slate-900 mb-6">{t.title}</h3>
      
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedImage(i)}
          >
            <img
              src={img.url}
              alt={img.caption}
              className="w-full h-full object-cover group-hover:brightness-75 transition-all"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="absolute bottom-3 left-3 text-white font-semibold text-sm">
                {img.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <motion.img
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={images[selectedImage].url}
              alt={images[selectedImage].caption}
              className="max-w-full max-h-full object-contain rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <p className="text-white font-semibold">{images[selectedImage].caption}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}