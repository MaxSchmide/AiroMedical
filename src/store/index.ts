import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Beer } from '../models/Beer.model';
import { fetchData, fetchDataById } from '../utils';

interface State {
  beers: Beer[];
  beerToView: Beer | null;
  isLoading: boolean;
  isNextPending: boolean;
  isPrevPending: boolean;
  isError: boolean;
  page: number;
  selectedBeers: number[];
  prevBeersIds: number[];
  getInitialBeers: (page?: number) => Promise<void>;
  getBeerById: (beerId: number) => void;
  toggleSelectBeer: (beerId: number) => void;
  deleteBeerById: () => void;
  getNextPageData: () => Promise<void>;
  getPrevPageData: () => Promise<void>;
}

const useBeersStore = create<State, [['zustand/devtools', State]]>(
  devtools((set, get) => ({
    beers: [],
    page: 1,
    isLoading: false,
    isNextPending: false,
    isPrevPending: false,
    beerToView: null,
    isError: false,
    selectedBeers: [],
    prevBeersIds: [],

    getInitialBeers: async () => {
      set({ isLoading: true, isError: false });
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

    getBeerById: (beerId: number) => {
      set({ isLoading: true });
      const beers = get().beers;

      const findedBeer = beers.find(({ id }) => id === beerId) || null;

      if (findedBeer === null) {
        set({ isError: true, isLoading: false });
        return;
      }
      set({ beerToView: findedBeer, isLoading: false });
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
      set({ isNextPending: true });
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

        const first5Ids = get()
          .beers.slice(0, 5)
          .map(({ id }) => id);

        const withoutFirst5 = get().beers.slice(5, get().beers.length);

        set({
          beers: withoutFirst5,
          prevBeersIds: [...get().prevBeersIds, ...first5Ids],
        });
      } catch (e) {
        set({ isError: true });
      } finally {
        set({ isNextPending: false });
      }
    },

    getPrevPageData: async () => {
      set({ isPrevPending: true });
      const removed = get().prevBeersIds;

      if (!removed.length) {
        return;
      }

      try {
        const beersToFetch = removed.splice(-5);
        const beersPromises = beersToFetch.map((id) => fetchDataById(id));

        const prevBeers = await Promise.all(beersPromises);

        set({
          beers: [...prevBeers, ...get().beers],
          prevBeersIds: removed,
        });
      } catch (error) {
        set({ isError: true });
      } finally {
        set({ isPrevPending: false });
      }
    },
  }))
);

export default useBeersStore;
