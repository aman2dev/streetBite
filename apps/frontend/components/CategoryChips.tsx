'use client';

import React from 'react';
import { useFilterStore } from '../store';
import { CATEGORIES } from '../lib/mockData';
import { motion } from 'framer-motion';
import { IceCream, Utensils } from 'lucide-react';
import clsx from 'clsx';

export default function CategoryChips() {
  const { activeCategory, setActiveCategory } = useFilterStore();

  const getIcon = (iconName: string | null) => {
    if (iconName === 'icecream') return <IceCream size={32} className="text-primary" />;
    if (iconName === 'restaurant') return <Utensils size={32} className="text-primary" />;
    return null;
  };

  return (
    <section className="w-full mb-12">
      <h2 
        className="font-headline-xl text-on-surface font-bold mb-6 text-3xl" 
        style={{ fontFamily: "'Gilroy-Bold', sans-serif" }}
      >
        What are you craving?
      </h2>
      <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide px-2">
        {CATEGORIES.map((cat) => (
          <motion.div
            key={cat.id}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(cat.id)}
            className="flex-shrink-0 w-32 flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div 
              className={clsx(
                "w-24 h-24 rounded-full border-4 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c] overflow-hidden transition-colors",
                activeCategory === cat.id ? "ring-4 ring-primary ring-offset-2 ring-offset-surface bg-primary-fixed" : "bg-surface-container"
              )}
            >
              {cat.image ? (
                <img 
                  alt={cat.label} 
                  className="w-full h-full object-cover" 
                  src={cat.image} 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary-fixed">
                  {cat.id === 'all' ? (
                    <span className="font-headline-md text-primary font-bold">All</span>
                  ) : (
                    getIcon(cat.icon)
                  )}
                </div>
              )}
            </div>
            <span 
              className={clsx(
                "font-bold transition-colors",
                activeCategory === cat.id ? "text-primary" : "text-on-surface"
              )}
            >
              {cat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
