# Project Specification: Street Food Discovery App (Frontend MVP)

## 1. Project Overview
A hyper-local, mobile-first web application for discovering, rating, and locating street food carts. The UI is designed to be vibrant, highly accessible, and patterned after modern delivery apps (e.g., BigBasket, Swiggy) with a strong emphasis on visual discovery and location-based filtering.

## 2. Tech Stack Constraints
- **Framework:** Next.js (App Router)
- **Language:** TypeScript (Strict mode enabled)
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/UI (accessible, headless base)
- **Icons:** use 
- **State Management:** Zustand
- **Animations:** Framer Motion (page transitions, micro-interactions)

## 3. Core UI Layout & Architecture
The application follows a mobile-first, single-page-like scrolling layout.

### A. Top Header
- **Location Selector (Left):** Map pin icon with bold text for the current location (Default MVP setting: "Patna, Bihar") and a dropdown chevron.
- **Profile (Right):** User avatar or hamburger menu for authentication/settings.

### B. Sticky Search Bar
- Full-width search input positioned below the header.
- Sticky positioning on scroll.
- Placeholder: "Search for Litti Chokha, Momos, or Carts..."
- Includes a magnifying glass icon (left) and a filter icon (right).

### C. Category Chips (Horizontal Scroll)
- A horizontally scrollable row of rounded chips using Framer Motion for drag/swipe physics.
- **Categories:** "All" (default active), "Chaat", "Rolls", "Momos", "Sweets", "South Indian".
- Active state should use the primary brand color (warm, appetizing orange/red).

### D. Main Feed ("Trending Near You")
- Section title indicating local relevance.
- **Layout:** 2-column CSS Grid.
- **StreetFoodCard Component:**
  - High-res image covering the top 60% of the card.
  - Floating star rating badge (e.g., "⭐ 4.8") overlaid on the top-right of the image.
  - Bold Cart Name (e.g., "Sharma Ji Chaat").
  - Subtext for specialty item.
  - Distance indicator (e.g., "📍 1.2 km away").

### E. Bottom Navigation Bar
- Fixed at the bottom of the viewport.
- **Items:** Home (Active), Map View, Saved Carts (Heart), Profile.

## 4. State Management (Zustand Stores)
Create atomic stores to manage client-side state without prop drilling:
- `useLocationStore`: Manages the user's current selected area and coordinates.
- `useFilterStore`: Manages the active category chip and the current search input text.
- `useSavedStore`: Manages an array of saved/favorited cart IDs.

## 5. Mock Data Strategy
For the frontend MVP, create a `lib/mockData.ts` file containing an array of 15-20 highly detailed mock street food carts. Seed this data focusing on real-world equivalents to test layout breaking points (long names, missing images, etc.).

## 6. Implementation Phases (For Agent Execution)
1. **Phase 1:** Initialize Next.js, configure Tailwind,
2. **Phase 2:** Build the atomic UI components (Header, SearchBar, CategoryChip, BottomNav).
3. **Phase 3:** Build the complex `StreetFoodCard` component and the grid layout.
4. **Phase 4:** Wire up Zustand stores to make the category chips filter the mock data grid.