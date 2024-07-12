'use client';

import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { ChevronDown } from 'lucide-react';
import { Input } from '../ui/input';

export function YearFilter() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='inline-flex gap-2 items-center h-[31px] px-3 text-xs rounded-[8px]'
        >
          Year
          <ChevronDown className='w-4 h-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[340px] p-4'>
        <DropdownMenuLabel>Enter a range</DropdownMenuLabel>
        <DropdownMenuGroup className='max-h-[500px] overflow-y-auto'>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className='focus:bg-white flex gap-2 items-center mb-3.5'
          >
            <Input />
            {'-'}
            <Input />
          </DropdownMenuItem>
          <DropdownMenuItem className='focus:bg-white flex gap-2'>
            <Button className='flex-1' variant='outline'>
              Clear all
            </Button>
            <Button className='flex-1'>Done</Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
