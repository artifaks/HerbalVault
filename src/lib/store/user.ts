import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPreferences {
  favoriteHerbs: string[];
  searchHistory: string[];
  theme: 'light' | 'dark';
}

interface UserState {
  preferences: UserPreferences;
  addFavorite: (herbId: string) => void;
  removeFavorite: (herbId: string) => void;
  addSearchTerm: (term: string) => void;
  clearSearchHistory: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      preferences: {
        favoriteHerbs: [],
        searchHistory: [],
        theme: 'light',
      },
      addFavorite: (herbId) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            favoriteHerbs: [...new Set([...state.preferences.favoriteHerbs, herbId])],
          },
        })),
      removeFavorite: (herbId) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            favoriteHerbs: state.preferences.favoriteHerbs.filter((id) => id !== herbId),
          },
        })),
      addSearchTerm: (term) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            searchHistory: [term, ...state.preferences.searchHistory.slice(0, 9)],
          },
        })),
      clearSearchHistory: () =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            searchHistory: [],
          },
        })),
      setTheme: (theme) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            theme,
          },
        })),
    }),
    {
      name: 'user-preferences',
    }
  )
);