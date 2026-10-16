'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PACKAGE_SIZES, GRIND_OPTIONS } from '../data/coffeeData';
import { X, Plus, Minus, Package, Sparkles, Check, Flame } from 'lucide-react';

export default function CustomizationModal() {
  const { customizingItem, setCustomizingItem, addToCart } = useCart();
  const [weight, setWeight] = useState('250g');
  const [grind, setGrind] = useState('Whole Bean (Uncut)');
  const [quantity, setQuantity] = useState(1);

  if (!customizingItem) return null;

  const basePrice = customizingItem.price;
  const currentSizeObj = PACKAGE_SIZES.find((s) => s.value === weight) || PACKAGE_SIZES[0];
  const unitPrice = +(basePrice * currentSizeObj.multiplier).toFixed(2);
  const currentTotal = (unitPrice * quantity).toFixed(2);

  const handleAdd = () => {
    addToCart(customizingItem, { weight, grind, quantity });
    setCustomizingItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-[#160D08] border border-amber-900/40 rounded-3xl text-cream-soft shadow-2xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setCustomizingItem(null)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-cream-muted hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6 flex-1">
          
          {/* Product Header */}
          <div className="flex items-start gap-3.5 pr-8 pb-5 border-b border-white/10">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-amber-900/40 flex-shrink-0 bg-black/40">
              <img 
                src={customizingItem.image} 
                alt={customizingItem.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1 left-1 bg-black/70 px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] text-darik-300 font-bold uppercase">
                {customizingItem.process?.split('/')[0] || 'Artisanal'}
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-semibold uppercase tracking-wider text-darik-400 font-serif">
                  {customizingItem.amharicName}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-darik-500/15 border border-darik-500/30 text-darik-300 font-medium">
                  {customizingItem.roastLevel}
                </span>
              </div>
              <h3 className="font-serif text-lg sm:text-2xl text-cream-soft font-bold mt-0.5">
                {customizingItem.name}
              </h3>
              <p className="text-xs text-cream-muted mt-0.5">{customizingItem.origin} • {customizingItem.altitude}</p>
            </div>
          </div>

          {/* Options Container */}
          <div className="space-y-5">
            
            {/* Package Weight Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-cream-muted flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-darik-400" />
                  <span>Select Package Size</span>
                </label>
                <span className="text-[10px] sm:text-[11px] text-darik-400">Valve-Sealed Bag</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {PACKAGE_SIZES.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setWeight(item.value)}
                    className={`p-2.5 sm:p-3 rounded-2xl border text-center transition-all ${
                      weight === item.value
                        ? 'border-darik-500 bg-darik-500/15 text-darik-300 font-semibold shadow-inner'
                        : 'border-white/10 hover:border-white/20 bg-white/[0.02] text-cream-muted'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-bold">{item.label}</div>
                    <div className="text-[10px] sm:text-[11px] opacity-75 mt-0.5">{item.serves}</div>
                    {item.save && (
                      <div className="text-[9px] text-amber-400 font-semibold mt-1 bg-amber-400/10 rounded-full py-0.5">
                        {item.save}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Grind Profile Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-cream-muted">
                  Grind Specification
                </label>
                <span className="text-[10px] sm:text-[11px] text-cream-muted/70">Custom Ground Fresh</span>
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                {GRIND_OPTIONS.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGrind(g.label)}
                    className={`w-full p-2.5 sm:p-3 rounded-2xl border flex items-center justify-between text-left transition-all ${
                      grind === g.label
                        ? 'border-darik-500 bg-darik-500/10 text-cream-soft'
                        : 'border-white/10 hover:border-white/20 bg-white/[0.02] text-cream-muted'
                    }`}
                  >
                    <div className="pr-2 min-w-0">
                      <div className="text-xs sm:text-sm font-semibold truncate">
                        <span className={grind === g.label ? 'text-darik-300' : 'text-cream-soft'}>
                          {g.label}
                        </span>
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-cream-muted/80 truncate mt-0.5">{g.desc}</div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[10px] text-darik-400/90 border border-darik-500/20 px-2 py-0.5 rounded-full hidden sm:inline-block">
                        {g.recommended}
                      </span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        grind === g.label
                          ? 'border-darik-500 bg-darik-500 text-espresso-dark'
                          : 'border-white/20'
                      }`}>
                        {grind === g.label && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Docked Sticky Bottom Action Bar */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#120A06] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-2.5 sm:px-3 py-1.5 flex-shrink-0">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 text-cream-muted hover:text-white"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-semibold text-xs sm:text-sm w-4 sm:w-5 text-center">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 text-cream-muted hover:text-white"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 py-3 sm:py-3.5 px-4 sm:px-6 rounded-full bg-gradient-to-r from-darik-600 via-darik-500 to-darik-400 text-espresso-dark font-serif font-black text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 shadow-lg shadow-darik-500/25 transition-all flex items-center justify-center gap-2 truncate"
          >
            <Package className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Add {weight} Pack • ${currentTotal}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
