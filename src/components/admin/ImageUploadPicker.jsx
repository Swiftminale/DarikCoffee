'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, Link2, X, Image as ImageIcon, Check, Loader2, Sparkles } from 'lucide-react';

/**
 * Compresses an image file using an HTML5 Canvas to a web-optimized JPEG data URL.
 * Keeps dimensions within maxDimension (default 1000px) and quality at 0.82.
 */
function compressImage(file, maxDimension = 1000, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve({
          dataUrl,
          width,
          height,
          originalSize: file.size,
          compressedSize: Math.round((dataUrl.length * 3) / 4),
        });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function ImageUploadPicker({
  value,
  onChange,
  label = 'Image',
  aspectRatio = 'aspect-video',
  previewHeight = 'h-36',
}) {
  const isDataUrl = value && value.startsWith('data:');
  const [activeTab, setActiveTab] = useState(isDataUrl ? 'upload' : 'url');
  const [urlInput, setUrlInput] = useState(value && !isDataUrl ? value : '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileMeta, setFileMeta] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileProcess = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setIsProcessing(true);
    try {
      const result = await compressImage(file);
      onChange(result.dataUrl);
      setFileMeta({
        name: file.name,
        size: `${Math.round(result.compressedSize / 1024)} KB`,
        dimensions: `${result.width}x${result.height}`,
      });
    } catch (err) {
      console.error('Error compressing image:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFileProcess(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileProcess(file);
  };

  const handleUrlApply = (e) => {
    const val = e.target.value;
    setUrlInput(val);
    onChange(val);
    setFileMeta(null);
  };

  const handleClear = () => {
    onChange('');
    setUrlInput('');
    setFileMeta(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-2.5">
      {/* Header & Tabs */}
      <div className="flex items-center justify-between">
        <label className="block text-xs uppercase tracking-wider text-cream-muted font-medium">
          {label}
        </label>

        {/* Tab Toggle */}
        <div className="flex items-center bg-black/40 p-0.5 rounded-xl border border-white/10 text-[11px]">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-serif transition-all ${
              activeTab === 'upload'
                ? 'bg-darik-500 text-espresso-dark font-bold shadow'
                : 'text-cream-muted hover:text-white'
            }`}
          >
            <UploadCloud className="w-3 h-3" />
            <span>Upload File</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-serif transition-all ${
              activeTab === 'url'
                ? 'bg-darik-500 text-espresso-dark font-bold shadow'
                : 'text-cream-muted hover:text-white'
            }`}
          >
            <Link2 className="w-3 h-3" />
            <span>Image Link</span>
          </button>
        </div>
      </div>

      {/* Input Zone Depending on Active Tab */}
      {activeTab === 'upload' ? (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-4 sm:p-6 text-center cursor-pointer transition-all ${
              dragOver
                ? 'border-darik-500 bg-darik-500/10'
                : 'border-white/15 hover:border-darik-500/50 bg-white/[0.02] hover:bg-white/[0.04]'
            }`}
          >
            {isProcessing ? (
              <div className="flex flex-col items-center gap-2 py-2">
                <Loader2 className="w-6 h-6 text-darik-400 animate-spin" />
                <span className="text-xs text-darik-300 font-serif">Optimizing image size...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-darik-500/10 border border-darik-500/30 flex items-center justify-center text-darik-400">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-serif font-bold text-cream-soft block">
                    Click to browse or drag & drop photo
                  </span>
                  <span className="text-[10px] text-cream-muted/70 block mt-0.5">
                    Supports PNG, JPG, WebP • Auto-optimized for instant fast loading
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="relative flex items-center">
            <Link2 className="w-4 h-4 text-darik-400 absolute left-3.5 pointer-events-none" />
            <input
              type="url"
              value={urlInput}
              onChange={handleUrlApply}
              placeholder="https://images.unsplash.com/... or CDN link"
              className="w-full py-2.5 sm:py-3 pl-10 pr-4 rounded-xl bg-white/[0.04] border border-white/10 text-xs focus:border-darik-500 focus:outline-none font-mono text-cream-soft placeholder:text-cream-muted/40"
            />
          </div>
        </div>
      )}

      {/* Active Image Thumbnail Preview */}
      {value && (
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 p-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/15 bg-black flex-shrink-0">
              <img
                src={value}
                alt="Selected preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=400&q=80';
                }}
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-serif font-bold text-cream-soft truncate">
                  {fileMeta?.name || 'Selected Image'}
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 flex-shrink-0">
                  <Check className="w-2.5 h-2.5" />
                  <span>{isDataUrl ? 'Uploaded File' : 'Web Link'}</span>
                </span>
              </div>
              <div className="text-[10px] text-cream-muted/70 truncate mt-0.5">
                {fileMeta ? `${fileMeta.size} • ${fileMeta.dimensions}` : value.slice(0, 48) + '...'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-cream-muted hover:text-red-400 transition-colors flex-shrink-0"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
