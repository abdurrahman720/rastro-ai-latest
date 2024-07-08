'use client';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import {
  Check,
  ChevronLeft,
  Copy,
  ExternalLinkIcon,
  Heart,
} from 'lucide-react';

import { useEffect, useState } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { useTranslation } from 'react-i18next';

import { toast } from 'sonner';
import { useAppContext } from '@/providers/context/context';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import moment from 'moment';

const ProductCard = ({ product }: any) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  useEffect(() => {
    const query = sessionStorage.getItem('searchQuery');
    if (query) {
      setSearchQuery(query);
    }
  }, []);

  const handleBack = () => {
    if (searchQuery && searchQuery !== 'null') {
      router.push(`/?search=${searchQuery}`);
    } else {
      router.back();
    }
  };

  const productTitle =
    currentLocale === 'fr' ? product?.title_french : product?.title;
  const productDescription =
    currentLocale === 'fr' ? product?.description_french : product?.description;

  const getShortDescription = (description: string, limit: number) => {
    if (description.length <= limit) return description;
    const shortDescription = description.slice(0, limit);
    const lastSpaceIndex = shortDescription.lastIndexOf(' ');
    return lastSpaceIndex === -1
      ? shortDescription
      : shortDescription.slice(0, lastSpaceIndex);
  };

  const shortDescription = getShortDescription(productDescription, 20);

  const [isOpen, setIsOpen] = useState(false);
  const [isImageLoading, setImageLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const toggleDescription = () => {
    setIsOpen(!isOpen);
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window?.location?.href).then(
      () => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1500);
      },
      (err) => {
        toast.error('Failed to copy', {
          position: 'top-center',
        });
        console.error('Failed to copy: ', err);
      }
    );
  };

  const closesAt: Date = new Date(product?.closes_at);

  const now: Date = new Date();
  const isLessThan24: boolean =
    (closesAt.getTime() - now.getTime()) / (1000 * 60 * 60) < 24;

  const imageUrls = product?.scanned_product?.image_public_urls;

  return (
    <div className='mb-4 rounded-md lg:shadow-custom w-full lg:max-h-[800px] lg:overflow-y-auto'>
      <div className='hidden lg:block'>
        <Buttons
          product={product}
          t={t}
          copyLinkToClipboard={copyLinkToClipboard}
          copied={copied}
        />
      </div>

      <div className='relative lg:mx-2'>
        <Carousel>
          <CarouselContent>
            {imageUrls?.map((url: string, i: number) => (
              <CarouselItem
                key={i}
                className='flex items-center justify-center'
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src={isImageLoading ? product?.thumbnail_public_url : url}
                      alt={product?.title_french}
                      width='0'
                      height='0'
                      quality={100}
                      unoptimized
                      priority
                      onLoad={() => setImageLoading(false)}
                      className={`max-h-[350px] md:max-h-[500px] h-full object-cover w-full lg:rounded-lg cursor-pointer`}
                    />
                  </DialogTrigger>
                  <DialogContent className='!h-[70vh] md:!h-[80vh] md:max-w-[90vw] object-cover lg:max-w-[70vw] border-none'>
                    <Image
                      src={url}
                      alt={product?.title_french}
                      quality={100}
                      width='0'
                      height='0'
                      unoptimized
                      priority
                      onLoad={() => setImageLoading(false)}
                      className={`${
                        isImageLoading ? 'bg-black min-h-80' : ''
                      }  !h-full md:!h-[80vh] object-contain w-full lg:rounded-lg`}
                    />
                  </DialogContent>
                </Dialog>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='absolute top-1/2 left-2 z-20' />
          <CarouselNext className='absolute top-1/2 right-2 z-20' />
        </Carousel>

        <div className='block lg:hidden'>
          <Buttons
            product={product}
            t={t}
            copyLinkToClipboard={copyLinkToClipboard}
            copied={copied}
          />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleBack();
          }}
          type='button'
          className='lg:hidden absolute top-2 left-2 bg-white shadow-md w-9 h-9 rounded-[8px] p-1 flex justify-center items-center group m-4'
        >
          <ChevronLeft className='h-6 w-6 text-black' />
        </button>
        <div className='absolute top-2 right-2 flex justify-center items-center gap-2 p-4'>
          <p className='bg-white shadow-sm rounded-[8px] px-[6px] py-[3px] sm:px-2 sm:py-1 font-semibold sm:text-sm w-full h-9 flex justify-center items-center'>{`€ ${
            Math.round(product?.estimated_price_min) ===
            Math.round(product?.estimated_price_max)
              ? Math.round(product?.estimated_price_min)
              : `${Math.round(product?.estimated_price_min)} - ${Math.round(
                  product?.estimated_price_max
                )}`
          }`}</p>
        </div>
      </div>

      <div className='px-5 lg:px-3 flex flex-col gap-4'>
        <p className='mt-2 text-start font-semibold text-[20px]'>
          {productTitle}
        </p>
        <div className='flex flex-row justify-start items-start gap-1'>
          <p
            style={{
              backgroundColor: isLessThan24 ? '#FFE2E2' : '#F6F6FF',
            }}
            className='text-base px-3 py-1.5 rounded-[20px]'
          >
            {moment(product?.closes_at).isSame(moment(), 'day')
              ? `Today ${moment(product?.closes_at).format('h:mm A')}`
              : moment(product?.closes_at).format('MMMM D, h:mm A')}
          </p>
          <p className='bg-[#F6F6FF] text-base px-3 py-1.5 rounded-[20px]'>
            {product?.location_country}
          </p>
        </div>
        <div className='flex flex-col justify-start items-start gap-1 pb-2'>
          {!isOpen && (
            <p
              className='flex items-center justify-between text-start font-normal text-base cursor-pointer'
              onClick={toggleDescription}
            >
              {shortDescription}...
              <span className='font-semibold ml-1'>
                {t('product:read_more')}
              </span>
            </p>
          )}
          {isOpen && (
            <p className='text-base font-normal transition-opacity duration-300 opacity-100'>
              {productDescription}
              <span
                className='cursor-pointer font-semibold ml-1'
                onClick={toggleDescription}
              >
                {t('product:read_less')}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

const Buttons = ({ copied, product, copyLinkToClipboard, t }: any) => {
  const { handleLinkUnlike, likedProductsIds } = useAppContext();

  const isLiked = likedProductsIds.includes(product?.id);

  console.log({ product });

  return (
    <div className='flex justify-between items-center gap-2 px-2 py-3'>
      <div
        className='flex gap-2'
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      >
        <CopyButton
          copied={copied}
          t={t}
          copyLinkToClipboard={copyLinkToClipboard}
        />

        <Button
          onClick={(e: any) => {
            e.stopPropagation();
            window.open(product.url, '_blank');
          }}
          variant={'outline'}
          className='gap-1 px-[12px] py-2 text-[14px] font-medium h-[40px]'
        >
          {(() => {
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
          })()}
          <ExternalLinkIcon size={15} />
        </Button>
      </div>

      {isLiked ? (
        <Heart
          fill='#ff3040'
          className='w-6 h-6 cursor-pointer text-[#ff3040]'
          onClick={(e: any) => {
            handleLinkUnlike(isLiked, product?.id);
          }}
        />
      ) : (
        <Heart
          className='w-6 h-6 cursor-pointer text-[#ff3040]'
          onClick={(e: any) => {
            handleLinkUnlike(isLiked, product?.id);
          }}
        />
      )}
    </div>
  );
};

const CopyButton = ({
  copied,
  t,
  copyLinkToClipboard,
}: {
  copied: boolean;
  t: any;
  copyLinkToClipboard: () => void;
}) => {
  return (
    <Button
      variant={'outline'}
      className='gap-1 px-[12px] py-2 text-[14px] font-medium h-[40px] cursor-pointer transition-opacity duration-300'
      onClick={copyLinkToClipboard}
    >
      {copied ? `${t('product:copied')}` : `${t('product:copy_link')}`}
      {copied ? <Check size={15} /> : <Copy size={15} />}
    </Button>
  );
};
