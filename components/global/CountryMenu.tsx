import React from 'react';
import { Checkbox } from '../ui/checkbox';
import { useAppContext } from '@/providers/context/context';
import { useRouter } from 'next/navigation';

const CountryMenu = ({ country }: any) => {
  const { setFilterQueries, searchProducts } = useAppContext();
  const { replace } = useRouter();

  const handleCheckedChange = (value: boolean) => {
    setFilterQueries((prevQueries: any) => ({
      ...prevQueries,
      location_country: value ? country : '',
    }));
    searchProducts();
    replace(`/?location_country=${country}`);
    // router.push();
  };

  return (
    <div
      className='flex items-center gap-3 cursor-pointer'
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Checkbox
        id={`${country}`}
        className='w-[17px] h-[17px]'
        onCheckedChange={handleCheckedChange}
      />
      <label
        htmlFor={`${country}`}
        className='text-[15px] font-medium cursor-pointer block'
      >
        {country}
      </label>
    </div>
  );
};

export default CountryMenu;
