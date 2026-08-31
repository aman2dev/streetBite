# Antigravity Mission Control: Backend Integration

## 1. Project Context
- **Current State:** The Next.js (App Router) frontend UI is already built. 
- **Goal:** Integrate a Supabase backend (PostgreSQL, Auth, Storage, Realtime) into the existing UI without breaking existing React components or Tailwind layouts.
- **Tech Stack:** Next.js App Router, `@supabase/ssr`, TypeScript, Zustand.

---

## 2. Agent Roles & Workflow Boundaries

### 🤖 Agent 1: The Database Architect
**Scope:** Supabase SQL Setup, PostGIS, and Schema Generation.
**Task List:**
1. Generate raw SQL migration scripts for the schema (Carts, Profiles, Reviews, Messages).
2. Write SQL to enable the `postgis` extension for location-based queries.
3. Configure Row Level Security (RLS) policies:
   - `carts`: Public Read, Authenticated Insert.
   - `reviews` & `messages`: Public Read, Authenticated Insert/Update (only if `auth.uid() = user_id`).
4. Generate the TypeScript types file (`src/lib/supabase/types.ts`) mapping perfectly to the SQL schema.

### 🤖 Agent 2: The Integration Engineer
**Scope:** Wiring up Supabase to the *existing* frontend codebase.
**Task List:**
1. Install `@supabase/supabase-js` and `@supabase/ssr`.
2. Create the Supabase client utilities in `src/utils/supabase/`:
   - `client.ts` (for browser-side Zustand stores and hooks).
   - `server.ts` (for Next.js Server Components and Server Actions).
3. Locate the existing frontend mock data (e.g., `mockData.ts` or static states) and strictly replace it with Supabase data fetching logic, ensuring the existing `StreetFoodCard` component props are mapped correctly to the new `Database` types.
4. Implement the chat listener using Supabase Realtime (`.channel('public:messages')`) inside the existing chat component.

---

## 3. The PostgreSQL Schema Contract

The backend MUST implement the following schema to support the frontend features:

```sql
-- Enable PostGIS for distance calculations
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. PROFILES (Tied to Supabase Auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CARTS
CREATE TABLE carts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  specialty_item TEXT NOT NULL,
  image_url TEXT,
  -- PostGIS Geography point (Longitude, Latitude)
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  owner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. REVIEWS (With threaded replies)
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_id UUID REFERENCES carts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  parent_review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. MESSAGES (For Realtime Chat)
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_id UUID REFERENCES carts(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Realtime for the chat
ALTER PUBLICATION supabase_realtime ADD TABLE messages;