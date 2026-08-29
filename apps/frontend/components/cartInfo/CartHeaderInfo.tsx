'use client';

import React from 'react';
import { Clock, Calendar, MapPin, Utensils, Phone } from 'lucide-react';
import { StreetFoodCart } from '../../lib/mockData';

interface CartHeaderInfoProps {
  cart: StreetFoodCart;
}

export default function CartHeaderInfo({ cart }: CartHeaderInfoProps) {
  return (
    <div className="lg:col-span-5 flex flex-col gap-6 bg-surface-container-lowest p-6 sm:p-8 rounded-3xl">
      <div>
        <span className="inline-block py-1 px-3 bg-primary-container text-on-primary-container rounded-full text-xs font-bold uppercase tracking-wider mb-3 border-2 border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c]">
          {cart.category}
        </span>
        <h1 
          className="text-3xl sm:text-4xl text-on-surface font-extrabold leading-tight mb-2"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {cart.name}
        </h1>
        {cart.specialty && (
          <p className="text-primary font-extrabold text-lg flex items-center gap-1.5">
            ⭐ {cart.specialty}
          </p>
        )}
      </div>

      <p className="text-on-surface-variant font-medium text-base">
        {cart.description || "Authentic street food cooked fresh with traditional spices and recipes."}
      </p>

      {/* Quick Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t-2 border-on-surface/20 pt-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-primary/10 rounded-xl border-2 border-on-surface">
            <Clock size={20} className="text-primary" />
          </div>
          <div>
            <span className="text-xs uppercase font-extrabold text-on-surface-variant block">Timings</span>
            <span className="text-sm font-bold text-on-surface">{cart.timings || "4:00 PM - 10:00 PM"}</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-primary/10 rounded-xl border-2 border-on-surface">
            <Calendar size={20} className="text-primary" />
          </div>
          <div>
            <span className="text-xs uppercase font-extrabold text-on-surface-variant block">Active Since</span>
            <span className="text-sm font-bold text-on-surface">
              {cart.activeWeeks ? `${cart.activeWeeks} Weeks (${Math.floor(cart.activeWeeks / 52)} Yrs)` : '52+ Weeks'}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-primary/10 rounded-xl border-2 border-on-surface">
            <MapPin size={20} className="text-primary" />
          </div>
          <div>
            <span className="text-xs uppercase font-extrabold text-on-surface-variant block">Distance</span>
            <span className="text-sm font-bold text-on-surface">{cart.distance}</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-primary/10 rounded-xl border-2 border-on-surface">
            <Utensils size={20} className="text-primary" />
          </div>
          <div>
            <span className="text-xs uppercase font-extrabold text-on-surface-variant block">Schedule</span>
            <span className="text-sm font-bold text-on-surface">{cart.operatingDays || "Open Daily"}</span>
          </div>
        </div>
      </div>

      {/* Location Address */}
      <div className="bg-surface-container p-4 rounded-2xl border-2 border-on-surface">
        <span className="text-xs uppercase font-extrabold text-on-surface-variant block mb-1">Cart Address</span>
        <p className="text-sm font-bold text-on-surface">
          📍 {cart.address || "Main Market Chowk, Patna"}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <a
          href={`tel:${cart.phone || '+919876543210'}`}
          className="flex-1 bg-primary hover:bg-surface-tint text-on-primary font-extrabold py-3 px-6 rounded-2xl border-2 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c] uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:translate-x-0.5 active:translate-y-0.5"
        >
          <Phone size={18} />
          <span>Call Cart</span>
        </a>
      </div>
    </div>
  );
}
