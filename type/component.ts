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

export interface ContainerProps {
  children: ReactNode;
  className?: string;
  variant?: 'sm' | 'lg';
}

export interface AboutModalProps {
  setLocalStorageItem: (val: boolean) => void;
}

export interface SearchCommandProviderProps {
  children: ReactNode;
}

export interface SearchCommandProps {
  data: {
    slug: string;
    name: string;
    price: number;
  }[];
}
