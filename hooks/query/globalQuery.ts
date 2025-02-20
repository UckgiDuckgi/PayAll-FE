import { ApiResponse } from '@/types/table';
import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { showToast } from '@/lib/utils';
import { useToast } from '../use-toast';

type MutationKey = string[] | readonly unknown[];
type QueryKey =
  | string[]
  | readonly (string | { [key: string]: string | number })[]
  | readonly unknown[];

type MutationFn<TVariables, TData> = (variables: TVariables) => Promise<TData>;
type QueryFn<T> = (context: { queryKey: QueryKey }) => Promise<T>;

export const useGenericMutation = <TVariables>(
  mutationKey: MutationKey,
  mutationFn: MutationFn<TVariables, ApiResponse<null>>,
  options?: {
    onSuccess?: (data: ApiResponse<null>) => void;
    onError?: (error: Error) => void;
  }
) => {
  const { toast } = useToast();

  return useMutation<ApiResponse<null>, Error, TVariables>({
    mutationKey,
    mutationFn,
    onSuccess: (data: ApiResponse<null>) => {
      if (options?.onSuccess) {
        if (400 <= data.code && data.code < 500) {
          showToast(toast, data.message);
        } else if (data.code >= 500) {
          showToast(toast, '에러가 발생하였습니다.');
        }
        options.onSuccess(data);
      }
    },
    onError: (error) => {
      if (options?.onError) {
        options.onError(error);
      } else {
        showToast(toast, error.message || 'An error occurred.');
      }
    },
  });
};

export const useGenericQuery = <TData>(
  queryKey: QueryKey,
  queryFn: QueryFn<TData>,
  options?: Omit<UseQueryOptions<TData, Error>, 'queryKey' | 'queryFn'>
) => {
  const { data, isLoading } = useQuery<TData, Error>({
    queryKey,
    queryFn,
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    ...options,
  });
  const resData = data as ApiResponse<TData>;

  return { resData, isLoading };
};
