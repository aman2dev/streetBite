'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/NavBar';
import Footer from '../../components/Footer';
import BottomNav from '../../components/BottomNav';
import StreetFoodCard from '../../components/StreetFoodCard';
import { MOCK_CARTS, StreetFoodCart } from '../../lib/mockData';
import { fetchStreetFoodCarts } from '../../lib/supabase/adapters';
import { MapPin, Navigation } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export default function NearMePage() {
  const [carts, setCarts] = useState<StreetFoodCart[]>(MOCK_CARTS);
  const [selectedRadius, setSelectedRadius] = useState<number>(3); // Max km filter
  const [isLocating, setIsLocating] = useState(false);
  const [userLocationName, setUserLocationName] = useState('Maurya Lok, Patna');

  useEffect(() => {
    async function loadCarts() {
      const data = await fetchStreetFoodCarts();
      if (data && data.length > 0) {
        setCarts(data);
      }
    }
    loadCarts();
  }, []);

  const handleDetectLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setTimeout(() => {
            setUserLocationName(`Lat: ${position.coords.latitude.toFixed(2)}, Long: ${position.coords.longitude.toFixed(2)}`);
            setIsLocating(false);
          }, 800);
        },
        () => {
          setTimeout(() => {
            setUserLocationName('Current Location (Patna)');
            setIsLocating(false);
          }, 800);
        }
      );
    } else {
      setTimeout(() => setIsLocating(false), 500);
    }
  };

  // Distance helper parsing
  const parseDistanceKm = (distStr: string): number => {
    const val = parseFloat(distStr);
    if (isNaN(val)) return 1.0;
    if (distStr.includes('mi')) return val * 1.6;
    return val;
  };

  const nearbyCarts = carts
    .map((cart) => ({
      ...cart,
      parsedDistKm: parseDistanceKm(cart.distance),
    }))
    .filter((cart) => cart.parsedDistKm <= selectedRadius)
    .sort((a, b) => a.parsedDistKm - b.parsedDistKm);

  return (
    <>
      <Header />
      <main className="w-full pt-8 md:pt-28 lg:pt-36 min-h-screen bg-surface pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col gap-6">
          
          {/* Near Me Header Banner */}
          <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border-2 border-on-surface shadow-[6px_6px_0px_0px_#1a1c1c] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-primary text-on-primary rounded-full text-xs font-black uppercase tracking-wider border border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c] flex items-center gap-1">
                  <MapPin size={14} />
                  <span>Proximity Live</span>
                </span>
                <span className="text-xs font-extrabold text-on-surface-variant">
                  {nearbyCarts.length} carts found
                </span>
              </div>
              <h1 
                className="text-2xl sm:text-4xl text-on-surface font-extrabold"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Carts Around You
              </h1>
              <p className="text-xs sm:text-sm font-bold text-on-surface-variant">
                📍 Location: <span className="text-on-surface">{userLocationName}</span>
              </p>
            </div>

            <button
              onClick={handleDetectLocation}
              disabled={isLocating}
              className="w-full sm:w-auto px-5 py-3 bg-primary hover:bg-amber-400 text-on-primary font-black rounded-2xl border-2 border-on-surface shadow-[3px_3px_0px_0px_#1a1c1c] text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer disabled:opacity-50"
            >
              <Navigation size={16} className={isLocating ? 'animate-spin' : ''} />
              <span>{isLocating ? 'Locating...' : 'Detect GPS Location'}</span>
            </button>
          </div>

          {/* Distance Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { label: 'Within 0.5 km', radius: 0.8 },
              { label: 'Within 1.5 km', radius: 2.0 },
              { label: 'Within 3.0 km', radius: 3.5 },
              { label: 'All Distances', radius: 10.0 },
            ].map((chip) => {
              const isSelected = selectedRadius === chip.radius;
              return (
                <button
                  key={chip.label}
                  onClick={() => setSelectedRadius(chip.radius)}
                  className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider border-2 border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c] transition-colors whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-lowest text-on-surface hover:bg-surface-variant'
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          {/* Near Me Carts Grid */}
          {nearbyCarts.length === 0 ? (
            <div className="bg-surface-container-lowest p-8 sm:p-12 rounded-3xl border-2 border-on-surface shadow-[6px_6px_0px_0px_#1a1c1c] text-center flex flex-col items-center gap-4 my-6">
              <h2 className="text-2xl font-extrabold text-on-surface" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                No Carts Found Nearby
              </h2>
              <p className="text-sm font-medium text-on-surface-variant">
                Try expanding your distance radius filter above to discover carts further away.
              </p>
              <button
                onClick={() => setSelectedRadius(10.0)}
                className="px-6 py-3 bg-primary text-on-primary font-black rounded-2xl border-2 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c] uppercase text-xs tracking-wider cursor-pointer"
              >
                View All Carts
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-2">
              <AnimatePresence mode="popLayout">
                {nearbyCarts.map((cart) => (
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
