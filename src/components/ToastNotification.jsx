'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export default function ToastNotification() {
  const { toastMessage, setIsCartOpen } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className="bg-[#1C110A] border border-darik-500/50 text-cream-soft px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md">
        <div className="w-8 h-8 rounded-full bg-darik-500/20 text-darik-400 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div className="text-xs font-medium pr-2">
          {toastMessage}
        </div>
        <button
          onClick={() => setIsCartOpen(true)}
          className="text-xs uppercase tracking-wider font-bold text-darik-400 hover:text-darik-300 underline underline-offset-2 flex items-center gap-1"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>View</span>
        </button>
      </div>
    </div>
  );
}
