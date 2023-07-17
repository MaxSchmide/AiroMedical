import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Beer } from '../models/Beer.model';
import { fetchData, fetchDataById } from '../utils';

interface State {
  beers: Beer[];
  beerToView: Beer | null;
  isLoading: boolean;
  isPending: boolean;
  isError: boolean;
  page: number;
  selectedBeers: number[];
  getInitialBeers: (page?: number) => Promise<void>;
  getBeerById: (id: number) => void;
  toggleSelectBeer: (beerId: number) => void;
  deleteBeerById: () => void;
  getNextPageData: () => Promise<void>;
}

const useBeersStore = create<State, [['zustand/devtools', State]]>(
  devtools((set, get) => ({
    beers: [],
    page: 1,
    isLoading: false,
    isPending: false,
    beerToView: null,
    isError: false,
    selectedBeers: [],

    getInitialBeers: async () => {
      set({ isLoading: true });
      try {
        const response = await fetchData(1);
        set({ beers: response.data });
      } catch (error) {
        set({ isError: true });
        console.log(error);
      } finally {
        set({ isLoading: false });
      }
    },

    getBeerById: (id: number) => {
      set({ isLoading: true });
      fetchDataById(id)
        .then(({ data }) => set({ beerToView: data[0] }))
        .catch(() => set({ isError: true }))
        .finally(() => set({ isLoading: false }));
    },

    toggleSelectBeer: (beerId: number) => {
      const beers = get().selectedBeers;
      if (beers.includes(beerId)) {
        const filtered = beers.filter((id) => id !== beerId);
        set({ selectedBeers: filtered });
      } else {
        set({ selectedBeers: [...beers, beerId] });
      }
    },

    deleteBeerById: () => {
      const beers = get().beers;
      const selected = get().selectedBeers;
      const filtered = beers.filter(({ id }) => !selected.includes(id));
      set({ beers: filtered });
    },

    getNextPageData: async () => {
      set({ isPending: true });
      try {
        const beers = get().beers;

        if (beers.length <= 15) {
          const nextPage = get().page + 1;
          const { data } = await fetchData(nextPage);

          set({
            beers: [...beers, ...data],
            page: nextPage,
          });
        }

        const withoutFirst5 = get().beers.slice(5, get().beers.length);

        set({ beers: withoutFirst5 });
      } catch (e) {
        set({ isError: true });
      } finally {
        set({ isPending: false });
      }
    },
  }))
);

export default useBeersStore;
