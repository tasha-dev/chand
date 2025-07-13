// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { SearchCommandProviderProps } from '@/type/component';
import { SearchCommandContextType } from '@/type/context';
import { createContext, useContext, useState } from 'react';

// Defining search command context
const SearchCommandContext = createContext<
  SearchCommandContextType | undefined
>(undefined);

// Creating and exporting SearchCommandProvider as defualt
export default function SearchCommandProvider({
  children,
}: SearchCommandProviderProps) {
  // Defining states of component
  const [open, setOpen] = useState(false);

  // Defining toggle function
  const toggle = () => setOpen((prev) => !prev);

  // Returning JSX
  return (
    <SearchCommandContext.Provider value={{ open, setOpen, toggle }}>
      {children}
    </SearchCommandContext.Provider>
  );
}

export function useSearchCommand() {
  // Defining hooks
  const context = useContext(SearchCommandContext);

  // Returning Context if existed, otherwise and error
  if (!context)
    throw new Error(
      'useSearchCommand must be used inside SearchCommandProvider',
    );
  return context;
}
