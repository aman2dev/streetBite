'use client';

import React from 'react';
import { StreetFoodCart } from '../../lib/mockData';
import { 
  Pencil, 
  Trash2, 
  ExternalLink, 
  Navigation, 
  MapPin, 
  Image as ImageIcon,
  AlertCircle 
} from 'lucide-react';
import Link from 'next/link';

interface AdminCartListProps {
  carts: StreetFoodCart[];
  loading: boolean;
  onOpenEditModal: (cart: StreetFoodCart) => void;
  onDeleteCart: (cart: StreetFoodCart) => void;
  onToggleStatus: (cart: StreetFoodCart) => void;
  onOpenAddModal: () => void;
}

export default function AdminCartList({
  carts,
  loading,
  onOpenEditModal,
  onDeleteCart,
  onToggleStatus,
  onOpenAddModal,
}: AdminCartListProps) {
  if (loading) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-bold text-on-surface-variant">Loading Carts Data...</p>
      </div>
    );
  }

  if (carts.length === 0) {
    return (
      <div className="w-full py-16 bg-surface-container-lowest rounded-3xl border-2 border-on-surface text-center flex flex-col items-center justify-center p-8">
        <AlertCircle size={48} className="text-on-surface-variant mb-3" />
        <h3 className="text-xl font-bold text-on-surface">No food carts found</h3>
        <p className="text-on-surface-variant text-sm mt-1 mb-4">Try adjusting your search filter or add a new cart.</p>
        <button
          onClick={onOpenAddModal}
          className="bg-primary text-on-primary px-5 py-2.5 rounded-xl font-bold border-2 border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c]"
        >
          + Add First Cart
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {carts.map((cart) => (
        <div
          key={cart.id}
          className="bg-surface-container-lowest p-5 rounded-2xl border-2 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-primary transition-colors"
        >
          {/* Left: Thumbnail & Details */}
          <div className="flex items-start sm:items-center gap-4 flex-1">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl border-2 border-on-surface overflow-hidden flex-shrink-0 bg-surface-variant">
              <img
                src={cart.image || 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600'}
                alt={cart.name}
                className="w-full h-full object-cover"
              />
              {cart.images && cart.images.length > 1 && (
                <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded border border-white/40 flex items-center gap-0.5">
                  <ImageIcon size={10} />
                  +{cart.images.length}
                </span>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 bg-primary-container text-on-primary-container rounded-md text-[11px] font-extrabold uppercase border border-on-surface">
                  {cart.category}
                </span>

                <button
                  onClick={() => onToggleStatus(cart)}
                  className={`px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase border border-on-surface cursor-pointer hover:opacity-80 transition-opacity ${
                    cart.isOpen !== false ? 'bg-emerald-400 text-slate-900' : 'bg-rose-400 text-slate-900'
                  }`}
                  title="Click to toggle Open/Closed status"
                >
                  {cart.isOpen !== false ? '🟢 Open' : '🔴 Closed'}
                </button>

                <span className="text-xs font-extrabold text-amber-500 flex items-center gap-1">
                  ⭐ {cart.rating} ({cart.reviewsCount || 0})
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-on-surface mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {cart.name}
              </h3>

              {cart.specialty && (
                <p className="text-xs font-bold text-primary mb-1">
                  🔥 {cart.specialty}
                </p>
              )}

              <p className="text-xs text-on-surface-variant font-medium flex items-center gap-1 line-clamp-1">
                <MapPin size={12} className="flex-shrink-0" />
                {cart.address || 'Patna, Bihar'}
              </p>

              {/* Google Map indicator */}
              {cart.googleMapUrl ? (
                <a
                  href={cart.googleMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline mt-1"
                >
                  <Navigation size={12} />
                  <span>Google Maps Link Connected</span>
                  <ExternalLink size={10} />
                </a>
              ) : (
                <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400 block mt-1">
                  ⚠️ No Google Map link attached
                </span>
              )}
            </div>
          </div>

          {/* Right: Quick Action Buttons */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-on-surface/10">
            <Link
              href={`/cart/${cart.id}`}
              target="_blank"
              className="p-2.5 bg-surface hover:bg-surface-variant text-on-surface rounded-xl border-2 border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c] transition-transform active:translate-x-0.5 active:translate-y-0.5"
              title="View Live Cart Page"
            >
              <ExternalLink size={18} />
            </Link>

            <button
              onClick={() => onOpenEditModal(cart)}
              className="px-4 py-2 bg-primary hover:bg-amber-400 text-on-primary font-extrabold rounded-xl border-2 border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c] flex items-center gap-1.5 text-xs uppercase tracking-wider transition-transform active:translate-x-0.5 active:translate-y-0.5"
            >
              <Pencil size={14} />
              <span>Edit</span>
            </button>

            <button
              onClick={() => onDeleteCart(cart)}
              className="p-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl border-2 border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c] transition-transform active:translate-x-0.5 active:translate-y-0.5"
              title="Delete Cart"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
