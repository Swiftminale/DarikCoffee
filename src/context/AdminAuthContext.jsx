'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useRouter } from 'next/navigation';

const AdminAuthContext = createContext();

// Inactivity configuration: 10 minutes session timeout
export const ADMIN_INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes
export const ADMIN_WARNING_BEFORE_TIMEOUT_MS = 60 * 1000;  // 1 minute warning modal

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const isDemoMode = !isSupabaseConfigured();

  // Helper to record activity timestamp in sessionStorage
  const recordActivity = () => {
    try {
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('darik_admin_last_activity', Date.now().toString());
      }
    } catch (e) {
      // ignore
    }
  };

  // Helper to check if current session has exceeded 10m inactivity
  const isSessionExpiredDueToInactivity = () => {
    try {
      if (typeof window === 'undefined') return false;
      const lastActivity = window.sessionStorage.getItem('darik_admin_last_activity');
      if (!lastActivity) return false;
      return Date.now() - parseInt(lastActivity, 10) >= ADMIN_INACTIVITY_TIMEOUT_MS;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    // 1. Purge any legacy localStorage session tokens so closing tabs enforces logout
    try {
      localStorage.removeItem('darik_admin_session');
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('sb-') || key.includes('auth-token'))) {
          localStorage.removeItem(key);
        }
      }
    } catch (e) {
      // ignore
    }

    // 2. Check if inactivity timeout has elapsed while tab was backgrounded or asleep
    if (isSessionExpiredDueToInactivity()) {
      try {
        sessionStorage.removeItem('darik_admin_session');
        sessionStorage.removeItem('darik_admin_last_activity');
        sessionStorage.setItem('darik_admin_logout_reason', 'inactivity');
      } catch (e) {}
      setUser(null);
      setSession(null);
      setLoading(false);
      return;
    }

    // 3. Check sessionStorage (strictly active for this browser tab only)
    try {
      const stored = sessionStorage.getItem('darik_admin_session');
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed.user);
        setSession(parsed);
        // Refresh activity timestamp if not set
        if (!sessionStorage.getItem('darik_admin_last_activity')) {
          recordActivity();
        }
      }
    } catch (e) {
      console.warn('Session read error', e);
    }

    // 4. If Supabase is configured, listen to real auth changes (stored in sessionStorage)
    if (isSupabaseConfigured() && supabase) {
      supabase.auth.getSession().then(({ data: { session: supaSession } }) => {
        if (supaSession) {
          if (isSessionExpiredDueToInactivity()) {
            logout('inactivity');
            return;
          }
          setSession(supaSession);
          setUser(supaSession.user ?? null);
          if (!sessionStorage.getItem('darik_admin_last_activity')) {
            recordActivity();
          }
        }
        setLoading(false);
      }).catch(() => setLoading(false));

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, supaSession) => {
        if (supaSession) {
          if (isSessionExpiredDueToInactivity()) {
            logout('inactivity');
            return;
          }
          setSession(supaSession);
          setUser(supaSession.user ?? null);
        } else {
          setSession(null);
          setUser(null);
        }
        setLoading(false);
      });

      return () => subscription?.unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  // Quick Demo Login bypass (works anytime, saved to sessionStorage for tab-only session)
  const loginDemo = () => {
    const demoUser = {
      id: 'demo-admin-id',
      email: 'admin@darikcoffee.com',
      user_metadata: { name: 'Darik Roastery Admin', role: 'Super Admin' },
    };
    const demoSession = { user: demoUser, access_token: 'demo-token' };
    setUser(demoUser);
    setSession(demoSession);
    try {
      sessionStorage.setItem('darik_admin_session', JSON.stringify(demoSession));
      sessionStorage.setItem('darik_admin_last_activity', Date.now().toString());
      sessionStorage.removeItem('darik_admin_logout_reason');
      localStorage.removeItem('darik_admin_session');
    } catch (e) {
      console.warn('Could not write to sessionStorage', e);
    }
    return { user: demoUser, session: demoSession };
  };

  const login = async (email, password) => {
    // Allow demo credentials to log in instantly
    if (email === 'admin@darikcoffee.com' && (password === 'darik2004' || password === 'admin')) {
      return loginDemo();
    }

    // Real Supabase Auth
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) {
          if (error.message?.toLowerCase().includes('invalid login credentials')) {
            throw new Error(
              'Invalid login credentials. If you haven\'t created this user in Supabase yet, switch to the "REGISTER ADMIN" tab above or add the user in your Supabase Dashboard.'
            );
          }
          throw error;
        }
        setUser(data.user);
        setSession(data.session);
        try {
          sessionStorage.setItem('darik_admin_last_activity', Date.now().toString());
          sessionStorage.removeItem('darik_admin_logout_reason');
        } catch (e) {}
        return data;
      } catch (err) {
        throw err;
      }
    }

    // Demo Mode Auth fallback
    if (password === 'darik2004' || password === 'admin' || password === 'password') {
      return loginDemo();
    } else {
      throw new Error('Invalid credentials. Use password "darik2004" for admin demo access.');
    }
  };

  const signUp = async (email, password, name) => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            name: name || 'Darik Admin',
            role: 'Super Admin',
          },
        },
      });
      if (error) throw error;
      if (data.session) {
        setUser(data.user);
        setSession(data.session);
        recordActivity();
      }
      return data;
    }
    throw new Error('Supabase is not configured for registration.');
  };

  const logout = async (reason = null) => {
    try {
      if (reason) {
        sessionStorage.setItem('darik_admin_logout_reason', reason);
      } else {
        sessionStorage.removeItem('darik_admin_logout_reason');
      }
      sessionStorage.removeItem('darik_admin_session');
      sessionStorage.removeItem('darik_admin_last_activity');
      localStorage.removeItem('darik_admin_session');
    } catch (e) {
      // ignore
    }

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Sign out error', e);
      }
    }
    setUser(null);
    setSession(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        session,
        loading,
        isDemoMode,
        isAuthenticated: Boolean(user),
        login,
        loginDemo,
        signUp,
        logout,
        recordActivity,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
