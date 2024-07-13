import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Settings2 } from 'lucide-react';
import { categories } from './CategoryFilter';
import { FilterSubmenu } from './FilterSubmenu';

export function MobileFilterMenu() {
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
          {categories.map((category, i) => (
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              key={i}
              className='cursor-pointer mb-5'
            >
              <FilterSubmenu category={category} />
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
