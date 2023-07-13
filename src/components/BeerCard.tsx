import React from 'react';
import useBeersStore from '../store';
import BeerHeader from './BeerHeader';
import BeerStats from './BeerStats';

const BeerCard: React.FC = () => {
  const { isError, beerToView } = useBeersStore();

  return (
    <section className='mb-32'>
      {isError ? (
        <h2 className='text-red-400 font-bold text-center mt-10'>
          Something went wrong
        </h2>
      ) : (
        <article className='block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'>
          <div className='flex flex-wrap '>
            <div className='justify-center py-8 hidden shrink-0 grow-0 basis-auto lg:flex lg:w-6/12 xl:w-4/12'>
              <img
                src={beerToView?.image_url}
                alt='Trendy Pants and Shoes'
                className='w-fit h-full  rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg'
              />
            </div>
            <div className='w-full shrink-0 grow-0 basis-auto lg:w-6/12 xl:w-8/12'>
              <div className='px-6 py-12 md:px-12'>
                <BeerHeader />
                <BeerStats />
                <p className='mb-6 text-neutral-500 dark:text-neutral-300'>
                  {beerToView?.description}
                </p>
                <p className='mb-6 text-neutral-500 font-bold dark:text-neutral-300'>
                  {beerToView?.brewers_tips}
                </p>
              </div>
            </div>
          </div>
        </article>
      )}
    </section>
  );
};

export default BeerCard;
