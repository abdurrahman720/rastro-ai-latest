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
import { Ellipsis, LogOut } from 'lucide-react';

export const UserDropdownMenu = ({
  user,
  handleLogout,
  handleSignupOrLogin,
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
            <DropdownMenuItem className='block lg:hidden' onClick={handleSignupOrLogin}>
              <span className='text-sm font-semibold'> {t('login')}</span>
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
