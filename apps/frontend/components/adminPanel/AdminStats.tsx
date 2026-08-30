'use client';

import React from 'react';
import { Store, Star, Utensils } from 'lucide-react';
import { CATEGORIES } from '../../lib/mockData';

interface AdminStatsProps {
  totalCarts: number;
  activeCartsCount: number;
  avgRatingOverall: string;
}

export default function AdminStats({ totalCarts, activeCartsCount, avgRatingOverall }: AdminStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-surface-container p-5 rounded-2xl border-2 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c]">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-extrabold text-on-surface-variant">Total Carts</span>
          <Store size={20} className="text-primary" />
        </div>
        <p className="text-3xl font-black text-on-surface mt-2">{totalCarts}</p>
      </div>

      <div className="bg-surface-container p-5 rounded-2xl border-2 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c]">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-extrabold text-on-surface-variant">Active Now</span>
          <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse border border-on-surface"></span>
        </div>
        <p className="text-3xl font-black text-emerald-600 mt-2">{activeCartsCount}</p>
      </div>

      <div className="bg-surface-container p-5 rounded-2xl border-2 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c]">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-extrabold text-on-surface-variant">Avg Rating</span>
          <Star size={20} className="text-amber-500 fill-amber-400" />
        </div>
        <p className="text-3xl font-black text-on-surface mt-2">{avgRatingOverall} ⭐</p>
      </div>

      <div className="bg-surface-container p-5 rounded-2xl border-2 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c]">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-extrabold text-on-surface-variant">Categories</span>
          <Utensils size={20} className="text-primary" />
        </div>
        <p className="text-3xl font-black text-on-surface mt-2">{CATEGORIES.length - 1}</p>
      </div>
    </div>
  );
}
