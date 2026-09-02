'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, MapPin, Heart, User } from 'lucide-react';
import clsx from 'clsx';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Search, label: 'Search', href: '/search' },
    { icon: MapPin, label: 'Near Me', href: '/near-me' },
    { icon: Heart, label: 'Saved', href: '/saved' },
    { icon: User, label: 'Profile', href: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t-2 border-on-surface shadow-[0_-4px_0px_0px_#1a1c1c] z-50 md:hidden flex justify-around items-center h-20 px-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        
        return (
          <Link 
            key={item.href} 
            href={item.href}
            className={clsx(
              "flex flex-col items-center gap-1 p-1.5 rounded-xl transition-colors min-w-[56px]",
              isActive ? "text-primary font-black" : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            <div className={clsx(
              "p-2 rounded-full",
              isActive && "bg-primary-fixed border-2 border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c]"
            )}>
              <Icon size={20} className={isActive ? "fill-primary text-primary" : ""} />
            </div>
            <span className="text-[9px] font-extrabold uppercase tracking-wider">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
