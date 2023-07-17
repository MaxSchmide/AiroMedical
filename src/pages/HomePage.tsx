import React, { useEffect, useRef } from 'react';
import BeerList from '../components/BeerList';
import Loader from '../components/Loader';
import useBeersStore from '../store';

const HomePage: React.FC = () => {
  const {
    getInitialBeers,
    getNextPageData,
    getPrevPageData,
    isLoading,
    isError,
  } = useBeersStore();
  const listRef = useRef<HTMLElement>(null);

  const handleScroll = () => {
    const bottom =
      listRef.current!.scrollHeight - listRef.current!.scrollTop ===
      listRef.current!.clientHeight;
    const top = listRef.current!.scrollTop === 0;

    if (top) {
      getPrevPageData();
      listRef.current!.scrollTop = 1;
    }

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
            className='w-[26rem] h-[33.125rem] overflow-y-scroll mx-auto'
          >
            <BeerList />
          </section>
        )}
      </main>
    </div>
  );
};

export default HomePage;
