import Link from 'next/link';
import { Button } from '../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Heart } from 'lucide-react';

const NavLikeItem = () => {
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href='/liked-products'>
              <Heart />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p className='text-xs'>Liked products</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default NavLikeItem;
