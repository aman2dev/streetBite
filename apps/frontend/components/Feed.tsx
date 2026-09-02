'use client';

import React, { useEffect, useState } from 'react';
import StreetFoodCard from './StreetFoodCard';
import { MOCK_CARTS, StreetFoodCart } from '../lib/mockData';
import { fetchStreetFoodCarts } from '../lib/supabase/adapters';
import { useFilterStore } from '../store';

export default function Feed() {
  const { activeCategory, searchQuery } = useFilterStore();
  const [carts, setCarts] = useState<StreetFoodCart[]>(MOCK_CARTS);

  useEffect(() => {
    async function loadCarts() {
      const data = await fetchStreetFoodCarts();
      if (data && data.length > 0) {
        setCarts(data);
      }
    }
    loadCarts();
  }, []);

  const filteredCarts = carts.filter((cart) => {
    const matchesCategory = activeCategory === 'all' || cart.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = cart.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (cart.specialty && cart.specialty.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="w-full pb-xl scroll-mt-28" id="feed">
      <div className="flex items-center justify-between mb-8 border-b-4 border-on-surface pb-4">
        <h2 
          className="text-2xl sm:text-4xl text-on-surface font-extrabold tracking-tight" 
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {searchQuery ? 'Search Results' : 'Top Rated Near You'}
        </h2>
        <span className="text-xs font-black uppercase text-on-surface-variant bg-surface-container-highest px-3 py-1 rounded-full border border-on-surface">
          {filteredCarts.length} {filteredCarts.length === 1 ? 'Cart' : 'Carts'}
        </span>
      </div>
      
      {filteredCarts.length === 0 ? (
        <div className="w-full py-12 flex flex-col items-center justify-center text-center bg-surface-container-lowest p-8 rounded-3xl border-2 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c]">
          <p className="text-2xl font-bold text-on-surface-variant mb-2">No carts found! 😢</p>
          <p className="text-on-surface-variant font-bold text-sm">Try selecting a different category or clearing search terms.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCarts.map((cart) => (
            <StreetFoodCard key={cart.id} cart={cart} />
          ))}
        </div>
      )}
    </section>
  );
}
