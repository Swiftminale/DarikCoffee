'use client';

import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/coffeeData';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = TESTIMONIALS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="relative py-24 bg-[#140C07] text-cream-soft overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-darik-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-signature text-3xl text-darik-400 block">
            Words of Appreciation
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-cream-soft tracking-tight">
            What <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-darik-300 via-darik-400 to-amber-200">
              Our Customers Say
            </span>
          </h2>
        </div>

        {/* Testimonial Feature Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#20140D] to-[#120A06] border border-amber-900/40 p-5 sm:p-12 shadow-2xl overflow-hidden">
            
            {/* Giant Watermark Quote */}
            <Quote className="absolute -top-6 -right-6 w-44 h-44 text-white/[0.02] pointer-events-none transform rotate-12" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
              
              {/* Customer Avatar & Frame */}
              <div className="md:col-span-4 flex flex-col items-center text-center">
                <div className="relative w-24 h-24 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 sm:border-4 border-darik-500/40 p-1 shadow-xl shadow-darik-500/10">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="font-serif text-xl font-bold text-cream-soft mt-4">
                  {current.name}
                </h3>
                <p className="text-xs text-darik-400 font-medium mt-0.5">
                  {current.role}
                </p>
                <div className="flex items-center gap-1 mt-2 text-amber-300">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div className="md:col-span-8 space-y-6">
                <div className="w-10 h-10 rounded-2xl bg-darik-500/10 border border-darik-500/30 flex items-center justify-center text-darik-400">
                  <Quote className="w-5 h-5 fill-current" />
                </div>

                <blockquote className="font-serif text-lg sm:text-xl md:text-2xl text-cream-soft/90 font-light italic leading-relaxed">
                  "{current.comment}"
                </blockquote>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs text-cream-muted/60 uppercase tracking-widest font-mono">
                    Verified Customer • {current.date}
                  </span>

                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      className="w-9 h-9 rounded-full bg-white/5 hover:bg-darik-500 hover:text-espresso-dark text-cream-soft border border-white/10 flex items-center justify-center transition-all"
                      aria-label="Previous review"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-9 h-9 rounded-full bg-white/5 hover:bg-darik-500 hover:text-espresso-dark text-cream-soft border border-white/10 flex items-center justify-center transition-all"
                      aria-label="Next review"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
