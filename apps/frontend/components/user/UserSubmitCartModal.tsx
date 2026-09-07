'use client';

import React, { useState } from 'react';
import { CATEGORIES } from '../../lib/mockData';
import { useAuth } from '../../lib/useAuth';
import { createCart } from '../../lib/supabase/adapters';
import { 
  Store, 
  MapPin, 
  Navigation, 
  Clock, 
  Image as ImageIcon, 
  X, 
  Utensils, 
  Check, 
  LocateFixed, 
  Compass, 
  Maximize2,
  Sparkles,
  Phone,
  Tag
} from 'lucide-react';

interface UserSubmitCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function UserSubmitCartModal({ isOpen, onClose, onSuccess }: UserSubmitCartModalProps) {
  const { user, signInWithGoogle } = useAuth();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Chaat');
  const [specialty, setSpecialty] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [timings, setTimings] = useState('4:00 PM - 10:00 PM');
  const [description, setDescription] = useState('');
  
  // GPS Location state
  const [latitude, setLatitude] = useState(25.6112);
  const [longitude, setLongitude] = useState(85.1442);
  const [isFetchingGps, setIsFetchingGps] = useState(false);
  const [gpsSuccessMessage, setGpsSuccessMessage] = useState('');

  // Form submission status state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  // Handle GPS detection
  const handleFetchGps = () => {
    setIsFetchingGps(true);
    setGpsSuccessMessage('');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = parseFloat(position.coords.latitude.toFixed(5));
          const lng = parseFloat(position.coords.longitude.toFixed(5));
          setLatitude(lat);
          setLongitude(lng);
          setIsFetchingGps(false);
          setGpsSuccessMessage(`GPS Captured: ${lat}, ${lng}`);
          setTimeout(() => setGpsSuccessMessage(''), 4000);
        },
        () => {
          setIsFetchingGps(false);
          alert('Could not retrieve location. Please grant location permissions or manually enter coordinates.');
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setIsFetchingGps(false);
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (!user) {
      signInWithGoogle(true);
      return;
    }

    setIsSubmitting(true);
    try {
      await createCart({
        name: name.trim(),
        category,
        specialty: specialty.trim() || 'Special Street Food',
        image: imageUrl.trim() || 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600',
        images: imageUrl.trim() ? [imageUrl.trim()] : ['https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600'],
        address: address.trim() || 'Patna, Bihar',
        phone: phone.trim() || '+91 98765 43210',
        timings: timings.trim() || '4:00 PM - 10:00 PM',
        description: description.trim() || 'Authentic local street food vendor.',
        latitude,
        longitude,
        status: 'pending',
        submittedBy: user.name,
      });

      setIsSubmitting(false);
      setIsSubmittedSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Failed to submit cart:', err);
      setIsSubmitting(false);
      alert('Something went wrong submitting your cart. Please try again.');
    }
  };

