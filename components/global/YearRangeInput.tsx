import { Button } from '../ui/button';
import { Input } from '../ui/input';

const YearRangeInput = () => {
  return (
    <div>
      <div className='flex gap-2 items-center mb-6'>
        <Input />
        {'-'}
        <Input />
      </div>

      <div className='flex gap-2'>
        <Button className='flex-1' variant='outline'>
          Clear all
        </Button>
        <Button className='flex-1'>Done</Button>
      </div>
    </div>
  );
};

export default YearRangeInput;
