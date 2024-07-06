'use client';
import { Button } from '../ui/button';
import { Bell, Heart } from 'lucide-react';

import { useEffect, useState } from 'react';

import { useAppContext } from '@/providers/context/context';
import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';
import i18nConfig from '@/i18nConfig';
import clsx from 'clsx';

import { UserAvatar } from './UserAvatar';
import { Brand } from './Brand';
import { LanguageSelect } from './LanguageSelect';
import { SearchInput } from './SearchInput';

const Navbar = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();
  const isProductPage = currentPathname.includes('product');

  const { user, handleLogin, handleLogout } = useAppContext();
  const [img, setImg] = useState<Blob | MediaSource | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={clsx(
        `w-full flex flex-col lg:flex-row justify-between items-center px-4 md:px-10 py-4 md:mb-10 bg-white transition-all duration-300`,
        { 'hidden md:flex': isProductPage },
        {
          'lg:sticky lg:top-0 lg:z-50': !isProductPage,
          'lg:shadow-md': isScrolled,
        }
      )}
    >
      {/* Mobile responsive starts */}
      <div className='flex justify-between items-center w-full lg:hidden '>
        <Brand />
        {/* User Avatar for Mobile */}
        <div className='lg:hidden flex items-center gap-2'>
          {user ? (
            <>
              <Bell />
              <Heart />
              <UserAvatar
                user={user}
                handleLogout={handleLogout}
                t={t}
                handleLangChange={handleLangChange}
              />
            </>
          ) : (
            <>
              <Button
                variant='default'
                className={'px-[12px] py-[9px]'}
                onClick={handleLogin}
              >
                {t('login')}
              </Button>
              <LanguageSelect
                language={currentLocale}
                setLanguage={handleLangChange}
              />
            </>
          )}
        </div>
      </div>
      <div
        className={clsx(
          'flex lg:hidden w-full items-center space-x-2 pt-6 md:pt-6 lg:pt-0 z-50 transition-all duration-500',
          {
            'fixed top-0 left-0 w-full bg-white py-6 px-4 md:px-10 shadow-md':
              isScrolled,
          }
        )}
      >
        <SearchInput img={img} setImg={setImg} t={t} />{' '}
      </div>
      {/* Mobile responsive ends */}

      {/* Desktop starts */}
      <div className='hidden lg:flex lg:justify-center lg:gap-12'>
        <div className='flex justify-between items-center w-full lg:flex-1 lg:gap-20'>
          <Brand />
        </div>
        <div className='flex w-full items-center space-x-2 mt-4 lg:mt-0 lg:w-auto'>
          <SearchInput img={img} setImg={setImg} t={t} />
        </div>
      </div>
      <div className='hidden lg:flex w-full lg:w-auto lg:flex-1 justify-end items-center gap-5 mt-4 lg:mt-0'>
        {user ? (
          <>
            <Bell />
            <Heart />
            <UserAvatar
              user={user}
              handleLogout={handleLogout}
              t={t}
              handleLangChange={handleLangChange}
            />
          </>
        ) : (
          <>
            <Button
              variant='default'
              className={'px-[12px] py-[9px]'}
              onClick={handleLogin}
            >
              {t('login')}
            </Button>
            <LanguageSelect
              language={currentLocale}
              setLanguage={handleLangChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
