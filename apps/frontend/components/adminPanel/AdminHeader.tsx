'use client';

import React from 'react';
import { Plus } from 'lucide-react';

interface AdminHeaderProps {
  onOpenAddModal: () => void;
}

export default function AdminHeader({ onOpenAddModal }: AdminHeaderProps) {
  return (
    <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border-2 border-on-surface shadow-[6px_6px_0px_0px_#1a1c1c] flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-primary text-on-primary font-black rounded-full text-xs uppercase tracking-wider border border-on-surface">
            Admin Control Panel
          </span>
          <span className="text-xs font-bold text-on-surface-variant">StreetBite Monorepo</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Cart Management Dashboard
        </h1>
        <p className="text-on-surface-variant font-medium text-sm sm:text-base mt-1">
          Upload images, configure location & Google Maps links, manage menus and cart availability in real-time.
        </p>
      </div>

      <button
        onClick={onOpenAddModal}
        className="bg-primary hover:bg-amber-400 text-on-primary font-extrabold py-3.5 px-6 rounded-2xl border-2 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c] uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:translate-x-0.5 active:translate-y-0.5 whitespace-nowrap text-sm sm:text-base"
      >
        <Plus size={20} />
        <span>Add New Cart</span>
      </button>
    </div>
  );
}
