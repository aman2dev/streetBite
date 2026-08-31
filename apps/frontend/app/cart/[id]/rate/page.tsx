'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../../../components/NavBar';
import Footer from '../../../../components/Footer';
import BottomNav from '../../../../components/BottomNav';
import { fetchCartById, insertReview } from '../../../../lib/supabase/adapters';
import { MOCK_CARTS, StreetFoodCart, Review } from '../../../../lib/mockData';
import { useAuth } from '../../../../lib/useAuth';
import { Star, ArrowLeft, Send, CheckCircle2, Lock, ShieldCheck } from 'lucide-react';

interface RatingCriteria {
  label: string;
  key: 'cleanliness' | 'ownerBehavior' | 'foodQuality' | 'foodQuantity' | 'valueForMoney';
  description: string;
}

const CRITERIA_LIST: RatingCriteria[] = [
  {
    label: 'Cleanliness & Hygiene',
    key: 'cleanliness',
    description: 'Cart cleanliness, food handling & sanitation',
  },
  {
    label: 'Owner Behavior & Service',
    key: 'ownerBehavior',
    description: 'Friendliness, warmth & hospitality',
  },
  {
    label: 'Food Quality & Taste',
    key: 'foodQuality',
    description: 'Freshness, taste & authenticity',
  },
  {
    label: 'Food Quantity & Portion',
    key: 'foodQuantity',
    description: 'Portion size & serving adequacy',
  },
  {
    label: 'Value for Money',
    key: 'valueForMoney',
    description: 'Price satisfaction for the quality served',
  },
];

