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

export const AddAlertModal = ({ isOpen, onClose, onConfirm, loading }: any) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title='Add an alert'
      description=''
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='flex flex-col gap-3 sm:gap-6'>
        <div className='flex flex-col gap-1'>
          <Label className='text-base font-medium' htmlFor='Title'>
            Title
          </Label>
          <Input className='h-[46px]' type='text' name='title' />
        </div>
        <div className='flex flex-col sm:flex-row gap-3 sm:gap-2'>
          <div className='flex flex-col gap-1 flex-1'>
            <Label className='text-base font-medium' htmlFor='category'>
              Category
            </Label>
            <Select>
              <SelectTrigger className='h-[46px]'>
                <SelectValue placeholder='Select' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value='apple'>Apple</SelectItem>
                  <SelectItem value='banana'>Banana</SelectItem>
                  <SelectItem value='blueberry'>Blueberry</SelectItem>
                  <SelectItem value='grapes'>Grapes</SelectItem>
                  <SelectItem value='pineapple'>Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-col gap-1 flex-1'>
            <Label className='text-base font-medium' htmlFor='country'>
              Country of sale
            </Label>
            <Select>
              <SelectTrigger className='h-[46px]'>
                <SelectValue placeholder='Select' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value='apple'>Apple</SelectItem>
                  <SelectItem value='banana'>Banana</SelectItem>
                  <SelectItem value='blueberry'>Blueberry</SelectItem>
                  <SelectItem value='grapes'>Grapes</SelectItem>
                  <SelectItem value='pineapple'>Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
        <Button disabled={loading} variant='outline' onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} className='bg-[#0817EC]' onClick={onConfirm}>
          Save alert
        </Button>
      </div>
    </Modal>
  );
};
