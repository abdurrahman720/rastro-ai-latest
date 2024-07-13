'use client';

import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CategoryMenu } from './CategoryMenu';
import { Button } from '../ui/button';
import { ChevronDown } from 'lucide-react';
import { categoriesFilter } from '@/utils/constants';

export function CategoryFilter() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='inline-flex gap-2 items-center h-[31px] px-3 text-xs rounded-[8px]'
        >
          Category
          <ChevronDown className='w-4 h-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[300px] p-4'>
        <DropdownMenuGroup className='max-h-[500px] overflow-y-auto'>
          {categoriesFilter.map((category, i) => (
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              key={i}
              className='cursor-pointer focus:bg-white py-0'
            >
              <CategoryMenu category={category} />
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator className='border-t' />
        <DropdownMenuItem className='focus:bg-white flex gap-2'>
          <Button className='flex-1' variant='outline'>
            Clear all
          </Button>
          <Button className='flex-1'>Done</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
