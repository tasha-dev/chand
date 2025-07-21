// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useEffect } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/component/ui/command';
import { useSearchCommand } from '@/context/searchCommandContext';
import { DollarSign } from 'lucide-react';
import useCurrencys from '@/hook/useCurrencys';
import { sortValBy } from '@/lib/utils';

// Creating and exporting SearchCommand component as default
export default function SearchCommand(): ReactNode {
  // Defining hooks
  const { open, setOpen, toggle } = useSearchCommand();
  const currencys = useCurrencys({ inLocalStorage: true });

  // Using useEffect to open the modal while the ctrl + key is hit on keyboard
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Returning JSX
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder='Type the currency your looking for ...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Found'>
          {currencys.data.map((item, index) => (
            <CommandItem
              key={index}
              className='flex items-center justify-start gap-4'
              onSelect={() => {
                const element = document.getElementById(item.code);
                element?.scrollIntoView({ behavior: 'smooth' });
                setOpen(false);
              }}
            >
              <div className='aspect-square shrink-0 rounded-sm bg-foreground w-10 flex items-center justify-center'>
                <DollarSign className='w-4 h-4 text-background' />
              </div>
              <div className='w-full'>
                <span className='text-foreground text-sm block truncate text-left mb-2'>
                  {item.code}
                </span>
                <span className='text-foreground/50 text-xs block truncate text-left'>
                  {sortValBy(item.price)}
                </span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
