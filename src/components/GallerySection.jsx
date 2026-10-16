'use client';

import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Sparkles, Maximize2, X, Heart } from 'lucide-react';

export default function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const { galleryItems } = useContent();

  const getResponsiveSpan = (span) => {
    if (!span) return 'col-span-12 sm:col-span-6 md:col-span-4';
    if (span.includes('col-span-12')) return 'col-span-12';
    if (span.includes('col-span-8')) return 'col-span-12 sm:col-span-8';
    return 'col-span-12 sm:col-span-6 md:col-span-4';
  };

  return (
    <section id="gallery" className="relative py-16 sm:py-24 bg-[#0E0704] text-cream-soft overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-darik-500/10 border border-darik-500/30 text-darik-300 text-xs uppercase tracking-widest font-semibold">
            <Heart className="w-3.5 h-3.5 fill-darik-500 text-darik-500" />
            <span>Crafted With Love In Ethiopia</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-cream-soft tracking-tight">
            Our Shop <br />
            <span className="font-signature text-darik-400 font-normal text-4xl sm:text-6xl block -mt-1 sm:-mt-2">
              Our dream gallery
            </span>
          </h2>

          <p className="text-xs sm:text-base text-cream-muted font-light leading-relaxed">
            Step behind our roastery bar. Witness the dedication of our master baristas, the golden glow of our cast-iron roasters, and the communal warmth of authentic coffee culture.
          </p>
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-12 gap-3 sm:gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className={`group relative rounded-3xl overflow-hidden border border-amber-900/30 bg-[#1A1009] cursor-pointer shadow-lg hover:border-darik-500/50 transition-all duration-500 ${getResponsiveSpan(item.span)} ${item.aspect || 'h-48 md:h-[240px]'}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

              {/* Hover / Persistent Overlay Tag */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-end justify-between">
                <div>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-darik-400 font-bold bg-black/70 px-2 py-0.5 rounded backdrop-blur-md">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-sm sm:text-lg font-bold text-cream-soft mt-1 line-clamp-1">
                    {item.title}
                  </h3>
                </div>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 group-hover:bg-darik-500 group-hover:text-espresso-dark flex items-center justify-center transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 flex-shrink-0">
                  <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-3xl overflow-hidden border border-amber-900/50 bg-[#140C07]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-black transition-colors"
              aria-label="Close photo"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="relative max-h-[75vh] w-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full max-h-[75vh] object-contain"
              />
            </div>
            <div className="p-4 sm:p-6 bg-[#160D08] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-darik-400 font-bold">
                  {selectedPhoto.category}
                </span>
                <h3 className="font-serif text-base sm:text-xl font-bold text-cream-soft mt-0.5">
                  {selectedPhoto.title}
                </h3>
              </div>
              <span className="text-xs text-cream-muted/70 font-serif hidden sm:inline-block">
                Darik Coffee Roasters
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
