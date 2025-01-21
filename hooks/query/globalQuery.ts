import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { showToast } from '@/lib/utils';
import { useToast } from '../use-toast';

type MutationKey = string[] | readonly unknown[];
type QueryKey =
  | string[]
  | readonly (string | { [key: string]: string | number })[]
  | readonly unknown[];

type MutationFn<TVariables, TData> = (variables: TVariables) => Promise<TData>;
type QueryFn<TData> = (context: { queryKey: QueryKey }) => Promise<TData>;

export const useGenericMutation = <TVariables, TData>(
  mutationKey: MutationKey,
  mutationFn: MutationFn<TVariables, TData>,
  options?: {
    onSuccess?: (data: TData) => void;
    onError?: (error: Error) => void;
  }
) => {
  const { toast } = useToast();

  return useMutation<TData, Error, TVariables>({
    mutationKey,
    mutationFn,
    onSuccess: (data) => {
      if (options?.onSuccess) {
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
  options?: UseQueryOptions<TData, Error>
) => {
  return useQuery<TData, Error>({
    queryKey,
    queryFn,
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    ...options,
  });
};
