'use client';

import React, { useState } from 'react';
import { Star, Send, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Review } from '../../lib/mockData';

interface CartRatingFormProps {
  cartName: string;
  currentRatingAvg: string | number;
  reviewsCount: number;
  onAddReview: (newReview: Review) => void;
}

export default function CartRatingForm({
  cartName,
  currentRatingAvg,
  reviewsCount,
  onAddReview
}: CartRatingFormProps) {
  const [userRating, setUserRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [userName, setUserName] = useState('');
  const [userComment, setUserComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newReview: Review = {
        id: `review-${Date.now()}`,
        user: userName.trim() || 'Anonymous Explorer',
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${Date.now()}`,
        rating: userRating,
        date: 'Just now',
        comment: userComment.trim(),
      };

      onAddReview(newReview);
      setUserComment('');
      setUserName('');
      setUserRating(5);
      setIsSubmitting(false);
      setShowSuccessToast(true);

      setTimeout(() => setShowSuccessToast(false), 4000);
    }, 400);
  };

  return (
    <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border-4 border-on-surface shadow-[8px_8px_0px_0px_#1a1c1c] flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-on-surface/20 pb-4">
        <div>
          <h2 
            className="text-2xl sm:text-3xl text-on-surface font-extrabold"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ⭐ Rate & Review This Cart
          </h2>
          <p className="text-on-surface-variant text-sm font-medium mt-1">
            Tried {cartName}? Leave your honest review to help fellow food lovers!
          </p>
        </div>

        {/* Current Rating Summary */}
        <div className="flex items-center gap-3 bg-primary-container px-4 py-2 rounded-2xl border-2 border-on-surface shadow-[3px_3px_0px_0px_#1a1c1c]">
          <Star size={24} className="fill-on-primary-container text-on-primary-container" />
          <div>
            <span className="text-2xl font-black text-on-primary-container block leading-none">{currentRatingAvg}</span>
            <span className="text-xs font-bold text-on-primary-container uppercase">{reviewsCount} Reviews</span>
          </div>
        </div>
      </div>

      {/* Success Toast Banner */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-emerald-400 text-on-surface rounded-2xl border-2 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c] flex items-center gap-3 font-bold"
          >
            <CheckCircle2 size={24} />
            <span>Thank you! Your rating and review have been published.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rating Submission Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        
        {/* Star Rating Picker */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-extrabold uppercase text-on-surface tracking-wider">
            Select Rating:
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <button
                key={starIndex}
                type="button"
                onClick={() => setUserRating(starIndex)}
                onMouseEnter={() => setHoverRating(starIndex)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 transition-transform hover:scale-125 focus:outline-none"
              >
                <Star
                  size={32}
                  className={clsx(
                    "transition-colors",
                    (hoverRating || userRating) >= starIndex
                      ? "fill-amber-400 text-amber-500"
                      : "fill-surface-variant text-on-surface-variant/40"
                  )}
                />
              </button>
            ))}
            <span className="ml-3 font-black text-lg text-on-surface">
              {hoverRating || userRating} / 5 Stars
            </span>
          </div>
        </div>

        {/* User Name Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-extrabold uppercase text-on-surface tracking-wider">
            Your Name (Optional)
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="e.g. Rahul Kumar"
            className="w-full bg-surface border-2 border-on-surface rounded-2xl px-4 py-3 font-bold text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Review Comment Textarea */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-extrabold uppercase text-on-surface tracking-wider">
            Your Experience & Review *
          </label>
          <textarea
            rows={3}
            required
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            placeholder="How was the taste, hygiene, portion size, and service?"
            className="w-full bg-surface border-2 border-on-surface rounded-2xl p-4 font-bold text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !userComment.trim()}
          className="self-start bg-primary hover:bg-surface-tint text-on-primary font-black py-3.5 px-8 rounded-2xl border-2 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c] uppercase tracking-wider flex items-center gap-2 disabled:opacity-50 transition-transform active:translate-x-0.5 active:translate-y-0.5"
        >
          <Send size={18} />
          <span>{isSubmitting ? 'Posting...' : 'Submit Review'}</span>
        </button>
      </form>
    </div>
  );
}
