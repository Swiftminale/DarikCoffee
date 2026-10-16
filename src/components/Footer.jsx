'use client';

import React from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Heart, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#080402] text-cream-soft border-t border-amber-900/30 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-darik-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Quote Banner & Social Follow Section */}
      <div className="border-b border-white/5 py-16 sm:py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
          
          {/* Famous Quote */}
          <div className="space-y-3">
            <span className="font-signature text-3xl sm:text-4xl text-darik-400 block">
              A Daily Ritual
            </span>
            <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-cream-soft max-w-2xl mx-auto leading-snug">
              "You can't buy happiness, but you can buy coffee, and that's pretty close."
            </blockquote>
            <p className="text-xs uppercase tracking-widest text-darik-500/90 font-serif">
              — An Old Roaster's Proverb
            </p>
          </div>

          {/* Follow Our Social Media Bar - Redirects to TikTok */}
          <div className="max-w-lg mx-auto pt-2">
            <a
              href="https://www.tiktok.com/@darikcoffee"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col sm:flex-row items-center justify-between p-3 sm:p-2 sm:pl-6 rounded-3xl sm:rounded-full bg-white/[0.04] border border-white/10 hover:border-darik-500/50 hover:bg-white/[0.07] transition-all shadow-xl shadow-black/40 gap-3 sm:gap-0"
            >
              <div className="flex items-center gap-3 text-left w-full sm:w-auto">
                <div className="w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-cream-soft group-hover:text-darik-400 group-hover:border-darik-500/40 transition-colors flex-shrink-0">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.69a6.34 6.34 0 0 0 10.86 4.43 6.27 6.27 0 0 0 1.9-4.47V8.5a8.27 8.27 0 0 0 4.83 1.56V6.69z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="text-xs sm:text-sm font-serif font-bold text-cream-soft group-hover:text-darik-300 transition-colors block">
                    Follow our social media
                  </span>
                  <span className="text-[11px] text-cream-muted/70 block truncate">
                    @darikcoffee on TikTok
                  </span>
                </div>
              </div>

              <div className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-darik-600 to-darik-400 text-espresso-dark font-serif font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 group-hover:brightness-110 shadow-md shadow-darik-500/20 transition-all flex-shrink-0">
                <span>TikTok</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 text-[11px] sm:text-xs text-cream-muted/60">
              <span>☕ Daily Roasts</span>
              <span className="w-1 h-1 rounded-full bg-darik-500" />
              <span>🎬 Barista Rituals</span>
              <span className="w-1 h-1 rounded-full bg-darik-500" />
              <span>🇪🇹 Ethiopian Heritage</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex-shrink-0">
                <img
                  src="/darik-official-logo.png"
                  alt="Darik Coffee"
                  className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(200,138,54,0.2)]"
                />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-wide text-cream-soft block">
                  DARIK COFFEE
                </span>
                <span className="text-xs text-darik-400 font-serif">
                  ዳሪክ ቡና • Artisanal Coffee
                </span>
              </div>
            </div>

            <p className="text-xs text-cream-muted leading-relaxed font-light">
              Rooted in the highlands of Ethiopia, the birthplace of Arabica coffee. We honor centuries-old ceremonial traditions while crafting modern, single-origin roasts for discerning coffee lovers worldwide.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.tiktok.com/@darikcoffee"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-darik-500 hover:text-espresso-dark text-cream-muted flex items-center justify-center border border-white/10 transition-all"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.69a6.34 6.34 0 0 0 10.86 4.43 6.27 6.27 0 0 0 1.9-4.47V8.5a8.27 8.27 0 0 0 4.83 1.56V6.69z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-darik-500 hover:text-espresso-dark text-cream-muted flex items-center justify-center border border-white/10 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-darik-500 hover:text-espresso-dark text-cream-muted flex items-center justify-center border border-white/10 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-darik-500 hover:text-espresso-dark text-cream-muted flex items-center justify-center border border-white/10 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-darik-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-cream-muted">
              <li><a href="#hero" className="hover:text-darik-300 transition-colors">Home Experience</a></li>
              <li><a href="#craft" className="hover:text-darik-300 transition-colors">Origin & Roasting</a></li>
              <li><a href="#menu" className="hover:text-darik-300 transition-colors">Coffee Menu</a></li>
              <li><a href="#special" className="hover:text-darik-300 transition-colors">Today's Special</a></li>
              <li><a href="#gallery" className="hover:text-darik-300 transition-colors">Roastery Gallery</a></li>
              <li><a href="#testimonials" className="hover:text-darik-300 transition-colors">Customer Stories</a></li>
            </ul>
          </div>

          {/* Col 3: Roastery Locations (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-darik-400">
              Our Coffeehouses
            </h4>
            <div className="space-y-3 text-xs text-cream-muted">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-darik-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-cream-soft">Bole Flagship & Roastery</div>
                  <div className="text-[11px] text-cream-muted/80">Near Medhanialem Cathedral, Addis Ababa</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-darik-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-cream-soft">Kazanchis Roaster Bar</div>
                  <div className="text-[11px] text-cream-muted/80">ECA Avenue, Addis Ababa</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-darik-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-cream-soft">Piassa Heritage Café</div>
                  <div className="text-[11px] text-cream-muted/80">Churchill St., Historic Quarter</div>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-darik-400">
              Roastery Hours
            </h4>
            <div className="space-y-2.5 text-xs text-cream-muted">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-darik-500" />
                <span>Mon – Fri: 6:30 AM – 10:30 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-darik-500" />
                <span>Sat – Sun: 7:00 AM – 11:00 PM</span>
              </div>
              <div className="pt-2 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-darik-500" />
                <span>+251 911 234 567 / +251 116 123 456</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-darik-500" />
                <span>concierge@darikcoffee.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-muted/60 gap-4">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} DARIK COFFEE (ዳሪክ ቡና). All rights reserved.</span>
          </div>

          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 fill-darik-500 text-darik-500" />
            <span>honoring Ethiopian coffee heritage</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
