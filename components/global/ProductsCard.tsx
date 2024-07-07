'use client';
import Image from 'next/image';
import React, { useCallback, useRef, useState } from 'react';
import { Button } from '../ui/button';

import { Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useAppContext } from '@/providers/context/context';
import Link from 'next/link';
import api from '@/utils/axiosInstance';

type Props = {
  product: any;
  lastElRef: any;
};

const ProductsCard = ({ product, lastElRef }: Props) => {
  const { likedProducts, setRefetchProducts, refetchProducts } =
    useAppContext();
  const [isImageLoading, setImageLoading] = useState(true);
  const closesAt: Date = new Date(product.closes_at);
  const now: Date = new Date();
  const isLessThan24: boolean =
    (closesAt.getTime() - now.getTime()) / (1000 * 60 * 60) < 24;
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const productTitle =
    currentLocale === 'fr' ? product.title_french : product.title;

  const likedProductsIds = likedProducts.map((prod: any) => prod.id);
  const isLiked = likedProductsIds.includes(product?.id);

  const handleLinkUnlike = async () => {
    if (isLiked) {
      try {
        const response = await api.post('/user/unlike-product/', {
          productId: product?.id,
        });
        console.log(response.data);

        setRefetchProducts(!refetchProducts);
      } catch (error) {
        console.error('Error calling unlike API:', error);
      }
    } else {
      try {
        const response = await api.post('/user/like-product/', {
          productId: product?.id,
        });
        console.log(response.data);

        setRefetchProducts(!refetchProducts);
      } catch (error) {
        console.error('Error calling like API:', error);
      }
    }
  };

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
                className='bg-[#aeaeae] rounded-full p-2.5'
                onClick={(e: any) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleLinkUnlike();
                }}
              >
                <Heart fill='white' className='w-5 h-5' />
              </Button>
            ) : (
              <Button
                className='bg-[#aeaeae] rounded-full p-2.5'
                onClick={(e: any) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleLinkUnlike();
                }}
              >
                <Heart className='w-5 h-5' />
              </Button>
            )}
            {/* <Button
              onClick={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(product.url, "_blank");
              }}
              ref={externalLinkButtonRef}
              size={"sm"}
              variant={"outline"}
              className="gap-1 sm:px-[12px] py-0 sm:py-2 px-[8px] text-[10px] sm:text-[14px] font-medium sm:h-[40px] h-[32px]"
            >
                {
                  (() => {
                    switch (product?.platform) {
                      case 'interencheres':
                        return 'Interencheres';
                      case 'drouot':
                        return 'Drouot';
                      case 'auctionet':
                        return 'Auctionet';
                      case 'saleroom':
                        return 'Saleroom';
                      case 'lottissimmo':
                        return 'Lottissimmo';
                      default:
                        return 'Drouot'; 
                    }
                  })()
                }
              <ExternalLinkIcon size={15} />
            </Button>
            <Button
              onClick={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
                handleSaveClick();
              }}
              ref={saveButtonRef}
              // className={`bg-rastro-primary py-0 sm:py-2 px-[6px] sm:px-[12px] text-[10px] sm:text-[14px] font-medium sm:h-[40px] h-[32px]`}
              className={clsx(
                "bg-rastro-primary py-0 sm:py-2 px-[6px] sm:px-[12px] text-[10px] sm:text-[14px] font-medium sm:h-[40px] h-[32px]",
                { "bg-black/60": clicked }
              )}
            >
              {clicked ? `${t("product:saved")}` : `${t("product:save")}`}
            </Button> */}
          </div>
          <div className=' absolute top-2 right-2 flex justify-center items-center gap-2 '>
            {isLessThan24 && (
              <div className=' '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                >
                  <path
                    d='M10 0.25C4.61547 0.25 0.25 4.61547 0.25 10C0.25 15.3845 4.61547 19.75 10 19.75C15.3845 19.75 19.75 15.3845 19.75 10C19.75 4.61547 15.3845 0.25 10 0.25ZM14.5 11.5H10C9.80109 11.5 9.61032 11.421 9.46967 11.2803C9.32902 11.1397 9.25 10.9489 9.25 10.75V4C9.25 3.80109 9.32902 3.61032 9.46967 3.46967C9.61032 3.32902 9.80109 3.25 10 3.25C10.1989 3.25 10.3897 3.32902 10.5303 3.46967C10.671 3.61032 10.75 3.80109 10.75 4V10H14.5C14.6989 10 14.8897 10.079 15.0303 10.2197C15.171 10.3603 15.25 10.5511 15.25 10.75C15.25 10.9489 15.171 11.1397 15.0303 11.2803C14.8897 11.421 14.6989 11.5 14.5 11.5Z'
                    fill='#ED0000'
                  />
                </svg>
              </div>
            )}
            <p className='bg-white shadow-sm rounded-[8px]  px-[6px] py-[3px] sm:px-2 sm:py-1 font-semibold sm:text-sm'>{`€ ${Math.round(
              product.estimated_price_min
            )} - ${Math.round(product.estimated_price_max)}`}</p>
          </div>
        </div>

        <p className='mt-2 text-start font-semibold text-sm '>{productTitle}</p>
      </div>
    </Link>
  );
};

export default ProductsCard;
