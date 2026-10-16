'use client';

import React from 'react';
import { QUALITY_FEATURES } from '../data/coffeeData';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function QualitySection() {
  return (
    <section id="craft" className="relative py-24 bg-[#0E0704] text-cream-soft overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-darik-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-700/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-darik-500/10 border border-darik-500/25">
            <Sparkles className="w-3.5 h-3.5 text-darik-400" />
            <span className="text-xs uppercase tracking-widest text-darik-300 font-semibold">
              The Darik Standard • የጥራት ደረጃ
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-cream-soft">
            We Provide <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-darik-300 via-darik-400 to-amber-200">
              Quality Coffee to Deliver
            </span>
          </h2>

          <p className="text-xs sm:text-base text-cream-muted leading-relaxed font-light">
            Every step in our supply chain honors centuries of Ethiopian coffee craft. From soil elevation to drum temperature, our obsessive standard guarantees a cup beyond compare.
          </p>
        </div>

        {/* 3 Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {QUALITY_FEATURES.map((item, idx) => (
            <div
              key={item.id}
              className="group relative rounded-3xl bg-gradient-to-b from-[#1E120A] to-[#140C07] border border-amber-900/30 overflow-hidden hover:border-darik-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-darik-500/10 flex flex-col"
            >
              {/* Image Container with pill badge */}
              <div className="relative h-52 sm:h-72 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E120A] via-transparent to-black/30" />
                
                {/* Badge */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[11px] font-semibold text-darik-300 tracking-wider uppercase">
                  {item.tag}
                </div>

                <div className="absolute bottom-3 left-4 text-xs font-serif text-darik-400">
                  {item.amharic}
                </div>
              </div>

              {/* Text Body */}
              <div className="p-5 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream-soft group-hover:text-darik-300 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs text-darik-400 font-medium mt-1">
                    {item.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-cream-muted mt-3 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-darik-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-darik-500" />
                    Triple Inspected
                  </span>
                  <a
                    href="#menu"
                    className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-darik-500 group-hover:text-espresso-dark text-cream-muted flex items-center justify-center transition-all"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
