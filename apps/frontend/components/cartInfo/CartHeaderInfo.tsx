'use client';

import React from 'react';
import { Clock, Calendar, MapPin, Utensils, ExternalLink, Navigation } from 'lucide-react';
import { StreetFoodCart } from '../../lib/mockData';

interface CartHeaderInfoProps {
  cart: StreetFoodCart;
}

export default function CartHeaderInfo({ cart }: CartHeaderInfoProps) {
  const mapLink = cart.googleMapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cart.name + ' ' + (cart.address || 'Patna'))}`;

  return (
    <div className="lg:col-span-5 flex flex-col gap-6 bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border-2 border-on-surface shadow-[6px_6px_0px_0px_#1a1c1c]">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-block py-1 px-3 bg-primary-container text-on-primary-container rounded-full text-xs font-bold uppercase tracking-wider border-2 border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c]">
            {cart.category}
          </span>
          <span className={`py-1 px-3 rounded-full text-xs font-extrabold uppercase border-2 border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c] ${
            cart.isOpen !== false ? 'bg-emerald-400 text-slate-900' : 'bg-rose-400 text-slate-900'
          }`}>
            {cart.isOpen !== false ? '🟢 Open Now' : '🔴 Closed'}
          </span>
        </div>
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
      <div className="bg-surface-container p-4 rounded-2xl border-2 border-on-surface flex items-start justify-between gap-3">
        <div>
          <span className="text-xs uppercase font-extrabold text-on-surface-variant block mb-1">Cart Address</span>
          <p className="text-sm font-bold text-on-surface">
            📍 {cart.address || "Main Market Chowk, Patna"}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-2">
        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-primary hover:bg-amber-400 text-on-primary font-extrabold py-3.5 px-6 rounded-2xl border-2 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c] uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:translate-x-0.5 active:translate-y-0.5"
        >
          <Navigation size={18} />
          <span>Open Google Maps</span>
          <ExternalLink size={14} className="opacity-80" />
        </a>
      </div>
    </div>
  );
}
