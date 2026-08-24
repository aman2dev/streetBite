import { create } from 'zustand';

interface LocationState {
  location: string;
  setLocation: (location: string) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  location: 'Patna, Bihar',
  setLocation: (location) => set({ location }),
}));

interface FilterState {
  activeCategory: string;
  searchQuery: string;
  setActiveCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  activeCategory: 'all',
  searchQuery: '',
  setActiveCategory: (category) => set({ activeCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

interface SavedState {
  savedCartIds: string[];
  toggleSaved: (id: string) => void;
}

export const useSavedStore = create<SavedState>((set) => ({
  savedCartIds: [],
  toggleSaved: (id) =>
    set((state) => ({
      savedCartIds: state.savedCartIds.includes(id)
        ? state.savedCartIds.filter((cartId) => cartId !== id)
        : [...state.savedCartIds, id],
    })),
}));
