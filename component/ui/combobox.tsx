'use client';

import * as React from 'react';
import { CheckIcon, ChevronsUpDownIcon, DollarSign } from 'lucide-react';

import { cn, sortValBy } from '@/lib/utils';
import { Button } from '@/component/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/component/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/component/ui/popover';

export interface ComboboxItem {
  value: string;
  label: string;
}

interface ComboboxProps {
  items: ComboboxItem[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function Combobox({
  items,
  value,
  onChange,
  placeholder = 'Select...',
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn('justify-between w-full', className)}
        >
          {value && value !== '' ? value : placeholder}
          <ChevronsUpDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0'>
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.label}
                  className='flex items-center justify-start gap-4'
                  onSelect={(currentValue) => {
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  <div className='aspect-square shrink-0 rounded-sm bg-foreground w-10 flex items-center justify-center'>
                    <DollarSign className='w-4 h-4 text-background' />
                  </div>
                  <div className='w-full'>
                    <span className='text-foreground text-sm block truncate text-left mb-2'>
                      {item.label}
                    </span>
                    <span className='text-foreground/50 text-xs block truncate text-left'>
                      {item.value}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
