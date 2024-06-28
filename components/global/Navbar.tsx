'use client';
import Image from 'next/image';
import primaryLogo from '/public/logo/rastro-logo.jpg';
import userImg from '/public/logo/user.png';
import cameraPlus from '/public/logo/cameraPlus.jpg';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Ellipsis, Loader2, LogOut, Search, XIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '../ui/dropdown-menu';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useAppContext } from '@/providers/context/context';
import { useTranslation } from 'react-i18next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import i18nConfig from '@/i18nConfig';
import clsx from 'clsx';
import { toast } from 'sonner';
import { Spinner } from '../ui/spinner';

const inter = Inter({ subsets: ['latin'] });

type Props = {};

const Navbar = (props: Props) => {
  const { t } = useTranslation();

  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const isProductPage = currentPathname.includes('product');

  const handleLangChange = (newLocale: string) => {
    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      //@ts-ignore
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  const { user, handleLogin, handleLogout } = useAppContext();

  const [img, setImg] = useState<Blob | MediaSource | null>(null);

  return (
    <div
      className={clsx(
        `w-full flex flex-col lg:flex-row justify-between items-center mt-7  px-4 md:px-10 mb-4 md:mb-10 `,
        { 'hidden md:flex': isProductPage }
      )}
    >
      {/* Mobile responsive starts */}
      <div className='flex justify-between items-center w-full lg:hidden '>
        <Brand />
        {/* User Avatar for Mobile */}
        <div className='lg:hidden flex items-center gap-2'>
          {user && <UserAvatar user={user} t={t} />}
          <div className=''>
            <UserDropdownMenu
              handleLogout={handleLogout}
              handleLogin={handleLogin}
              user={user}
              t={t}
              handleLangChange={handleLangChange}
            />
          </div>
        </div>
      </div>
      <div className='flex lg:hidden w-full items-center space-x-2 mt-6 md:mt-10 lg:mt-0 lg:w-auto'>
        <UserInput img={img} setImg={setImg} t={t} />{' '}
      </div>
      {/* Mobile responsive ends */}

      {/* Desktop starts */}
      <div className='hidden lg:flex lg:justify-center lg:gap-12'>
        <div className='flex justify-between items-center w-full lg:flex-1 lg:gap-20'>
          <Brand />
        </div>
        <div className='flex w-full items-center space-x-2 mt-4 lg:mt-0 lg:w-auto'>
          <UserInput img={img} setImg={setImg} t={t} />
        </div>
      </div>
      <div className='hidden lg:flex w-full lg:w-auto lg:flex-1 justify-end items-center gap-5 mt-4 lg:mt-0'>
        {user ? (
          <Button
            variant='default'
            className={'px-[12px] py-[9px]'}
            // onClick={handleLogin}
          >
            {t('saved_products')}
          </Button>
        ) : (
          <Button
            variant='default'
            className={'px-[12px] py-[9px]'}
            onClick={handleLogin}
          >
            {t('create_account')}
          </Button>
        )}
        <LanguageSelect
          language={currentLocale}
          setLanguage={handleLangChange}
        />
        {user && (
          <div className='hidden lg:block'>
            <UserAvatar user={user} handleLogout={handleLogout} t={t} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

const UserDropdownMenu = ({
  user,
  handleLogout,
  handleLogin,
  t,
  handleLangChange,
}: any) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {user && (
            <DropdownMenuItem>
              <span className='text-sm font-semibold'>
                {t('saved_products')}
              </span>
            </DropdownMenuItem>
          )}
          {user ? (
            <DropdownMenuItem
              className='block lg:hidden'
              onClick={handleLogout}
            >
              <span className='text-sm font-semibold text-red-600 inline-flex gap-2 items-center'>
                <LogOut className='w-4 h-4' />
                {t('log_out')}
              </span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem className='block lg:hidden' onClick={handleLogin}>
              <span className='text-sm font-semibold'>
                {' '}
                {t('create_account')}
              </span>
            </DropdownMenuItem>
          )}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger onClick={toggleMenu}>
              <span className='text-sm font-semibold'>{t('language')}</span>
            </DropdownMenuSubTrigger>
            {menuOpen && (
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    textValue='en'
                    onClick={() => {
                      handleLangChange('en');
                      setMenuOpen(false);
                    }}
                  >
                    <span className='text-xs font-normal'>{t('english')}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    textValue='fr'
                    onClick={() => {
                      handleLangChange('fr');
                      setMenuOpen(false);
                    }}
                  >
                    <span className='text-xs font-normal'>{t('french')}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    textValue='de'
                    onClick={() => {
                      handleLangChange('de');
                      setMenuOpen(false);
                    }}
                  >
                    <span className='text-xs font-normal'>{t('german')}</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            )}
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const UserAvatar = ({ user, handleLogout, t }: any) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className='w-[44px] h-[44px] rounded-full relative'>
        <Image src={user?.photoURL} alt='user' fill className='rounded-full' />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className='hidden lg:block'>
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={handleLogout}>
          <span className='text-sm font-semibold text-red-600 inline-flex gap-2 items-center'>
            <LogOut className='w-4 h-4' />
            {t('log_out')}
          </span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);

const Brand = () => (
  <Link href='/' className='flex items-center justify-between gap-2'>
    <Image src={primaryLogo} alt='rastro-ai' width={44} height={44} />
    <p
      className={cn(
        'text-[34px] font-semibold text-rastro-primary',
        inter.className
      )}
    >
      Rastro
    </p>
  </Link>
);

const LanguageSelect = ({
  language,
  setLanguage,
}: {
  language: string;
  setLanguage: (newLocale: string) => void;
}) => (
  <Select value={language} onValueChange={setLanguage}>
    <SelectTrigger className='w-[50px] px-[8px] py-[10px]'>
      <SelectValue className='text-sm' placeholder='En' />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem className='text-sm' value='en'>
          EN
        </SelectItem>
        <SelectItem className='text-sm' value='fr'>
          FR
        </SelectItem>
        <SelectItem className='text-sm' value='de'>
          DE
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
);

const UserInput = ({
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
    searchProducts,
    searchByImage,
    isSearching,
    searchQuery,
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
          <label htmlFor='image'>
            <Image src={cameraPlus} alt='upload' width={42} height={42} />
          </label>
        )}
      </div>
    </>
  );
};
