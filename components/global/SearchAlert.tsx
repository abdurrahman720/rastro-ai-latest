'use client';

import React, { useContext, useState } from 'react';
import Title from './Title';
import { AlarmClock, Edit2 } from 'lucide-react';
import { AddAlertModal } from './AddAlertModal';
import { toast } from 'sonner';
import api from '@/utils/axiosInstance';
import { AppContext } from '@/providers/context/context';
import { EditAlertModal } from './EditAlertModal';

const SearchAlert = ({ searchParams }: { searchParams: any }) => {
  const { user, handleLogin } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEditAlert, setOpenEditAlert] = useState(false);
  const [inputs, setInputs] = useState({
    title: searchParams?.search || '',
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
      toast.error(error.message || `Something went wrong!`, {
        position: 'top-center',
      });
    }
  };
  const onConfirmEdit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log({ inputs });
      const response = await api.put(`/user/alert-configs/123`, inputs);
      console.log({ response });
      if (response.status === 200) {
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
  };
  const onConfirmDete = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.delete(`/user/alert-configs/123`);

      if (response.status === 200) {
        toast.success('Alert deleted!', {
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
  };

  const handleOpenAlert = () => {
    if (!user) {
      return handleLogin();
    }

    setOpen(true);
  };
  const handleOpenEditAlert = () => {
    if (!user) {
      return handleLogin();
    }

    setOpenEditAlert(true);
  };
  return (
    <>
      <div className='flex gap-3 items-center pb-6'>
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
        search={searchParams?.search}
        inputs={inputs}
        setInputs={setInputs}
      />
    </>
  );
};

export default SearchAlert;
