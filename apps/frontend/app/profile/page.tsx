'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../../components/NavBar';
import Footer from '../../components/Footer';
import BottomNav from '../../components/BottomNav';
import { useAuth, UserRole } from '../../lib/useAuth';
import { ArrowLeft } from 'lucide-react';

export default function ProfilePage() {
  const { user, loading, signInWithGoogle, toggleUserRole, signOut } = useAuth();
  const isAdmin = user?.role === UserRole.ADMIN;

  return (
    <>
      <Header />
    
      <main className="w-full items-center justify-center flex pt-8 md:pt-28 lg:pt-36 min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 flex flex-col gap-6 ">
          
          
         

          {!user ? (
            /* Unauthenticated Profile View - Clean Text Layout */
            <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl shadow-sm text-center flex flex-col items-center gap-6">
              
              <div className="space-y-2 w-fit">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Welcome to StreetBite
                </h1>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                  Sign in with your Google account to rate street food carts, save your favorite stalls, and access admin tools.
                </p>
              </div>

              {/* Primary Google Sign In Button */}
              <button
                onClick={() => signInWithGoogle(true)}
                disabled={loading}
                className="w-full w-fit py-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-2xl shadow-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-transform active:scale-[0.99] text-sm cursor-pointer disabled:opacity-60"
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Sign In with Google</span>
              </button>
            </div>
          ) : (
            /* Authenticated User Profile View */
            <div className="space-y-6">
              
              {/* User Account Card */}
              <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover bg-slate-200 border-2 border-amber-400 shadow-md"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {user.name}
                    </h1>
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase ${
                      isAdmin ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-800'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{user.email}</p>
                  <span className="inline-block text-xs font-bold text-emerald-600 dark:text-emerald-400 pt-1">
                    Verified Google Account
                  </span>
                </div>
              </div>

              {/* Account Quick Links & Controls */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm space-y-3">
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider px-1">
                  Account Menu
                </h3>

                <div className="space-y-2">
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="w-full flex items-center justify-between p-4 bg-amber-400 text-slate-950 font-black rounded-2xl shadow-sm uppercase tracking-wider text-xs hover:bg-amber-500 transition-colors"
                    >
                      <span>Admin Dashboard</span>
                      <span>→</span>
                    </Link>
                  )}

                  <Link
                    href="/saved"
                    className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-bold rounded-2xl text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span>Saved Food Carts</span>
                    <span className="text-xs text-slate-400">View</span>
                  </Link>

                  {/* Dev Testing Role Switcher */}
                  <button
                    onClick={toggleUserRole}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-bold rounded-2xl text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <span>Switch Role (Test)</span>
                    <span className="text-xs font-extrabold text-amber-500 uppercase">
                      Current: {user.role}
                    </span>
                  </button>

                  {/* Sign Out Button */}
                  <button
                    onClick={() => signOut()}
                    className="w-full flex items-center justify-between p-4 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold rounded-2xl text-sm hover:bg-rose-100 transition-colors cursor-pointer"
                  >
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
