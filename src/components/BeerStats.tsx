import useBeersStore from '../store';

const BeerStats = () => {
	const { beerToView: beer } = useBeersStore();
	return (
		<section className='mb-12 text-center'>
			<div className='grid gap-x-6 md:grid-cols-3 lg:gap-x-12'>
				<div className='mb-12 md:mb-0'>
					<h2 className='display-5 mb-4 text-4xl font-bold text-primary dark:text-primary-400'>
						{beer?.abv}
					</h2>
					<h5 className='mb-4 text-lg font-medium'>ABV</h5>
				</div>

				<div className='mb-12 md:mb-0'>
					<h2 className='display-5 mb-4 text-4xl font-bold text-primary dark:text-primary-400'>
						{beer?.ebc}
					</h2>
					<h5 className='mb-4 text-lg font-medium'>EBC</h5>
				</div>

				<div className='mb-12 md:mb-0'>
					<h2 className='display-5 mb-4 text-4xl font-bold text-primary dark:text-primary-400'>
						{beer?.ibu}
					</h2>
					<h5 className='mb-4 text-lg font-medium'>IBU</h5>
				</div>

				<div className='mb-12 md:mb-0'>
					<h2 className='display-5 mb-4 text-4xl font-bold text-primary dark:text-primary-400'>
						{beer?.srm}
					</h2>
					<h5 className='mb-4 text-lg font-medium'>SRM</h5>
				</div>

				<div className='mb-12 md:mb-0'>
					<h2 className='display-5 mb-4 text-4xl font-bold text-primary dark:text-primary-400'>
						{beer?.ph}
					</h2>
					<h5 className='mb-4 text-lg font-medium'>PH</h5>
				</div>
			</div>
		</section>
	);
};

export default BeerStats;
