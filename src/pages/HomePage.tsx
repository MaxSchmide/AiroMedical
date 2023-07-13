import React, { useEffect, useRef } from 'react';
import BeerList from '../components/BeerList';
import Loader from '../components/Loader';
import useBeersStore from '../store';

const HomePage: React.FC = () => {
  const {
    getInitialBeers: getInitialBeers,
    getNextPageData,
    isLoading,
    isError,
  } = useBeersStore();
  const listRef = useRef<HTMLElement>(null);

  const handleScroll = () => {
    const bottom =
      listRef.current!.scrollHeight - listRef.current!.scrollTop ===
      listRef.current!.clientHeight;
    if (bottom) {
      getNextPageData();
    }
  };

  useEffect(() => {
    getInitialBeers();
  }, []);

  if (isError) {
    return (
      <h2 className='text-red-400 font-bold text-center mt-10'>
        Something went wrong
      </h2>
    );
  }

  return (
    <div className='container mx-auto'>
      <main className='flex items-center justify-center h-screen'>
        {isLoading ? (
          <Loader />
        ) : (
          <section
            ref={listRef}
            onScroll={handleScroll}
            className='w-[26rem] h-[530px] overflow-y-scroll mx-auto scroll-smooth'
          >
            <BeerList />
          </section>
        )}
      </main>
    </div>
  );
};

export default HomePage;
