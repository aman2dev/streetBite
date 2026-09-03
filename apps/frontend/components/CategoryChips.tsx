'use client';

import React from 'react';
import { useFilterStore } from '../store';
import { CATEGORIES } from '../lib/mockData';
import { IceCream, Utensils, Sparkles } from 'lucide-react';
import clsx from 'clsx';

export default function CategoryChips() {
  const { activeCategory, setActiveCategory } = useFilterStore();

  const getIcon = (iconName: string | null) => {
    if (iconName === 'icecream') return <IceCream size={26} className="text-amber-700" />;
    if (iconName === 'restaurant') return <Utensils size={26} className="text-amber-700" />;
    return <Sparkles size={26} className="text-amber-700" />;
  };

  return (
    <section className="w-full my-4 sm:my-6">
      <h2 
        className="text-on-surface text-2xl sm:text-3xl font-black mb-4 tracking-tight" 
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        What are you craving?
      </h2>

      {/* Clean Horizontal Scrollable Story Circles without line clipping */}
      <div className="flex items-center gap-3.5 sm:gap-6 overflow-x-auto pb-3 pt-2 scrollbar-hide px-1">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex-shrink-0 flex flex-col items-center gap-2 group cursor-pointer border-none bg-transparent outline-none p-0.5"
            >
              {/* Outer Ring without overflow clipping */}
              <div 
                className={clsx(
                  "w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[3px] transition-all flex items-center justify-center",
                  isActive 
                    ? "bg-amber-500 shadow-[0_4px_10px_rgba(245,158,11,0.35)] scale-105" 
                    : "bg-surface-container-high group-hover:bg-amber-300"
                )}
              >
                {/* Inner White Container */}
                <div className="w-full h-full rounded-full overflow-hidden bg-amber-100/90 flex items-center justify-center border-2 border-surface">
                  {cat.image ? (
                    <img 
                      alt={cat.label} 
                      className="w-full h-full object-cover" 
                      src={cat.image} 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-amber-100/90">
                      {cat.id === 'all' ? (
                        <span className="text-sm sm:text-base font-black text-amber-900 uppercase tracking-wider">
                          All
                        </span>
                      ) : (
                        getIcon(cat.icon)
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Title Label */}
              <span 
                className={clsx(
                  "text-xs sm:text-sm font-extrabold tracking-tight transition-colors whitespace-nowrap",
                  isActive ? "text-amber-600 font-black scale-105" : "text-on-surface"
                )}
              >
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
