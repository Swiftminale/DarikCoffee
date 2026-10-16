'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth, ADMIN_INACTIVITY_TIMEOUT_MS, ADMIN_WARNING_BEFORE_TIMEOUT_MS } from '../../context/AdminAuthContext';
import { Clock, ShieldAlert, LogOut, CheckCircle2 } from 'lucide-react';

export default function AdminSessionTimeout() {
  const { isAuthenticated, logout, recordActivity } = useAdminAuth();
  const [secondsRemaining, setSecondsRemaining] = useState(null);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const router = useRouter();

  const lastActivityUpdateRef = useRef(Date.now());
  const isLoggingOutRef = useRef(false);

  // Reset or record active user movement (throttled to every 2.5s)
  const handleUserActivity = useCallback(() => {
    if (!isAuthenticated || isLoggingOutRef.current) return;
    const now = Date.now();
    if (now - lastActivityUpdateRef.current > 2500) {
      lastActivityUpdateRef.current = now;
      recordActivity();
      // If modal was open and user resumed activity
      setShowWarningModal(false);
      setSecondsRemaining(null);
    }
  }, [isAuthenticated, recordActivity]);

  // Explicit action when admin clicks "Keep Session Active" button
  const handleKeepAlive = () => {
    lastActivityUpdateRef.current = Date.now();
    recordActivity();
    setShowWarningModal(false);
    setSecondsRemaining(null);
  };

  // Immediate manual logout from warning modal
  const handleManualLogout = async () => {
    isLoggingOutRef.current = true;
    setShowWarningModal(false);
    await logout('manual');
    router.push('/admin/login');
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setShowWarningModal(false);
      setSecondsRemaining(null);
      return;
    }

    // Attach activity listeners across the document
    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'click'];
    activityEvents.forEach((event) => {
      window.addEventListener(event, handleUserActivity, { passive: true });
    });

    // Check timer status
    const checkTimeout = () => {
      if (isLoggingOutRef.current) return;

      try {
        const stored = window.sessionStorage.getItem('darik_admin_last_activity');
        const lastActiveTime = stored ? parseInt(stored, 10) : lastActivityUpdateRef.current;
        const elapsed = Date.now() - lastActiveTime;

        if (elapsed >= ADMIN_INACTIVITY_TIMEOUT_MS) {
          // Timeout reached (10 minutes) -> force logout
          isLoggingOutRef.current = true;
          setShowWarningModal(false);
          setSecondsRemaining(null);
          logout('inactivity').then(() => {
            router.push('/admin/login?reason=inactivity');
          });
        } else if (elapsed >= ADMIN_INACTIVITY_TIMEOUT_MS - ADMIN_WARNING_BEFORE_TIMEOUT_MS) {
          // Warning threshold (9 minutes) -> display warning modal with remaining seconds
          const remainingSec = Math.max(1, Math.ceil((ADMIN_INACTIVITY_TIMEOUT_MS - elapsed) / 1000));
          setSecondsRemaining(remainingSec);
          setShowWarningModal(true);
        } else {
          // Healthy active session
          if (showWarningModal) {
            setShowWarningModal(false);
            setSecondsRemaining(null);
          }
        }
      } catch (e) {
        console.warn('Timeout check error', e);
      }
    };

    // Run check immediately, and every 1 second
    checkTimeout();
    const intervalId = setInterval(checkTimeout, 1000);

    // Also check on tab focus or visibility change (e.g. laptop wake or switching back from other apps)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkTimeout();
      }
    };
    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', checkTimeout);

    return () => {
      clearInterval(intervalId);
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', checkTimeout);
    };
  }, [isAuthenticated, logout, router, handleUserActivity, showWarningModal]);

  if (!showWarningModal || secondsRemaining === null) {
    return null;
  }

  // Calculate percentage of remaining warning period for visual ring/bar
  const warningSecondsTotal = ADMIN_WARNING_BEFORE_TIMEOUT_MS / 1000;
  const progressPercent = Math.max(0, Math.min(100, (secondsRemaining / warningSecondsTotal) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-md bg-[#160D08] border border-amber-600/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-cream-soft relative overflow-hidden"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="session-timeout-title"
        aria-describedby="session-timeout-desc"
      >
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-darik-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative text-center space-y-4">
          
          {/* Animated Countdown Ring Icon */}
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-full border-2 border-amber-500/30 animate-ping opacity-25" />
            
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-950 to-[#2A140A] border border-amber-500/60 flex flex-col items-center justify-center shadow-lg shadow-amber-500/20">
              <span className="font-serif font-black text-xl text-darik-300 leading-none">
                {secondsRemaining}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-cream-muted font-bold">
                sec
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-semibold text-darik-300">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Security Inactivity Timeout</span>
            </div>

            <h2 id="session-timeout-title" className="font-serif font-black text-xl text-cream-soft">
              Session Expiring Soon
            </h2>

            <p id="session-timeout-desc" className="text-xs text-cream-muted/90 leading-relaxed px-2">
              You have been inactive for 9 minutes. To protect your roastery data, you will be automatically logged out in{' '}
              <span className="font-bold text-darik-300">{secondsRemaining} seconds</span>.
            </p>
          </div>

          {/* Progress bar countdown */}
          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-darik-500 to-amber-400 h-full transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={handleKeepAlive}
              className="flex-1 py-3.5 px-4 rounded-full bg-gradient-to-r from-darik-600 via-darik-500 to-darik-400 text-espresso-dark font-serif font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-darik-500/25 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Keep Me Signed In</span>
            </button>

            <button
              type="button"
              onClick={handleManualLogout}
              className="py-3 px-4 rounded-full bg-white/5 hover:bg-white/10 text-cream-muted hover:text-red-400 border border-white/10 font-serif text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out Now</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
