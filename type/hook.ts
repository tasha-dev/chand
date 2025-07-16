// Codes by mahdi tasha
// Importing part
import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

// Creating and exporting type of props in hooks
export interface useApiQueryProps<T> {
  url: string;
  queryKey: string[];
  options?: Omit<
    UseQueryOptions<T, Error, T, string[]>,
    'queryKey' | 'queryFn'
  >;
}

export interface useApiMutationProps<TData, TVariables> {
  url: string;
  method: 'post' | 'put' | 'delete' | 'patch';
  options?: UseMutationOptions<TData, Error, TVariables>;
}

export interface PaginationResult<T> {
  currentPage: number;
  totalPages: number;
  paginatedData: T[];
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}
