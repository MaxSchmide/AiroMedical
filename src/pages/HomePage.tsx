import React, { useEffect } from 'react';
import BeerList from '../components/BeerList';
import Loader from '../components/Loader';
import useBeersStore from '../store';

const HomePage: React.FC = () => {
	const { getInitialBeers: getInitialBeers, isLoading } = useBeersStore();

	useEffect(() => {
		getInitialBeers();
	}, []);

	return (
		<div className='container mx-auto'>
			<main>{isLoading ? <Loader /> : <BeerList />}</main>
		</div>
	);
};

export default HomePage;
