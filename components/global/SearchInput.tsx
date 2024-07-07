import { useAppContext } from '@/providers/context/context';
import { Loader2, Search, XIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import Image from 'next/image';
import cameraPlus from '/public/logo/cameraPlus.jpg';

export const SearchInput = ({
  img,
  setImg,
  t,
}: {
  img: Blob | MediaSource | null;
  setImg: any;
  t: any;
}) => {
  const {
    setSearchQuery,
    setIsSearching,
    searchByImage,
    isSearching,
    searchQuery,
    searchProducts,
  } = useAppContext();

  const searchParams = useSearchParams();
  const pathName = usePathname();

  const { replace } = useRouter();

  const handleUploadImage = (file: any) => {
    setImg(file);
    const params = new URLSearchParams(searchParams);

    setSearchQuery('');
    params.delete('search');
    replace(`/?${params.toString()}`);
  };

  const handleSearchProductsOrRemoveImage = () => {
    setImg(null);

    const params = new URLSearchParams(searchParams);

    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }

    if (pathName === '/' || searchQuery) {
      searchProducts();
      replace(`/?${params.toString()}`);
    }
  };

  const placeholderSearch = t('search');

  useEffect(() => {
    if (img) {
      const handleSearchImage = async () => {
        const result = await searchByImage(img);

        if (!result.success) {
          handleSearchProductsOrRemoveImage();
          toast.error(result?.message, {
            position: 'top-center',
          });
        }
      };
      handleSearchImage();
    }
  }, [img]);

  const handleKeyDown = (event: any) => {
    const params = new URLSearchParams(searchParams);

    if (event.key === 'Enter') {
      const query = event.target.value;
      setSearchQuery(query);

      if (query) {
        params.set('search', query);
      } else {
        params.delete('search');
      }
      searchProducts();
      replace(`/?${params.toString()}`);
    }
  };

  return (
    <>
      <div className='relative flex items-center w-full lg:w-[22rem]  xl:!w-[420px]'>
        {isSearching ? (
          <div className='absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform flex items-center'>
            <Loader2 className='animate-spin' />
          </div>
        ) : (
          <Search
            className='absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform cursor-pointer'
            onClick={handleSearchProductsOrRemoveImage}
          />
        )}
        <Input
          disabled={isSearching}
          placeholder={`${placeholderSearch}`}
          className='w-full border-black focus:border-none'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className='relative'>
        <input
          id='image'
          className='hidden'
          type='file'
          disabled={isSearching}
          onChange={(e) => {
            //@ts-ignore
            handleUploadImage(e?.target?.files[0]);
          }}
        />
        {img ? (
          <div className='relative'>
            <div className='relative w-[42px] h-[42px]'>
              <Image
                src={URL.createObjectURL(img)}
                alt='uploaded'
                fill
                className='rounded'
              />
            </div>
            <button
              className='absolute -top-2 -right-1 bg-white rounded-full border border-black p-1'
              onClick={handleSearchProductsOrRemoveImage}
            >
              <XIcon className='h-4 w-4 text-black ' />
            </button>
          </div>
        ) : (
          <label htmlFor='image' className='cursor-pointer'>
            <Image src={cameraPlus} alt='upload' width={42} height={42} />
          </label>
        )}
      </div>
    </>
  );
};
