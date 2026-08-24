'use client';

import React from 'react';
import StreetFoodCard from './StreetFoodCard';
import { MOCK_CARTS } from '../lib/mockData';
import { useFilterStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';

export default function Feed() {
  const { activeCategory, searchQuery } = useFilterStore();

  const filteredCarts = MOCK_CARTS.filter((cart) => {
    const matchesCategory = activeCategory === 'all' || cart.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = cart.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (cart.specialty && cart.specialty.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="w-full pb-xl">
      <div className="flex items-end justify-between mb-8 border-b-4 border-on-surface pb-4">
        <h2 
          className="font-headline-xl text-on-surface font-bold text-4xl" 
          style={{ fontFamily: "'Gilroy-Bold', sans-serif" }}
        >
          {searchQuery ? 'Search Results' : 'Top Rated Near You'}
        </h2>
        <button className="text-on-surface bg-primary-fixed border-2 border-on-surface px-6 py-2 rounded-full shadow-[4px_4px_0px_0px_#1a1c1c] font-label-md uppercase tracking-wider hover:-translate-y-1 transition-transform font-bold hidden sm:block">
          View All
        </button>
      </div>
      
      {filteredCarts.length === 0 ? (
        <div className="w-full py-12 flex flex-col items-center justify-center text-center">
          <p className="text-2xl font-bold text-on-surface-variant mb-2">No carts found! 😢</p>
          <p className="text-on-surface-variant">Try a different category or search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCarts.map((cart) => (
              <StreetFoodCard key={cart.id} cart={cart} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
