import { PlusCircle, AlarmClock } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppContext } from '@/providers/context/context';

export function AlertDropdown() {
  const { handleOpenAlert, alerts } = useAppContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <AlarmClock className='w-[26px] h-[26px] cursor-pointer' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Alerts</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {alerts?.map(
            ({ title, id }: { title: string; id: number }, i: number) => (
              <DropdownMenuItem key={i} className='cursor-pointer'>
                <a
                  className='truncate'
                  href={`/?search=${title.toString()}&id=${id}&alert=true`}
                >
                  {title}
                </a>
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleOpenAlert} className='cursor-pointer'>
          <span>Add an alert</span>
          <PlusCircle className='ml-2 h-4 w-4' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
