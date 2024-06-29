'use client';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { Check, ChevronLeft, Copy, ExternalLinkIcon } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { toast } from 'sonner';
import { useAppContext } from '@/providers/context/context';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

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
      router.push('/');
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
  const closesAtLocal = formatDate(closesAt);
  const now: Date = new Date();
  const isLessThan24: boolean =
    (closesAt.getTime() - now.getTime()) / (1000 * 60 * 60) < 24;

  const imageUrls = product?.scanned_product?.image_public_urls;

  return (
    <div className='mb-4 rounded-md lg:shadow-custom w-full lg:max-h-[800px] lg:overflow-y-auto'>
      <div className='hidden lg:flex justify-between items-center gap-2 px-2 py-3'>
        <CopyButton
          copied={copied}
          t={t}
          copyLinkToClipboard={copyLinkToClipboard}
        />
        <Buttons router={router} product={product} t={t} />
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

        <div className='flex justify-between items-center gap-2 my-2 lg:hidden px-5'>
          <CopyButton
            copied={copied}
            t={t}
            copyLinkToClipboard={copyLinkToClipboard}
          />
          <Buttons router={router} product={product} t={t} />
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
          {isLessThan24 && (
            <div>
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
          <p className='bg-white shadow-sm rounded-[8px] px-[6px] py-[3px] sm:px-2 sm:py-1 font-semibold sm:text-sm w-full h-9 flex justify-center items-center'>{`€ ${Math.round(
            product?.estimated_price_min
          )} - ${Math.round(product?.estimated_price_max)}`}</p>
        </div>
      </div>

      <div className='px-5 lg:px-3 flex flex-col gap-4'>
        <p className='mt-2 text-start font-semibold text-[20px]'>
          {productTitle}
        </p>
        <div className='flex flex-col justify-start items-start gap-1'>
          <p className='text-start font-semibold text-base'>
            {t('product:closing')}:{' '}
            <span className='text-[#ED0000] font-normal'>{closesAtLocal}</span>{' '}
          </p>
          <p className='text-start font-semibold text-base'>
            {t('product:country')}:{' '}
            <span className='font-normal'>{product?.location_country}</span>{' '}
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

const Buttons = ({
  router,
  product,
  t,
}: {
  router: any;
  product: any;
  t: any;
}) => {
  const [clicked, setClicked] = useState(false);
  const { user, handleLogin } = useAppContext();

  const handleSaveClick = useCallback(() => {
    if (user) {
      setClicked((prev) => !prev);
    } else {
      handleLogin();
    }
  }, [user, handleLogin]);

  return (
    <div
      className='flex gap-2'
      onClick={(e: any) => {
        e.stopPropagation();
      }}
    >
    <Button
      onClick={(e: any) => {
        e.stopPropagation();
        window.open(product.url, '_blank');
      }}
      variant={'outline'}
      className='gap-1 sm:px-[12px] py-0 sm:py-2 px-[8px] text-[14px] font-medium sm:h-[40px] h-[32px]'
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
        onClick={() => handleSaveClick()}
        className={clsx(
          'bg-rastro-primary py-0 sm:py-2 px-[6px] sm:px-[12px] text-[14px] font-medium sm:h-[40px] h-[32px]',
          { 'bg-black/60': clicked }
        )}
      >
        {clicked ? `${t('product:saved')}` : `${t('product:save')}`}
      </Button>
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
      className='gap-1 sm:px-[12px] py-0 sm:py-2 px-[8px] text-[14px] font-medium sm:h-[40px] h-[32px] cursor-pointer transition-opacity duration-300'
      onClick={copyLinkToClipboard}
    >
      {copied ? `${t('product:copied')}` : `${t('product:copy_link')}`}
      {copied ? <Check size={15} /> : <Copy size={15} />}
    </Button>
  );
};
