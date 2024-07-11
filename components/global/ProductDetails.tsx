'use client';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import ProductCard from './ProductCard';

import Products from './Products';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';
import { useAppContext } from '@/providers/context/context';

const ProductDetails = ({ product, suggestions, productId }: any) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const { user } = useAppContext();
  // const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (user && user.uid) {
      const storedDataString = localStorage.getItem('userProductIds');
      const storedData = storedDataString ? JSON.parse(storedDataString) : {};

      if (!storedData[user.uid]) {
        storedData[user.uid] = [];
      }

      if (!storedData[user.uid].includes(productId)) {
        storedData[user.uid].push(productId);
        localStorage.setItem('userProductIds', JSON.stringify(storedData));
      }
    }
  }, [productId, user]);

  useEffect(() => {
    // const getSuggestions = async () => {
    //   try {
    //     const response = await axiosInstance.post(
    //       `/product/${productId}/nearest?page=${1}&page_size=${10}`
    //     );
    //     setSuggestions(response.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // getSuggestions();

    const query = sessionStorage.getItem('searchQuery');
    if (query) {
      setSearchQuery(query);
    }
  }, [productId]);

  const handleBack = () => {
    if (searchQuery && searchQuery !== 'null') {
      console.log('Navigating to:', `/?search=${searchQuery}`);
      router.push(`/?search=${searchQuery}`);
    } else {
      console.log('Navigating to home');
      router.back();
    }
  };
  return (
    <div className='flex lg:flex-row flex-col gap-4 h-full lg:px-10'>
      <div className='lg:w-[45%] xl:w-[35%] 2xl:w-[30%]  '>
        <div className='flex items-start gap-4 w-full'>
          <div className='w-12 hidden lg:block'>
            <button
              onClick={handleBack}
              className='bg-white w-12 shadow-md h-9 rounded-[8px] p-1 flex justify-center items-center group'
            >
              <ChevronLeft className='h-6 w-6 text-black ' />
            </button>
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
