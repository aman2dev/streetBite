'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '../../components/NavBar';
import Footer from '../../components/Footer';
import BottomNav from '../../components/BottomNav';
import StreetFoodCard from '../../components/StreetFoodCard';
import { MOCK_CARTS, CATEGORIES, StreetFoodCart } from '../../lib/mockData';
import { Search, Filter, ChevronDown, Check, Star, MapPin, X, RotateCcw } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get('q') || '';

  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyOpen, setOnlyOpen] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'rating' | 'distance' | 'name'>('rating');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    if (queryParam) {
      setSearchTerm(queryParam);
    }
  }, [queryParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/search');
    }
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setOnlyOpen(false);
    setMinRating(0);
    setSortBy('rating');
  };

  // Filter & Sort Logic
  const filteredCarts = MOCK_CARTS.filter((cart) => {
    const query = searchTerm.toLowerCase().trim();
    const matchesSearch = !query || 
      cart.name.toLowerCase().includes(query) ||
      cart.category.toLowerCase().includes(query) ||
      (cart.specialty && cart.specialty.toLowerCase().includes(query));

    const matchesCategory = selectedCategory === 'all' || cart.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesOpen = !onlyOpen || cart.isOpen;
    const matchesRating = cart.rating >= minRating;

    return matchesSearch && matchesCategory && matchesOpen && matchesRating;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0; // distance default order
  });

  return (
    <div className="min-h-screen bg-surface flex flex-col pt-6 lg:pt-32 pb-20">
      <div className="hidden lg:block">
        <Header />
      </div>

      <main className="max-w-7xl w-full mx-auto px-4 md:px-8 flex-1 flex flex-col">
        {/* Top Search Bar & Header */}
        <div className="w-full bg-surface-container-lowest border-2 border-on-surface p-4 md:p-6 rounded-2xl shadow-[4px_4px_0px_0px_#1a1c1c] mb-8">
          <form onSubmit={handleSearchSubmit} className="flex gap-3 items-center">
            <div className="flex-1 relative flex items-center bg-surface border-2 border-on-surface rounded-full px-4 py-2">
              <Search className="text-primary mr-3" size={24} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search momos, litti chokha, rolls..."
                className="w-full bg-transparent border-none focus:outline-none text-on-surface font-bold text-lg"
              />
              {searchTerm && (
                <button 
                  type="button" 
                  onClick={() => setSearchTerm('')}
                  className="text-on-surface-variant hover:text-on-surface p-1"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-surface-tint text-on-primary font-bold px-6 py-3 rounded-full border-2 border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c] transition-all hidden sm:block"
            >
              Search
            </button>
          </form>

          {/* Quick Category Chips bar */}
          <div className="flex gap-2 overflow-x-auto pt-4 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={clsx(
                  "px-4 py-1.5 rounded-full font-bold text-sm whitespace-nowrap transition-colors border-2 border-on-surface",
                  selectedCategory === cat.id
                    ? "bg-primary text-on-primary"
                    : "bg-surface text-on-surface hover:bg-surface-variant"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* OLX-Style 2 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 items-start">
          
          {/* Left Sidebar Filter (Desktop) */}
          <aside className="hidden lg:flex flex-col gap-6 bg-surface-container-lowest border-2 border-on-surface p-6 rounded-2xl shadow-[4px_4px_0px_0px_#1a1c1c] sticky top-28">
            <div className="flex items-center justify-between border-b-2 border-on-surface pb-3">
              <h3 className="font-bold text-xl text-on-surface flex items-center gap-2">
                <Filter size={20} className="text-primary" /> Filters
              </h3>
              <button 
                onClick={resetFilters}
                className="text-xs text-primary font-bold flex items-center gap-1 hover:underline"
              >
                <RotateCcw size={14} /> Reset
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="font-bold text-on-surface mb-3 uppercase text-xs tracking-wider text-on-surface-variant">
                Categories
              </h4>
              <div className="flex flex-col gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={clsx(
                      "flex items-center justify-between text-left px-3 py-2 rounded-lg font-bold text-sm transition-colors",
                      selectedCategory === cat.id
                        ? "bg-primary-fixed text-primary"
                        : "text-on-surface hover:bg-surface-variant"
                    )}
                  >
                    <span>{cat.label}</span>
                    {selectedCategory === cat.id && <Check size={16} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div className="border-t-2 border-on-surface pt-4">
              <h4 className="font-bold text-on-surface mb-3 uppercase text-xs tracking-wider text-on-surface-variant">
                Availability
              </h4>
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyOpen}
                  onChange={(e) => setOnlyOpen(e.target.checked)}
                  className="w-5 h-5 accent-primary rounded border-2 border-on-surface"
                />
                <span className="font-bold text-sm text-on-surface">Open Now Only</span>
              </label>
            </div>

            {/* Rating Filter */}
            <div className="border-t-2 border-on-surface pt-4">
              <h4 className="font-bold text-on-surface mb-3 uppercase text-xs tracking-wider text-on-surface-variant">
                Minimum Rating
              </h4>
              <div className="flex flex-col gap-2">
                {[0, 4.0, 4.5].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => setMinRating(stars)}
                    className={clsx(
                      "flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-sm transition-colors border border-transparent",
                      minRating === stars
                        ? "bg-primary-fixed text-primary font-bold"
                        : "text-on-surface hover:bg-surface-variant"
                    )}
                  >
                    <Star size={16} className={stars > 0 ? "fill-primary text-primary" : ""} />
                    <span>{stars === 0 ? 'All Ratings' : `${stars}+ Stars`}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Results Grid */}
          <section className="lg:col-span-3 flex flex-col gap-6">
            
            {/* Header Results Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-lowest border-2 border-on-surface p-4 rounded-xl shadow-[2px_2px_0px_0px_#1a1c1c]">
              <div>
                <h1 className="font-headline-md text-2xl font-bold text-on-surface">
                  {searchTerm ? `Results for "${searchTerm}"` : 'All Food Carts'}
                </h1>
                <span className="text-sm font-bold text-on-surface-variant">
                  {filteredCarts.length} {filteredCarts.length === 1 ? 'cart' : 'carts'} available near you
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 bg-surface text-on-surface font-bold px-4 py-2 rounded-full border-2 border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c] text-sm"
                >
                  <Filter size={16} /> Filters
                </button>

                {/* Sort dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase text-on-surface-variant hidden sm:inline">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-surface border-2 border-on-surface text-on-surface font-bold text-sm rounded-full px-3 py-2 focus:outline-none cursor-pointer"
                  >
                    <option value="rating">Highest Rating</option>
                    <option value="name">Name (A-Z)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            {filteredCarts.length === 0 ? (
              <div className="bg-surface-container-lowest border-2 border-on-surface p-12 rounded-2xl text-center flex flex-col items-center justify-center my-8 shadow-[4px_4px_0px_0px_#1a1c1c]">
                <p className="text-4xl mb-3">🥟</p>
                <h3 className="font-bold text-2xl text-on-surface mb-2">No street food carts found</h3>
                <p className="text-on-surface-variant font-bold mb-6">
                  Try searching for something else like "momo", "chaat", or clear your filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-primary text-on-primary font-bold px-6 py-2.5 rounded-full border-2 border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c]"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredCarts.map((cart) => (
                    <StreetFoodCard key={cart.id} cart={cart} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </section>

        </div>
      </main>

      {/* Mobile Drawer Filter */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end"
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="w-full max-w-xs bg-surface border-l-4 border-on-surface h-full p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between border-b-2 border-on-surface pb-4 mb-6">
                  <h3 className="font-bold text-xl text-on-surface flex items-center gap-2">
                    <Filter size={20} className="text-primary" /> Filters
                  </h3>
                  <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 text-on-surface hover:text-primary"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-bold text-on-surface mb-3 uppercase text-xs tracking-wider">
                    Categories
                  </h4>
                  <div className="flex flex-col gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={clsx(
                          "flex items-center justify-between text-left px-3 py-2 rounded-lg font-bold text-sm",
                          selectedCategory === cat.id
                            ? "bg-primary text-on-primary"
                            : "bg-surface-container text-on-surface"
                        )}
                      >
                        <span>{cat.label}</span>
                        {selectedCategory === cat.id && <Check size={16} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div className="mb-6 border-t-2 border-on-surface pt-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onlyOpen}
                      onChange={(e) => setOnlyOpen(e.target.checked)}
                      className="w-5 h-5 accent-primary"
                    />
                    <span className="font-bold text-sm text-on-surface">Open Now Only</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t-2 border-on-surface">
                <button
                  onClick={resetFilters}
                  className="flex-1 bg-surface-variant text-on-surface font-bold py-3 rounded-full border-2 border-on-surface text-center"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 bg-primary text-on-primary font-bold py-3 rounded-full border-2 border-on-surface text-center"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <BottomNav />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-surface flex items-center justify-center p-8">
        <p className="font-bold text-xl text-primary">Loading Search Results...</p>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
