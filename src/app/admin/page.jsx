'use client';

import React from 'react';
import { useContent } from '../../context/ContentContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { 
  Package, 
  ShoppingBag, 
  Image as ImageIcon, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  FileText,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { products, galleryItems, orders, siteContent, toggleProductAvailability } = useContent();
  const { user } = useAdminAuth();

  const totalPacks = products.length;
  const inStockPacks = products.filter((p) => p.available !== false).length;
  const totalGallery = galleryItems.length;
  const totalOrdersCount = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Welcome Banner */}
      <div className="p-5 sm:p-8 rounded-3xl bg-gradient-to-r from-[#20140D] via-[#1A0E08] to-[#120A06] border border-amber-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-darik-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-darik-500/15 border border-darik-500/30 text-darik-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-darik-400" />
              <span>Darik Coffee Roastery CMS</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-cream-soft">
              Welcome, {user?.user_metadata?.name || 'Administrator'}
            </h1>
            <p className="text-xs sm:text-sm text-cream-muted max-w-xl font-light leading-relaxed">
              Manage your roasted coffee inventory, update storefront headlines, curate the shop gallery, and track customer orders in real time.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="/admin/products"
              className="w-full sm:w-auto px-5 py-3 rounded-full bg-gradient-to-r from-darik-600 via-darik-500 to-darik-400 text-espresso-dark font-serif font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-darik-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Coffee Pack</span>
            </a>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Card 1: Coffee Packs */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#160D08] border border-amber-900/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-cream-muted font-medium">Coffee Packs</span>
            <div className="w-9 h-9 rounded-2xl bg-darik-500/10 border border-darik-500/30 flex items-center justify-center text-darik-400">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-3xl font-black text-cream-soft">{totalPacks}</span>
            <span className="text-xs text-emerald-400 font-semibold">{inStockPacks} in stock</span>
          </div>
          <p className="text-[11px] text-cream-muted/70">Single origins, naturals & blends</p>
        </div>

        {/* Card 2: Gallery Photos */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#160D08] border border-amber-900/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-cream-muted font-medium">Gallery Photos</span>
            <div className="w-9 h-9 rounded-2xl bg-darik-500/10 border border-darik-500/30 flex items-center justify-center text-darik-400">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-3xl font-black text-cream-soft">{totalGallery}</span>
            <span className="text-xs text-darik-400 font-semibold">Active in bento</span>
          </div>
          <p className="text-[11px] text-cream-muted/70">Roastery bar & craft photography</p>
        </div>

        {/* Card 3: Orders Received */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#160D08] border border-amber-900/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-cream-muted font-medium">Orders Placed</span>
            <div className="w-9 h-9 rounded-2xl bg-darik-500/10 border border-darik-500/30 flex items-center justify-center text-darik-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-3xl font-black text-cream-soft">{totalOrdersCount}</span>
            <span className="text-xs text-amber-300 font-semibold">
              {orders.filter((o) => o.status === 'pending').length} pending
            </span>
          </div>
          <p className="text-[11px] text-cream-muted/70">Website bag submissions</p>
        </div>

        {/* Card 4: Gross Order Value */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#160D08] border border-amber-900/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-cream-muted font-medium">Gross Revenue</span>
            <div className="w-9 h-9 rounded-2xl bg-darik-500/10 border border-darik-500/30 flex items-center justify-center text-darik-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-3xl font-black text-cream-soft">
              ${totalRevenue.toFixed(2)}
            </span>
            <span className="text-xs text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> Live
            </span>
          </div>
          <p className="text-[11px] text-cream-muted/70">Calculated order totals</p>
        </div>

      </div>

      {/* Two Column Layout: Recent Orders & Quick Product Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        {/* Left Column: Recent Orders (7 cols) */}
        <div className="lg:col-span-7 p-5 sm:p-8 rounded-3xl bg-[#160D08] border border-amber-900/30 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-cream-soft">Recent Customer Orders</h2>
              <p className="text-xs text-cream-muted">Real-time submissions from website checkout</p>
            </div>
            <a
              href="/admin/orders"
              className="text-xs font-serif uppercase tracking-wider text-darik-400 hover:text-darik-300 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl space-y-2">
              <ShoppingBag className="w-8 h-8 text-cream-muted/40 mx-auto" />
              <div className="text-sm font-serif text-cream-soft">No Orders Placed Yet</div>
              <p className="text-xs text-cream-muted max-w-xs mx-auto">
                Orders placed by customers on your website will automatically appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 4).map((order) => (
                <div
                  key={order.id}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-darik-400">{order.id}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${
                        order.status === 'pending'
                          ? 'bg-amber-500/20 text-amber-300'
                          : order.status === 'roasting'
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-xs text-cream-muted">
                      {order.items?.length || 0} items • {new Date(order.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <div className="font-serif text-base font-bold text-cream-soft">
                      ${Number(order.total).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Quick Inventory Status (5 cols) */}
        <div className="lg:col-span-5 p-5 sm:p-8 rounded-3xl bg-[#160D08] border border-amber-900/30 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-cream-soft">Coffee Inventory</h2>
              <p className="text-xs text-cream-muted">Active roastery offerings</p>
            </div>
            <a
              href="/admin/products"
              className="text-xs font-serif uppercase tracking-wider text-darik-400 hover:text-darik-300 flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="space-y-3">
            {products.slice(0, 5).map((prod) => (
              <div
                key={prod.id}
                className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-10 h-10 rounded-xl object-cover border border-white/10 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-serif text-xs font-bold text-cream-soft truncate">
                      {prod.name}
                    </h4>
                    <div className="text-[10px] text-darik-400 font-serif">
                      ${Number(prod.price).toFixed(2)} (250g)
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleProductAvailability(prod.id)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all flex-shrink-0 ${
                    prod.available !== false
                      ? 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30'
                      : 'bg-red-500/15 text-red-400 hover:bg-red-500/25 border border-red-500/30'
                  }`}
                  title="Click to toggle availability on website"
                >
                  {prod.available !== false ? 'In Stock' : 'Out of Stock'}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
