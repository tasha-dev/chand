// Codes by mahdi tasha
// Importing part
import { ComboboxItem } from '@/component/ui/combobox';
import { ReactNode } from 'react';
import { Control } from 'react-hook-form';

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

export interface CurrencySelectorFormItemProps {
  name: string;
  label: string;
  control: Control<any>;
  items: ComboboxItem[];
  onNext: () => void;
  onPrev: () => void;
  canNext: boolean;
  canPrev: boolean;
}
