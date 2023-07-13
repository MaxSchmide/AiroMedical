import React from 'react';
import { Beer } from '../models/Beer.model';
import { Link } from 'react-router-dom';
import useBeersStore from '../store';
import classNames from 'classnames';

type Props = {
	beer: Beer;
};

const BeerItem: React.FC<Props> = ({ beer }) => {
	const { toggleSelectBeer, selectedBeers, deleteBeerById } = useBeersStore();
	const handleSelectBeer = (
		event: React.MouseEvent<HTMLElement>,
		beerId: number
	) => {
		event.preventDefault();
		toggleSelectBeer(beerId);
	};

	return (
		<li
			className={classNames('card', {
				'!bg-amber-300': selectedBeers.includes(beer.id),
			})}
			onContextMenu={(e) => handleSelectBeer(e, beer.id)}
		>
			<Link to={`/beer/${beer.id}`}>
				<h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
					{beer.name}
				</h5>
			</Link>
			<button
				type='button'
				className={classNames('card__delete', {
					'!inline-flex': selectedBeers.includes(beer.id),
				})}
				data-dismiss-target='#toast-default'
				aria-label='Close'
				onClick={() => deleteBeerById(beer.id)}
			>
				<span className='sr-only'>Close</span>
				<svg
					className='w-3 h-3'
					aria-hidden='true'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 14 14'
				>
					<path
						stroke='currentColor'
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
					/>
				</svg>
			</button>
		</li>
	);
};

export default BeerItem;
