'use client';

import React from 'react';
import { Award, ShieldCheck } from 'lucide-react';

export default function HeritageBanner() {
  return (
    <div className="relative py-8 bg-[#0B0604] border-y border-darik-500/20 overflow-hidden text-cream-soft">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-darik-500/5 via-amber-600/10 to-darik-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Ticker items */}
        <div className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest font-serif text-cream-muted/70">
          <span>Yirgacheffe</span>
          <span className="w-1.5 h-1.5 rounded-full bg-darik-500" />
          <span>Sidama Heirloom</span>
          <span className="w-1.5 h-1.5 rounded-full bg-darik-500" />
          <span>Harrar Natural</span>
        </div>

        {/* Center Vintage Badge */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-darik-500 bg-gradient-to-b from-[#2E1B10] to-[#120A06] p-1 shadow-xl shadow-darik-500/20 flex flex-col items-center justify-center text-center flex-shrink-0">
            <span className="text-[7px] sm:text-[8px] uppercase tracking-wider text-darik-400 font-bold">SINCE</span>
            <span className="font-serif font-black text-sm sm:text-base text-cream-soft leading-none">2004</span>
            <span className="text-[6px] sm:text-[7px] text-amber-300 font-medium tracking-tight">E.C. ETHIOPIA</span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-serif text-base sm:text-lg font-bold text-cream-soft">
                Darik Coffee
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-darik-500/20 text-darik-400 font-serif">
                ዳሪክ ቡና
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-cream-muted leading-tight mt-0.5">
              Handcrafted Coffee Mastery & Cultural Heritage Since 2004 E.C.
            </p>
          </div>
        </div>

        {/* Right Ticker items */}
        <div className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest font-serif text-cream-muted/70">
          <span>Limu Washed</span>
          <span className="w-1.5 h-1.5 rounded-full bg-darik-500" />
          <span>Kaffa Forest</span>
          <span className="w-1.5 h-1.5 rounded-full bg-darik-500" />
          <span>Guji Highland</span>
        </div>

      </div>
    </div>
  );
}
