import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  subscribed: boolean;
  subscriptionEnd: string | null;
  checkingSubscription: boolean;
}

interface AuthContextType extends AuthState {
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  checkSubscription: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    subscribed: false,
    subscriptionEnd: null,
    checkingSubscription: false,
  });

  const checkSubscription = useCallback(async () => {
    if (!state.session) return;
    setState((s) => ({ ...s, checkingSubscription: true }));
    try {
      const { data, error } = await supabase.functions.invoke("check-subscription");
      if (!error && data) {
        setState((s) => ({
          ...s,
          subscribed: data.subscribed,
          subscriptionEnd: data.subscription_end,
          checkingSubscription: false,
        }));
      } else {
        setState((s) => ({ ...s, checkingSubscription: false }));
      }
    } catch {
      setState((s) => ({ ...s, checkingSubscription: false }));
    }
  }, [state.session]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setState((s) => ({ ...s, user: session?.user ?? null, session, loading: false }));
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setState((s) => ({ ...s, user: session?.user ?? null, session, loading: false }));
    });

    return () => subscription.unsubscribe();
  }, []);

  // Check subscription when session changes
  useEffect(() => {
    if (state.session) {
      checkSubscription();
    } else {
      setState((s) => ({ ...s, subscribed: false, subscriptionEnd: null }));
    }
  }, [state.session]);

  // Periodic check every 60s
  useEffect(() => {
    if (!state.session) return;
    const interval = setInterval(checkSubscription, 60000);
    return () => clearInterval(interval);
  }, [state.session, checkSubscription]);

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: window.location.origin,
      },
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setState((s) => ({ ...s, user: null, session: null, subscribed: false, subscriptionEnd: null }));
  };

  return (
    <AuthContext.Provider value={{ ...state, signUp, signIn, signOut, checkSubscription }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
