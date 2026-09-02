'use client';

import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function Hero() {
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
        
        {/* Dedicated Find Food Navigation Button -> Navigates to /search */}
        <Link 
          href="/search"
          className="w-full bg-primary hover:bg-amber-400 text-on-primary rounded-2xl sm:rounded-full py-4 px-8 font-black flex items-center justify-center gap-3 border-2 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c] lg:shadow-[6px_6px_0px_0px_#1a1c1c] uppercase tracking-wider text-base sm:text-lg mb-8 transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
        >
          <Search size={22} className="stroke-[3]" />
          <span>Find Food</span>
        </Link>

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
