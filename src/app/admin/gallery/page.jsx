'use client';

import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { Plus, Trash2, Image as ImageIcon, X, ExternalLink, Sparkles } from 'lucide-react';
import ImageUploadPicker from '../../../components/admin/ImageUploadPicker';

export default function AdminGalleryPage() {
  const { galleryItems, addGalleryItem, deleteGalleryItem } = useContent();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    category: 'Craft',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    span: 'col-span-12 sm:col-span-6 md:col-span-4',
    aspect: 'h-48 md:h-[240px]',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.image) return;
    addGalleryItem(form);
    setForm({
      title: '',
      category: 'Craft',
      image: '',
      span: 'col-span-12 sm:col-span-6 md:col-span-4',
      aspect: 'h-48 md:h-[240px]',
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-cream-soft">
            Gallery & Media Assets
          </h1>
          <p className="text-xs text-cream-muted mt-1">
            Curate and manage photos displayed in the "Our Dream Gallery" bento showcase on the storefront.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-darik-600 via-darik-500 to-darik-400 text-espresso-dark font-serif font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-darik-500/25 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo to Gallery</span>
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-3xl bg-[#160D08] border border-amber-900/30 overflow-hidden shadow-xl flex flex-col justify-between"
          >
            <div className="relative h-56 w-full overflow-hidden bg-black/40">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#160D08] via-transparent to-transparent opacity-80" />

              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] uppercase font-bold text-darik-300">
                {item.category}
              </div>

              <button
                type="button"
                onClick={() => {
                  if (confirm(`Remove "${item.title}" from gallery?`)) {
                    deleteGalleryItem(item.id);
                  }
                }}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-cream-muted hover:text-red-400 hover:bg-black transition-colors"
                title="Delete photo"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 sm:p-5 flex items-center justify-between border-t border-white/5">
              <div>
                <h3 className="font-serif text-sm sm:text-base font-bold text-cream-soft">
                  {item.title}
                </h3>
                <span className="text-[11px] text-cream-muted/70">
                  Darik Coffee Media
                </span>
              </div>

              <a
                href={item.image}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-cream-muted hover:text-white transition-colors"
                title="View original image"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Add Gallery Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div 
            className="relative w-full max-w-lg bg-[#160D08] border border-amber-900/40 rounded-3xl p-5 sm:p-8 text-cream-soft shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-cream-muted hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6 pb-4 border-b border-white/10">
              <span className="text-[10px] uppercase tracking-widest text-darik-400 font-semibold">
                Media Curation
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-cream-soft mt-1">
                Add Photo to Gallery
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-cream-muted mb-1">
                  Photo Title / Caption
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Master Barista Pouring Rosetta"
                  className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs focus:border-darik-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-cream-muted mb-1">
                  Category Tag
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#1A0F0A] border border-white/10 text-xs focus:border-darik-500 focus:outline-none"
                >
                  <option value="Craft">Craft</option>
                  <option value="Roastery">Roastery</option>
                  <option value="Harvest">Harvest</option>
                  <option value="Barista">Barista</option>
                  <option value="Ambiance">Ambiance</option>
                  <option value="Passion">Passion</option>
                </select>
              </div>

              <ImageUploadPicker
                value={form.image}
                onChange={(val) => setForm({ ...form, image: val })}
                label="Gallery Photo"
                helperText="Upload a photo from your device or paste an image URL. Automatically compressed."
              />

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-white/10 hover:bg-white/5 text-xs font-serif uppercase tracking-wider text-cream-muted hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-darik-600 via-darik-500 to-darik-400 text-espresso-dark font-serif font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-darik-500/20"
                >
                  Add to Gallery
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
