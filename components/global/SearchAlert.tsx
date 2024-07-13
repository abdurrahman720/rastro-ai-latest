'use client';

import React, { useState } from 'react';
import Title from './Title';
import { AlarmClock, Edit2, Settings2 } from 'lucide-react';
import { AddAlertModal } from './AddAlertModal';
import { toast } from 'sonner';
import api from '@/utils/axiosInstance';
import { useAppContext } from '@/providers/context/context';
import { EditAlertModal } from './EditAlertModal';
import { useRouter } from 'next/navigation';
import { CategoryFilter } from './CategoryFilter';
import { YearFilter } from './YearFilter';
import { CountryFilter } from './CountryFilter';
import { Button } from '../ui/button';
import { MobileFilterMenu } from './MobileFilterMenu';

const SearchAlert = ({ searchParams }: { searchParams: any }) => {
  const {
    user,
    handleLogin,
    open,
    setOpen,
    handleOpenAlert,
    refetchAlerts,
    setRefetchAlerts,
  } = useAppContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [openEditAlert, setOpenEditAlert] = useState(false);
  const [inputs, setInputs] = useState({
    title: searchParams?.search || '',
    category: 'Furniture',
    frequency: 'D',
    country_of_sale: 'Any',
  });

  console.log({ inputs });

  const onConfirm = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log({ inputs });
      const response = await api.post(`/user/alert_configs/`, inputs);
      console.log({ response });
      if (response.status === 201) {
        toast.success('Alert saved!', {
          position: 'top-center',
        });
        setOpen(false);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      if (error.response.status === 409) {
        toast.error(error.response.data.error || `Something went wrong!`, {
          position: 'top-center',
        });
      } else {
        toast.error(error.message || `Something went wrong!`, {
          position: 'top-center',
        });
      }
    }
  };
  const onConfirmEdit = async (e: any) => {
    e.preventDefault();
    if (searchParams?.id) {
      try {
        setLoading(true);

        const response = await api.put(
          `/user/alert-configs/${searchParams?.id}`,
          inputs
        );

        if (response.status === 200) {
          setRefetchAlerts(!refetchAlerts);
          toast.success('Alert updated!', {
            position: 'top-center',
          });
          setOpenEditAlert(false);
          setLoading(false);
        }
      } catch (error: any) {
        setLoading(false);
        console.log(error);

        toast.error(error.message || `Something went wrong!`, {
          position: 'top-center',
        });
      }
    }
  };
  const onConfirmDete = async (id: any) => {
    if (searchParams?.id) {
      try {
        setLoading(true);
        const response = await api.delete(`/user/alert-configs/${id}/`);

        if (response.status === 200) {
          toast.success('Alert deleted!', {
            position: 'top-center',
          });
          setRefetchAlerts(!refetchAlerts);
          router.push('/');
          setOpenEditAlert(false);
          setLoading(false);
        }
      } catch (error: any) {
        setLoading(false);
        console.log(error);
        toast.error(error.message || `Something went wrong!`, {
          position: 'top-center',
        });
      }
    }
  };

  const handleOpenEditAlert = () => {
    if (!user) {
      return handleLogin();
    }

    setOpenEditAlert(true);
  };
  return (
    <>
      <div className='flex flex-wrap gap-3 items-center pb-6'>
        <Title title={`‘${searchParams?.search}’`} />
        {Boolean(searchParams?.alert) ? (
          <button
            onClick={handleOpenEditAlert}
            className='inline-flex items-center gap-1 bg-white border-[#EDF1F5] border-[1px] text-xs px-3 py-1.5 rounded-[20px]'
          >
            <Edit2 className='w-[14px] h-[14px]' />
            Edit alert
          </button>
        ) : (
          <button
            onClick={handleOpenAlert}
            className='inline-flex items-center gap-1 bg-[#E1E3FF] text-xs px-3 py-1.5 rounded-[20px]'
          >
            <AlarmClock className='w-[14px] h-[14px]' />
            Add alert
          </button>
        )}

        <MobileFilterMenu />
        <div className='hidden lg:flex flex-wrap gap-3 '>
          <CategoryFilter />
          <YearFilter />
          <CountryFilter />

          <Button
            variant='outline'
            size='sm'
            className='h-[31px] px-3 text-xs rounded-[8px]'
          >
            Closes soon
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='h-[31px] px-3 text-xs rounded-[8px]'
          >
            Recently added
          </Button>
        </div>
      </div>

      <AddAlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
        search={searchParams?.search}
        inputs={inputs}
        setInputs={setInputs}
      />
      <EditAlertModal
        isOpen={openEditAlert}
        onClose={() => setOpenEditAlert(false)}
        onConfirm={onConfirmEdit}
        onConfirmDete={onConfirmDete}
        loading={loading}
        searchParams={searchParams}
        inputs={inputs}
        setInputs={setInputs}
      />
    </>
  );
};

export default SearchAlert;
