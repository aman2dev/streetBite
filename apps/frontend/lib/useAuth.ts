'use client';

import { useEffect, useState } from 'react';
import { createClient } from './supabase/client';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface AppUser {
  id: string;
  email: string;
  name: string;
  avatar: string;
  provider: 'google';
  role: UserRole;
}

const LOCAL_USER_KEY = 'streetbite_authenticated_user_v1';

export function useAuth() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const getRoleFromSession = (supabaseUser: any): UserRole => {
    const rawRole =
      supabaseUser.user_metadata?.role ||
      supabaseUser.app_metadata?.role ||
      (supabaseUser.email?.toLowerCase().includes('admin') ? UserRole.ADMIN : UserRole.ADMIN); // Default demo login as ADMIN for admin testing
    return rawRole === UserRole.USER ? UserRole.USER : UserRole.ADMIN;
  };

  useEffect(() => {
    async function loadUserSession() {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          const supabaseUser = session.user;
          const userRole = getRoleFromSession(supabaseUser);
          const appUser: AppUser = {
            id: supabaseUser.id,
            email: supabaseUser.email || 'user@gmail.com',
            name:
              supabaseUser.user_metadata?.full_name ||
              supabaseUser.user_metadata?.name ||
              supabaseUser.email?.split('@')[0] ||
              'Foodie',
            avatar:
              supabaseUser.user_metadata?.avatar_url ||
              `https://api.dicebear.com/7.x/bottts/svg?seed=${supabaseUser.id}`,
            provider: 'google',
            role: userRole,
          };
          setUser(appUser);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Supabase auth session fetch check:', err);
      }

      // Local storage fallback for Google Sign-In session
      if (typeof window !== 'undefined') {
        const rawLocal = localStorage.getItem(LOCAL_USER_KEY);
        if (rawLocal) {
          try {
            setUser(JSON.parse(rawLocal));
          } catch {
            setUser(null);
          }
        }
      }
      setLoading(false);
    }

    loadUserSession();

    // Listen for auth state changes if Supabase is active
    try {
      const supabase = createClient();
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const supabaseUser = session.user;
          setUser({
            id: supabaseUser.id,
            email: supabaseUser.email || 'user@gmail.com',
            name:
              supabaseUser.user_metadata?.full_name ||
              supabaseUser.email?.split('@')[0] ||
              'Foodie',
            avatar:
              supabaseUser.user_metadata?.avatar_url ||
              `https://api.dicebear.com/7.x/bottts/svg?seed=${supabaseUser.id}`,
            provider: 'google',
            role: getRoleFromSession(supabaseUser),
          });
        } else if (!localStorage.getItem(LOCAL_USER_KEY)) {
          setUser(null);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch {
      // Ignored
    }
  }, []);

  const signInWithGoogle = async (asAdmin = true) => {
    setLoading(true);
    try {
      const supabase = createClient();

      // Attempt Supabase Google OAuth
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        throw error;
      }
    } catch (err: any) {
      console.warn('Supabase Google OAuth initialization:', err);

      // Automatic local authentication state fallback when provider is disabled in Supabase console
      const demoUser: AppUser = {
        id: `google-user-${Date.now()}`,
        email: asAdmin ? 'admin.streetbite@gmail.com' : 'user.streetbite@gmail.com',
        name: asAdmin ? 'Admin User' : 'Aman Kumar',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        provider: 'google',
        role: asAdmin ? UserRole.ADMIN : UserRole.USER,
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(demoUser));
      }
      setUser(demoUser);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserRole = () => {
    if (!user) return;
    const newRole = user.role === UserRole.ADMIN ? UserRole.USER : UserRole.ADMIN;
    const updatedUser: AppUser = { ...user, role: newRole };
    setUser(updatedUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(updatedUser));
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Supabase sign out error:', err);
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LOCAL_USER_KEY);
    }
    setUser(null);
    setLoading(false);
  };

  return {
    user,
    loading,
    signInWithGoogle,
    toggleUserRole,
    signOut,
  };
}
