import React, { useEffect } from 'react';
import BeerCard from '../components/BeerCard';
import useBeersStore from '../store';
import Loader from '../components/Loader';
import { Link, useParams } from 'react-router-dom';

const BeerPage: React.FC = () => {
	const { isLoading, getBeerById } = useBeersStore();
	const { beerId } = useParams();

	useEffect(() => {
		getBeerById(+beerId!);
	}, []);

	return (
		<div className='container relative my-12 mx-auto md:px-6'>
			<Link
				to='/'
				className='absolute font-bold text-2xl -top-10'
			>
				Back to home
			</Link>
			{isLoading ? <Loader /> : <BeerCard />}
		</div>
	);
};

export default BeerPage;
