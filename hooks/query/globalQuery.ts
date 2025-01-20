'use client';

import { useMutation } from '@tanstack/react-query';
import { showToast } from '@/lib/utils';
import { useToast } from '../use-toast';

export const useGenericMutation = <TVariables, TData>(
  mutationKey: any,
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    onSuccess?: (data: TData) => void;
    onError?: (error: any) => void;
  }
) => {
  const { toast } = useToast();
  // const router = useRouter();

  return useMutation<TData, any, TVariables>({
    mutationKey,
    mutationFn,
    onSuccess: (data) => {
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
      showToast(toast, '작업이 성공적으로 완료되었습니다!');
    },
    onError: (error) => {
      if (options?.onError) {
        options.onError(error);
      } else {
        showToast(toast, error.message || '에러가 발생했습니다.');
      }
    },
  });
};

// export const useGenericQuery = (
//   queryKey: any[],
//   queryFn: () => any,
//   options = {}
// ) => {
//   const { toast } = useToast();

//   return useQuery({
//     queryKey,
//     queryFn,
//     onError: (error) => {
//       showToast(toast, error.message || '데이터 로드 중 에러가 발생했습니다.');
//     },
//     ...options,
//   });
// };
