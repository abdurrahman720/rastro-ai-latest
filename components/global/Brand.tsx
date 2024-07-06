import Image from 'next/image';
import Link from 'next/link';
import primaryLogo from '/public/logo/rastro-logo.jpg';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
const inter = Inter({ subsets: ['latin'] });
export const Brand = () => (
  <Link href='/' className='flex items-center justify-between gap-2'>
    <Image src={primaryLogo} alt='rastro-ai' width={44} height={44} />
    <p
      className={cn(
        'text-[34px] font-semibold text-rastro-primary',
        inter.className
      )}
    >
      Rastro
    </p>
  </Link>
);
