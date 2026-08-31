'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, UserRole } from '../lib/useAuth';
import { LogOut, ShieldCheck, UtensilsCrossed, Store, RefreshCw } from 'lucide-react';
import clsx from 'clsx';

export default function Header() {
  const pathname = usePathname();
  const { user, loading, signInWithGoogle, toggleUserRole, signOut } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const isAdmin = user?.role === UserRole.ADMIN;
  const isHomePage = pathname === '/';

  return (
    <header className={clsx(
      "fixed top-4 left-0 right-0 max-w-7xl mx-auto w-[calc(100%-2rem)] z-50 bg-surface/90 backdrop-blur-xl shadow-[4px_4px_0px_0px_#1a1c1c] border-2 border-on-surface rounded-full transition-all",
      !isHomePage && "hidden md:block" // Hide navbar on mobile view for non-homepage routes
    )}>
      <div className="h-20 w-full px-4 sm:px-6 md:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer group">
            <div className="w-10 h-10 bg-primary text-on-primary rounded-xl border-2 border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c] flex items-center justify-center font-black text-xl group-hover:scale-105 transition-transform">
              <UtensilsCrossed size={20} className="stroke-[2.5]" />
            </div>
            <span className="text-2xl font-black text-on-surface tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Street<span className="text-primary">Bite</span>
            </span>
          </Link>
        </div>

        {/* Navigation Links & Auth */}
        <nav className="flex items-center gap-3 sm:gap-5">
          <Link href="/" className="transition-colors uppercase tracking-wider text-primary font-extrabold text-xs sm:text-sm hidden md:block">
            Home
          </Link>

          <Link href="/saved" className="text-xs sm:text-sm text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider font-extrabold hidden md:block">
            Saved
          </Link>

          {/* User Auth Section (Hidden on mobile screens: hidden md:flex) */}
          <div className="relative hidden md:flex items-center pl-3 border-l-2 border-on-surface">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 cursor-pointer focus:outline-none"
                >
                  <div className="relative">
                    <img
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover shadow-[2px_2px_0px_0px_#1a1c1c] border-2 border-on-surface hover:ring-2 hover:ring-primary transition-all"
                      src={user.avatar}
                    />
                    <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border border-on-surface ${
                      isAdmin ? 'bg-amber-400' : 'bg-emerald-400'
                    }`}></span>
                  </div>
                </button>

                {/* Dropdown Profile Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-3 w-72 bg-surface-container-lowest border-2 border-on-surface shadow-[6px_6px_0px_0px_#1a1c1c] rounded-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-3 pb-3 border-b border-on-surface/10 mb-3">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-on-surface" />
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-1.5">
                          <p className="font-extrabold text-sm text-on-surface truncate">{user.name}</p>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border border-on-surface ${
                            isAdmin ? 'bg-amber-400 text-slate-900' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {user.role}
                          </span>
                        </div>
                        <p className="text-[11px] font-bold text-on-surface-variant truncate">{user.email}</p>
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-black text-emerald-600 uppercase mt-0.5">
                          <ShieldCheck size={10} /> Google Verified
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {/* Admin link inside menu */}
                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setShowProfileMenu(false)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-black text-on-primary bg-primary rounded-xl border border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c] uppercase"
                        >
                          <Store size={14} />
                          <span>Admin Control Panel</span>
                        </Link>
                      )}

                      {/* Quick Role Switcher for Testing */}
                      <button
                        onClick={toggleUserRole}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs font-extrabold text-on-surface bg-surface-container hover:bg-surface-variant rounded-xl border border-on-surface transition-colors cursor-pointer"
                        title="Toggle role between ADMIN and USER for testing"
                      >
                        <span className="flex items-center gap-1.5">
                          <RefreshCw size={13} className="text-primary" />
                          <span>Switch Role</span>
                        </span>
                        <span className="text-[10px] font-black uppercase text-primary">
                          {user.role === UserRole.ADMIN ? '→ Set USER' : '→ Set ADMIN'}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          signOut();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-extrabold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                      >
                        <LogOut size={14} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Hide Sign In button on Mobile screens */
              <button
                onClick={() => signInWithGoogle(true)}
                disabled={loading}
                className="hidden md:flex px-4 py-2 bg-white hover:bg-slate-50 text-slate-900 font-extrabold rounded-full border-2 border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c] text-xs uppercase tracking-wider items-center gap-2 hover:-translate-y-0.5 transition-transform cursor-pointer disabled:opacity-60"
                title="Sign in with Google Account"
              >
                {/* Google G Logo SVG */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Sign In</span>
              </button>
            )}
          </div>
        </nav>

      </div>
    </header>
  );
}
