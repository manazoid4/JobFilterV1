import { create } from "zustand";

export type DealFeedFilters = {
  category: string | null;
  minScore: number | null;
  region: string | null;
  minPriceCents: number | null;
  maxPriceCents: number | null;
};

type FiltersState = DealFeedFilters & {
  setFilter: <K extends keyof DealFeedFilters>(key: K, value: DealFeedFilters[K]) => void;
  reset: () => void;
};

const DEFAULT_FILTERS: DealFeedFilters = {
  category: null,
  minScore: null,
  region: null,
  minPriceCents: null,
  maxPriceCents: null,
};

export const useFiltersStore = create<FiltersState>((set) => ({
  ...DEFAULT_FILTERS,
  setFilter: (key, value) => set({ [key]: value } as Partial<FiltersState>),
  reset: () => set(DEFAULT_FILTERS),
}));
