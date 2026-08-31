'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../../lib/mockData';
import { useRouter } from 'next/navigation';

interface CartReviewsListProps {
  reviews: Review[];
  cartName: string;
  cartId?: string;
}

export default function CartReviewsList({ reviews, cartName, cartId }: CartReviewsListProps) {
  const router = useRouter();

  return (
    <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border-2 border-on-surface shadow-[6px_6px_0px_0px_#1a1c1c] flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 
            className="text-2xl sm:text-3xl text-on-surface font-extrabold"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Community Reviews ({reviews.length})
          </h2>
          <p className="text-xs text-on-surface-variant font-medium mt-0.5">
            Real ratings from verified street food lovers
          </p>
        </div>

        {cartId && (
          <button
            onClick={() => router.push(`/cart/${cartId}/rate`)}
            className="bg-primary hover:bg-amber-400 text-on-primary font-black py-2.5 px-5 rounded-2xl border-2 border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c] uppercase text-xs tracking-wider flex items-center justify-center gap-2 transition-transform active:translate-x-0.5 active:translate-y-0.5 self-start sm:self-auto cursor-pointer"
          >
            <Star size={16} className="fill-current" />
            <span>Write a Review</span>
          </button>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="p-8 text-center bg-surface rounded-2xl border-2 border-on-surface flex flex-col items-center gap-3">
          <p className="text-on-surface-variant font-bold text-base">
            No reviews yet! Be the first to rate {cartName}.
          </p>
          {cartId && (
            <button
              onClick={() => router.push(`/cart/${cartId}/rate`)}
              className="bg-primary text-on-primary px-5 py-2 rounded-xl font-extrabold border-2 border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c] text-xs uppercase"
            >
              Rate {cartName} Now
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 bg-surface rounded-2xl border-2 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c] flex flex-col gap-3"
            >
              {/* Review Header */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.user}
                    className="w-10 h-10 rounded-full border-2 border-on-surface bg-surface-variant object-cover"
                  />
                  <div>
                    <h4 className="font-extrabold text-on-surface text-base leading-tight">
                      {rev.user}
                    </h4>
                    <span className="text-xs font-bold text-on-surface-variant">
                      {rev.date}
                    </span>
                  </div>
                </div>

                {/* Star Badge */}
                <div className="flex items-center gap-1 bg-amber-400 text-slate-950 px-3 py-1 rounded-full border border-on-surface font-black text-sm">
                  <Star size={14} className="fill-slate-950" />
                  <span>{rev.rating}</span>
                </div>
              </div>

              {/* Review Criteria Chips (Clean typography without extra icons) */}
              {(rev.cleanliness || rev.foodQuality || rev.ownerBehavior || rev.foodQuantity || rev.valueForMoney) && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {rev.cleanliness && (
                    <span className="px-2.5 py-0.5 bg-surface-container rounded-lg text-[11px] font-bold text-on-surface-variant border border-on-surface/20">
                      Hygiene: {rev.cleanliness}/5
                    </span>
                  )}
                  {rev.ownerBehavior && (
                    <span className="px-2.5 py-0.5 bg-surface-container rounded-lg text-[11px] font-bold text-on-surface-variant border border-on-surface/20">
                      Service: {rev.ownerBehavior}/5
                    </span>
                  )}
                  {rev.foodQuality && (
                    <span className="px-2.5 py-0.5 bg-surface-container rounded-lg text-[11px] font-bold text-on-surface-variant border border-on-surface/20">
                      Quality: {rev.foodQuality}/5
                    </span>
                  )}
                  {rev.foodQuantity && (
                    <span className="px-2.5 py-0.5 bg-surface-container rounded-lg text-[11px] font-bold text-on-surface-variant border border-on-surface/20">
                      Quantity: {rev.foodQuantity}/5
                    </span>
                  )}
                  {rev.valueForMoney && (
                    <span className="px-2.5 py-0.5 bg-surface-container rounded-lg text-[11px] font-bold text-on-surface-variant border border-on-surface/20">
                      Value: {rev.valueForMoney}/5
                    </span>
                  )}
                </div>
              )}

              {/* Review Comment Text */}
              <p className="text-on-surface font-medium text-base pl-1 border-l-4 border-primary">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
