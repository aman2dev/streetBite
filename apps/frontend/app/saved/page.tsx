'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/NavBar';
import Footer from '../../components/Footer';
import BottomNav from '../../components/BottomNav';
import StreetFoodCard from '../../components/StreetFoodCard';
import { MOCK_CARTS, StreetFoodCart } from '../../lib/mockData';
import { fetchStreetFoodCarts } from '../../lib/supabase/adapters';
import { useSavedStore } from '../../store';
import { AnimatePresence } from 'framer-motion';

export default function SavedCartsPage() {
  const { savedCartIds } = useSavedStore();
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

  const savedCarts = carts.filter((cart) => savedCartIds.includes(cart.id));

  return (
    <>
      <Header />
      <main className="w-full pt-8 md:pt-28 lg:pt-36 min-h-screen bg-surface pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col gap-6">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-4 border-on-surface pb-4">
            <div>
              <h1 
                className="text-3xl sm:text-4xl text-on-surface font-extrabold" 
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Saved Food Carts ({savedCarts.length})
              </h1>
              <p className="text-sm font-bold text-on-surface-variant mt-1">
                Your bookmarked street food stalls & favorite vendors
              </p>
            </div>
          </div>

          {/* Saved Carts Grid or Empty View */}
          {savedCarts.length === 0 ? (
            <div className="bg-surface-container-lowest p-8 sm:p-12 rounded-3xl border-2 border-on-surface shadow-[6px_6px_0px_0px_#1a1c1c] text-center flex flex-col items-center gap-5 my-6">
              <div className="space-y-2 w-fit">
                <h2 className="text-2xl font-extrabold text-on-surface" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  No Saved Carts Yet
                </h2>
                <p className="text-sm font-medium text-on-surface-variant leading-relaxed">
                  Save your favorite street stalls here for quick access.
                </p>
              </div>
              <Link
                href="/"
                className="px-6 py-3.5 bg-primary text-on-primary font-black rounded-2xl border-2 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c] uppercase text-xs tracking-wider hover:-translate-y-0.5 transition-transform cursor-pointer"
              >
                Browse Nearby Carts
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
              <AnimatePresence mode="popLayout">
                {savedCarts.map((cart) => (
                  <StreetFoodCard key={cart.id} cart={cart} />
                ))}
              </AnimatePresence>
            </div>
          )}

        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
