import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { supabase } from "../lib/supabase";
import { authService } from "../services/auth";
import type { Session, User } from "@supabase/supabase-js";

export interface AuthContextValue {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      setLoading(true);
      try {
        const { data, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          setError(sessionError.message);
          return;
        }

        const currentSession = data.session;
        setSession(currentSession);
        const currentUser = currentSession?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          const admin = await authService.isAdmin(currentUser.id);
          setIsAdmin(admin);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load auth");
      } finally {
        setLoading(false);
      }
    };

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        setSession(newSession);
        const nextUser = newSession?.user ?? null;
        setUser(nextUser);

        if (nextUser) {
          const admin = await authService.isAdmin(nextUser.id);
          setIsAdmin(admin);
        } else {
          setIsAdmin(false);
        }
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await authService.signIn(email, password);
      const nextUser = data.user;
      if (!nextUser) {
        throw new Error("Authentication failed.");
      }

      const admin = await authService.isAdmin(nextUser.id);
      if (!admin) {
        await supabase.auth.signOut();
        throw new Error("Unauthorized admin user.");
      }

      setUser(nextUser);
      setSession(data.session);
      setIsAdmin(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    try {
      await authService.signOut();
      setUser(null);
      setSession(null);
      setIsAdmin(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout failed.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      user,
      session,
      isAdmin,
      loading,
      error,
      signIn,
      signOut,
    }),
    [user, session, isAdmin, loading, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};
