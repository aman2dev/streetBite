'use client';

import React from 'react';
import { CATEGORIES } from '../../lib/mockData';
import { 
  Store, 
  MapPin, 
  Navigation, 
  Clock, 
  Image as ImageIcon, 
  Upload, 
  X, 
  Utensils, 
  Trash2, 
  Check 
} from 'lucide-react';

export interface MenuItemInput {
  name: string;
  price: string;
  isVeg: boolean;
}

interface AdminCartModalProps {
  isOpen: boolean;
  editingCartId: string | null;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  
  // Form values & setters
  formName: string;
  setFormName: (val: string) => void;
  formCategory: string;
  setFormCategory: (val: string) => void;
  formSpecialty: string;
  setFormSpecialty: (val: string) => void;
  formPhone: string;
  setFormPhone: (val: string) => void;
  formIsOpen: boolean;
  setFormIsOpen: (val: boolean) => void;
  
  formAddress: string;
  setFormAddress: (val: string) => void;
  formGoogleMapUrl: string;
  setFormGoogleMapUrl: (val: string) => void;
  formDistance: string;
  setFormDistance: (val: string) => void;
  formActiveWeeks: number;
  setFormActiveWeeks: (val: number) => void;
  
  formTimings: string;
  setFormTimings: (val: string) => void;
  formOperatingDays: string;
  setFormOperatingDays: (val: string) => void;
  
  formImage: string;
  setFormImage: (val: string) => void;
  formImages: string[];
  newGalleryUrl: string;
  setNewGalleryUrl: (val: string) => void;
  onImageFileUpload: (e: React.ChangeEvent<HTMLInputElement>, isGallery?: boolean) => void;
  onAddGalleryUrl: () => void;
  onRemoveGalleryImage: (index: number) => void;
  
  formDescription: string;
  setFormDescription: (val: string) => void;
  
  formMenuItems: MenuItemInput[];
  onAddMenuItem: () => void;
  onRemoveMenuItem: (index: number) => void;
  onMenuItemChange: (index: number, field: keyof MenuItemInput, value: string | boolean) => void;
  onGenerateMapUrl: () => void;
}

