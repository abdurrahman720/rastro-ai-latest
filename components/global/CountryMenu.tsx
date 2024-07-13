import React from 'react';
import { Checkbox } from '../ui/checkbox';

const CountryMenu = ({ country }: any) => {
  return (
    <div
      className='flex items-center gap-3  cursor-pointer'
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Checkbox id={`${country}`} className='w-[17px] h-[17px]' />
      <label
        htmlFor={`${country}`}
        className='text-[15px] font-medium  cursor-pointer block'
      >
        {country}
      </label>
    </div>
  );
};

export default CountryMenu;
