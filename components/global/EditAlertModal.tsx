import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '../ui/modal';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

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
const categories = [
  'Furniture',
  'Seating',
  'Lighting',
  'Porcelain',
  'Faience',
  'Other ceramics',
  'Silverware',
  'Glassware',
  'Sculptures',
  'Paintings',
  'Graphic arts',
  'Decorative arts',
  'Mirrors',
  'Architectural elements',
  'Clocks & Watches',
  'Jewelry',
  'Textile art',
  'Clothing',
  'Collectibles',
  'Religious & Ritual art',
  'Militaria',
  'Other',
];

export const EditAlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  inputs,
  setInputs,
  onConfirmDete,
  searchParams,
}: any) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal title='Edit alert' description='' isOpen={isOpen} onClose={onClose}>
      <form onSubmit={onConfirm}>
        <div className='flex flex-col gap-3 sm:gap-6'>
          <div className='flex flex-col gap-1'>
            <Label className='text-base font-medium' htmlFor='Title'>
              Title
            </Label>
            <Input
              className='h-[46px]'
              type='text'
              name='title'
              value={inputs.title}
              onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
              required
            />
          </div>
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-2'>
            <div className='flex flex-col gap-1 flex-1'>
              <Label className='text-base font-medium' htmlFor='category'>
                Category
              </Label>
              <Select
                required
                onValueChange={(value) =>
                  setInputs({ ...inputs, category: value })
                }
                value={inputs.category}
              >
                <SelectTrigger className='h-[46px]'>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>

                    {categories.map((category, index) => (
                      <SelectItem key={index} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='flex flex-col gap-1 flex-1'>
              <Label className='text-base font-medium' htmlFor='country'>
                Country of sale
              </Label>
              <Select
                required
                onValueChange={(value) =>
                  setInputs({ ...inputs, country_of_sale: value })
                }
                value={inputs.country_of_sale}
              >
                <SelectTrigger className='h-[46px]'>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Country</SelectLabel>
                    {countries.map((country, index) => (
                      <SelectItem key={index} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
          <Button
            disabled={loading}
            variant='outline'
            type='button'
            onClick={() => onConfirmDete(searchParams?.id)}
          >
            Delete Alert
          </Button>
          <Button disabled={loading} className='bg-[#0817EC]' type='submit'>
            Save alert
          </Button>
        </div>
      </form>
    </Modal>
  );
};
