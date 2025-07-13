// Codes by mahdi tasha
// Importing part
import { sortValByOptions } from '@/type/util';
import { clsx, type ClassValue } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

// Creating and exporting cn function which takes array of class values and merges them to gether with clsx and twMerge functions
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Defining a function to sort given value by options
export function sortValBy(
  val: number | string,
  options?: sortValByOptions,
): string {
  const groupBy = options?.groupBy || 3;
  const seprator = options?.seprator || ',';

  const convertedVal = val.toString();
  const regexp = new RegExp(`\\B(?=(\\d{${groupBy}})+(?!\\d))`, 'g');

  return convertedVal.replace(regexp, seprator);
}

// Defining a function to copy the given value
export function copyVal(val: string | number) {
  const convertedVal = val.toString();

  navigator.clipboard
    .writeText(convertedVal)
    .then(() => {
      toast(`The Text is copied : ${convertedVal}`);
    })
    .catch((error) => console.error(error));
}
