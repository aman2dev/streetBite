'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { useFilterStore } from '../store';

export default function Hero() {
  const { searchQuery, setSearchQuery } = useFilterStore();

  return (
    <section className="relative w-full min-h-[70vh] flex flex-col md:flex-row items-center justify-between gap-8 mb-xl">
      <div className="relative z-10 w-full md:w-1/2 flex flex-col items-start bg-surface-container-lowest p-8 md:p-12 rounded-3xl border-4 border-on-surface shadow-[12px_12px_0px_0px_#1a1c1c] transform md:-translate-y-8 md:translate-x-8">
        <span className="inline-block py-sm px-md bg-primary-container text-on-primary-container rounded-full text-label-md uppercase tracking-wider mb-lg border-2 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c] font-bold">
          Patna Edition
        </span>
        <h1 
          className="text-on-surface text-5xl md:text-7xl mb-md tracking-tight font-bold leading-tight" 
          style={{ fontFamily: "'Gilroy-Bold', sans-serif" }}
        >
          Discover the Heart of <br />
          <span 
            className="text-primary tracking-widest inline-block transform -rotate-2 bg-primary-fixed px-4 mt-2" 
            style={{ WebkitTextStroke: "2px #1a1c1c", textShadow: "2px 2px 0 #1a1c1c" }}
          >
            Street Food
          </span>
        </h1>
        <p className="font-body-lg text-on-surface-variant text-xl mb-xl font-bold">
          Find the best-rated carts and hidden gems near you.
        </p>
        
        {/* Hero Search */}
        <div className="w-full relative shadow-[6px_6px_0px_0px_#1a1c1c] border-2 border-on-surface rounded-full bg-surface-container-lowest p-2 flex items-center mb-8">
          <Search className="text-primary ml-md" size={28} />
          <input 
            className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-headline-md text-on-surface px-md py-sm placeholder-on-surface-variant/70 font-bold" 
            placeholder="Craving Litti Chokha, momos, or chaat?" 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-primary hover:bg-surface-tint text-on-primary rounded-full px-xl py-md font-label-md uppercase tracking-wider transition-all duration-300 border-2 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c] font-bold whitespace-nowrap">
            Find Food
          </button>
        </div>

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

      {/* Offset Background Illustration */}
      <div className="relative w-full md:w-3/5 h-[500px] md:h-[700px] md:absolute md:right-0 md:top-0 rounded-3xl overflow-hidden border-4 border-on-surface shadow-[-12px_12px_0px_0px_#1a1c1c] z-0 hidden md:block">
        <img 
          alt="Vibrant, high-energy pop art illustration of a bustling street food market." 
          className="w-full h-full object-cover mix-blend-multiply opacity-90" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_A5QX6jHknjRuZ5AN4b8mfMAbvDoya6E9qip_IK2oK17Wq4VR7wG4x11G41-I0PaRx6eF-Vz0NxFDcip4qBAF6_6flChUhxdJZsCHsStI4133YAvc4ljxd7jHANRcQ9lMa42R5NhHRlYpHZxYS1fIsraHCcBGu2Z7nET5l7kCIkDki0fTwSwvklAf9Kc79VgzJu9NyhevDtnOuFvOc3ig3jxm9M98CKz3dNlWgLMly4aMKwWjCAvd"
        />
        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
      </div>
    </section>
  );
}
