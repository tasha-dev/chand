// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode } from 'react';
import Container from './ui/container';
import { Code, Ellipsis, Search, SunMoon } from 'lucide-react';
import { DropdownMenuContent } from './ui/dropdown-menu';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/component/ui/button';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/component/ui/dropdown-menu';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/component/ui/drawer';
import { useSearchCommand } from '@/context/searchCommandContext';
import AddCurrency from './dialog/addCurrency';

// Creating and exorting footer component as default
export default function BottomBar(): ReactNode {
  // Defining hooks
  const { theme, setTheme } = useTheme();
  const searchCommand = useSearchCommand();

  // Retutning JSX
  return (
    <div className='fixed bottom-0 pb-5 left-0 w-full z-50 bg-gradient-to-t from-background to-transparent pointer-events-none'>
      <Container className='bg-foreground/20 backdrop-blur-xl border border-foreground/20 rounded-[50rem] px-4 lg:py-4 py-3 shadow-xl transition-all duration-300 lg:scale-95 active:scale-90 lg:max-w-[800px] md:max-w-[500px] max-w-[100px] flex items-center justify-between overflow-hidden pointer-events-auto'>
        <AddCurrency />
        <span className='text-foreground/80 text-right text-xs font-medium truncate lg:block hidden'>
          Chand ?!
        </span>
        <div className='lg:block hidden'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className='block shrink-0 cursor-pointer'>
                <Ellipsis className='w-4 h-4 text-foreground' />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => searchCommand.toggle()}
                className='cursor-pointer outline-none'
              >
                <Search className='w-4 h-4 shrink-0' />
                Search
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href='https://tasha.vercel.app/'
                  className='flex items-center justify-start gap-3 cursor-pointer'
                >
                  <Code className='w-4 h-4 shrink-0' />
                  Mahdi Tasha
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className='cursor-pointer outline-none'
                onClick={() => {
                  theme === 'light' ? setTheme('dark') : setTheme('light');
                }}
              >
                <SunMoon className='w-4 h-4 shrink-0' />
                Toggle Theme
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='lg:hidden block'>
          <Drawer>
            <DrawerTrigger>
              <button className='block shrink-0 cursor-pointer'>
                <Ellipsis className='w-4 h-4 text-foreground' />
              </button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Options</DrawerTitle>
              </DrawerHeader>
              <div className='flex flex-col gap-4 p-4'>
                <Button
                  className='flex items-center justify-start cursor-pointer'
                  variant={'outline'}
                  onClick={() => searchCommand.toggle()}
                >
                  <Search className='w-4 h-4 shrink-0' />
                  Search
                </Button>
                <Link href='https://tasha.vercel.app/' className='block w-full'>
                  <Button
                    tabIndex={-1}
                    className='flex items-center justify-start cursor-pointer w-full'
                    variant={'outline'}
                  >
                    <Code className='w-4 h-4 shrink-0' />
                    Mahdi Tasha
                  </Button>
                </Link>
                <Button
                  className='flex items-center justify-start cursor-pointer'
                  variant={'outline'}
                  onClick={() => {
                    theme === 'light' ? setTheme('dark') : setTheme('light');
                  }}
                >
                  <SunMoon className='w-4 h-4 shrink-0' />
                  Toggle Theme
                </Button>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button>Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </Container>
    </div>
  );
}
