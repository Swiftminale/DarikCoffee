'use client';

import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { ShoppingBag, CheckCircle2, Clock, Truck, Coffee, Search, ArrowRight } from 'lucide-react';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useContent();
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-cream-soft">
            Customer Orders Log
          </h1>
          <p className="text-xs text-cream-muted mt-1">
            Track and fulfill roasted coffee bag orders placed by website visitors.
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
          {['all', 'pending', 'roasting', 'dispatched'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-serif uppercase tracking-wider whitespace-nowrap transition-all flex-shrink-0 ${
                statusFilter === status
                  ? 'bg-darik-500 text-espresso-dark font-bold'
                  : 'bg-[#160D08] text-cream-muted border border-white/10 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="p-10 sm:p-16 rounded-3xl bg-[#160D08] border border-dashed border-white/10 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-white/5 mx-auto flex items-center justify-center text-cream-muted">
            <ShoppingBag className="w-6 h-6 opacity-40" />
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-cream-soft">
            No Orders Found
          </h3>
          <p className="text-xs text-cream-muted max-w-sm mx-auto">
            Place an order on the public storefront using the shopping bag to see it appear here in real time.
          </p>
          <a
            href="/#menu"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-2 text-xs font-serif uppercase tracking-wider text-darik-400 hover:underline"
          >
            Visit Storefront & Place Test Order →
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="p-4 sm:p-6 rounded-3xl bg-[#160D08] border border-amber-900/30 space-y-4 shadow-xl"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-darik-500/10 border border-darik-500/30 flex items-center justify-center text-darik-400 flex-shrink-0">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-sm font-bold text-cream-soft">{order.id}</span>
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full uppercase font-bold ${
                        order.status === 'pending'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : order.status === 'roasting'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-cream-muted/70 mt-0.5 truncate">
                      Placed on {new Date(order.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Status Switcher */}
                <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  <span className="text-[11px] uppercase tracking-wider text-cream-muted/70">
                    Status:
                  </span>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="p-2 rounded-xl bg-black/50 border border-white/10 text-xs text-cream-soft focus:border-darik-500 focus:outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="roasting">Roasting</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-white/5">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between text-xs gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-xl object-cover border border-white/10 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-serif font-bold text-cream-soft truncate">{item.name}</div>
                        <div className="text-[11px] text-darik-400 truncate">
                          {item.weight || '250g'} • {item.grind || 'Whole Bean'} (Qty: {item.quantity})
                        </div>
                      </div>
                    </div>

                    <div className="font-serif font-bold text-cream-soft flex-shrink-0">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer Totals */}
              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs text-cream-muted">
                <span>Subtotal: ${Number(order.subtotal || 0).toFixed(2)}</span>
                <span className="font-serif text-base font-bold text-darik-300">
                  Total: ${Number(order.total || 0).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
