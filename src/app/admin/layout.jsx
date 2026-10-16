'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminSessionTimeout from '../../components/admin/AdminSessionTimeout';
import { Loader2, Menu, X, LogOut, ShieldCheck, Coffee } from 'lucide-react';

export default function AdminLayout({ children }) {
  const { isAuthenticated, loading, logout } = useAdminAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === '/admin/login';

  // Automatically close mobile sidebar whenever route changes
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated && !isLoginPage) {
        router.push('/admin/login');
      } else if (isAuthenticated && isLoginPage) {
        router.push('/admin');
      }
    }
  }, [isAuthenticated, loading, isLoginPage, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0E0704] flex items-center justify-center text-cream-soft">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-darik-500 animate-spin" />
          <span className="font-serif text-sm tracking-widest uppercase text-darik-400">
            Loading Darik CMS...
          </span>
        </div>
      </div>
    );
  }

  // If on login page, render clean layout without sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Authenticated admin layout
  if (!isAuthenticated) {
    return null; // redirecting
  }

  // Determine current section title for mobile header
  const getSectionTitle = () => {
    if (pathname === '/admin') return 'Dashboard';
    if (pathname.startsWith('/admin/products')) return 'Coffee Packs';
    if (pathname.startsWith('/admin/content')) return 'Site Sections';
    if (pathname.startsWith('/admin/gallery')) return 'Gallery';
    if (pathname.startsWith('/admin/orders')) return 'Orders Log';
    return 'Admin';
  };

  return (
    <div className="min-h-screen bg-[#0E0704] text-cream-soft flex flex-col lg:flex-row relative">
      {/* 10-Minute Inactivity Session Monitor & Warning Modal */}
      <AdminSessionTimeout />
      
      {/* Mobile Top Header Bar (< lg) */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#120A06]/95 backdrop-blur-md border-b border-amber-900/30 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 -ml-1 rounded-xl bg-white/5 hover:bg-white/10 text-cream-soft border border-white/10"
            aria-label="Open CMS Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-darik-500/50 p-0.5 flex-shrink-0">
              <img
                src="/darik-official-logo.png"
                alt="Darik Coffee"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-serif font-black text-sm tracking-wider text-cream-soft">
              DARIK CMS
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-darik-500/15 border border-darik-500/30 text-[10px] font-bold text-darik-300 font-serif uppercase tracking-wider">
            {getSectionTitle()}
          </span>
          <button
            onClick={logout}
            className="p-2 rounded-xl text-cream-muted hover:text-red-400 bg-white/5"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer Navigation */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative z-10 h-full shadow-2xl flex">
            <AdminSidebar 
              isOpen={mobileSidebarOpen} 
              onClose={() => setMobileSidebarOpen(false)} 
            />
          </div>
        </div>
      )}

      {/* Desktop Fixed Sidebar (>= lg) */}
      <div className="hidden lg:block lg:sticky lg:top-0 lg:h-screen lg:w-64 flex-shrink-0">
        <AdminSidebar />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-[#0E0704] overflow-x-hidden p-4 sm:p-6 lg:p-10">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}
