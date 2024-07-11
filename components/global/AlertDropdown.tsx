import {
  CreditCard,
  Keyboard,
  PlusCircle,
  Settings,
  User,
  AlarmClock,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export function AlertDropdown() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const alerts = [
    'Mid-century modern chairs',
    'Space age lamps',
    '19th century art',
    'Rare dish-ware',
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <AlarmClock className='w-[26px] h-[26px] cursor-pointer' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Alerts</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {alerts.map((alert, i) => (
            <DropdownMenuItem key={i}>
              <a href={`/?search=${alert.toString()}&alert=true`}>{alert}</a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span>Add an alert</span>
          <PlusCircle className='ml-2 h-4 w-4' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
