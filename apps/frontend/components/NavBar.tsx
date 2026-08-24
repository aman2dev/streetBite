'use client';

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-4 left-0 right-0 max-w-7xl mx-auto w-[calc(100%-2rem)] z-50 bg-surface/90 backdrop-blur-xl shadow-[4px_4px_0px_0px_#1a1c1c] border-2 border-on-surface rounded-full">
      <div className="h-20 w-full px-xl flex items-center justify-between">
        <div className="flex items-center gap-lg">
          <div className="flex items-center gap-sm">
            <img
              alt="StreetBite"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1UUmzIJCqTTgZZmT97IDRMlKzoiXYjra0D5PmQws4w30o60bsJOJuI3GC3yPgYbCqI48IIS-dgDHE5bHpHqXhlvge2kSLiQyDKyktBdsHZFwpz7Zu27Rc9yp2rs7JjkwxRTOu0Uve7jo1fZPKrvibPtRHoLSZwg_fV8-J3PNRcXeMMQXprWenjGpX5srry4iiojCFYa2q9M7GFwNmhCfMDFsHnfHxuA9bXL2xXFfPoBlMGy-yJIADDYIxo"
            />
            <span className="font-headline-lg text-primary tracking-tight" style={{ fontFamily: "'Gilroy-Bold', sans-serif" }}>
              StreetBite
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-lg">
          <Link href="/" className="transition-colors uppercase tracking-wider text-primary font-bold text-label-md hidden md:block">
            Home
          </Link>
          <Link href="/explore" className="text-label-md text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider hidden md:block">
            Explore Map
          </Link>
          <Link href="/saved" className="text-label-md text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider hidden md:block">
            Saved
          </Link>
          
          <div className="flex items-center gap-sm pl-md border-l border-on-surface">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-primary transition-all shadow-[2px_2px_0px_0px_#1a1c1c] border-2 border-on-surface"
              src="https://lh3.googleusercontent.com/aida/AEtjO1WlBZByRgnWqZejgSckxcxKnYBrVbVtApXfZcg8DfqvoczwEttAjLeHTreOUrCO-FzJXDZ8bP1JbQnYjwOQ9RdB4kd7eSlq7vxTwoUh2roidmIY2LmpSuhfIjoq7AtEjHOJWBOZ4LQs70y0gjd7w7OKXohCipcMc7QwyFpL8NPVuz1uIX3mWKWIOfG9mvcI_ccGRJBSu0NVnh8Ip_V9m_gejIDvLFsfb31dHi6sEAQemd2fVwzL_HDMXS8"
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
