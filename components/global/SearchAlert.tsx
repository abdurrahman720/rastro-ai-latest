'use client';

import React, { useState } from 'react';
import Title from './Title';
import { AlarmClock } from 'lucide-react';
import { AddAlertModal } from './AddAlertModal';
import { toast } from 'sonner';
import api from '@/utils/axiosInstance';

const SearchAlert = ({ search }: { search: string }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    title: search,
    category: 'Furniture',
    frequency: 'D',
    country_of_sale: 'Any',
  });

  const onConfirm = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log({ inputs });
      const response = await api.post(`/user/alert_configs`, inputs);
      console.log({ response });
      if (response.status === 200) {
        toast.success('Alert saved!', {
          position: 'top-center',
        });
        setOpen(false);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message || `Something went wrong!`);
    }
  };
  return (
    <>
      <div className='flex gap-3 items-center pb-6'>
        <Title title={`‘${search}’`} />
        <button
          onClick={() => setOpen(true)}
          className='inline-flex items-center gap-1 bg-[#E1E3FF] text-xs px-3 py-1.5 rounded-[20px]'
        >
          <AlarmClock className='w-[14px] h-[14px]' />
          Add alert
        </button>
      </div>

      <AddAlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
        search={search}
        inputs={inputs}
        setInputs={setInputs}
      />
    </>
  );
};

export default SearchAlert;
