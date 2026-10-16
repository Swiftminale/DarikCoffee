'use client';

import React, { useState, useEffect } from 'react';
import { useContent } from '../../../context/ContentContext';
import { FileText, Save, CheckCircle2, Sparkles, ExternalLink, RefreshCw } from 'lucide-react';
import ImageUploadPicker from '../../../components/admin/ImageUploadPicker';

export default function AdminContentPage() {
  const { siteContent, updateSectionContent } = useContent();
  const [heroForm, setHeroForm] = useState(siteContent.hero || {});
  const [promoForm, setPromoForm] = useState(siteContent.promo || {});
  const [socialForm, setSocialForm] = useState(siteContent.social || {});
  const [savedSection, setSavedSection] = useState(null);

  useEffect(() => {
    if (siteContent) {
      if (siteContent.hero) setHeroForm(siteContent.hero);
      if (siteContent.promo) setPromoForm(siteContent.promo);
      if (siteContent.social) setSocialForm(siteContent.social);
    }
  }, [siteContent]);

  const handleSave = (sectionKey, data) => {
    updateSectionContent(sectionKey, data);
    setSavedSection(sectionKey);
    setTimeout(() => {
      setSavedSection(null);
    }, 3000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-cream-soft">
            Site Sections & Headlines
          </h1>
          <p className="text-xs text-cream-muted mt-1">
            Modify headlines, promotional banners, and social media links without code changes.
          </p>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-cream-soft border border-white/10 text-xs font-serif uppercase tracking-wider transition-all"
        >
          <span>Preview Live Website</span>
          <ExternalLink className="w-3.5 h-3.5 text-darik-400" />
        </a>
      </div>

      {/* Section 1: Hero Section */}
      <div className="p-5 sm:p-8 rounded-3xl bg-[#160D08] border border-amber-900/30 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 flex-wrap gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-darik-400 font-bold">
              Main Storefront Header
            </span>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-cream-soft">Hero Section</h2>
          </div>
          {savedSection === 'hero' && (
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" /> Saved Live!
            </span>
          )}
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-cream-muted mb-1">
                Script Accent Tag
              </label>
              <input
                type="text"
                value={heroForm.accentTag || ''}
                onChange={(e) => setHeroForm({ ...heroForm, accentTag: e.target.value })}
                placeholder="Pure Ethiopian Tradition"
                className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs focus:border-darik-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-cream-muted mb-1">
                Title Line 1
              </label>
              <input
                type="text"
                value={heroForm.titleLine1 || ''}
                onChange={(e) => setHeroForm({ ...heroForm, titleLine1: e.target.value })}
                placeholder="Enjoy Your Life"
                className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs focus:border-darik-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-cream-muted mb-1">
                Title Line 2 (Golden Gradient)
              </label>
              <input
                type="text"
                value={heroForm.titleLine2 || ''}
                onChange={(e) => setHeroForm({ ...heroForm, titleLine2: e.target.value })}
                placeholder="With Coffee"
                className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs focus:border-darik-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-cream-muted mb-1">
              Hero Description Paragraph
            </label>
            <textarea
              rows={3}
              value={heroForm.description || ''}
              onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
              className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs focus:border-darik-500 focus:outline-none resize-none"
            />
          </div>

          <ImageUploadPicker
            value={heroForm.image || ''}
            onChange={(val) => setHeroForm({ ...heroForm, image: val })}
            label="Hero Showcase Coffee Photo"
            helperText="Featured circular artisanal cup shown on the main storefront header."
          />

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => handleSave('hero', heroForm)}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-darik-600 to-darik-400 text-espresso-dark font-serif font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 shadow-md shadow-darik-500/20"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Hero Content</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section 2: Today's Special Banner */}
      <div className="p-5 sm:p-8 rounded-3xl bg-[#160D08] border border-amber-900/30 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 flex-wrap gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-darik-400 font-bold">
              Promotional Campaign
            </span>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-cream-soft">Today's Special ("Coffee Time")</h2>
          </div>
          {savedSection === 'promo' && (
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" /> Saved Live!
            </span>
          )}
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-cream-muted mb-1">
                Discount Sticker Text
              </label>
              <input
                type="text"
                value={promoForm.discountBadge || ''}
                onChange={(e) => setPromoForm({ ...promoForm, discountBadge: e.target.value })}
                placeholder="50%"
                className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs focus:border-darik-500 focus:outline-none font-bold text-darik-300"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-cream-muted mb-1">
                Sale Price ($)
              </label>
              <input
                type="number"
                step="0.25"
                value={promoForm.salePrice || ''}
                onChange={(e) => setPromoForm({ ...promoForm, salePrice: Number(e.target.value) })}
                className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs focus:border-darik-500 focus:outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-cream-muted mb-1">
                Original Price ($)
              </label>
              <input
                type="number"
                step="0.25"
                value={promoForm.originalPrice || ''}
                onChange={(e) => setPromoForm({ ...promoForm, originalPrice: Number(e.target.value) })}
                className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs focus:border-darik-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-cream-muted mb-1">
              Featured Product Title
            </label>
            <input
              type="text"
              value={promoForm.productName || ''}
              onChange={(e) => setPromoForm({ ...promoForm, productName: e.target.value })}
              className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs focus:border-darik-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-cream-muted mb-1">
              Campaign Description
            </label>
            <textarea
              rows={2}
              value={promoForm.description || ''}
              onChange={(e) => setPromoForm({ ...promoForm, description: e.target.value })}
              className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs focus:border-darik-500 focus:outline-none resize-none"
            />
          </div>

          <ImageUploadPicker
            value={promoForm.image || ''}
            onChange={(val) => setPromoForm({ ...promoForm, image: val })}
            label="Promotional Coffee Pack Photo"
            helperText="The bag or package photo displayed on the limited special card."
          />

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => handleSave('promo', promoForm)}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-darik-600 to-darik-400 text-espresso-dark font-serif font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 shadow-md shadow-darik-500/20"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Promo Campaign</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section 3: Social Media Links */}
      <div className="p-5 sm:p-8 rounded-3xl bg-[#160D08] border border-amber-900/30 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 flex-wrap gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-darik-400 font-bold">
              Social Redirects
            </span>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-cream-soft">Social Media & TikTok</h2>
          </div>
          {savedSection === 'social' && (
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" /> Saved Live!
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-cream-muted mb-1">
              TikTok Profile URL
            </label>
            <input
              type="url"
              value={socialForm.tiktokUrl || ''}
              onChange={(e) => setSocialForm({ ...socialForm, tiktokUrl: e.target.value })}
              placeholder="https://www.tiktok.com/@darikcoffee"
              className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs focus:border-darik-500 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-cream-muted mb-1">
              Display Handle
            </label>
            <input
              type="text"
              value={socialForm.tiktokHandle || ''}
              onChange={(e) => setSocialForm({ ...socialForm, tiktokHandle: e.target.value })}
              placeholder="@darikcoffee on TikTok"
              className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs focus:border-darik-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={() => handleSave('social', socialForm)}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-darik-600 to-darik-400 text-espresso-dark font-serif font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 shadow-md shadow-darik-500/20"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Social Links</span>
          </button>
        </div>
      </div>

    </div>
  );
}
