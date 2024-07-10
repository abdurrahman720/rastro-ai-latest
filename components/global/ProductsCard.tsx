'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import moment from 'moment';
import { Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useAppContext } from '@/providers/context/context';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  product: any;
  lastElRef?: any;
};

const ProductsCard = ({ product, lastElRef }: Props) => {
  const { handleLinkUnlike, likedProductsIds } = useAppContext();
  const [isImageLoading, setImageLoading] = useState(true);
  const closesAt: Date = new Date(product.closes_at);
  const now: Date = new Date();
  const isLessThan24: boolean =
    (closesAt.getTime() - now.getTime()) / (1000 * 60 * 60) < 24;
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const productTitle =
    currentLocale === 'fr' ? product.title_french : product.title;

  const isLiked = likedProductsIds.includes(product?.id);

  const currentPathname = usePathname();
  const isLikedPage = currentPathname.includes('liked-products');

  return (
    <Link href={`/product/${product.id}`} prefetch={true} ref={lastElRef}>
      <div className=' mb-4 break-inside-avoid p-1 rounded-sm group cursor-pointer z-10'>
        <div className='relative'>
          <Image
            src={product.scanned_product.thumbnail_public_url}
            alt={product.title_french}
            width='0'
            height='0'
            quality={100}
            unoptimized
            priority
            onLoad={() => setImageLoading(false)}
            className={`${
              isImageLoading ? 'bg-gray-200 min-h-40' : ''
            } w-full rounded-lg`}
          />

          <div className='absolute bottom-2 right-2'>
            {isLiked ? (
              <Button
                className='bg-[#828282] rounded-full px-1 w-8 h-8'
                onClick={(e: any) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleLinkUnlike(isLiked, product?.id);
                }}
              >
                <Heart fill='#ff3040' className='w-4 h-4 text-[#ff3040]' />
              </Button>
            ) : (
              <Button
                className='bg-[#aeaeae] rounded-full px-1 w-8 h-8'
                onClick={(e: any) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleLinkUnlike(isLiked, product?.id);
                }}
              >
                <Heart className='w-4 h-4' />
              </Button>
            )}
          </div>
          <div className=' absolute top-2 right-2 flex justify-center items-center gap-2 '>
            <p className='bg-white shadow-sm rounded-[8px]  px-[6px] py-[3px] sm:px-2 sm:py-1 font-semibold sm:text-sm'>{`€ ${
              Math.round(product?.estimated_price_min) ===
              Math.round(product?.estimated_price_max)
                ? Math.round(product?.estimated_price_min)
                : `${Math.round(product?.estimated_price_min)} - ${Math.round(
                    product?.estimated_price_max
                  )}`
            }`}</p>
          </div>
        </div>

        <p className='my-2 text-start font-semibold text-sm'>{productTitle}</p>

        {isLikedPage && (
          <span
            style={{
              backgroundColor: isLessThan24 ? '#FFE2E2' : '#F6F6FF',
            }}
            className='text-sm px-3 py-1.5 rounded-[20px]'
          >
            {moment(product?.closes_at).isSame(moment(), 'day')
              ? `Today ${moment(product?.closes_at).format('h:mm A')}`
              : moment(product?.closes_at).format('MMMM D, h:mm A')}
          </span>
        )}
      </div>
    </Link>
  );
};

export default ProductsCard;
