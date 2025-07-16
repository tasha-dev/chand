// Importing part
import currencyApi from '@/lib/axios';
import { useApiQueryProps } from '@/type/hook';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

// Add Bearer Token from localStorage if exists
currencyApi.interceptors.request.use(
  (config) => {
    const localStorageItem = localStorage.getItem('AUTH_VALUE');
    const parsedLocalStorageItem =
      localStorageItem && JSON.parse(localStorageItem).accessUID;

    if (parsedLocalStorageItem) {
      config.headers.Authorization = `Bearer ${parsedLocalStorageItem}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Creating and exporting useApiQuery function which is a mix of axios and react query to fetch given url (the project apis)
export function useApiQuery<T>({
  url,
  queryKey,
  options,
}: useApiQueryProps<T>): UseQueryResult<T, Error> {
  return useQuery<T, Error, T, string[]>({
    queryKey,
    queryFn: async () => {
      const isFullUrl = /^https?:\/\//i.test(url);
      const client = isFullUrl ? axios : currencyApi;
      const { data } = await client.get<T>(url);
      return data;
    },
    ...options,
  });
}
