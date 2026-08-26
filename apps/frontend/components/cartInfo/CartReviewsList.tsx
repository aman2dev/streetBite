'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../../lib/mockData';

interface CartReviewsListProps {
  reviews: Review[];
  cartName: string;
}

export default function CartReviewsList({ reviews, cartName }: CartReviewsListProps) {
  return (
    <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border-4 border-on-surface shadow-[8px_8px_0px_0px_#1a1c1c] flex flex-col gap-6">
      <h2 
        className="text-2xl sm:text-3xl text-on-surface font-extrabold"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        💬 Community Reviews ({reviews.length})
      </h2>

      {reviews.length === 0 ? (
        <div className="p-8 text-center bg-surface rounded-2xl border-2 border-on-surface">
          <p className="text-on-surface-variant font-bold text-lg">
            No reviews yet! Be the first to rate {cartName}.
          </p>
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
                <div className="flex items-center gap-1 bg-amber-400 text-on-surface px-3 py-1 rounded-full border border-on-surface font-black text-sm">
                  <Star size={14} className="fill-on-surface" />
                  <span>{rev.rating}.0</span>
                </div>
              </div>

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
