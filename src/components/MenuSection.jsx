'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useContent } from '../context/ContentContext';
import { Star, Plus, Package, SlidersHorizontal, Mountain, Flame, Check } from 'lucide-react';

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { addToCart, setCustomizingItem } = useCart();
  const { products } = useContent();

  const categories = [
    { id: 'all', label: 'All Roasted Packs' },
    { id: 'single-origin', label: 'Single Origin Reserves' },
    { id: 'natural-honey', label: 'Natural & Honey Process' },
    { id: 'dark-espresso', label: 'Dark & Espresso Roasts' },
  ];

  const availableProducts = products.filter((p) => p.available !== false);

  const filteredItems = activeCategory === 'all'
    ? availableProducts
    : availableProducts.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="relative py-24 bg-[#140C07] text-cream-soft overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-darik-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="font-signature text-3xl text-darik-400 block">
            Freshly Roasted & Sealed at Origin
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-cream-soft tracking-tight">
            The Coffee <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-darik-300 via-darik-400 to-amber-200">
              We Pack & Deliver
            </span>
          </h2>
          <p className="text-sm sm:text-base text-cream-muted font-light leading-relaxed">
            Order premium whole-bean or freshly custom-ground coffee pouches directly from Ethiopia. Nitrogen-flushed, one-way degassing valve bags sealed for peak aroma.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-serif uppercase tracking-wider whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-darik-600 to-darik-400 text-espresso-dark font-bold shadow-lg shadow-darik-500/20'
                  : 'bg-white/[0.04] text-cream-muted hover:text-cream-soft border border-white/10 hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl bg-gradient-to-b from-[#1F130C] to-[#160D08] border border-amber-900/30 overflow-hidden hover:border-darik-500/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-darik-500/10 flex flex-col justify-between"
            >
              {/* Product Image & Badges */}
              <div className="relative h-60 w-full overflow-hidden bg-black/40">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F130C] via-transparent to-transparent opacity-80" />
                
                {/* Badge */}
                {item.badge && (
                  <div className="absolute top-3 left-3 bg-[#0A0503]/85 backdrop-blur-md border border-darik-500/40 px-2.5 py-1 rounded-full text-[10px] uppercase font-bold text-darik-300 tracking-wider">
                    {item.badge}
                  </div>
                )}

                {/* Rating badge */}
                <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 text-[11px] font-bold text-amber-300">
                  <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                  <span>{item.rating}</span>
                </div>

                {/* Bottom bar inside image: Altitude & Process */}
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] text-cream-muted/80 bg-black/60 px-2.5 py-1 rounded-xl backdrop-blur-sm">
                  <span className="flex items-center gap-1">
                    <Mountain className="w-3 h-3 text-darik-400" />
                    {item.altitude.split('–')[0]}
                  </span>
                  <span className="text-darik-400 font-medium">
                    {item.process.split('/')[0]}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-darik-500 font-serif">
                      {item.amharicName}
                    </span>
                    <span className="text-[10px] text-cream-muted/70 uppercase">
                      250g, 500g, 1kg
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-cream-soft mt-1 group-hover:text-darik-300 transition-colors">
                    {item.name}
                  </h3>

                  {/* Roast Level Indicator */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[11px] text-darik-300 font-medium">{item.roastLevel}</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`w-1.5 h-1.5 rounded-full ${
                            level <= item.roastDegree
                              ? 'bg-darik-400'
                              : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-cream-muted mt-2 line-clamp-2 font-light leading-relaxed">
                    {item.description}
                  </p>

                  {/* Flavor Notes */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.notes.map((note) => (
                      <span
                        key={note}
                        className="text-[10px] bg-white/[0.04] text-cream-muted/90 px-2 py-0.5 rounded-md border border-white/5"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price and Cart Buttons */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-cream-muted block">
                      Starts from (250g)
                    </span>
                    <span className="font-serif text-xl font-bold text-cream-soft">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Select Size / Grind Customization */}
                    <button
                      type="button"
                      onClick={() => setCustomizingItem(item)}
                      className="px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 text-cream-soft hover:text-darik-300 border border-white/10 text-xs font-serif flex items-center gap-1 transition-all"
                      title="Select weight and grind"
                    >
                      <SlidersHorizontal className="w-3 h-3 text-darik-400" />
                      <span>Grind</span>
                    </button>

                    {/* Quick Add 250g Whole Bean */}
                    <button
                      type="button"
                      onClick={() => addToCart(item, { weight: '250g', grind: 'Whole Bean (Uncut)' })}
                      className="py-2 px-3 rounded-full bg-gradient-to-r from-darik-600 to-darik-400 hover:brightness-110 text-espresso-dark font-serif font-bold text-xs flex items-center gap-1 shadow-md shadow-darik-500/20 transition-all"
                      title="Quick add 250g Whole Bean"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Bag</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
