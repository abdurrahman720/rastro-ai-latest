import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const Title = ({ title }: { title: string }) => {
  return (
    <h1 className={cn('text-xl pb-6 font-medium', inter.className)}>{title}</h1>
  );
};

export default Title;
