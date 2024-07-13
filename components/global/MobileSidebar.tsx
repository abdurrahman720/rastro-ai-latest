import { Button } from '@/components/ui/button';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Settings2 } from 'lucide-react';
import { MobileFilterMenu } from './MobileFilterMenu';
import { Checkbox } from '../ui/checkbox';
import { mobileFilters } from '@/utils/constants';

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='outline'
          className='rounded-full p-0 w-[30px] h-[30px] lg:hidden'
        >
          <Settings2 className='w-[14px] h-[14px]' />
        </Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle className='text-start'>Filters</SheetTitle>
        </SheetHeader>

        <div className='mt-6 max-h-[600px] overflow-y-auto no-scrollbar'>
          {mobileFilters.map((filter, i) => (
            <div key={i} className='cursor-pointer mb-5'>
              {filter.type === 'accordion' ? (
                <MobileFilterMenu filter={filter} />
              ) : (
                <label
                  className='flex items-center justify-between gap-3  cursor-pointer pb-2 border-b'
                  key={i}
                  htmlFor={`sub-${i + 1}`}
                >
                  <label
                    htmlFor={`sub-${i + 1}`}
                    className='text-[15px] font-medium  cursor-pointer block'
                  >
                    {filter.name}
                  </label>
                  <Checkbox id={`sub-${i + 1}`} className='w-[17px] h-[17px]' />
                </label>
              )}
            </div>
          ))}
        </div>

        <div className='flex gap-2 mt-10'>
          <Button className='flex-1' variant='outline'>
            Clear all
          </Button>
          <Button className='flex-1'>Done</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
