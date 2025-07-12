// Codes by mahdi tasha
// Importing part
import { ReactNode } from 'react';

// Creating and exporting type of props in components
export interface RootLayoutProps {
  children: ReactNode;
}

export interface PageProps {
  children: ReactNode;
  variant?: 'sm' | 'lg';
  className?: string;
}

export interface ClockProps {
  className?: string;
}

export interface RateProps {
  img?: string;
  name: string;
  slug: string;
  price: number;
  className?: string;
  status: {
    name: 'up' | 'down' | 'same';
    number: number;
  };
}