export default function AdminCartModal({
  isOpen,
  editingCartId,
  onClose,
  onSubmit,
  formName,
  setFormName,
  formCategory,
  setFormCategory,
  formSpecialty,
  setFormSpecialty,
  formPhone,
  setFormPhone,
  formIsOpen,
  setFormIsOpen,
  formAddress,
  setFormAddress,
  formGoogleMapUrl,
  setFormGoogleMapUrl,
  formDistance,
  setFormDistance,
  formActiveWeeks,
  setFormActiveWeeks,
  formTimings,
  setFormTimings,
  formOperatingDays,
  setFormOperatingDays,
  formImage,
  setFormImage,
  formImages,
  newGalleryUrl,
  setNewGalleryUrl,
  onImageFileUpload,
  onAddGalleryUrl,
  onRemoveGalleryImage,
  formDescription,
  setFormDescription,
  formMenuItems,
  onAddMenuItem,
  onRemoveMenuItem,
  onMenuItemChange,
  onGenerateMapUrl,
}: AdminCartModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-surface-container-lowest w-full max-w-3xl rounded-3xl border-2 border-on-surface shadow-[8px_8px_0px_0px_#1a1c1c] overflow-hidden max-h-[90vh] flex flex-col my-8">
        
        {/* Modal Header */}
        <div className="bg-primary p-6 border-b-2 border-on-surface flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-on-primary opacity-90">
              {editingCartId ? 'Update Existing' : 'Create New'}
            </span>
            <h2 className="text-2xl font-extrabold text-on-primary" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {editingCartId ? 'Edit Cart Information' : 'Add New Street Food Cart'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-surface text-on-surface rounded-full border-2 border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c] hover:bg-surface-variant transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={onSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-on-surface">
          
          {/* Section 1: Basic Information */}
          <div className="bg-surface-container p-5 rounded-2xl border-2 border-on-surface space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-primary flex items-center gap-2">
              <Store size={18} />
              <span>1. Basic Cart Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase mb-1">Cart Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramu's Litti Chokha"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-3 bg-surface rounded-xl border-2 border-on-surface font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase mb-1">Category *</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full p-3 bg-surface rounded-xl border-2 border-on-surface font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                    <option key={cat.id} value={cat.label}>
                      {cat.label}
                    </option>
                  ))}
                  <option value="Beverages">Beverages & Drinks</option>
                  <option value="Fast Food">Fast Food & Snacks</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase mb-1">Specialty Item / Highlight *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pure Desi Ghee Litti Chokha"
                  value={formSpecialty}
                  onChange={(e) => setFormSpecialty(e.target.value)}
                  className="w-full p-3 bg-surface rounded-xl border-2 border-on-surface font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full p-3 bg-surface rounded-xl border-2 border-on-surface font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-extrabold uppercase">Current Status</span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formIsOpen}
                  onChange={(e) => setFormIsOpen(e.target.checked)}
                  className="w-5 h-5 accent-primary cursor-pointer rounded"
                />
                <span className={`text-xs font-extrabold uppercase px-3 py-1 rounded-full border border-on-surface ${
                  formIsOpen ? 'bg-emerald-400 text-slate-900' : 'bg-rose-400 text-slate-900'
                }`}>
                  {formIsOpen ? '🟢 Open Now' : '🔴 Currently Closed'}
                </span>
              </label>
            </div>
          </div>

          {/* Section 2: Google Maps & Location Information */}
          <div className="bg-surface-container p-5 rounded-2xl border-2 border-on-surface space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-primary flex items-center gap-2">
              <MapPin size={18} />
              <span>2. Location & Google Maps Link</span>
            </h3>

            <div>
              <label className="block text-xs font-extrabold uppercase mb-1">Full Cart Address *</label>
              <input
                type="text"
                required
                placeholder="Stall #12, Near Maurya Lok Complex, Dak Bungalow Road, Patna"
                value={formAddress}
                onChange={(e) => setFormAddress(e.target.value)}
                className="w-full p-3 bg-surface rounded-xl border-2 border-on-surface font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-extrabold uppercase">Google Maps Link (URL) *</label>
                <button
                  type="button"
                  onClick={onGenerateMapUrl}
                  className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <Navigation size={12} />
                  <span>Auto-Generate from Address</span>
                </button>
              </div>
              <input
                type="url"
                placeholder="https://maps.google.com/?q=..."
                value={formGoogleMapUrl}
                onChange={(e) => setFormGoogleMapUrl(e.target.value)}
                className="w-full p-3 bg-surface rounded-xl border-2 border-on-surface font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-[11px] text-on-surface-variant font-medium mt-1">
                Enter the Google Maps share link so customers can navigate directly to the cart.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase mb-1">Display Distance</label>
                <input
                  type="text"
                  placeholder="0.3 mi away"
                  value={formDistance}
                  onChange={(e) => setFormDistance(e.target.value)}
                  className="w-full p-3 bg-surface rounded-xl border-2 border-on-surface font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase mb-1">Active Weeks / Experience</label>
                <input
                  type="number"
                  placeholder="52"
                  value={formActiveWeeks}
                  onChange={(e) => setFormActiveWeeks(Number(e.target.value))}
                  className="w-full p-3 bg-surface rounded-xl border-2 border-on-surface font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Operating Schedule */}
          <div className="bg-surface-container p-5 rounded-2xl border-2 border-on-surface space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-primary flex items-center gap-2">
              <Clock size={18} />
              <span>3. Operating Hours & Schedule</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase mb-1">Daily Timings</label>
                <input
                  type="text"
                  placeholder="4:00 PM - 10:30 PM"
                  value={formTimings}
                  onChange={(e) => setFormTimings(e.target.value)}
                  className="w-full p-3 bg-surface rounded-xl border-2 border-on-surface font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase mb-1">Operating Days</label>
                <input
                  type="text"
                  placeholder="Mon - Sat (6 days/week)"
                  value={formOperatingDays}
                  onChange={(e) => setFormOperatingDays(e.target.value)}
                  className="w-full p-3 bg-surface rounded-xl border-2 border-on-surface font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Image & Gallery Uploads */}
          <div className="bg-surface-container p-5 rounded-2xl border-2 border-on-surface space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-primary flex items-center gap-2">
              <ImageIcon size={18} />
              <span>4. Cover Image & Gallery Upload</span>
            </h3>

            {/* Main Cover Image */}
            <div>
              <label className="block text-xs font-extrabold uppercase mb-1">Main Cover Image URL *</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="flex-1 p-3 bg-surface rounded-xl border-2 border-on-surface font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <label className="px-4 py-3 bg-primary hover:bg-amber-400 text-on-primary font-bold rounded-xl border-2 border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c] cursor-pointer flex items-center gap-1.5 text-xs uppercase tracking-wider whitespace-nowrap">
                  <Upload size={16} />
                  <span>Upload File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onImageFileUpload(e, false)}
                    className="hidden"
                  />
                </label>
              </div>
              {formImage && (
                <div className="mt-3 relative w-32 h-24 rounded-xl border-2 border-on-surface overflow-hidden bg-surface-variant">
                  <img src={formImage} alt="Cover Preview" className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 left-1 bg-black/75 text-white text-[9px] font-bold px-1 rounded">
                    Cover Preview
                  </span>
                </div>
              )}
            </div>

            {/* Gallery Images List */}
            <div className="pt-2 border-t border-on-surface/10">
              <label className="block text-xs font-extrabold uppercase mb-1">Additional Gallery Photos</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="url"
                  placeholder="Paste gallery photo URL..."
                  value={newGalleryUrl}
                  onChange={(e) => setNewGalleryUrl(e.target.value)}
                  className="flex-1 p-3 bg-surface rounded-xl border-2 border-on-surface font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={onAddGalleryUrl}
                  className="px-4 py-3 bg-surface-variant hover:bg-surface-tint text-on-surface font-bold rounded-xl border-2 border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c] text-xs uppercase"
                >
                  + Add URL
                </button>
                <label className="px-4 py-3 bg-primary hover:bg-amber-400 text-on-primary font-bold rounded-xl border-2 border-on-surface shadow-[2px_2px_0px_0px_#1a1c1c] cursor-pointer flex items-center gap-1 text-xs uppercase whitespace-nowrap">
                  <Upload size={16} />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onImageFileUpload(e, true)}
                    className="hidden"
                  />
                </label>
              </div>

              {formImages.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {formImages.map((imgUrl, idx) => (
                    <div key={idx} className="relative w-20 h-20 rounded-xl border-2 border-on-surface overflow-hidden bg-surface-variant">
                      <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => onRemoveGalleryImage(idx)}
                        className="absolute top-1 right-1 bg-rose-600 text-white rounded-full p-0.5 border border-white"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Section 5: Description */}
          <div className="bg-surface-container p-5 rounded-2xl border-2 border-on-surface space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-primary">
              5. Cart Story & Description
            </h3>
            <textarea
              rows={3}
              placeholder="Describe the cart history, hygiene standards, specialty ingredients..."
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              className="w-full p-3 bg-surface rounded-xl border-2 border-on-surface font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Section 6: Menu Items Manager */}
          <div className="bg-surface-container p-5 rounded-2xl border-2 border-on-surface space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-primary flex items-center gap-2">
                <Utensils size={18} />
                <span>6. Food Menu Items</span>
              </h3>
              <button
                type="button"
                onClick={onAddMenuItem}
                className="px-3 py-1.5 bg-primary text-on-primary font-bold rounded-lg border border-on-surface text-xs uppercase shadow-[2px_2px_0px_0px_#1a1c1c]"
              >
                + Add Item
              </button>
            </div>

            <div className="space-y-3">
              {formMenuItems.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-center gap-3 bg-surface p-3 rounded-xl border-2 border-on-surface">
                  <input
                    type="text"
                    placeholder="Item Name (e.g. Ghee Litti)"
                    value={item.name}
                    onChange={(e) => onMenuItemChange(index, 'name', e.target.value)}
                    className="flex-1 w-full p-2 bg-surface-container rounded-lg border border-on-surface font-bold text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Price (e.g. ₹60)"
                    value={item.price}
                    onChange={(e) => onMenuItemChange(index, 'price', e.target.value)}
                    className="w-full sm:w-28 p-2 bg-surface-container rounded-lg border border-on-surface font-bold text-xs"
                  />
                  <label className="flex items-center gap-1 cursor-pointer whitespace-nowrap text-xs font-bold">
                    <input
                      type="checkbox"
                      checked={item.isVeg}
                      onChange={(e) => onMenuItemChange(index, 'isVeg', e.target.checked)}
                      className="w-4 h-4 accent-emerald-500 rounded"
                    />
                    <span>Veg 🟢</span>
                  </label>
                  {formMenuItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onRemoveMenuItem(index)}
                      className="p-1.5 bg-rose-500 text-white rounded-lg border border-on-surface"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-on-surface/20">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-surface hover:bg-surface-variant text-on-surface font-extrabold rounded-2xl border-2 border-on-surface uppercase text-xs tracking-wider"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-3 bg-primary hover:bg-amber-400 text-on-primary font-black rounded-2xl border-2 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c] uppercase text-xs tracking-wider flex items-center gap-2 transition-transform active:translate-x-0.5 active:translate-y-0.5"
            >
              <Check size={18} />
              <span>{editingCartId ? 'Save Changes' : 'Create Cart'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
