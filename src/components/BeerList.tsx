import React from 'react';
import useBeersStore from '../store';
import BeerItem from './BeerItem';
import Loader from './Loader';

const BeerList: React.FC = () => {
	const { beers, isPending, perPage } = useBeersStore();

	return (
		<ul className='flex flex-col gap-5 items-center h-full'>
			{beers.slice(0, perPage).map((beer) => (
				<BeerItem
					beer={beer}
					key={beer.id}
				/>
			))}
			{isPending && (
				<li className='relative'>
					<Loader />
				</li>
			)}
		</ul>
	);
};

export default BeerList;
