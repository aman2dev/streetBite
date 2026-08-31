-- Antigravity StreetBite - Supabase Initial Schema & Migration Script
-- Enable PostGIS for location-based queries and UUID extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. PROFILES (Tied to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. CARTS
CREATE TABLE IF NOT EXISTS public.carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  specialty_item TEXT NOT NULL,
  image_url TEXT,
  -- PostGIS Geography point (Longitude, Latitude)
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. REVIEWS (With threaded replies)
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id UUID REFERENCES public.carts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  parent_review_id UUID REFERENCES public.reviews(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. MESSAGES (For Realtime Chat)
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id UUID REFERENCES public.carts(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- INDEXES FOR SPATIAL AND FOREIGN KEY LOOKUPS
CREATE INDEX IF NOT EXISTS carts_location_idx ON public.carts USING GIST (location);
CREATE INDEX IF NOT EXISTS reviews_cart_id_idx ON public.reviews (cart_id);
CREATE INDEX IF NOT EXISTS reviews_parent_review_id_idx ON public.reviews (parent_review_id);
CREATE INDEX IF NOT EXISTS messages_cart_id_idx ON public.messages (cart_id);

-- AUTOMATIC PROFILE CREATION TRIGGER ON AUTH SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ENABLE REALTIME FOR CHAT MESSAGES
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- PROFILES RLS
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile."
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- CARTS RLS
CREATE POLICY "Carts are viewable by everyone."
  ON public.carts FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create carts."
  ON public.carts FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Cart owners can update their carts."
  ON public.carts FOR UPDATE
  USING (auth.uid() = owner_id);

-- REVIEWS RLS
CREATE POLICY "Reviews are viewable by everyone."
  ON public.reviews FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create reviews."
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews."
  ON public.reviews FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews."
  ON public.reviews FOR DELETE
  USING (auth.uid() = user_id);

-- MESSAGES RLS
CREATE POLICY "Messages are viewable by everyone."
  ON public.messages FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create messages."
  ON public.messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update their own messages."
  ON public.messages FOR UPDATE
  USING (auth.uid() = sender_id);

CREATE POLICY "Users can delete their own messages."
  ON public.messages FOR DELETE
  USING (auth.uid() = sender_id);
