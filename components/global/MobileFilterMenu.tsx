import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { CategoryMenu } from './CategoryMenu';
import CountryMenu from './CountryMenu';

import YearRangePicker from './YearRangePicker';
import { categoriesFilter, countries } from '@/utils/constants';

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
              {categoriesFilter.map((category, i) => (
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
          {filter.id === 'year' && <YearRangePicker />}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
