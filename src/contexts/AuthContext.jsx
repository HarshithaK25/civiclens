import { createContext, useContext, useEffect, useState } from 'react';
import { isSupabaseConfigured, supabase } from '../supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authNotice, setAuthNotice] = useState('');

  const consumeConfirmationReturn = () => {
    const query = new URLSearchParams(window.location.search);
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const isConfirmationReturn = query.has('code') || hash.has('access_token') || hash.has('type');
    if (isConfirmationReturn) window.history.replaceState({}, document.title, window.location.pathname);
    return isConfirmationReturn;
  };

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return undefined;
    }
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      if (data.session && consumeConfirmationReturn()) setAuthNotice('Email confirmed successfully. You can continue using CivicLens.');
      setLoading(false);
    }).catch(() => setLoading(false));
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if ((event === 'SIGNED_IN' || event === 'USER_UPDATED') && consumeConfirmationReturn()) {
        setAuthNotice('Email confirmed successfully. You can continue using CivicLens.');
      }
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const signUp = async ({ email, password, fullName }) => {
    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
      },
    });
    if (result.error) throw result.error;
    return result.data;
  };

  const signIn = async ({ email, password }) => {
    const result = await supabase.auth.signInWithPassword({ email, password });
    if (result.error) throw result.error;
    return result.data;
  };

  const signOut = () => supabase.auth.signOut();
  return <AuthContext.Provider value={{ user, loading, authNotice, setAuthNotice, signUp, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
