'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_CARTS, Review } from '../../../lib/mockData';
import Header from '../../../components/NavBar';
import Footer from '../../../components/Footer';
import BottomNav from '../../../components/BottomNav';
import { 
  CartGallery, 
  CartHeaderInfo, 
  CartMenu, 
  CartRatingForm, 
  CartReviewsList 
} from '../../../components/cartInfo';
import { Heart, ArrowLeft, Share2 } from 'lucide-react';
import { useSavedStore } from '../../../store';
import clsx from 'clsx';

export default function CartDetailPage() {
  const params = useParams();
  const router = useRouter();
  const cartId = params?.id as string;

  const foundCart = MOCK_CARTS.find((c) => c.id === cartId) || MOCK_CARTS[0];

  if (!foundCart) {
    return (
      <div className="w-full pt-32 min-h-screen bg-surface flex items-center justify-center">
        <p className="text-xl font-bold text-on-surface">Cart not found.</p>
      </div>
    );
  }

  const cart = foundCart;
  const { savedCartIds, toggleSaved } = useSavedStore();
  const isSaved = savedCartIds.includes(cart.id);

  // Review & Rating State
  const [reviewsList, setReviewsList] = useState<Review[]>(cart.reviews || []);

  const handleAddReview = (newReview: Review) => {
    setReviewsList((prev) => [newReview, ...prev]);
  };

  // Calculated rating average
  const totalRatingPoints = reviewsList.reduce((acc, curr) => acc + curr.rating, 0);
  const currentRatingAvg = reviewsList.length > 0 
    ? (totalRatingPoints / reviewsList.length).toFixed(1) 
    : cart.rating;

  return (
    <>
      <Header />
      <main className="w-full pt-28 lg:pt-36 min-h-screen bg-surface pb-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col gap-8">
          
          {/* Back Navigation & Action Bar */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border-2 border-on-surface rounded-full font-bold shadow-[4px_4px_0px_0px_#1a1c1c] hover:bg-primary-container transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Back</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: cart.name,
                      text: `Check out ${cart.name} on StreetBite!`,
                      url: window.location.href,
                    }).catch(() => {});
                  }
                }}
                className="p-3 bg-surface-container-lowest border-2 border-on-surface rounded-full font-bold shadow-[4px_4px_0px_0px_#1a1c1c] hover:bg-surface-variant transition-colors"
                title="Share Cart"
              >
                <Share2 size={20} />
              </button>

              <button
                onClick={() => toggleSaved(cart.id)}
                className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border-2 border-on-surface rounded-full font-bold shadow-[4px_4px_0px_0px_#1a1c1c] hover:bg-surface-variant transition-colors"
              >
                <Heart size={20} className={clsx(isSaved && "fill-error text-error")} />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>

          {/* Hero Banner & Gallery + Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <CartGallery cart={cart} currentRatingAvg={currentRatingAvg} />
            <CartHeaderInfo cart={cart} />
          </div>

          {/* Menu Section */}
          <CartMenu menu={cart.menu} />

          {/* Interactive Rating & Review Form */}
          <CartRatingForm
            cartName={cart.name}
            currentRatingAvg={currentRatingAvg}
            reviewsCount={reviewsList.length}
            onAddReview={handleAddReview}
          />

          {/* Community Reviews List */}
          <CartReviewsList reviews={reviewsList} cartName={cart.name} />

        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
