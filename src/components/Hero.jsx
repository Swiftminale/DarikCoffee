'use client';

import React from 'react';
import { useContent } from '../context/ContentContext';
import { Coffee, ArrowRight, Award, Sparkles, Flame } from 'lucide-react';

export default function Hero() {
  const { siteContent } = useContent();
  const hero = siteContent.hero;

  return (
    <section id="hero" className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#180F0A] via-[#120A06] to-[#0E0704] py-12 sm:py-16 md:py-24">
      {/* Background Ambient Glows & Coffee Steam Texture */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[600px] h-[500px] sm:h-[600px] bg-darik-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-amber-700/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle Coffee Bean Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#C88A36 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">

            {/* Main Headline */}
            <div className="space-y-2">
              <span className="font-signature text-2xl sm:text-4xl text-darik-400 block -mb-2">
                {hero.accentTag || 'Pure Ethiopian Tradition'}
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-cream-soft tracking-tight leading-[1.08]">
                {hero.titleLine1 || 'Enjoy Your Life'} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-darik-300 via-darik-400 to-amber-200">
                  {hero.titleLine2 || 'With Coffee'}
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-cream-muted max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              {hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <a
                href="#menu"
                className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-darik-600 via-darik-500 to-darik-400 text-espresso-dark font-serif font-black text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 shadow-xl shadow-darik-500/25 transition-all flex items-center justify-center gap-3 group"
              >
                <span>Shop Roasted Packs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#craft"
                className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-white/5 hover:bg-white/10 text-cream-soft border border-white/15 hover:border-darik-500/40 font-serif font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span>Our Heritage</span>
              </a>
            </div>

            {/* Heritage Badge */}
            <div className="pt-4 sm:pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
              <div className="font-serif text-xl sm:text-3xl font-black text-darik-400">
                Since 2004 E.C.
              </div>
            </div>
          </div>

          {/* Right Visual Image Column */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-4 lg:pt-0">
            {/* Outer Circular Glow Halo */}
            <div className="relative w-64 sm:w-80 md:w-96 lg:w-[420px] aspect-square">
              <div className="absolute inset-0 rounded-full border-2 border-darik-500/30 animate-spin" style={{ animationDuration: '40s' }} />
              <div className="absolute inset-3 sm:inset-4 rounded-full border border-dashed border-amber-500/20 animate-spin" style={{ animationDuration: '60s', animationDirection: 'reverse' }} />
              
              {/* Main Coffee Hero Image */}
              <div className="relative w-full h-full rounded-full overflow-hidden p-2.5 sm:p-3 bg-gradient-to-b from-darik-500/20 to-black/80 shadow-2xl shadow-black">
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 sm:border-4 border-darik-500/50 group">
                  <img
                    src={hero.image || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=85"}
                    alt="Steaming Artisanal Coffee Cup"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  />
                  {/* Subtle Steam Effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </div>

              {/* Floating Badge 1: Quality Stamp */}
              <div className="absolute -top-2 -left-2 sm:top-2 sm:left-0 bg-[#1A1009]/95 border border-darik-500/40 rounded-2xl p-2.5 sm:p-3.5 backdrop-blur-md shadow-xl flex items-center gap-2 sm:gap-3 scale-90 sm:scale-100 animate-float">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-darik-500/20 text-darik-400 flex items-center justify-center flex-shrink-0">
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-darik-400 font-bold">Daily Roasting</div>
                  <div className="text-[11px] sm:text-xs font-serif font-bold text-cream-soft">Small-Batch Fresh</div>
                </div>
              </div>

              {/* Floating Badge 2: Authentic Stamp */}
              <div className="absolute -bottom-2 -right-1 sm:bottom-4 sm:right-0 bg-[#1A1009]/95 border border-darik-500/40 rounded-2xl p-2.5 sm:p-3.5 backdrop-blur-md shadow-xl flex items-center gap-2 sm:gap-3 scale-90 sm:scale-100 animate-float" style={{ animationDelay: '2s' }}>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-darik-500/20 text-darik-400 flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-darik-400 font-bold">Birthplace of Coffee</div>
                  <div className="text-[11px] sm:text-xs font-serif font-bold text-cream-soft">ዳሪክ ቡና • Authentic</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
