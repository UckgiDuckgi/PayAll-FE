'use client';

import { LoginInput } from '@/components/molecules/sion/LoginInput';
import { IconIndicator } from '@/components/ui/IconIndicator';
import { Button } from '@/components/ui/button';
import { QUERY_KEYS } from '@/constants/queryKey';
import { API_ROUTE } from '@/constants/route';
import {
  COUPANG_PAYMENT_DETAIL_URL,
  ELEVENSTREET_PAYMENT_DETAIL_URL,
  NAVERPAY_PAYMENT_DETAIL_URL,
} from '@/constants/url';
import { useGenericMutation } from '@/hooks/query/globalQuery';
import { Platform } from '@/types';
import { TransformedOrder } from '@/types/payment';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { postPaymentDetail, postPlatform } from '@/lib/api';

export default function MembershipDetail({
  params,
}: {
  params: { shop: Platform };
}) {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  const router = useRouter();
  const queryClient = useQueryClient();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const { mutate } = useGenericMutation(
    [QUERY_KEYS.POST_PLATFORM],
    ({ id, password }: { id: string; password: string }) =>
      postPlatform({ platformName: params.shop, id, password }),
    {
      onSuccess: (data) => {
        if (data.code === 200) {
          router.push(from === 'payments' ? `/payments` : `/mypage/membership`);

          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PLATFORM] });
        }
      },
    }
  );

  const { mutate: mutatePaymentDetails } = useGenericMutation(
    [QUERY_KEYS.PAYMENT_DETAILS],
    ({ paymentList }: { paymentList: TransformedOrder[] }) =>
      postPaymentDetail({ paymentList })
  );

  const getUrlByPlatform = () =>
    params.shop === 'COUPANG'
      ? COUPANG_PAYMENT_DETAIL_URL
      : params.shop === '11ST'
        ? ELEVENSTREET_PAYMENT_DETAIL_URL
        : NAVERPAY_PAYMENT_DETAIL_URL;

  const getBodyByPlatform = () => {
    const commonObj = {
      url: getUrlByPlatform(),
      id,
      pw: password,
    };
    return params.shop === 'COUPANG'
      ? {
          ...commonObj,
          requestYear: 2024,
          pageIndex: 0,
          size: 10,
        }
      : params.shop === '11ST'
        ? {
            ...commonObj,
            shDateFrom: '20200701',
            shDateTo: '20250119',
            pageNumber: 1,
            rows: 10,
          }
        : {
            ...commonObj,
          };
  };

  const handleOnclick = async () => {
    try {
      const response = await fetch(API_ROUTE.payment_details.coupang, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(getBodyByPlatform()),
      });

      const { result } = await response.json();

      mutatePaymentDetails({ paymentList: result });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    mutate({ id, password });
  };

  return (
    <div className='mt-8'>
      <IconIndicator
        src={`/images/vendors/${params.shop.toLowerCase()}.png`}
        height={30}
      />
      <div className='space-y-[1.375rem] my-16'>
        <LoginInput title='아이디' onChange={setId} />
        <LoginInput title='비밀번호' onChange={setPassword} type='password' />
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
    </div>
  );
}
