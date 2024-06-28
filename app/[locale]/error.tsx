'use client';

import { Button } from '@/components/ui/button';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.dir(error);
  }, [error]);

  return (
    <>
      <section className='relative z-10 py-[120px]'>
        <div className='container mx-auto'>
          <div className='-mx-4 flex'>
            <div className='w-full px-4'>
              <div className='mx-auto max-w-[400px] text-center'>
                <h4 className='mb-3 text-[22px] font-semibold leading-tight text-dark'>
                  Oops! Something went wrong.
                </h4>

                <Button
                  onClick={() => reset()}
                  className='bg-rastro-primary rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition '
                >
                  Try again
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
