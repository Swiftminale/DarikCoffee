'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useContent } from '../../context/ContentContext';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Image as ImageIcon, 
  ShoppingBag, 
  ExternalLink, 
  LogOut, 
  ShieldCheck, 
  Database,
  Coffee,
  Clock,
  X
} from 'lucide-react';

export default function AdminSidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();
  const { orders } = useContent();

  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;

  const links = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Coffee Packs', href: '/admin/products', icon: Package },
    { label: 'Site Sections', href: '/admin/content', icon: FileText },
    { label: 'Gallery & Media', href: '/admin/gallery', icon: ImageIcon },
    { 
      label: 'Orders', 
      href: '/admin/orders', 
      icon: ShoppingBag, 
      badge: pendingOrdersCount > 0 ? pendingOrdersCount : null 
    },
  ];

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <aside className="w-72 sm:w-64 bg-[#120A06] border-r border-amber-900/30 flex flex-col justify-between h-full text-cream-soft select-none overflow-y-auto">
      
      {/* Top Brand Section */}
      <div>
        <div className="p-5 sm:p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-darik-500/50 p-0.5 flex-shrink-0">
              <img
                src="/darik-official-logo.png"
                alt="Darik Coffee"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-serif font-black text-lg tracking-wider text-cream-soft block leading-none">
                DARIK CMS
              </span>
              <span className="text-[10px] uppercase tracking-widest text-darik-400 font-medium">
                Admin Workspace
              </span>
            </div>
          </div>

          {/* Mobile Drawer Close Button */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-2 rounded-xl text-cream-muted hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Auth & Storage Badges */}
        <div className="px-5 sm:px-6 py-2.5 border-b border-white/5 bg-black/20 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-cream-muted/80">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Auth:</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              Supabase Active
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-cream-muted/80">
              <Database className="w-3.5 h-3.5 text-darik-400" />
              <span>CMS Data:</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-darik-500/15 text-darik-300 border border-darik-500/30">
              Local Storage
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-cream-muted/80">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Session:</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-darik-300 border border-amber-500/30">
              10m Inactivity Lock
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="p-3 sm:p-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-serif uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-darik-600 via-darik-500 to-darik-400 text-espresso-dark font-bold shadow-lg shadow-darik-500/20'
                    : 'text-cream-muted hover:text-cream-soft hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-black text-darik-300' : 'bg-darik-500 text-espresso-dark'
                  }`}>
                    {link.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Bottom User & Storefront Links */}
      <div className="p-4 border-t border-white/5 space-y-3 bg-black/20">
        
        {/* Visit Storefront Button */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-cream-soft text-xs border border-white/10 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Coffee className="w-3.5 h-3.5 text-darik-400" />
            <span>View Public Store</span>
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-cream-muted" />
        </a>

        {/* User Card & Logout */}
        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <div className="w-8 h-8 rounded-full bg-darik-500/20 border border-darik-500/40 text-darik-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
              {user?.email ? user.email.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-serif font-bold text-cream-soft truncate">
                {user?.user_metadata?.name || 'Administrator'}
              </div>
              <div className="text-[10px] text-cream-muted/60 truncate">
                {user?.email || 'admin@darikcoffee.com'}
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-2 rounded-xl text-cream-muted hover:text-red-400 hover:bg-white/5 transition-colors flex-shrink-0"
            title="Log out of CMS"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </div>

    </aside>
  );
}
