'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { CATEGORIES } from '../../lib/mockData';

interface AdminFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  totalCartsCount: number;
}

export default function AdminFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  totalCartsCount,
}: AdminFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-container-lowest p-4 rounded-2xl border-2 border-on-surface">
      {/* Search Input */}
      <div className="relative w-full sm:max-w-md">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
        <input
          type="text"
          placeholder="Search carts by name, specialty or address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-surface rounded-xl border-2 border-on-surface font-bold text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider border-2 border-on-surface whitespace-nowrap transition-colors ${
            selectedCategory === 'all'
              ? 'bg-primary text-on-primary shadow-[2px_2px_0px_0px_#1a1c1c]'
              : 'bg-surface hover:bg-surface-variant text-on-surface'
          }`}
        >
          All ({totalCartsCount})
        </button>
        {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.label)}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider border-2 border-on-surface whitespace-nowrap transition-colors ${
              selectedCategory.toLowerCase() === cat.label.toLowerCase()
                ? 'bg-primary text-on-primary shadow-[2px_2px_0px_0px_#1a1c1c]'
                : 'bg-surface hover:bg-surface-variant text-on-surface'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
