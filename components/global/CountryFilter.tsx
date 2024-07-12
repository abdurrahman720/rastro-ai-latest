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
import { FilterSubmenu } from './FilterSubmenu';
import { Button } from '../ui/button';
import { ChevronDown } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';

const countries = [
  'Any',
  'Germany',
  'Switzerland',
  'Austria',
  'Belgium',
  'France',
  'Ireland',
  'Italy',
  'Luxembourg',
  'Netherlands',
  'Portugal',
  'Spain',
  'United Kingdom',
];

export function CountryFilter() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='inline-flex gap-2 items-center h-[31px] px-3 text-xs rounded-[8px]'
        >
          Country of sale
          <ChevronDown className='w-4 h-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[300px] p-4'>
        <DropdownMenuGroup className='max-h-[500px] overflow-y-auto'>
          {countries.map((country, i) => (
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
              }}
              key={i}
              className='cursor-pointer'
            >
              <div className='flex items-center gap-3  cursor-pointer'>
                <Checkbox id={`${i + 1}`} className='w-[17px] h-[17px]' />
                <label
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  htmlFor={`${i + 1}`}
                  className='text-[15px] font-medium  cursor-pointer'
                >
                  {country}
                </label>
              </div>
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
