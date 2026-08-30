-- Antigravity StreetBite - Supabase Migration: Add Extended Cart Columns for Admin Dashboard
ALTER TABLE public.carts 
  ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Chaat',
  ADD COLUMN IF NOT EXISTS address TEXT,
  ADD COLUMN IF NOT EXISTS google_map_url TEXT,
  ADD COLUMN IF NOT EXISTS timings TEXT,
  ADD COLUMN IF NOT EXISTS operating_days TEXT,
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS active_weeks INTEGER DEFAULT 52,
  ADD COLUMN IF NOT EXISTS is_open BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS menu JSONB DEFAULT '[]'::jsonb;
