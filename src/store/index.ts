import axios from 'axios';
import { create } from 'zustand';
import { Beer } from '../models/Beer.model';
import { devtools } from 'zustand/middleware';
import { fetchData } from '../utils';

interface State {
	beers: Beer[];
	beerToView: Beer | null;
	isLoading: boolean;
	isPending: boolean;
	isError: boolean;
	perPage: number;
	page: number;
	selectedBeers: number[];
	getInitialBeers: (page?: number) => Promise<void>;
	getBeerById: (id?: number) => Promise<void>;
	toggleSelectBeer: (beerId: number) => void;
	deleteBeerById: (beerId: number) => void;
	getNextPageData: () => Promise<void>;
}

const useBeersStore = create<State, [['zustand/devtools', State]]>(
	devtools((set, get) => ({
		beers: [],
		perPage: 15,
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
		getBeerById: async (id?: number) => {
			set({ isLoading: true });
			axios
				.get(import.meta.env.VITE_URL + id)
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
		deleteBeerById: (beerId: number) => {
			const beers = get().beers;
			const filtered = beers.filter(({ id }) => id !== beerId);
			set({ beers: filtered });
		},
		getNextPageData: async () => {
			set({ isPending: true });
			try {
				const beers = get().beers;

				if (beers.length === 15) {
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
