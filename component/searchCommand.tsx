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

// Creating and exporting SearchCommand component as default
export default function SearchCommand(): ReactNode {
  // Defining hooks
  const { open, setOpen, toggle } = useSearchCommand();

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
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
