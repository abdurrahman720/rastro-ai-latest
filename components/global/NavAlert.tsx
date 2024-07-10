import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { AlarmClock } from 'lucide-react';

const NavAlert = () => {
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlarmClock className='w-[26px] h-[26px] cursor-pointer' />
          </TooltipTrigger>
          <TooltipContent>
            <p className='text-xs'>My Alerts</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default NavAlert;
