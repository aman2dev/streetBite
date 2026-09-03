import { createClient } from './client';
import { StreetFoodCart, Review, MOCK_CARTS } from '../mockData';
import { Database } from './types';

type CartRow = Database['public']['Tables']['carts']['Row'];
type ReviewRow = Database['public']['Tables']['reviews']['Row'];
type ProfileRow = Database['public']['Tables']['profiles']['Row'];

const LOCAL_CARTS_KEY = 'streetbite_custom_carts_v2';
const LOCAL_DELETED_KEY = 'streetbite_deleted_carts_v2';

function getStoredCarts(): StreetFoodCart[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_CARTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredCart(cart: StreetFoodCart) {
  if (typeof window === 'undefined') return;
  try {
    const carts = getStoredCarts();
    const existingIndex = carts.findIndex((c) => c.id === cart.id);
    if (existingIndex >= 0) {
      carts[existingIndex] = cart;
    } else {
      carts.unshift(cart);
    }
    localStorage.setItem(LOCAL_CARTS_KEY, JSON.stringify(carts));
  } catch (e) {
    console.error('Failed to save cart to localStorage:', e);
  }
}

function removeStoredCart(id: string) {
  if (typeof window === 'undefined') return;
  try {
    const carts = getStoredCarts().filter((c) => c.id !== id);
    localStorage.setItem(LOCAL_CARTS_KEY, JSON.stringify(carts));
    const deletedRaw = localStorage.getItem(LOCAL_DELETED_KEY);
    const deleted: string[] = deletedRaw ? JSON.parse(deletedRaw) : [];
    if (!deleted.includes(id)) {
      deleted.push(id);
      localStorage.setItem(LOCAL_DELETED_KEY, JSON.stringify(deleted));
    }
  } catch (e) {
    console.error('Failed to remove cart from localStorage:', e);
  }
}

function getDeletedCartIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const deletedRaw = localStorage.getItem(LOCAL_DELETED_KEY);
    return deletedRaw ? JSON.parse(deletedRaw) : [];
  } catch {
    return [];
  }
}

function parseLocationCoordinates(loc: any): { latitude: number; longitude: number } {
  const defaultCoords = { latitude: 25.6112, longitude: 85.1442 };
  if (!loc) return defaultCoords;

  if (typeof loc === 'string') {
    const match = loc.match(/POINT\s*\(\s*([-\d.]+)\s+([-\d.]+)\s*\)/i);
    if (match && match[1] && match[2]) {
      const lng = parseFloat(match[1]);
      const lat = parseFloat(match[2]);
      if (!isNaN(lat) && !isNaN(lng)) {
        return { latitude: lat, longitude: lng };
      }
    }
  } else if (typeof loc === 'object' && loc !== null) {
    if (Array.isArray((loc as any).coordinates) && (loc as any).coordinates.length >= 2) {
      const lng = parseFloat((loc as any).coordinates[0]);
      const lat = parseFloat((loc as any).coordinates[1]);
      if (!isNaN(lat) && !isNaN(lng)) {
        return { latitude: lat, longitude: lng };
      }
    }
  }

  return defaultCoords;
}

/**
 * Maps a Supabase Cart Row (and optionally its reviews/profiles) to the UI's StreetFoodCart interface.
 */
