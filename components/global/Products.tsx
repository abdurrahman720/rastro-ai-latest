/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppContext } from '@/providers/context/context';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import ProductsCard from './ProductsCard';
import axiosInstance from '@/utils/axiosInstance';

type Props = {
  initialProducts: any;
  productId?: string;
  suggestionPage?: boolean;
};

const Products = ({ initialProducts, productId, suggestionPage }: Props) => {
  const { setProducts, products } = useAppContext();

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView();

  useEffect(() => {
    window.scrollTo(0, 0);
    setProducts(initialProducts || []);
  }, []);

  const loadMoreProducts = async () => {
    const nextPage = page + 1;
    setLoading(true);

    let url =
      suggestionPage && productId
        ? `/product/${productId}/nearest?page=${page}&page_size=${40}`
        : `/products?page=${nextPage}&page_size=${16}`;

    try {
      const res = await axiosInstance.get(url);

      if (res.status === 200) {
        const newProducts = res.data;

        setProducts((prev: any) => {
          const previds = new Set(prev.map((p: any) => p.id));
          const finalProducts =
            nextPage === 1
              ? newProducts
              : [
                  ...prev,
                  ...newProducts.filter((p: any) => !previds.has(p.id)),
                ];
          return finalProducts || [];
        });

        const scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollAmount = scrollableHeight * 0.01;
        window.scrollBy(0, -scrollAmount);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }

    setPage(nextPage);
  };

  useEffect(() => {
    const loadProducts = async () => {
      if (inView) {
        await loadMoreProducts();
      }
    };
    loadProducts();
  }, [inView, page]);

  const breakPoints = {
    360: 2,
    640: 3,
    1024: 4,
    1400: 6,
    1650: 7,
    1850: 8,
  };
  const breakPointSuggestion = {
    360: 2,
    640: 3,
    1024: 2,
    1200: 3,
    1400: 4,
    1850: 5,
  };

  return (
    <div>
      <ResponsiveMasonry
        columnsCountBreakPoints={
          suggestionPage ? breakPointSuggestion : breakPoints
        }
      >
        <Masonry gutter='10px'>
          {products?.map((item: any, index: number) => (
            <ProductsCard
              key={item.id}
              product={item}
              lastElRef={
                index === products.length - (suggestionPage ? 4 : 1)
                  ? ref
                  : null
              }
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>

      {loading && <div className='text-center'>Loading...</div>}
    </div>
  );
};

export default Products;
