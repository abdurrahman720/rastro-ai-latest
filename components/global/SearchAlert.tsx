'use client';

import React, { useState } from 'react';
import Title from './Title';
import { Flag } from 'lucide-react';
import { AddAlertModal } from './AddAlertModal';

const SearchAlert = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onConfirm = async () => {
    console.log('submitted');
  };

  return (
    <>
      <div className='flex gap-3 items-center pb-6'>
        <Title title={'‘Mid century modern chairs’'} />
        <button
          onClick={() => setOpen(true)}
          className='inline-flex items-center gap-1 bg-[#E1E3FF] text-xs px-3 py-1.5 rounded-[20px]'
        >
          <Flag className='w-3 h-3' />
          Add alert
        </button>
      </div>

      <AddAlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
    </>
  );
};

export default SearchAlert;
