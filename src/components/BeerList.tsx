import React from 'react';
import useBeersStore from '../store';
import BeerItem from './BeerItem';
import Loader from './Loader';

const ITEMS_PER_PAGE = 15;

const BeerList: React.FC = () => {
  const { beers, isPending } = useBeersStore();

  return (
    <ul className='flex flex-col gap-5 items-center h-full'>
      {beers.slice(0, ITEMS_PER_PAGE).map((beer) => (
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
