import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import ProductCard from './ProductCard';

import Products from './Products';

const ProductDetails = ({ product, suggestions, productId }: any) => {
  return (
    <div className='flex lg:flex-row flex-col gap-4 h-full lg:px-10'>
      <div className='lg:w-[45%] xl:w-[35%] 2xl:w-[30%]  '>
        <div className='flex items-start gap-4 w-full'>
          <div className='w-12 hidden lg:block'>
            <Link
              href={'/'}
              className='bg-white w-12 shadow-md h-9 rounded-[8px] p-1 flex justify-center items-center group'
            >
              <ChevronLeft className='h-6 w-6 text-black ' />
            </Link>
          </div>
          <ProductCard product={product} />
        </div>
      </div>
      <div className='lg:w-[55%] xl:w-[65%] 2xl:w-[70%] px-5 lg:px-0'>
        <Products
          initialProducts={suggestions}
          suggestionPage={true}
          productId={productId}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
