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
import YearRangeInput from './YearRangeInput';

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
            className='focus:bg-white'
          >
            <YearRangeInput />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
