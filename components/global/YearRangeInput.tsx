'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function YearRangeInput() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 101 }, (_, i) => currentYear - i);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className='w-full' asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className=' justify-between w-full lg:w-[133px]'
        >
          {value
            ? yearOptions.find((year) => year === Number(value))
            : 'Select year...'}
          <ChevronsUpDown className='ml-1 h-4 w-4 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[150px] p-0'>
        <Command>
          <CommandInput
            placeholder='Search year...'
            className='pointer-events-auto'
          />
          <CommandEmpty>No year found.</CommandEmpty>
          <CommandList>
            {yearOptions.map((year) => (
              <CommandItem
                key={year}
                value={year.toString()}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    Number(value) === year ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {year}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
