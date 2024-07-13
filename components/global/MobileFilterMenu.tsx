import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { categories } from './CategoryFilter';
import { CategoryMenu } from './CategoryMenu';
import CountryMenu from './CountryMenu';
import { countries } from './CountryFilter';
import YearRangeInput from './YearRangeInput';

export function MobileFilterMenu({ filter }: any) {
  return (
    <Accordion type='single' collapsible tabIndex={0} className='w-full'>
      <AccordionItem value={`item-${filter.name}`}>
        <AccordionTrigger className='text-sm lg:text-base'>
          {filter.name}
        </AccordionTrigger>
        <AccordionContent className='flex flex-col py-3'>
          {filter.id === 'category' && (
            <>
              {categories.map((category, i) => (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  key={i}
                  className='cursor-pointer'
                >
                  <CategoryMenu category={category} />
                </div>
              ))}
            </>
          )}
          {filter.id === 'country' && (
            <>
              {countries.map((country, i) => (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  key={i}
                  className='cursor-pointer my-1'
                >
                  <CountryMenu country={country} />
                </div>
              ))}
            </>
          )}
          {filter.id === 'year' && <YearRangeInput />}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
