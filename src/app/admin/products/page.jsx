'use client';

import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Mountain, 
  Flame, 
  Package, 
  Sparkles,
  ExternalLink,
  SlidersHorizontal,
  Image as ImageIcon
} from 'lucide-react';
import ImageUploadPicker from '../../../components/admin/ImageUploadPicker';

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct, toggleProductAvailability } = useContent();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form State
  const initialForm = {
    name: '',
    amharicName: '',
    category: 'single-origin',
    price: 16.00,
    baseWeight: '250g',
    process: 'Washed / Grade 1',
    roastLevel: 'Medium Roast',
    roastDegree: 3,
    altitude: '2,000m – 2,200m',
    origin: 'Ethiopia',
    description: '',
    notesStr: 'Jasmine, Bergamot, Honey',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
    available: true,
    badge: 'New Release',
  };

  const [form, setForm] = useState(initialForm);

  const openCreateModal = () => {
    setEditingProduct(null);
    setForm(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setForm({
      ...product,
      notesStr: Array.isArray(product.notes) ? product.notes.join(', ') : '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const notesArray = form.notesStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const productPayload = {
      ...form,
      price: Number(form.price),
      roastDegree: Number(form.roastDegree),
      notes: notesArray,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload);
    } else {
      addProduct(productPayload);
    }
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.amharicName && p.amharicName.includes(searchTerm));
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-cream-soft">
            Roasted Coffee Packs
          </h1>
          <p className="text-xs text-cream-muted mt-1">
            Create, edit, and organize packaged coffee beans for your storefront.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-darik-600 via-darik-500 to-darik-400 text-espresso-dark font-serif font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-darik-500/25 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Coffee Pack</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-cream-muted/60 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search coffee packs by name, region..."
            className="w-full py-3 pl-11 pr-4 rounded-2xl bg-[#160D08] border border-white/10 focus:border-darik-500 focus:outline-none text-xs text-cream-soft placeholder:text-cream-muted/40 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
          {[
            { id: 'all', label: 'All Categories' },
            { id: 'single-origin', label: 'Single Origin' },
            { id: 'natural-honey', label: 'Natural & Honey' },
            { id: 'dark-espresso', label: 'Dark & Espresso' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-serif whitespace-nowrap transition-all flex-shrink-0 ${
                categoryFilter === cat.id
                  ? 'bg-darik-500 text-espresso-dark font-bold'
                  : 'bg-[#160D08] text-cream-muted hover:text-cream-soft border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Product Cards View (< md) */}
      <div className="block md:hidden space-y-4">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="p-4 rounded-3xl bg-[#160D08] border border-amber-900/30 space-y-3 shadow-lg"
          >
            <div className="flex items-start gap-3">
              <img
                src={p.image}
                alt={p.name}
                className="w-16 h-16 rounded-2xl object-cover border border-white/10 flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="font-serif font-bold text-sm text-cream-soft">
                    {p.name}
                  </h3>
                  {p.badge && (
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-darik-500/15 border border-darik-500/30 text-darik-300 font-bold uppercase">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-darik-400 font-serif">
                  {p.amharicName} • {p.origin}
                </div>
                <div className="text-xs text-cream-muted mt-1">
                  {p.roastLevel} • {p.altitude}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-cream-muted block">Base Price</span>
                <span className="font-serif font-black text-base text-cream-soft">
                  ${Number(p.price).toFixed(2)} <span className="text-[10px] text-cream-muted font-normal">(250g)</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleProductAvailability(p.id)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold ${
                    p.available !== false
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-red-500/15 text-red-400 border border-red-500/30'
                  }`}
                >
                  {p.available !== false ? 'In Stock' : 'Out of Stock'}
                </button>

                <button
                  type="button"
                  onClick={() => openEditModal(p)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-cream-soft"
                  title="Edit product"
                >
                  <Edit className="w-4 h-4 text-darik-400" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Delete "${p.name}"?`)) {
                      deleteProduct(p.id);
                    }
                  }}
                  className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-cream-muted hover:text-red-400"
                  title="Delete product"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Products Table (>= md) */}
      <div className="hidden md:block rounded-3xl bg-[#160D08] border border-amber-900/30 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-cream-soft">
            <thead className="border-b border-white/10 bg-black/40 text-[11px] uppercase tracking-wider text-cream-muted font-medium">
              <tr>
                <th className="py-4 px-6">Product & Origin</th>
                <th className="py-4 px-4">Roast & Process</th>
                <th className="py-4 px-4">Altitude</th>
                <th className="py-4 px-4">Price (250g)</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  
                  {/* Name & Image */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover border border-white/10 flex-shrink-0"
                      />
                      <div>
                        <div className="font-serif font-bold text-sm text-cream-soft flex items-center gap-2">
                          <span>{p.name}</span>
                          {p.badge && (
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-darik-500/15 border border-darik-500/30 text-darik-300 font-bold uppercase">
                              {p.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-darik-400 font-serif">
                          {p.amharicName} • {p.origin}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Roast & Process */}
                  <td className="py-4 px-4">
                    <div className="font-semibold text-cream-soft">{p.roastLevel}</div>
                    <div className="text-[11px] text-cream-muted/70">{p.process}</div>
                  </td>

                  {/* Altitude */}
                  <td className="py-4 px-4 text-cream-muted">
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Mountain className="w-3.5 h-3.5 text-darik-400" />
                      {p.altitude}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-4 px-4">
                    <span className="font-serif font-bold text-sm text-cream-soft">
                      ${Number(p.price).toFixed(2)}
                    </span>
                    <span className="text-[10px] text-cream-muted block">250g Bag</span>
                  </td>

                  {/* Availability */}
                  <td className="py-4 px-4">
                    <button
                      type="button"
                      onClick={() => toggleProductAvailability(p.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                        p.available !== false
                          ? 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30'
                          : 'bg-red-500/15 text-red-400 hover:bg-red-500/25 border border-red-500/30'
                      }`}
                      title="Toggle availability"
                    >
                      {p.available !== false ? 'In Stock' : 'Out of Stock'}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(p)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-cream-soft hover:text-darik-300 transition-colors"
                        title="Edit product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete "${p.name}"?`)) {
                            deleteProduct(p.id);
                          }
                        }}
                        className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-cream-muted hover:text-red-400 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#160D08] border border-amber-900/40 rounded-3xl p-5 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-cream-muted hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="mb-6 pb-4 border-b border-white/10">
              <span className="text-[10px] uppercase tracking-widest text-darik-400 font-semibold">
                Inventory Management
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-cream-soft mt-1">
                {editingProduct ? 'Edit Coffee Pack' : 'Create New Coffee Pack'}
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-cream-muted mb-1">
                    Product Name (English)
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Guji Highland Honey Reserve"
                    className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs focus:border-darik-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-cream-muted mb-1">
                    Amharic Name (Ge'ez)
                  </label>
                  <input
                    type="text"
                    value={form.amharicName}
                    onChange={(e) => setForm({ ...form, amharicName: e.target.value })}
                    placeholder="e.g. ጉጂ ማር ፕሮሰስ"
                    className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs focus:border-darik-500 focus:outline-none font-serif"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-cream-muted mb-1">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#1A0F0A] border border-white/10 text-xs focus:border-darik-500 focus:outline-none"
                  >
                    <option value="single-origin">Single Origin</option>
                    <option value="natural-honey">Natural & Honey</option>
                    <option value="dark-espresso">Dark & Espresso</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-cream-muted mb-1">
                    Price (250g Bag)
                  </label>
                  <input
                    type="number"
                    step="0.25"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs focus:border-darik-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-cream-muted mb-1">
                    Badge Tag
                  </label>
                  <input
                    type="text"
                    value={form.badge || ''}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    placeholder="e.g. Best Seller"
                    className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs focus:border-darik-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-cream-muted mb-1">
                    Roast Profile
                  </label>
                  <input
                    type="text"
                    value={form.roastLevel}
                    onChange={(e) => setForm({ ...form, roastLevel: e.target.value })}
                    placeholder="e.g. Medium Roast"
                    className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs focus:border-darik-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-cream-muted mb-1">
                    Roast Degree (1-5)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={form.roastDegree}
                    onChange={(e) => setForm({ ...form, roastDegree: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs focus:border-darik-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-cream-muted mb-1">
                    Altitude
                  </label>
                  <input
                    type="text"
                    value={form.altitude}
                    onChange={(e) => setForm({ ...form, altitude: e.target.value })}
                    placeholder="e.g. 2,000m – 2,200m"
                    className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs focus:border-darik-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-cream-muted mb-1">
                    Process & Grade
                  </label>
                  <input
                    type="text"
                    value={form.process}
                    onChange={(e) => setForm({ ...form, process: e.target.value })}
                    placeholder="e.g. Washed / Grade 1"
                    className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs focus:border-darik-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-cream-muted mb-1">
                    Origin Region
                  </label>
                  <input
                    type="text"
                    value={form.origin}
                    onChange={(e) => setForm({ ...form, origin: e.target.value })}
                    placeholder="e.g. Guji, Oromia, Ethiopia"
                    className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs focus:border-darik-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-cream-muted mb-1">
                  Tasting Notes (comma-separated)
                </label>
                <input
                  type="text"
                  value={form.notesStr}
                  onChange={(e) => setForm({ ...form, notesStr: e.target.value })}
                  placeholder="e.g. Jasmine Flower, Bergamot Rind, Wild Honey"
                  className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs focus:border-darik-500 focus:outline-none"
                />
              </div>

              <ImageUploadPicker
                value={form.image}
                onChange={(newImg) => setForm({ ...form, image: newImg })}
                label="Product Coffee Bag Photo"
              />

              <div>
                <label className="block text-xs uppercase tracking-wider text-cream-muted mb-1">
                  Description Paragraph
                </label>
                <textarea
                  rows="3"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Write a compelling artisanal description..."
                  className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs focus:border-darik-500 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-auto px-5 py-3 rounded-full text-xs font-serif uppercase tracking-wider text-cream-muted hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-darik-600 via-darik-500 to-darik-400 text-espresso-dark font-serif font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-darik-500/25 transition-all"
                >
                  {editingProduct ? 'Save Product Changes' : 'Create Coffee Pack'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
