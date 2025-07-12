// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode } from 'react';
import Container from './ui/container';
import { Code, Ellipsis, Plus, SunMoon } from 'lucide-react';
import { DropdownMenuContent } from './ui/dropdown-menu';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/component/ui/dropdown-menu';

// Creating and exorting footer component as default
export default function BottomBar(): ReactNode {
  // Defining hooks
  const { theme, setTheme } = useTheme();

  // Retutning JSX
  return (
    <div className='fixed bottom-5 left-0 w-full z-50'>
      <Container className='bg-foreground/20 backdrop-blur-xl border border-foreground/20 rounded-[50rem] px-4 lg:py-4 py-3 shadow-xl transition-all duration-300 lg:scale-95 active:scale-90 lg:max-w-[800px] md:max-w-[500px] max-w-[100px] flex items-center justify-between overflow-hidden'>
        <button className='block shrink-0 cursor-pointer outline-none'>
          <Plus className='w-4 h-4 text-foreground' />
        </button>
        <span className='text-foreground/80 text-right text-xs font-medium truncate lg:block hidden'>
          Chand ?!
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className='block shrink-0 cursor-pointer'>
              <Ellipsis className='w-4 h-4 text-foreground' />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link
                href='https://tasha.vercel.app/'
                className='flex items-center justify-start gap-3 cursor-pointer'
              >
                <Code className='w-4 h-4' />
                Mahdi Tasha
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className='cursor-pointer outline-none'
              onClick={() => {
                theme === 'light' ? setTheme('dark') : setTheme('light');
              }}
            >
              <SunMoon className='w-4 h-4' />
              Toggle Theme
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Container>
    </div>
  );
}