export function mapSupabaseCartToUi(
  cart: CartRow,
  reviews: (ReviewRow & { profiles?: ProfileRow | null })[] = []
): StreetFoodCart {
  const allReviewsMap = new Map<string, Review>();
  const topLevelReviews: Review[] = [];

  reviews.forEach((r) => {
    const revObj: Review = {
      id: r.id,
      user: r.profiles?.username || 'StreetBite Foodie',
      avatar: r.profiles?.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${r.user_id}`,
      rating: r.rating || 5,
      date: new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      comment: r.comment || '',
      parentReviewId: r.parent_review_id || null,
      replies: [],
    };
    allReviewsMap.set(r.id, revObj);
  });

  allReviewsMap.forEach((rev) => {
    if (rev.parentReviewId && allReviewsMap.has(rev.parentReviewId)) {
      const parent = allReviewsMap.get(rev.parentReviewId)!;
      parent.replies = parent.replies || [];
      parent.replies.push(rev);
    } else {
      topLevelReviews.push(rev);
    }
  });

  const totalRating = reviews.reduce((sum, r) => sum + (r.rating || 5), 0);
  const avgRating = reviews.length > 0 ? parseFloat((totalRating / reviews.length).toFixed(1)) : 4.8;
  const { latitude, longitude } = parseLocationCoordinates(cart.location);

  const parsedMenu = Array.isArray(cart.menu)
    ? (cart.menu as unknown as { name: string; price: string; isVeg?: boolean }[])
    : undefined;

  return {
    id: cart.id,
    name: cart.name,
    rating: avgRating,
    distance: '0.3 mi away',
    category: cart.category || 'Chaat',
    image: cart.image_url || 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600',
    images: cart.images && cart.images.length > 0 ? cart.images : cart.image_url ? [cart.image_url] : [],
    specialty: cart.specialty_item,
    isOpen: cart.is_open ?? true,
    timings: cart.timings || '4:00 PM - 10:30 PM',
    operatingDays: cart.operating_days || 'Mon - Sat',
    activeWeeks: cart.active_weeks || 52,
    address: cart.address || 'Main Market Chowk, Patna',
    googleMapUrl: cart.google_map_url || undefined,
    phone: cart.phone || '+91 98765 43210',
    description: cart.description || 'Authentic street food cooked fresh with traditional spices and recipes.',
    reviewsCount: reviews.length,
    reviews: topLevelReviews,
    menu: parsedMenu,
    latitude,
    longitude,
  };
}

/**
 * Fetches all street food carts from Supabase + Local persistence.
 */
export async function fetchStreetFoodCarts(): Promise<StreetFoodCart[]> {
  const localCarts = getStoredCarts();
  const deletedIds = getDeletedCartIds();

  try {
    const supabase = createClient();
    const { data: cartsData, error } = await supabase
      .from('carts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !cartsData || cartsData.length === 0) {
      const mergedBase = MOCK_CARTS.filter((c) => !deletedIds.includes(c.id));
      const combined = [...localCarts];
      mergedBase.forEach((c) => {
        if (!combined.some((item) => item.id === c.id)) {
          combined.push(c);
        }
      });
      return combined;
    }

    const { data: reviewsData } = await supabase
      .from('reviews')
      .select('*, profiles(*)');

    const reviewsByCart: Record<string, any[]> = {};
    (reviewsData || []).forEach((rev) => {
      if (!reviewsByCart[rev.cart_id]) {
        reviewsByCart[rev.cart_id] = [];
      }
      reviewsByCart[rev.cart_id]!.push(rev);
    });

    const supabaseMapped = cartsData
      .filter((c) => !deletedIds.includes(c.id))
      .map((cart) => mapSupabaseCartToUi(cart, reviewsByCart[cart.id] || []));

    const finalCombined = [...localCarts];
    supabaseMapped.forEach((c) => {
      if (!finalCombined.some((item) => item.id === c.id)) {
        finalCombined.push(c);
      }
    });

    return finalCombined;
  } catch (err) {
    console.warn('Supabase fetch failed, using local/mock carts:', err);
    const mergedBase = MOCK_CARTS.filter((c) => !deletedIds.includes(c.id));
    const combined = [...localCarts];
    mergedBase.forEach((c) => {
      if (!combined.some((item) => item.id === c.id)) {
        combined.push(c);
      }
    });
    return combined;
  }
}

/**
 * Fetches a single cart by ID.
 */
export async function fetchCartById(id: string): Promise<StreetFoodCart | undefined> {
  const localCarts = getStoredCarts();
  const localMatch = localCarts.find((c) => c.id === id);
  if (localMatch) return localMatch;

  const deletedIds = getDeletedCartIds();
  if (deletedIds.includes(id)) return undefined;

  try {
    const supabase = createClient();
    const { data: cart, error } = await supabase
      .from('carts')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !cart) {
      return MOCK_CARTS.find((c) => c.id === id);
    }

    const { data: reviews } = await supabase
      .from('reviews')
      .select('*, profiles(*)')
      .eq('cart_id', id)
      .order('created_at', { ascending: false });

    return mapSupabaseCartToUi(cart, (reviews || []) as any);
  } catch {
    return MOCK_CARTS.find((c) => c.id === id);
  }
}

/**
 * Admin Action: Creates a new cart in Supabase and local storage.
 */
export async function createCart(cartData: Omit<StreetFoodCart, 'id' | 'rating' | 'reviewsCount'> & { id?: string }): Promise<StreetFoodCart> {
  const generatedId = cartData.id || `cart-${Date.now()}`;
  const lat = cartData.latitude ?? 25.6112;
  const lng = cartData.longitude ?? 85.1442;

  const newCart: StreetFoodCart = {
    id: generatedId,
    name: cartData.name,
    rating: 5.0,
    reviewsCount: 0,
    distance: cartData.distance || '0.2 mi away',
    category: cartData.category || 'Chaat',
    image: cartData.image || 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600',
    images: cartData.images || (cartData.image ? [cartData.image] : []),
    specialty: cartData.specialty || 'Chef Special',
    isOpen: cartData.isOpen ?? true,
    timings: cartData.timings || '4:00 PM - 10:00 PM',
    operatingDays: cartData.operatingDays || 'Open Daily',
    activeWeeks: cartData.activeWeeks || 52,
    address: cartData.address || 'Patna, Bihar',
    googleMapUrl: cartData.googleMapUrl,
    phone: cartData.phone || '+91 98765 43210',
    description: cartData.description || 'Fresh street food delight.',
    menu: cartData.menu || [],
    reviews: [],
    latitude: lat,
    longitude: lng,
  };

  // 1. Save locally for instant persistence & offline support
  saveStoredCart(newCart);

  // 2. Save to Supabase DB if client is active
  try {
    const supabase = createClient();
    await supabase.from('carts').insert({
      id: newCart.id.startsWith('cart-') ? undefined : newCart.id,
      name: newCart.name,
      specialty_item: newCart.specialty || '',
      image_url: newCart.image,
      location: `POINT(${lng} ${lat})` as any,
      category: newCart.category,
      address: newCart.address,
      google_map_url: newCart.googleMapUrl,
      timings: newCart.timings,
      operating_days: newCart.operatingDays,
      phone: newCart.phone,
      description: newCart.description,
      active_weeks: newCart.activeWeeks,
      is_open: newCart.isOpen,
      images: newCart.images,
      menu: newCart.menu as any,
    });
  } catch (e) {
    console.warn('Supabase create cart attempt failed (operating in fallback local state):', e);
  }

  return newCart;
}

/**
 * Admin Action: Updates an existing cart in Supabase & local storage.
 */
export async function updateCart(id: string, cartData: Partial<StreetFoodCart>): Promise<StreetFoodCart> {
  const existing = (await fetchCartById(id)) || MOCK_CARTS.find((c) => c.id === id) || {
    id,
    name: 'Cart',
    rating: 5.0,
    distance: '0.1 mi',
    category: 'Chaat',
    image: '',
  };

  const updatedCart: StreetFoodCart = {
    ...existing,
    ...cartData,
    id,
  };

  saveStoredCart(updatedCart);

  try {
    const supabase = createClient();
    const updatePayload: any = {
      name: updatedCart.name,
      specialty_item: updatedCart.specialty,
      image_url: updatedCart.image,
      category: updatedCart.category,
      address: updatedCart.address,
      google_map_url: updatedCart.googleMapUrl,
      timings: updatedCart.timings,
      operating_days: updatedCart.operatingDays,
      phone: updatedCart.phone,
      description: updatedCart.description,
      active_weeks: updatedCart.activeWeeks,
      is_open: updatedCart.isOpen,
      images: updatedCart.images,
      menu: updatedCart.menu as any,
    };

    if (updatedCart.longitude !== undefined && updatedCart.latitude !== undefined) {
      updatePayload.location = `POINT(${updatedCart.longitude} ${updatedCart.latitude})`;
    }

    await supabase
      .from('carts')
      .update(updatePayload)
      .eq('id', id);
  } catch (e) {
    console.warn('Supabase update cart attempt failed (operating in fallback local state):', e);
  }

  return updatedCart;
}

/**
 * Admin Action: Deletes a cart from Supabase & local storage.
 */
export async function deleteCart(id: string): Promise<boolean> {
  removeStoredCart(id);

  try {
    const supabase = createClient();
    await supabase.from('carts').delete().eq('id', id);
  } catch (e) {
    console.warn('Supabase delete cart attempt failed (operating in fallback local state):', e);
  }

  return true;
}

export async function insertReview(
  cartId: string,
  rating: number,
  comment: string,
  userId?: string,
  parentReviewId?: string | null
) {
  try {
    const supabase = createClient();
    const targetUserId = userId || (await supabase.auth.getUser()).data.user?.id;

    if (!targetUserId) {
      console.warn('Authenticated user required to post review.');
      return null;
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        cart_id: cartId,
        user_id: targetUserId,
        rating,
        comment,
        parent_review_id: parentReviewId || null,
      })
      .select('*, profiles(*)')
      .single();

    if (error) {
      console.warn('Supabase insert review error (operating in local fallback state):', error);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Failed to insert review to Supabase:', err);
    return null;
  }
}
