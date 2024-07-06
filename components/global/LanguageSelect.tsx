import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export const LanguageSelect = ({
  language,
  setLanguage,
}: {
  language: string;
  setLanguage: (newLocale: string) => void;
}) => (
  <Select value={language} onValueChange={setLanguage}>
    <SelectTrigger className='w-[50px] px-[8px] py-[10px]'>
      <SelectValue className='text-sm' placeholder='En' />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem className='text-sm' value='en'>
          EN
        </SelectItem>
        <SelectItem className='text-sm' value='fr'>
          FR
        </SelectItem>
        <SelectItem className='text-sm' value='de'>
          DE
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
);
