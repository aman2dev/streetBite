'use client';

import React from 'react';
import { StreetFoodCart } from '../lib/mockData';
import { Star, Heart, MapPin } from 'lucide-react';
import { useSavedStore } from '../store';
import clsx from 'clsx';
import Link from 'next/link';

export default function StreetFoodCard({ cart }: { cart: StreetFoodCart }) {
  const { savedCartIds, toggleSaved } = useSavedStore();
  const isSaved = savedCartIds.includes(cart.id);

  return (
    <Link href={`/cart/${cart.id}`} className="block h-full">
      <div 
        className="bg-surface-container-lowest rounded-3xl overflow-hidden hover:-translate-y-1.5 transition-all duration-300 flex flex-col group relative h-full border-2 border-on-surface"
      >
        <div className="relative h-48 w-full overflow-hidden bg-surface-container">
          <img 
            alt={cart.name} 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            src={cart.image}
            loading="lazy"
          />
          
          {/* Rating Badge */}
          <div className="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1 rounded-full flex items-center gap-1 font-black z-10 border border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c]">
            <Star size={15} className="fill-on-primary" />
            <span className="text-xs">{cart.rating}</span>
          </div>
          
          {/* Save Button */}
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSaved(cart.id);
            }}
            className="absolute top-4 left-4 bg-surface text-on-surface p-2.5 rounded-full flex items-center justify-center font-bold z-10 border border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c] hover:bg-surface-variant transition-colors cursor-pointer"
            aria-label="Save cart"
          >
            <Heart size={18} className={clsx(isSaved && "fill-rose-500 text-rose-500")} />
          </button>
        </div>
        
        <div className="p-5 flex flex-col flex-1 justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex justify-between items-start gap-2">
              <h3 
                className="text-lg sm:text-xl text-on-surface font-extrabold leading-tight tracking-tight" 
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {cart.name}
              </h3>
              <span className={clsx(
                "text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-on-surface whitespace-nowrap",
                cart.isOpen !== false ? "bg-emerald-400 text-slate-950" : "bg-rose-400 text-slate-950"
              )}>
                {cart.isOpen !== false ? 'Open' : 'Closed'}
              </span>
            </div>
            
            {cart.specialty && (
              <p className="text-xs font-bold text-primary flex items-center gap-1">
                <span>⭐</span>
                <span className="line-clamp-1">{cart.specialty}</span>
              </p>
            )}
          </div>

          <div className="pt-2 border-t border-on-surface/10 flex items-center justify-between text-xs font-bold text-on-surface-variant">
            <span className="flex items-center gap-1">
              <MapPin size={14} className="text-primary" />
              <span>{cart.distance}</span>
            </span>
            {cart.reviewsCount && (
              <span className="text-[11px] font-bold text-on-surface-variant/70">
                {cart.reviewsCount} reviews
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
