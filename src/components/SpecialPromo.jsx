'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useContent } from '../context/ContentContext';
import { Clock, Sparkles, ArrowRight, Percent, Package } from 'lucide-react';

export default function SpecialPromo() {
  const { addToCart } = useCart();
  const { siteContent } = useContent();
  const promo = siteContent?.promo || {};

  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 32,
    seconds: 48,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const promoImage = promo.image || 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80';
  const salePrice = Number(promo.salePrice) || 14.50;
  const originalPrice = Number(promo.originalPrice) || 29.00;
  const productName = promo.productName || 'Yirgacheffe Geisha Honey Reserve (500g Bag)';

  const specialCoffee = {
    id: 'special-yirgacheffe-geisha-500g',
    name: `Today's Special: ${productName}`,
    amharicName: 'ልዩ የታሸገ ቡና 500ግ',
    price: salePrice,
    image: promoImage,
    roast: 'Artisanal Honey Process Roasted Whole Bean',
    origin: 'Ethiopian Highlands Reserve',
    weight: '500g',
    grind: 'Whole Bean (Uncut)',
  };

  return (
    <section id="special" className="relative py-16 sm:py-20 overflow-hidden bg-gradient-to-r from-[#180C07] via-[#22120A] to-[#180C07] border-y border-amber-900/40 text-cream-soft">
      {/* Background Coffee Bean Ambience */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay"
        style={{
          backgroundImage: `url('${promoImage}')`
        }}
      />
      
      {/* Golden Warm Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-darik-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-black/60 border border-darik-500/30 p-6 sm:p-10 lg:p-12 backdrop-blur-md shadow-2xl relative overflow-hidden">
          
          {/* Big Scalloped Discount Sticker Badge */}
          <div className="absolute -top-3 -right-3 sm:top-6 sm:right-6 w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-darik-300 via-darik-500 to-amber-700 p-0.5 sm:p-1 shadow-2xl shadow-darik-500/30 transform rotate-12 flex items-center justify-center animate-pulse z-10">
            <div className="w-full h-full rounded-full border border-dashed sm:border-2 border-espresso-dark bg-gradient-to-b from-darik-400 to-darik-600 flex flex-col items-center justify-center text-espresso-dark text-center font-black">
              <span className="text-base sm:text-2xl leading-none">{promo.discountBadge || '50%'}</span>
              <span className="text-[9px] sm:text-[11px] uppercase tracking-widest font-serif">OFF</span>
              <span className="text-[7px] sm:text-[8px] tracking-tight font-sans hidden sm:block">TODAY ONLY</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 pr-12 sm:pr-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-darik-500/20 border border-darik-500/40 text-darik-300 text-[10px] sm:text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-darik-400" />
                <span>{promo.tag || 'Limited Roastery Release'}</span>
              </div>

              <div>
                <span className="font-signature text-2xl sm:text-4xl text-darik-400 block -mb-1">
                  Today's Special
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-cream-soft tracking-tight">
                  {promo.title || 'Coffee Time'}
                </h2>
              </div>

              <p className="text-cream-muted text-xs sm:text-base leading-relaxed font-light">
                {promo.description || `Indulge in our rare ${productName}, freshly roasted and nitrogen-sealed at origin. Unlocks exquisite tasting notes of jasmine flower, bergamot rind, and wild highland honeycomb.`}
              </p>

              {/* Countdown Clock */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-1">
                <div className="flex items-center gap-1.5 text-xs text-darik-400 uppercase tracking-widest font-semibold">
                  <Clock className="w-3.5 h-3.5 text-darik-400" />
                  <span>Offer Expires In:</span>
                </div>
                <div className="flex items-center gap-2">
                  {[
                    { value: timeLeft.hours, label: 'HRS' },
                    { value: timeLeft.minutes, label: 'MIN' },
                    { value: timeLeft.seconds, label: 'SEC' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div className="bg-white/10 border border-white/15 px-2.5 sm:px-3 py-1 rounded-xl text-center min-w-[42px] sm:min-w-[48px]">
                        <div className="font-serif text-base sm:text-lg font-bold text-cream-soft">
                          {String(item.value).padStart(2, '0')}
                        </div>
                        <div className="text-[8px] sm:text-[9px] text-cream-muted font-mono">{item.label}</div>
                      </div>
                      {i < 2 && <span className="text-darik-400 font-bold">:</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Price and CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-2">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-2xl sm:text-3xl font-black text-darik-400">${salePrice.toFixed(2)}</span>
                  <span className="text-cream-muted/50 line-through text-sm sm:text-base font-serif">${originalPrice.toFixed(2)}</span>
                  <span className="text-xs text-darik-400/90 font-serif">(500g Bag)</span>
                </div>

                <button
                  type="button"
                  onClick={() => addToCart(specialCoffee)}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-darik-600 via-darik-500 to-darik-400 hover:brightness-110 text-espresso-dark font-serif font-black text-xs uppercase tracking-wider shadow-lg shadow-darik-500/25 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Claim 500g Special Pack</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Product Image Showcase Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-xs sm:max-w-sm rounded-3xl overflow-hidden border-2 border-darik-500/30 bg-[#160C07] shadow-2xl p-3 sm:p-4 group">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/40">
                  <img
                    src={promoImage}
                    alt={productName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-darik-300">
                      Roasted & Packed
                    </span>
                    <h4 className="font-serif text-sm font-bold text-cream-soft truncate">
                      {productName}
                    </h4>
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