  const handleResetAndClose = () => {
    setIsSubmittedSuccess(false);
    setName('');
    setSpecialty('');
    setPhone('');
    setAddress('');
    setImageUrl('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-on-surface/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in">
      <div className="bg-surface border-4 border-on-surface rounded-3xl shadow-[10px_10px_0px_0px_#1a1c1c] w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-primary border-b-4 border-on-surface flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-surface text-on-surface rounded-2xl border-2 border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c] flex items-center justify-center font-black">
              <Store size={22} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-on-primary tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Submit a Street Cart
              </h2>
              <p className="text-xs font-bold text-on-primary/80">Help street food lovers discover hidden gems in Patna!</p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-9 h-9 bg-surface text-on-surface rounded-xl border-2 border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c] flex items-center justify-center hover:bg-error hover:text-on-error transition-colors cursor-pointer"
          >
            <X size={20} className="stroke-[3]" />
          </button>
        </div>

        {/* Content */}
        {isSubmittedSuccess ? (
          /* Success Screen */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center gap-6 overflow-y-auto">
            <div className="w-20 h-20 bg-emerald-400 text-on-surface rounded-3xl border-4 border-on-surface shadow-[6px_6px_0px_0px_#1a1c1c] flex items-center justify-center animate-bounce">
              <Sparkles size={40} className="stroke-[2.5]" />
            </div>

            <div className="space-y-3 max-w-md">
              <span className="px-3 py-1 bg-amber-400 text-on-surface border-2 border-on-surface rounded-full text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#1a1c1c]">
                Status: Under Review ⏳
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-on-surface" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Cart Submitted Successfully!
              </h3>
              <p className="text-sm font-bold text-on-surface-variant leading-relaxed">
                Thank you for contributing to StreetBite! Your cart submission has been sent to our admins for verification. Once approved, it will be published live for everyone to discover!
              </p>
            </div>

            <button
              onClick={handleResetAndClose}
              className="px-8 py-3.5 bg-primary text-on-primary border-3 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c] rounded-2xl font-black uppercase tracking-wider text-sm hover:bg-amber-400 transition-transform active:translate-y-0.5 cursor-pointer"
            >
              Got It, Thank You!
            </button>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
            
            {!user && (
              <div className="p-4 bg-amber-100 border-2 border-on-surface rounded-2xl shadow-[3px_3px_0px_0px_#1a1c1c] flex items-center justify-between gap-4">
                <p className="text-xs font-extrabold text-amber-950">
                  🔒 You must be signed in with Google to submit a cart for review.
                </p>
                <button
                  type="button"
                  onClick={() => signInWithGoogle(true)}
                  className="px-3 py-1.5 bg-amber-400 text-slate-900 border-2 border-on-surface rounded-xl font-black text-xs uppercase shadow-[2px_2px_0px_0px_#1a1c1c] cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            )}

            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-on-surface flex items-center gap-1.5">
                  <Store size={14} className="text-primary" /> Cart/Stall Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramu's Special Litti Chokha"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-lowest border-2 border-on-surface rounded-2xl font-bold text-sm shadow-[3px_3px_0px_0px_#1a1c1c] focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-on-surface flex items-center gap-1.5">
                  <Tag size={14} className="text-primary" /> Food Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-lowest border-2 border-on-surface rounded-2xl font-bold text-sm shadow-[3px_3px_0px_0px_#1a1c1c] focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                    <option key={cat.id} value={cat.label}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Specialty & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-on-surface flex items-center gap-1.5">
                  <Utensils size={14} className="text-primary" /> Signature Specialty
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pure Desi Ghee Litti & Spicy Chokha"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-lowest border-2 border-on-surface rounded-2xl font-bold text-sm shadow-[3px_3px_0px_0px_#1a1c1c] focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-on-surface flex items-center gap-1.5">
                  <Phone size={14} className="text-primary" /> Contact Phone Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. +91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-lowest border-2 border-on-surface rounded-2xl font-bold text-sm shadow-[3px_3px_0px_0px_#1a1c1c] focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Address & Image URL */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-on-surface flex items-center gap-1.5">
                  <MapPin size={14} className="text-primary" /> Full Location Address
                </label>
                <input
                  type="text"
                  placeholder="e.g. Stall #12, Near Maurya Lok Complex, Dak Bungalow Road, Patna"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-lowest border-2 border-on-surface rounded-2xl font-bold text-sm shadow-[3px_3px_0px_0px_#1a1c1c] focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-on-surface flex items-center gap-1.5">
                  <ImageIcon size={14} className="text-primary" /> Stall Photo URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or image link"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-lowest border-2 border-on-surface rounded-2xl font-bold text-sm shadow-[3px_3px_0px_0px_#1a1c1c] focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* GPS Location Pinning */}
            <div className="bg-surface-container p-4 rounded-2xl border-2 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Navigation size={18} className="text-primary" />
                  <span className="text-xs font-black uppercase tracking-wider text-on-surface">
                    Exact Map Location (GPS Pin)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleFetchGps}
                  disabled={isFetchingGps}
                  className="px-3 py-1.5 bg-primary text-on-primary border-2 border-on-surface rounded-xl font-bold text-xs shadow-[2px_2px_0px_0px_#1a1c1c] flex items-center gap-1 hover:bg-amber-400 transition-colors cursor-pointer"
                >
                  <LocateFixed size={14} />
                  <span>{isFetchingGps ? 'Locating...' : 'Use My GPS'}</span>
                </button>
              </div>

              {gpsSuccessMessage && (
                <div className="p-2 bg-emerald-100 text-emerald-900 border border-emerald-500 rounded-xl text-xs font-extrabold flex items-center gap-1.5">
                  <Check size={14} /> {gpsSuccessMessage}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={latitude}
                    onChange={(e) => setLatitude(parseFloat(e.target.value) || 25.6112)}
                    className="w-full px-3 py-2 bg-surface-container-lowest border border-on-surface rounded-xl font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={longitude}
                    onChange={(e) => setLongitude(parseFloat(e.target.value) || 85.1442)}
                    className="w-full px-3 py-2 bg-surface-container-lowest border border-on-surface rounded-xl font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 border-t-2 border-on-surface/10 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-5 py-3 bg-surface-container border-2 border-on-surface rounded-2xl font-bold text-xs uppercase shadow-[2px_2px_0px_0px_#1a1c1c] hover:bg-surface-variant cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !user}
                className="px-6 py-3 bg-primary text-on-primary border-3 border-on-surface rounded-2xl font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_0px_#1a1c1c] hover:bg-amber-400 transition-transform active:translate-y-0.5 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Cart for Verification 🚀'}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
