import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import Image from 'next/image';
import { LogOut } from 'lucide-react';

export const UserAvatar = ({
  user,
  handleLogout,
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
        <Button className='w-[44px] h-[44px] rounded-full relative'>
          <Image
            src={user?.photoURL}
            alt='user'
            fill
            className='rounded-full'
          />
        </Button>
      </DropdownMenuTrigger>

      {/* Hidden lg:Block */}
      <DropdownMenuContent className=''>
        <DropdownMenuGroup>
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
};
