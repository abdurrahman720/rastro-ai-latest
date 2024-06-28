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

  const { ref, inView } = useInView();

  useEffect(() => {
    setProducts(initialProducts || []);
  }, [initialProducts]);

  const loadMoreProducts = async () => {
    const nextPage = page + 1;

    if (suggestionPage && productId) {
      const res = await axiosInstance.get(
        `/product/${productId}/nearest?page=${page}&page_size=${16}`
      );

      if (res.status === 200) {
        const newProducts = res.data;
        // const newProducts = await getSuggestions(productId, nextPage, 12);
        setProducts((prev: any) => {
          const newProductIds = new Set(newProducts.map((p: any) => p.id));
          const finalProducts =
            nextPage === 1
              ? newProducts
              : [
                  ...prev.filter((p: any) => !newProductIds.has(p.id)),
                  ...newProducts,
                ];
          return finalProducts || [];
        });

        const scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollAmount = scrollableHeight * 0.01;
        window.scrollBy(0, -scrollAmount);
      }
    } else {
      const res = await axiosInstance.get(
        `/products?page=${nextPage}&page_size=${16}`
      );

      if (res.status === 200) {
        const newProducts = res.data;
        // const newProducts = await getProducts(nextPage, 12);
        setProducts((prev: any) => {
          const newProductIds = new Set(newProducts.map((p: any) => p.id));
          const finalProducts =
            nextPage === 1
              ? newProducts
              : [
                  ...prev.filter((p: any) => !newProductIds.has(p.id)),
                  ...newProducts,
                ];
          return finalProducts || [];
        });
        const scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollAmount = scrollableHeight * 0.01;
        window.scrollBy(0, -scrollAmount);
      }
    }

    setPage(nextPage);
  };

  useEffect(() => {
    if (inView) {
      loadMoreProducts();
    }
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
                index === products.length - (suggestionPage ? 1 : 2)
                  ? ref
                  : null
              }
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>

      <div ref={ref} className='invisible'>
        Load more
      </div>
    </div>
  );
};

export default Products;
