import React, { useRef } from 'react';
import useBeersStore from '../store';
import BeerItem from './BeerItem';

const BeerList: React.FC = () => {
	const { beers, isError } = useBeersStore();
	const listRef = useRef<HTMLUListElement>(null);

	// const handleScroll = (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
	//   const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

	//   if (bottom) {
	//   }
	// };

	return (
		<>
			{isError ? (
				<h2 className='text-red-400 font-bold text-center mt-10'>
					Something went wrong
				</h2>
			) : (
				<ul
					className='flex py-8 flex-col gap-5 items-center overflow-y-scroll max-h-screen'
					ref={listRef}
					// onScroll={e => handleScroll(e)}
				>
					{beers.slice(0, 15).map((beer) => (
						<BeerItem
							beer={beer}
							key={beer.id}
						/>
					))}
				</ul>
			)}
		</>
	);
};

export default BeerList;
