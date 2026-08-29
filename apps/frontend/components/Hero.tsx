'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { useFilterStore } from '../store';

export default function Hero() {
  const router = useRouter();
  const { searchQuery, setSearchQuery } = useFilterStore();

  return (
    <section className="relative w-full min-h-fit xl:min-h-[70vh] flex flex-col xl:flex-row items-center justify-between gap-8 mb-8 xl:mb-xl">
      {/* Floating Bold Box for Content */}
      <div className="relative z-10 w-full xl:w-1/2 flex flex-col items-start bg-surface-container-lowest p-6 sm:p-8 xl:p-12 rounded-3xl border-4 border-on-surface shadow-[8px_8px_0px_0px_#1a1c1c] xl:shadow-[12px_12px_0px_0px_#1a1c1c] xl:transform xl:-translate-y-12 xl:translate-x-8">
        <span className="inline-block py-sm px-md bg-primary-container text-on-primary-container rounded-full text-label-md uppercase tracking-wider mb-lg border-2 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c] font-bold">
          Patna Edition
        </span>
        <h1 
          className="text-on-surface text-4xl sm:text-5xl xl:text-7xl mb-md tracking-tight font-extrabold leading-tight" 
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Discover the Heart of <br />
          <span 
            className="text-primary tracking-widest inline-block transform -rotate-2 bg-primary-fixed px-4 mt-2 rounded-3xl" 
            style={{ WebkitTextStroke: "2px #1a1c1c", textShadow: "2px 2px 0 #1a1c1c" }}
          >
            Street Food
          </span>
        </h1>
        <p className="font-body-lg text-on-surface-variant text-lg xl:text-xl mb-xl font-bold">
          Find the best-rated carts and hidden gems near you.
        </p>
        
        {/* Mobile & Tablet Find Food Button (sm & md screens) */}
        <button
          type="button"
          onClick={() => router.push('/search')}
          className="w-full bg-primary hover:bg-surface-tint text-on-primary rounded-full py-3.5 px-6 font-bold flex items-center justify-center gap-3 border-2 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c] uppercase tracking-wider text-base lg:hidden mb-8"
        >
          <Search size={22} />
          <span>Find Food</span>
        </button>

        {/* Hero Search Input (Desktop Only) */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.trim()) {
              router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            } else {
              router.push('/search');
            }
          }}
          className="hidden lg:flex w-full relative shadow-[6px_6px_0px_0px_#1a1c1c] border-2 border-on-surface rounded-full bg-surface-container-lowest p-2 items-center mb-8"
        >
          <Search className="text-primary ml-md flex-shrink-0" size={24} />
          <input 
            className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-base lg:text-lg text-on-surface px-md py-sm placeholder-on-surface-variant/70 font-bold min-w-0" 
            placeholder="Craving Litti Chokha, momos, or chaat?" 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="bg-primary hover:bg-surface-tint text-on-primary rounded-full px-6 lg:px-xl py-2 lg:py-md text-sm lg:text-base font-label-md uppercase tracking-wider transition-all duration-300 font-bold whitespace-nowrap flex-shrink-0">
            Find Food
          </button>
        </form>

        {/* Quick Stats */}
        <div className="flex flex-wrap items-center gap-6 mt-4">
          <div className="flex flex-col items-start border-l-4 border-primary pl-4">
            <span className="font-headline-xl text-on-surface font-bold">124+</span>
            <span className="font-label-sm text-on-surface-variant uppercase tracking-widest font-bold">Active Carts</span>
          </div>
          <div className="flex flex-col items-start border-l-4 border-primary pl-4">
            <span className="font-headline-xl text-on-surface font-bold">4.8</span>
            <span className="font-label-sm text-on-surface-variant uppercase tracking-widest font-bold">Avg Rating</span>
          </div>
          <div className="flex flex-col items-start border-l-4 border-primary pl-4">
            <span className="font-headline-xl text-on-surface font-bold">&lt;10 min</span>
            <span className="font-label-sm text-on-surface-variant uppercase tracking-widest font-bold">Wait Time</span>
          </div>
        </div>
      </div>

      {/* Offset Background Illustration (Desktop Widescreen Only) */}
      <div className="hidden xl:block relative xl:w-3/5 xl:h-[700px] xl:absolute xl:right-0 xl:top-0 rounded-3xl overflow-hidden z-0">
        <img 
          alt="Vibrant, high-energy pop art illustration of a bustling street food market." 
          className="w-full h-full object-cover mix-blend-multiply opacity-90" 
          src="/streetBite.png"
        />
        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
      </div>
    </section>
  );
}
