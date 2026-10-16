'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Menu, X, Coffee, Package, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const { totalCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Craft & Origin', href: '#craft' },
    { label: 'Coffee Packs', href: '#menu' },
    { label: 'Gallery', href: '#gallery' },
  ];

  return (
    <>
      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#120A06]/95 backdrop-blur-md shadow-2xl shadow-black/50 border-b border-amber-900/30 py-2.5 sm:py-3'
            : 'bg-[#180F0A]/80 backdrop-blur-sm border-b border-white/5 py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-2.5 sm:gap-3.5 group min-w-0">
            <div className="relative w-10 h-10 sm:w-14 sm:h-14 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
              <img
                src="/darik-official-logo.png"
                alt="Darik Coffee Seal"
                className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(200,138,54,0.25)]"
              />
            </div>
            <span className="font-serif text-base sm:text-2xl font-black tracking-wider text-cream-soft group-hover:text-darik-300 transition-colors truncate">
              DARIK COFFEE
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-widest text-cream-soft/80 hover:text-darik-400 transition-colors font-medium relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-darik-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Actions: Cart, Shop Packs, Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-cream-soft border border-white/10 hover:border-darik-500/40 transition-all"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-darik-300" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-darik-500 text-espresso-dark font-bold text-[10px] sm:text-xs flex items-center justify-center animate-bounce">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Quick Order Button */}
            <a
              href="#menu"
              className="hidden sm:inline-flex items-center gap-2 py-2 sm:py-2.5 px-4 sm:px-5 rounded-full bg-gradient-to-r from-darik-600 via-darik-500 to-darik-400 hover:brightness-110 text-espresso-dark font-serif font-bold text-xs uppercase tracking-wider shadow-lg shadow-darik-500/20 transition-all"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Shop Packs</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-white/5 hover:bg-white/10 text-cream-soft border border-white/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-amber-900/30 bg-[#140C07] px-5 py-5 space-y-3 animate-fadeIn">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs uppercase tracking-wider text-cream-soft hover:text-darik-400 py-2.5 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-xs uppercase tracking-wider text-darik-400 hover:text-darik-300 py-2.5 border-b border-white/5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CMS Admin Panel</span>
            </a>
            <div className="pt-2">
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-gradient-to-r from-darik-600 to-darik-400 text-espresso-dark font-serif font-bold text-center block text-xs uppercase tracking-wider shadow-lg shadow-darik-500/20"
              >
                Shop Coffee Packs
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
