// Codes by mahdi tasha
// Importing part
import { currencyListContext } from '@/component/layout/page';
import { useCurrencysProps, useCurrencysResult } from '@/type/hook';
import { useContext } from 'react';
import useLocalStorageState from 'use-local-storage-state';

// Creating and exporting useCurrencys custom hook as default
export default function useCurrencys({
  inLocalStorage = false,
}: useCurrencysProps): useCurrencysResult {
  // Defining hooks
  const context = useContext(currencyListContext);
  const [savedItems] = useLocalStorageState<string[]>('savedItems', {
    defaultValue: [],
  });

  // Defining variables
  const contextVal = context ? Object.values(context) : [];
  const userList = contextVal.filter((item) =>
    savedItems ? savedItems.includes(item.code.toLowerCase()) : [],
  );

  // Returning paret
  return {
    data: inLocalStorage ? userList : contextVal,
  };
}
