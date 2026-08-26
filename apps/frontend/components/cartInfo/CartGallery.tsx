'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import clsx from 'clsx';
import { StreetFoodCart } from '../../lib/mockData';

interface CartGalleryProps {
  cart: StreetFoodCart;
  currentRatingAvg: string | number;
}

export default function CartGallery({ cart, currentRatingAvg }: CartGalleryProps) {
  const galleryImages = cart.images && cart.images.length > 0 ? cart.images : [cart.image];
  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  return (
    <div className="lg:col-span-7 flex flex-col gap-4">
      <div className="relative h-[320px] sm:h-[420px] w-full rounded-3xl overflow-hidden border-4 border-on-surface shadow-[8px_8px_0px_0px_#1a1c1c] bg-surface-container">
        <img
          src={selectedImage}
          alt={cart.name}
          className="w-full h-full object-cover"
        />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className={clsx(
            "text-xs sm:text-sm px-4 py-1.5 rounded-full font-extrabold uppercase border-2 border-on-surface shadow-[3px_3px_0px_0px_#1a1c1c]",
            cart.isOpen 
              ? "bg-emerald-400 text-on-surface" 
              : "bg-rose-400 text-on-surface"
          )}>
            {cart.isOpen ? '🟢 Open Now' : '🔴 Closed'}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 z-10 bg-primary text-on-primary px-4 py-1.5 rounded-full flex items-center gap-1.5 font-bold border-2 border-on-surface shadow-[3px_3px_0px_0px_#1a1c1c]">
          <Star size={18} className="fill-on-primary" />
          <span className="text-base font-extrabold">{currentRatingAvg}</span>
        </div>
      </div>

      {/* Gallery Thumbnails */}
      {galleryImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {galleryImages.map((imgUrl, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(imgUrl)}
              className={clsx(
                "relative h-20 w-24 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-transform",
                selectedImage === imgUrl 
                  ? "border-primary border-4 shadow-[4px_4px_0px_0px_#1a1c1c] scale-105" 
                  : "border-on-surface opacity-75 hover:opacity-100"
              )}
            >
              <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
