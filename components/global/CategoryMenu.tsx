import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '../ui/checkbox';

export function CategoryMenu({ category }: any) {
  return (
    <Accordion type='single' collapsible tabIndex={0} className='w-full'>
      <AccordionItem
        value={`item-${category.category}`}
        className='border-none'
      >
        <AccordionTrigger
          className='text-base font-semibold lg:font-medium'
          type='category'
        >
          {category.category}
        </AccordionTrigger>
        <AccordionContent className='flex flex-col gap-3 py-3'>
          {category.subCategories.map((sub: string, index: number) => (
            <div
              className='flex items-center gap-3  cursor-pointer'
              key={index}
            >
              <Checkbox id={`sub-${index + 1}`} className='w-[17px] h-[17px]' />
              <label
                htmlFor={`sub-${index + 1}`}
                className='text-[15px] font-medium  cursor-pointer'
              >
                {sub}
              </label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
