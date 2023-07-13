import React from 'react';
import useBeersStore from '../store';

const BeerHeader: React.FC = () => {
	const { beerToView: beer } = useBeersStore();
	return (
		<>
			<h1 className='mb-4 text-5xl font-bold'>{beer?.name}</h1>
			<div className='flex mb-12 justify-between'>
				<p className=' font-bold uppercase text-red-600 dark:text-danger-500'>
					{beer?.tagline}
				</p>
				<p className='font-bold '>Brewed at {beer?.first_brewed}</p>
			</div>
		</>
	);
};

export default BeerHeader;
