'use client';

import React from 'react';

export default function Ticker({ reverse = false, variant = 'gold' }) {
  const items = [
    'Cappuccino',
    'Espresso',
    'Mocha',
    'Latte',
    'Americano',
    'Yirgacheffe Pour-Over',
    'Jebena Buna',
    'Nitro Cold Brew',
    'Sidama Heirloom',
    'Affogato Supreme',
  ];

  return (
    <div
      className={`relative overflow-hidden py-3 sm:py-4 border-y ${
        variant === 'gold'
          ? 'bg-gradient-to-r from-[#C88A36] via-[#DFAB5B] to-[#C88A36] text-[#140C07] border-amber-300/40 shadow-lg'
          : 'bg-[#180F0A] text-cream-soft border-amber-900/30'
      }`}
    >
      <div className="flex w-max select-none">
        {/* First track */}
        <div
          className={`flex shrink-0 items-center gap-8 px-4 ${
            reverse ? 'animate-marquee-reverse' : 'animate-marquee'
          }`}
        >
          {items.map((item, index) => (
            <div key={`track1-${index}`} className="flex items-center gap-8">
              <span className="font-serif font-black text-sm sm:text-base uppercase tracking-widest">
                {item}
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-current opacity-60" />
            </div>
          ))}
        </div>

        {/* Duplicate track for seamless infinite scroll */}
        <div
          className={`flex shrink-0 items-center gap-8 px-4 ${
            reverse ? 'animate-marquee-reverse' : 'animate-marquee'
          }`}
          aria-hidden="true"
        >
          {items.map((item, index) => (
            <div key={`track2-${index}`} className="flex items-center gap-8">
              <span className="font-serif font-black text-sm sm:text-base uppercase tracking-widest">
                {item}
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-current opacity-60" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
