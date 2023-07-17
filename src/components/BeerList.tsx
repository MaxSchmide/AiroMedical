import React from 'react';
import useBeersStore from '../store';
import BeerItem from './BeerItem';
import Loader from './Loader';

const ITEMS_PER_PAGE = 15;

const BeerList: React.FC = () => {
  const { beers, isNextPending, isPrevPending } = useBeersStore();

  return (
    <ul className='flex flex-col gap-5 items-center h-full'>
      {isPrevPending && (
        <li className='relative'>
          <Loader />
        </li>
      )}
      {beers.slice(0, ITEMS_PER_PAGE).map((beer) => (
        <BeerItem
          beer={beer}
          key={beer.id}
        />
      ))}
      {isNextPending && (
        <li className='relative'>
          <Loader />
        </li>
      )}
    </ul>
  );
};

export default BeerList;
