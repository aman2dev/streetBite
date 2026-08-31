'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_CARTS, Review, StreetFoodCart } from '../../../lib/mockData';
import { fetchCartById } from '../../../lib/supabase/adapters';
import Header from '../../../components/NavBar';
import Footer from '../../../components/Footer';
import BottomNav from '../../../components/BottomNav';
import { 
  CartGallery, 
  CartHeaderInfo, 
  CartMenu, 
  CartReviewsList
} from '../../../components/cartInfo';
import { Heart, ArrowLeft, Share2, Star } from 'lucide-react';
import { useSavedStore } from '../../../store';
import clsx from 'clsx';

export default function CartDetailPage() {
  const params = useParams();
  const router = useRouter();
  const cartId = (params?.id as string) || '1';

  const initialCart = MOCK_CARTS.find((c) => c.id === cartId) || MOCK_CARTS[0]!;
  const [cart, setCart] = useState<StreetFoodCart>(initialCart);

  const [reviewsList, setReviewsList] = useState<Review[]>(cart.reviews || []);

  useEffect(() => {
    async function loadCartData() {
      const supabaseCart = await fetchCartById(cartId);
      if (supabaseCart) {
        setCart(supabaseCart);
        if (supabaseCart.reviews) {
          setReviewsList(supabaseCart.reviews);
        }
      }
    }
    loadCartData();
  }, [cartId]);

  const { savedCartIds, toggleSaved } = useSavedStore();
  const isSaved = savedCartIds.includes(cart.id);

  // Calculated rating average
  const totalRatingPoints = reviewsList.reduce((acc, curr) => acc + curr.rating, 0);
  const currentRatingAvg = reviewsList.length > 0 
    ? (totalRatingPoints / reviewsList.length).toFixed(1) 
    : cart.rating;

  return (
    <>
      <Header />
      <main className="w-full pt-8 md:pt-28 lg:pt-36 min-h-screen bg-surface pb-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col gap-8">
          
          {/* Top Navigation Bar - Back Button Only */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border-2 border-on-surface rounded-full font-bold shadow-[4px_4px_0px_0px_#1a1c1c] hover:bg-primary-container transition-colors cursor-pointer"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          </div>

          {/* Hero Banner & Gallery + Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <CartGallery cart={cart} currentRatingAvg={currentRatingAvg} />
            <CartHeaderInfo cart={cart} />
          </div>

          {/* Menu Section */}
          <CartMenu menu={cart.menu} />

          {/* Action Bar (Rate Cart, Share & Save Buttons positioned after Menu for mobile view optimization) */}
          <div className="bg-surface-container-lowest p-4 sm:p-6 rounded-3xl border-2 border-on-surface shadow-[6px_6px_0px_0px_#1a1c1c] flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => router.push(`/cart/${cart.id}/rate`)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-on-primary border-2 border-on-surface rounded-2xl font-black shadow-[4px_4px_0px_0px_#1a1c1c] hover:bg-amber-400 transition-transform active:translate-x-0.5 active:translate-y-0.5 uppercase text-xs sm:text-sm tracking-wider cursor-pointer"
            >
              <Star size={18} className="fill-current" />
              <span>Rate Cart</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
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
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3.5 bg-surface-container border-2 border-on-surface rounded-2xl font-bold shadow-[4px_4px_0px_0px_#1a1c1c] hover:bg-surface-variant transition-colors cursor-pointer text-xs sm:text-sm"
                title="Share Cart"
              >
                <Share2 size={18} />
                <span>Share</span>
              </button>

              <button
                onClick={() => toggleSaved(cart.id)}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3.5 bg-surface-container border-2 border-on-surface rounded-2xl font-bold shadow-[4px_4px_0px_0px_#1a1c1c] hover:bg-surface-variant transition-colors cursor-pointer text-xs sm:text-sm"
              >
                <Heart size={18} className={clsx(isSaved && "fill-error text-error")} />
                <span>{isSaved ? 'Saved' : 'Save Cart'}</span>
              </button>
            </div>
          </div>

          {/* Community Reviews List */}
          <CartReviewsList reviews={reviewsList} cartName={cart.name} cartId={cart.id} />

        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
