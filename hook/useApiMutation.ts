// Importing part
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import currencyApi from '@/lib/axios';
import { useApiMutationProps } from '@/type/hook';

// creating and Exporting useApiMutation custom hook as default
// Used for non-get methods (CRUD)
export default function useApiMutation<TData = unknown, TVariables = unknown>({
  url,
  method,
  options,
}: useApiMutationProps<TData, TVariables>) {
  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: async (variables) => {
      const isFullUrl = /^https?:\/\//i.test(url);
      const client = isFullUrl ? axios : currencyApi;

      const isFormData = variables instanceof FormData;

      const { data } = await client.request<TData>({
        url,
        method: method.toUpperCase(),
        data: variables,
        headers: isFormData
          ? { 'Content-Type': 'multipart/form-data' }
          : undefined,
      });

      return data;
    },
    onError: (error, variables, context) => {
      console.error('Mutation Error:', error.response?.data || error.message);
      options?.onError?.(error, variables, context);
    },
    onSuccess: options?.onSuccess,
    ...options,
  });
}
