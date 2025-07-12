// Codes by mahdi tasha
// Importing part
import { cn } from '@/lib/utils';
import { ContainerProps } from '@/type/component';
import { ReactNode } from 'react';

// Creating and exporting container component as default
export default function Container({
  children,
  className,
  variant = 'sm',
}: ContainerProps): ReactNode {
  // Returning JSX
  return (
    <div
      className={cn(
        'mx-auto',
        variant === 'sm' ? 'max-w-[800px]' : 'max-w-[1100px]',
        className,
      )}
    >
      {children}
    </div>
  );
}