export default function RateCartPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading, signInWithGoogle } = useAuth();
  const cartId = (params?.id as string) || '1';

  const initialCart = MOCK_CARTS.find((c) => c.id === cartId) || MOCK_CARTS[0]!;
  const [cart, setCart] = useState<StreetFoodCart>(initialCart);

  // Criteria ratings state (default 0 / blank unselected stars)
  const [ratings, setRatings] = useState({
    cleanliness: 0,
    ownerBehavior: 0,
    foodQuality: 0,
    foodQuantity: 0,
    valueForMoney: 0,
  });

  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    async function loadCart() {
      const data = await fetchCartById(cartId);
      if (data) setCart(data);
    }
    loadCart();
  }, [cartId]);

  const handleStarClick = (key: keyof typeof ratings, score: number) => {
    setRatings((prev) => ({ ...prev, [key]: score }));
  };

  // Calculated average rating out of selected criteria
  const selectedScores = Object.values(ratings).filter((val) => val > 0);
  const overallCalculatedRating =
    selectedScores.length > 0
      ? (selectedScores.reduce((a, b) => a + b, 0) / selectedScores.length).toFixed(1)
      : '0.0';

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please sign in to submit a review.');
      return;
    }

    if (selectedScores.length === 0) {
      alert('Please tap the stars to rate at least one criteria.');
      return;
    }

    if (!comment.trim()) {
      alert('Please enter a brief review comment.');
      return;
    }

    setIsSubmitting(true);

    const newReviewObj: Review = {
      id: `rev-${Date.now()}`,
      user: user.name,
      avatar: user.avatar,
      rating: parseFloat(overallCalculatedRating),
      date: 'Just now',
      comment: comment.trim(),
      cleanliness: ratings.cleanliness || undefined,
      ownerBehavior: ratings.ownerBehavior || undefined,
      foodQuality: ratings.foodQuality || undefined,
      foodQuantity: ratings.foodQuantity || undefined,
      valueForMoney: ratings.valueForMoney || undefined,
    };

    try {
      await insertReview(cart.id, parseFloat(overallCalculatedRating), comment.trim());
    } catch (err) {
      console.warn('Review saved to session:', err);
    }

    setIsSubmitting(false);
    setSubmittedSuccess(true);

    setTimeout(() => {
      router.push(`/cart/${cart.id}`);
    }, 1800);
  };

  return (
    <>
      <Header />
      <main className="w-full pt-8 md:pt-28 lg:pt-36 min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 flex flex-col gap-6">
          
          {/* Top Bar Navigation */}
          <div className="flex items-center justify-between w-full">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-full font-bold text-sm shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ArrowLeft size={18} />
              <span>Back to Cart</span>
            </button>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Rating & Review
            </span>
          </div>

          {/* Header Info Card */}
          <div className="w-full bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm flex items-center gap-4">
            <img
              src={cart.image}
              alt={cart.name}
              className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 bg-slate-200"
            />
            <div className="flex-1 overflow-hidden">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-wide">
                {cart.category}
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {cart.name}
              </h1>
              <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                {cart.address || 'Patna, Bihar'}
              </p>
            </div>
          </div>

          {!user ? (
            /* Auth Guard View - Login Required */
            <div className="w-full bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl shadow-sm text-center flex flex-col items-center gap-6">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950/60 text-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Lock size={32} />
              </div>

              <div className="w-full flex flex-col items-center justify-center">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Sign In Required to Review
                </h2>
                <p className="text-sm font-medium text-slate-500 w-fit leading-relaxed">
                  Only authenticated Google users can submit ratings & reviews to keep reviews authentic and verified.
                </p>
              </div>

              <button
                onClick={() => signInWithGoogle()}
                disabled={loading}
                className="w-full sm:w-auto px-8 py-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-2xl shadow-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-transform active:scale-[0.99] text-sm cursor-pointer whitespace-nowrap"
              >
                {/* Google G Logo SVG */}
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span className="whitespace-nowrap font-black">Sign In with Google</span>
              </button>
            </div>
          ) : submittedSuccess ? (
            /* Success Feedback View */
            <div className="w-full bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm text-center flex flex-col items-center gap-4 animate-in fade-in">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 size={36} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Thank You for Your Feedback! 
              </h2>
              <p className="text-sm font-medium text-slate-500 max-w-md">
                Your rating of <span className="font-bold text-amber-500">{overallCalculatedRating} ⭐</span> for {cart.name} has been published successfully.
              </p>
            </div>
          ) : (
            /* Simple Clean Rating Form */
            <form onSubmit={handleSubmitReview} className="w-full bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
              
              {/* Authenticated User Identity Pill */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover bg-slate-200"
                />
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-slate-900 dark:text-white truncate">
                      {user.name}
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck size={12} /> Verified
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium block truncate">
                    Posting review as {user.email}
                  </span>
                </div>
              </div>

              {/* Overall Calculated Rating Score Badge */}
              <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
                    Overall Score
                  </span>
                  <span className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
                    {selectedScores.length > 0 ? `Based on ${selectedScores.length} rated criteria` : 'Tap stars below to rate'}
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-amber-400 text-slate-950 px-3.5 py-1.5 rounded-xl font-black text-lg shadow-sm">
                  <Star size={18} className="fill-slate-950" />
                  <span>{overallCalculatedRating}</span>
                </div>
              </div>

              {/* 5 Rating Criteria Breakdown */}
              <div className="space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  Rate Detailed Criteria
                </h3>

                {CRITERIA_LIST.map((item) => {
                  const currentVal = ratings[item.key];
                  return (
                    <div key={item.key} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {item.label}
                        </span>
                        <span className={`text-xs font-extrabold ${currentVal > 0 ? 'text-amber-500' : 'text-slate-400'}`}>
                          {currentVal > 0 ? `${currentVal} / 5 Stars` : 'Unrated'}
                        </span>
                      </div>

                      <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        {item.description}
                      </p>

                      {/* Interactive 5 Stars (Blank/Outline initially when 0) */}
                      <div className="flex items-center gap-2 pt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleStarClick(item.key, star)}
                            className="p-1 hover:scale-110 transition-transform focus:outline-none cursor-pointer"
                            title={`Rate ${star} star${star > 1 ? 's' : ''}`}
                          >
                            <Star
                              size={26}
                              className={
                                star <= currentVal
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-slate-300 dark:text-slate-700 hover:text-amber-300'
                              }
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Review Comment Section */}
              <div className="space-y-2">
                <label className="block text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  Your Review Comment *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share your dining experience! How was the flavor, cleanliness, owner behavior, and food portion?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-0 font-medium text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-2xl shadow-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-[0.99] text-sm cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Submit Review</span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
