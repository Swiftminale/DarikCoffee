'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useContent } from '../context/ContentContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, clearCart, subtotal } = useCart();
  const { addOrder } = useContent();
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C88A36', '#E0A953', '#FAF6F0', '#3D2411']
    });
    
    // Save to orders log
    addOrder({
      items: cart,
      subtotal,
      total: +(subtotal * 1.08).toFixed(2),
    });

    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
      setIsOrdered(false);
      setIsCartOpen(false);
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop click */}
      <div className="flex-1" onClick={() => setIsCartOpen(false)} />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#130B07] border-l border-amber-900/30 h-full flex flex-col text-cream-soft shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-darik-500/10 border border-darik-500/30 flex items-center justify-center text-darik-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-cream-soft">Your Coffee Bag</h2>
              <p className="text-xs text-darik-400">Darik Coffee Order</p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-cream-muted hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
          {isOrdered ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-darik-500/20 text-darik-400 border border-darik-500/40 flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-cream-soft">
                Order Received!
              </h3>
              <p className="text-sm text-cream-muted max-w-xs">
                Our master baristas are preparing your authentic Ethiopian brew with fresh roasts.
              </p>
              <div className="text-xs uppercase tracking-widest text-darik-400 font-semibold bg-darik-500/10 px-4 py-1.5 rounded-full">
                Estimated Ready: 12 Mins
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cream-muted">
                <ShoppingBag className="w-8 h-8 opacity-40" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-cream-soft">
                Your Bag is Empty
              </h3>
              <p className="text-xs text-cream-muted max-w-xs">
                Discover our artisanal single-origin roasts, signature drinks, and fresh brews.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 text-xs uppercase tracking-widest font-semibold text-darik-400 hover:text-darik-300 border-b border-darik-400/40 pb-1"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartItemId}
                className="p-4 rounded-2xl bg-white/[0.03] border border-amber-900/20 flex gap-4 items-center hover:border-amber-900/40 transition-colors"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover border border-amber-900/30 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm font-bold text-cream-soft truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-darik-400 font-medium">
                    {item.weight || '250g'} Bag • {item.grind ? item.grind.split('(')[0].trim() : 'Whole Bean'}
                  </p>
                  <p className="text-xs font-semibold text-cream-soft mt-1">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-white/40 hover:text-red-400 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-full px-2 py-0.5">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, -1)}
                      className="text-white/60 hover:text-white p-0.5"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-semibold w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, 1)}
                      className="text-white/60 hover:text-white p-0.5"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout */}
        {cart.length > 0 && !isOrdered && (
          <div className="p-4 sm:p-6 border-t border-white/10 bg-black/40 space-y-3 sm:space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-cream-muted">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-cream-muted">
                <span>Estimated Tax (8%)</span>
                <span>${(subtotal * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-cream-soft font-semibold text-sm pt-2 border-t border-white/10">
                <span>Total</span>
                <span className="text-darik-400 font-serif text-base font-bold">
                  ${(subtotal * 1.08).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-4 rounded-full bg-gradient-to-r from-darik-600 via-darik-500 to-darik-400 text-espresso-dark font-serif font-bold text-sm hover:brightness-110 shadow-lg shadow-darik-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Place Coffee Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
