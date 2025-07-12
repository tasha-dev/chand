// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode } from 'react';
import Clock from './clock';
import { Button } from './ui/button';
import { SunMoon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

// Creating and exporting Header component as default
export default function Header(): ReactNode {
  // Defining hooks
  const { theme, setTheme } = useTheme();

  // Returning JSX
  return (
    <header className='flex items-center justify-between gap-3 lg:mb-4 mb-8'>
      <Link href='/'>
        <h3 className='truncate'>Chand ?!</h3>
      </Link>
      <div className='flex items-center justify-between gap-3'>
        <Clock />
        <Button
          size={'icon'}
          className='transition-all duration-200 active:scale-85 cursor-pointer'
          onClick={() => {
            theme === 'light' ? setTheme('dark') : setTheme('light');
          }}
        >
          <SunMoon />
        </Button>
      </div>
    </header>
  );
}
