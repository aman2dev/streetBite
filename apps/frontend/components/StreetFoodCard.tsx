'use client';

import React from 'react';
import { StreetFoodCart } from '../lib/mockData';
import { Star, Heart } from 'lucide-react';
import { useSavedStore } from '../store';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function StreetFoodCard({ cart }: { cart: StreetFoodCart }) {
  const { savedCartIds, toggleSaved } = useSavedStore();
  const isSaved = savedCartIds.includes(cart.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_#1a1c1c] border-4 border-on-surface transition-transform duration-300 flex flex-col group relative"
    >
      <div className="relative h-48 w-full border-b-4 border-on-surface overflow-hidden">
        <img 
          alt={cart.name} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          src={cart.image}
        />
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1 rounded-full flex items-center gap-1 shadow-[2px_2px_0px_0px_#1a1c1c] border-2 border-on-surface font-bold z-10">
          <Star size={16} className="fill-on-primary" />
          <span className="font-label-md">{cart.rating}</span>
        </div>
        
        {/* Save Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleSaved(cart.id);
          }}
          className="absolute top-4 left-4 bg-surface text-on-surface p-2 rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_#1a1c1c] border-2 border-on-surface font-bold z-10 hover:bg-surface-variant transition-colors"
        >
          <Heart size={18} className={clsx(isSaved && "fill-error text-error")} />
        </button>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 
            className="font-headline-lg text-on-surface font-bold leading-tight" 
            style={{ fontFamily: "'Gilroy-Bold', sans-serif" }}
          >
            {cart.name}
          </h3>
          <span className={clsx(
            "text-label-sm border-2 border-on-surface px-3 py-1 rounded-full font-bold uppercase whitespace-nowrap",
            cart.isOpen ? "text-on-primary bg-on-surface" : "bg-surface-variant text-on-surface-variant"
          )}>
            {cart.isOpen ? 'Open' : 'Closed'}
          </span>
        </div>
        {cart.specialty && (
          <p className="font-body-md text-primary font-bold mb-1">⭐ {cart.specialty}</p>
        )}
        <p className="font-body-md text-on-surface-variant font-bold mb-4 flex items-center gap-1 mt-auto">
          <span className="text-xl">📍</span> {cart.distance}
        </p>
      </div>
    </motion.div>
  );
}
