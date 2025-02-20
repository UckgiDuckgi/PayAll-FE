'use client';

import Loading from '@/components/Loading';
import { LoginInput } from '@/components/molecules/sion/LoginInput';
import { IconIndicator } from '@/components/ui/IconIndicator';
import { Button } from '@/components/ui/button';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericMutation } from '@/hooks/query/globalQuery';
import { useToast } from '@/hooks/use-toast';
import { Platform } from '@/types';
import { TransformedOrder } from '@/types/payment';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { postPaymentDetail, postPlatform } from '@/lib/api';
import {
  getBodyByPlatform,
  getFetchUrlByPlatfrom,
  showToast,
} from '@/lib/utils';

export default function MembershipDetail({
  params,
}: {
  params: { shop: Platform };
}) {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useGenericMutation(
    [QUERY_KEYS.POST_PLATFORM],
    ({ id, password }: { id: string; password: string }) =>
      postPlatform({ platformName: params.shop, id, password }),
    {
      onSuccess: (data) => {
        if (data.code === 200) {
          if (from === 'accounts') {
            router.back();
          } else {
            router.push(
              from === 'payments' ? '/payments' : '/mypage/membership'
            );
          }

          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PLATFORM] });
          showToast(toast, '계정이 연동되었습니다.');
        }
      },
    }
  );

  const { mutate: mutatePaymentDetails } = useGenericMutation(
    [QUERY_KEYS.PAYMENT_DETAILS],
    ({ paymentList }: { paymentList: TransformedOrder[] }) =>
      postPaymentDetail({ paymentList })
  );

  const handleOnclick = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(getFetchUrlByPlatfrom(params.shop), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(getBodyByPlatform(params.shop, id, password)),
      });

      const { result } = await response.json();

      mutatePaymentDetails({ paymentList: result });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    mutate({ id, password });
    setIsLoading(false);
  };

  return (
    <div className='mt-8'>
      <IconIndicator
        src={`/images/vendors/${params.shop.toLowerCase()}.png`}
        height={30}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className='space-y-[1.375rem] my-16'>
            <LoginInput title='아이디' onChange={setId} />
            <LoginInput
              title='비밀번호'
              onChange={setPassword}
              type='password'
            />
          </div>
          <div className='fixed bottom-0 mb-[100px] max-w-[460px] w-[90%]'>
            <Button
              onClick={handleOnclick}
              variant='basic'
              disabled={id === '' || password === ''}
            >
              등록
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
