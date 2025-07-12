// Codes by mahdi tasha
// Importing part
import { cn } from '@/lib/utils';
import { PageProps } from '@/type/component';
import { ReactNode } from 'react';
import Header from '../header';

// Creating and exporting page component as default
export default function Page({
  children,
  className,
  variant = 'sm',
}: PageProps): ReactNode {
  // Returning JSX
  return (
    <div
      className={cn(
        'bg-background min-h-screen text-foreground p-3',
        className,
      )}
    >
      <div
        className={cn(
          'mx-auto',
          variant === 'sm' ? 'max-w-[800px]' : 'max-w-[1100px]',
        )}
      >
        <Header />
        {children}
      </div>
    </div>
  );
}
