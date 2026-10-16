'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, loginDemo } = useAdminAuth();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(email, password);
      router.push('/admin');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemo = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      loginDemo();
      router.push('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#180C07] via-[#100704] to-[#0A0402] flex items-center justify-center p-4 relative overflow-hidden select-none">
      
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-darik-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative w-full max-w-md bg-[#160D08]/90 border border-amber-900/40 rounded-3xl p-5 sm:p-10 shadow-2xl backdrop-blur-xl text-cream-soft">
        
        {/* Brand Seal Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-16 h-16 rounded-full border-2 border-darik-500/60 p-1 mx-auto shadow-xl shadow-darik-500/10">
            <img
              src="/darik-official-logo.png"
              alt="Darik Coffee"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-black tracking-wide text-cream-soft">
              DARIK COFFEE
            </h1>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-semibold text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Supabase Auth Connected</span>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3.5 rounded-2xl bg-red-500/15 border border-red-500/40 text-xs text-red-200 flex items-start gap-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-cream-muted font-medium mb-1.5">
              Admin Email
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-darik-400 absolute left-4 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter seeded admin email..."
                className="w-full py-3.5 pl-11 pr-4 rounded-2xl bg-white/[0.04] border border-white/10 focus:border-darik-500 focus:outline-none text-xs text-cream-soft placeholder:text-cream-muted/40 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-cream-muted font-medium mb-1.5">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-darik-400 absolute left-4 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full py-3.5 pl-11 pr-4 rounded-2xl bg-white/[0.04] border border-white/10 focus:border-darik-500 focus:outline-none text-xs text-cream-soft placeholder:text-cream-muted/40 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-4 rounded-full bg-gradient-to-r from-darik-600 via-darik-500 to-darik-400 text-espresso-dark font-serif font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-darik-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating with Supabase...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Access Option */}
        <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
          <button
            type="button"
            onClick={handleQuickDemo}
            disabled={isSubmitting}
            className="w-full py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-cream-muted hover:text-white border border-white/10 font-serif text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-darik-400" />
            <span>Instant Access: 1-Click Demo Login</span>
          </button>
        </div>

        {/* Return to storefront */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-xs text-cream-muted/70 hover:text-darik-300 transition-colors"
          >
            ← Return to Public Storefront
          </a>
        </div>

      </div>
    </div>
  );
}
