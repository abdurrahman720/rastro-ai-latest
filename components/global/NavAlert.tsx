import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { AlertDropdown } from './AlertDropdown';

const NavAlert = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <AlertDropdown />
        </TooltipTrigger>
        <TooltipContent>
          <p className='text-xs'>My Alerts</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NavAlert;
