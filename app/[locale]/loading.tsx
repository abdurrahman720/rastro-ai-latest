import { SkeletonCard } from '@/components/global/SkeletonCard';
import { Spinner } from '@/components/ui/spinner';
import React from 'react';

type Props = {};

const loading = (props: Props) => {
  return (
    // <div className='h-[80vh] flex items-center justify-center'>
    //   <Spinner />
    // </div>

    <div className='columns-1 xs:columns-2 md:columns-3 lg:columns-3 2xl:columns-6 3xl:columns-7 gap-4 mt-10 px-5 lg:px-10'>
      {Array.from({ length: 25 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default loading;
