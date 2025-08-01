// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { RateProps } from '@/type/component';
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import Image from 'next/image';
import { cn, copyVal, sortValBy } from '@/lib/utils';
import {
  ArrowDown,
  ArrowUp,
  ClipboardType,
  DollarSignIcon,
  Trash,
} from 'lucide-react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from '@/component/ui/context-menu';
import useLocalStorageState from 'use-local-storage-state';
import { toast } from 'sonner';

// Creating and exporting Rate component as default
export default function Rate({
  className,
  name,
  price,
  slug,
  status,
  img,
}: RateProps): ReactNode {
  // Defining hooks
  const [savedItems, setSavedItems] =
    useLocalStorageState<string[]>('savedItems');

  // Returning JSX
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card
          id={slug}
          className={cn(
            'md:aspect-square flex items-center justify-between md:gap-3 gap-12 flex-col cursor-pointer transition-all duration-200 active:scale-95 select-none',
            className,
          )}
        >
          <CardHeader className='flex items-center justify-between w-full'>
            {img ? (
              <Image
                alt={slug}
                src={img}
                width={50}
                height={50}
                className='w-7 h-7 shrink-0 bg-foreground rounded-full object-cover'
              />
            ) : (
              <div className='w-7 h-7 shrink-0 bg-foreground rounded-full' />
            )}
            <div>
              <span className='text-foreground block text-left truncate text-sm mb-1'>
                {name}
              </span>
              <span className='dark:text-slate-500 text-slate-400 text-right text-xs font-medium truncate block'>
                {slug}
              </span>
            </div>
          </CardHeader>
          <CardContent className='w-full'>
            {status.name !== 'same' && (
              <div
                className={cn(
                  'flex items-center justify-start gap-2 mb-2',
                  status.name === 'up' ? 'text-green-500' : 'text-red-500',
                )}
              >
                {status.name === 'up' ? (
                  <ArrowUp className='w-3 h-3 text-current shrink-0' />
                ) : (
                  <ArrowDown className='w-3 h-3 text-current shrink-0' />
                )}
                <span className='text-xs font-medium block text-left truncate'>
                  {status.number ? sortValBy(status.number) : 0}
                </span>
              </div>
            )}
            <span className='scroll-m-20 text-2xl font-semibold tracking-tight block text-left truncate'>
              {sortValBy(price)}
            </span>
          </CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          className='cursor-pointer'
          onClick={() => {
            const savedItemsCopy = savedItems ? [...savedItems] : [];
            const removedSavedItem = savedItemsCopy.filter(
              (item) => item.toLowerCase() !== slug,
            );

            setSavedItems(removedSavedItem);
            toast('The item is deleted !');
          }}
        >
          <Trash className='w-4 h-4 shrink-0' />
          Delete Item
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={() => copyVal(price)}
          className='cursor-pointer'
        >
          <DollarSignIcon className='w-4 h-4 shrink-0' />
          Copy Value
        </ContextMenuItem>

        <ContextMenuItem
          onClick={() => copyVal(name)}
          className='cursor-pointer'
        >
          <ClipboardType className='w-4 h-4 shrink-0' />
          Copy Name
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => copyVal(slug)}
          className='cursor-pointer'
        >
          <ClipboardType className='w-4 h-4 shrink-0' />
          Copy Slug name
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
