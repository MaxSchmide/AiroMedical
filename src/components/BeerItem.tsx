import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Beer } from '../models/Beer.model';
import useBeersStore from '../store';

type Props = {
  beer: Beer;
};

const BeerItem: React.FC<Props> = ({ beer }) => {
  const { toggleSelectBeer, selectedBeers } = useBeersStore();

  const handleSelectBeer = (
    event: React.MouseEvent<HTMLElement>,
    beerId: number
  ) => {
    event.preventDefault();
    toggleSelectBeer(beerId);
  };

  return (
    <li
      className={classNames('list__item', {
        '!bg-amber-300': selectedBeers.includes(beer.id),
      })}
      onContextMenu={(e) => handleSelectBeer(e, beer.id)}
    >
      <Link to={`/beer/${beer.id}`}>
        <h5 className='mb-2 line-clamp-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {beer.name}
        </h5>
      </Link>
    </li>
  );
};

export default BeerItem;
