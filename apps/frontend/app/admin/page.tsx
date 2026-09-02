'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/NavBar';
import Footer from '../../components/Footer';
import BottomNav from '../../components/BottomNav';
import { StreetFoodCart } from '../../lib/mockData';
import { fetchStreetFoodCarts, createCart, updateCart, deleteCart } from '../../lib/supabase/adapters';
import { CheckCircle } from 'lucide-react';

import {
  AdminHeader,
  AdminStats,
  AdminFilters,
  AdminCartList,
  AdminCartModal,
  MenuItemInput,
} from '../../components/adminPanel';

export default function AdminDashboardPage() {
  const [carts, setCarts] = useState<StreetFoodCart[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCartId, setEditingCartId] = useState<string | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('Chaat');
  const [formSpecialty, setFormSpecialty] = useState('');
  const [formPhone, setFormPhone] = useState('+91 ');
  const [formIsOpen, setFormIsOpen] = useState(true);

  const [formAddress, setFormAddress] = useState('');
  const [formGoogleMapUrl, setFormGoogleMapUrl] = useState('');
  const [formDistance, setFormDistance] = useState('0.3 mi away');
  const [formLatitude, setFormLatitude] = useState<number>(25.6112);
  const [formLongitude, setFormLongitude] = useState<number>(85.1442);

  const [formTimings, setFormTimings] = useState('4:00 PM - 10:30 PM');
  const [formOperatingDays, setFormOperatingDays] = useState('Mon - Sat (6 days/week)');
  const [formActiveWeeks, setFormActiveWeeks] = useState(52);

  const [formImage, setFormImage] = useState('');
  const [formImages, setFormImages] = useState<string[]>([]);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  const [formDescription, setFormDescription] = useState('');
  const [formMenuItems, setFormMenuItems] = useState<MenuItemInput[]>([
    { name: '', price: '₹', isVeg: true },
  ]);

  // Load carts data
  const loadCartsData = async () => {
    setLoading(true);
    const data = await fetchStreetFoodCarts();
    setCarts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCartsData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Open modal for new cart
  const handleOpenAddModal = () => {
    setEditingCartId(null);
    setFormName('');
    setFormCategory('Chaat');
    setFormSpecialty('');
    setFormPhone('+91 98765 43210');
    setFormIsOpen(true);
    setFormAddress('Dak Bungalow Road, Patna, Bihar');
    setFormGoogleMapUrl('');
    setFormDistance('0.3 mi away');
    setFormLatitude(25.6112);
    setFormLongitude(85.1442);
    setFormTimings('4:00 PM - 10:30 PM');
    setFormOperatingDays('Mon - Sat (6 days/week)');
    setFormActiveWeeks(52);
    setFormImage('https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600');
    setFormImages([]);
    setFormDescription('Serving hot & authentic street food prepared fresh daily!');
    setFormMenuItems([
      { name: 'Special Item 1', price: '₹60', isVeg: true },
      { name: 'Special Item 2', price: '₹80', isVeg: true },
    ]);
    setIsModalOpen(true);
  };

  // Open modal for editing cart
  const handleOpenEditModal = (cart: StreetFoodCart) => {
    setEditingCartId(cart.id);
    setFormName(cart.name);
    setFormCategory(cart.category || 'Chaat');
    setFormSpecialty(cart.specialty || '');
    setFormPhone(cart.phone!);
    setFormIsOpen(cart.isOpen !== false);
    setFormAddress(cart.address || '');
    setFormGoogleMapUrl(cart.googleMapUrl || '');
    setFormDistance(cart.distance || '0.3 mi away');
    setFormLatitude((cart as any).latitude || 25.6112);
    setFormLongitude((cart as any).longitude || 85.1442);
    setFormTimings(cart.timings || '4:00 PM - 10:30 PM');
    setFormOperatingDays(cart.operatingDays || 'Mon - Sat');
    setFormActiveWeeks(cart.activeWeeks || 52);
    setFormImage(cart.image || '');
    setFormImages(cart.images || []);
    setFormDescription(cart.description || '');
    setFormMenuItems(
      cart.menu && cart.menu.length > 0
        ? cart.menu.map((m) => ({ name: m.name, price: m.price, isVeg: m.isVeg !== false }))
        : [{ name: '', price: '₹', isVeg: true }]
    );
    setIsModalOpen(true);
  };

  // Handle Main Cover & Gallery Image File Upload
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isGallery = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Url = uploadEvent.target?.result as string;
      if (isGallery) {
        setFormImages((prev) => [...prev, base64Url]);
      } else {
        setFormImage(base64Url);
      }
    };
    reader.readAsDataURL(file);
  };

  // Add URL to gallery
  const handleAddGalleryUrl = () => {
    if (!newGalleryUrl.trim()) return;
    setFormImages((prev) => [...prev, newGalleryUrl.trim()]);
    setNewGalleryUrl('');
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Menu Items operations
  const handleAddMenuItem = () => {
    setFormMenuItems((prev) => [...prev, { name: '', price: '₹', isVeg: true }]);
  };

  const handleRemoveMenuItem = (index: number) => {
    setFormMenuItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMenuItemChange = (index: number, field: keyof MenuItemInput, value: string | boolean) => {
    setFormMenuItems((prev) => {
      const updated = [...prev];
      const item = updated[index];
      if (item) {
        updated[index] = { ...item, [field]: value };
      }
      return updated;
    });
  };

  // Form Submission
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      alert('Please enter a valid Cart Name');
      return;
    }

    const cleanedMenu = formMenuItems
      .filter((m) => m.name.trim() !== '')
      .map((m) => ({ name: m.name.trim(), price: m.price.trim() || '₹50', isVeg: m.isVeg }));

    const cartDataPayload = {
      name: formName.trim(),
      category: formCategory,
      specialty: formSpecialty.trim() || 'Special Menu Item',
      phone: formPhone.trim(),
      isOpen: formIsOpen,
      address: formAddress.trim() || 'Patna, Bihar',
      googleMapUrl: formGoogleMapUrl.trim() || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formName + ' ' + formAddress)}`,
      distance: formDistance,
      latitude: formLatitude,
      longitude: formLongitude,
      timings: formTimings,
      operatingDays: formOperatingDays,
      activeWeeks: formActiveWeeks,
      image: formImage || 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600',
      images: formImages.length > 0 ? formImages : [formImage || 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600'],
      description: formDescription.trim(),
      menu: cleanedMenu,
    };

    if (editingCartId) {
      await updateCart(editingCartId, cartDataPayload);
      showToast(`Cart "${formName}" updated successfully! 🎉`);
    } else {
      await createCart(cartDataPayload);
      showToast(`New cart "${formName}" added successfully! 🚀`);
    }

    setIsModalOpen(false);
    loadCartsData();
  };

  // Delete Cart Action
  const handleDeleteCart = async (cart: StreetFoodCart) => {
    if (confirm(`Are you sure you want to delete "${cart.name}"? This action cannot be undone.`)) {
      await deleteCart(cart.id);
      showToast(`Cart "${cart.name}" has been deleted.`);
      loadCartsData();
    }
  };

  // Toggle Cart Open/Closed Status directly from list
  const handleToggleStatus = async (cart: StreetFoodCart) => {
    const updatedStatus = !(cart.isOpen !== false);
    await updateCart(cart.id, { isOpen: updatedStatus });
    showToast(`Status for "${cart.name}" changed to ${updatedStatus ? 'OPEN' : 'CLOSED'}`);
    loadCartsData();
  };

  // Auto-generate Google Maps query link if empty
  const handleGenerateMapUrl = () => {
    if (!formName && !formAddress) return;
    const query = `${formName} ${formAddress}`.trim();
    setFormGoogleMapUrl(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`);
  };

  // Filtered Carts
  const filteredCarts = carts.filter((cart) => {
    const matchesCategory = selectedCategory === 'all' || cart.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      cart.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cart.specialty && cart.specialty.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (cart.address && cart.address.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const activeCartsCount = carts.filter((c) => c.isOpen !== false).length;
  const avgRatingOverall = carts.length > 0
    ? (carts.reduce((acc, curr) => acc + curr.rating, 0) / carts.length).toFixed(1)
    : '4.8';

  return (
    <>
      <Header />
      <main className="w-full pt-28 lg:pt-36 min-h-screen bg-surface pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col gap-8">
          
          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed top-24 right-4 z-50 bg-emerald-400 text-slate-900 border-2 border-on-surface p-4 rounded-2xl shadow-[4px_4px_0px_0px_#1a1c1c] font-bold flex items-center gap-3 animate-bounce">
              <CheckCircle size={24} />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Header Banner Component */}
          <AdminHeader onOpenAddModal={handleOpenAddModal} />

          {/* Key Stats Bar Component */}
          <AdminStats
            totalCarts={carts.length}
            activeCartsCount={activeCartsCount}
            avgRatingOverall={avgRatingOverall}
          />

          {/* Search & Category Filter Controls Component */}
          <AdminFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            totalCartsCount={carts.length}
          />

          {/* Carts List Table / Cards Component */}
          <AdminCartList
            carts={filteredCarts}
            loading={loading}
            onOpenEditModal={handleOpenEditModal}
            onDeleteCart={handleDeleteCart}
            onToggleStatus={handleToggleStatus}
            onOpenAddModal={handleOpenAddModal}
          />

        </div>
      </main>

      {/* Add / Edit Cart Interactive Modal Component */}
      <AdminCartModal
        isOpen={isModalOpen}
        editingCartId={editingCartId}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitForm}
        formName={formName}
        setFormName={setFormName}
        formCategory={formCategory}
        setFormCategory={setFormCategory}
        formSpecialty={formSpecialty}
        setFormSpecialty={setFormSpecialty}
        formPhone={formPhone}
        setFormPhone={setFormPhone}
        formIsOpen={formIsOpen}
        setFormIsOpen={setFormIsOpen}
        formAddress={formAddress}
        setFormAddress={setFormAddress}
        formGoogleMapUrl={formGoogleMapUrl}
        setFormGoogleMapUrl={setFormGoogleMapUrl}
        formDistance={formDistance}
        setFormDistance={setFormDistance}
        formLatitude={formLatitude}
        setFormLatitude={setFormLatitude}
        formLongitude={formLongitude}
        setFormLongitude={setFormLongitude}
        formActiveWeeks={formActiveWeeks}
        setFormActiveWeeks={setFormActiveWeeks}
        formTimings={formTimings}
        setFormTimings={setFormTimings}
        formOperatingDays={formOperatingDays}
        setFormOperatingDays={setFormOperatingDays}
        formImage={formImage}
        setFormImage={setFormImage}
        formImages={formImages}
        newGalleryUrl={newGalleryUrl}
        setNewGalleryUrl={setNewGalleryUrl}
        onImageFileUpload={handleImageFileUpload}
        onAddGalleryUrl={handleAddGalleryUrl}
        onRemoveGalleryImage={handleRemoveGalleryImage}
        formDescription={formDescription}
        setFormDescription={setFormDescription}
        formMenuItems={formMenuItems}
        onAddMenuItem={handleAddMenuItem}
        onRemoveMenuItem={handleRemoveMenuItem}
        onMenuItemChange={handleMenuItemChange}
        onGenerateMapUrl={handleGenerateMapUrl}
      />

      <Footer />
      <BottomNav />
    </>
  );
}
