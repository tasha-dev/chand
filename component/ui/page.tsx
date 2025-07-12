// Codes by mahdi tasha
// Importing part
import { cn } from '@/lib/utils';
import { PageProps } from '@/type/component';
import { ReactNode } from 'react';
import Header from '../header';
import BottomBar from '../bottomBar';
import Container from './container';

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
        'bg-background min-h-screen text-foreground lg:p-3 p-6',
        className,
      )}
    >
      <BottomBar />
      <Container variant={variant}>
        <Header />
        {children}
      </Container>
    </div>
  );
}
