'use client';

import ProductsCard from '@/components/global/ProductsCard';
import Title from '@/components/global/Title';
import { useAppContext } from '@/providers/context/context';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

export default function LikedProductsPage() {
  const { likedProducts } = useAppContext();

  const breakPoints = {
    360: 2,
    640: 3,
    1024: 4,
    1400: 6,
    1650: 7,
    1850: 8,
  };

  return (
    <div className='px-5 md:px-10 '>
      <div className='pb-6'>
        <Title
          title={
            likedProducts?.length > 0
              ? 'Liked products'
              : 'You don’t have any liked products'
          }
        />
      </div>
      <ResponsiveMasonry columnsCountBreakPoints={breakPoints}>
        <Masonry gutter='10px'>
          {likedProducts?.map((item: any, index: number) => (
            <ProductsCard key={item.id} product={item} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}
