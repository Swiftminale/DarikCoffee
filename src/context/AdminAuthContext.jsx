'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useRouter } from 'next/navigation';

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const isDemoMode = !isSupabaseConfigured();

  useEffect(() => {
    // Check local session first (for demo or stored auth)
    try {
      const stored = localStorage.getItem('darik_admin_session');
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed.user);
        setSession(parsed);
      }
    } catch (e) {
      console.warn('Local session read error', e);
    }

    // If Supabase is configured, listen to real auth changes
    if (isSupabaseConfigured() && supabase) {
      supabase.auth.getSession().then(({ data: { session: supaSession } }) => {
        if (supaSession) {
          setSession(supaSession);
          setUser(supaSession.user ?? null);
        }
        setLoading(false);
      }).catch(() => setLoading(false));

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, supaSession) => {
        if (supaSession) {
          setSession(supaSession);
          setUser(supaSession.user ?? null);
        }
        setLoading(false);
      });

      return () => subscription?.unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  // Quick Demo Login bypass (works anytime)
  const loginDemo = () => {
    const demoUser = {
      id: 'demo-admin-id',
      email: 'admin@darikcoffee.com',
      user_metadata: { name: 'Darik Roastery Admin', role: 'Super Admin' },
    };
    const demoSession = { user: demoUser, access_token: 'demo-token' };
    setUser(demoUser);
    setSession(demoSession);
    localStorage.setItem('darik_admin_session', JSON.stringify(demoSession));
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
      }
      return data;
    }
    throw new Error('Supabase is not configured for registration.');
  };

  const logout = async () => {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Sign out error', e);
      }
    }
    setUser(null);
    setSession(null);
    try {
      localStorage.removeItem('darik_admin_session');
    } catch (e) {
      // ignore
    }
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
