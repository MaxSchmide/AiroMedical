import axios from 'axios';
import { create } from 'zustand';
import { Beer } from '../models/Beer.model';
import { devtools } from 'zustand/middleware';

interface State {
	beers: Beer[];
	beerToView: Beer | null;
	isLoading: boolean;
	isError: boolean;
	page: number;
	perPage: number;
	selectedBeers: number[];
	getInitialBeers: (page?: number) => Promise<void>;
	getBeerById: (id?: number) => Promise<void>;
	toggleSelectBeer: (beerId: number) => void;
	deleteBeerById: (beerId: number) => void;
}

const URL = 'https://api.punkapi.com/v2/beers/';

const useBeersStore = create<State, [['zustand/devtools', State]]>(
	devtools((set, get) => ({
		beers: [],
		page: 1,
		perPage: 15,
		isLoading: false,
		beerToView: null,
		isError: false,
		selectedBeers: [],

		getInitialBeers: async () => {
			set({ isLoading: true });
			try {
				const response = await axios.get(URL, {
					params: {
						page: 1,
						per_page: get().perPage,
					},
				});
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
				.get(URL + id)
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
	}))
);

export default useBeersStore;
