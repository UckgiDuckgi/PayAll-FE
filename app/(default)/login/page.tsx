'use client';

import Loading from '@/components/Loading';
import { LoginInput } from '@/components/molecules/sion/LoginInput';
import { PayAllLogo } from '@/components/ui/PayAllLogo';
import { Button } from '@/components/ui/button';
import { QUERY_KEYS } from '@/constants/queryKey';
import { usePostSignIn } from '@/hooks/query/auth';
import { useGenericMutation } from '@/hooks/query/globalQuery';
import { useThrottle } from '@/hooks/useThrottle';
import { PlatformType } from '@/types/authType';
import { TransformedOrder } from '@/types/payment';
import { FormEvent, useCallback, useState } from 'react';
import { getPlatform, postPaymentDetail } from '@/lib/api';
import { getBodyByPlatform, getFetchUrlByPlatfrom } from '@/lib/utils';

export default function LoginPage() {
  const { mutate: mutatePaymentDetails } = useGenericMutation(
    [QUERY_KEYS.PAYMENT_DETAILS],
    ({ paymentList }: { paymentList: TransformedOrder[] }) =>
      postPaymentDetail({ paymentList })
  );

  const [authId, setAuthId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getPaymentDetailPromises = (platformData: PlatformType) => {
    console.log('🚀 ~ getPaymentDetailPromises ~ platformData:', platformData);
    const promises = [];
    for (const { platformName, id, password } of platformData?.platformInfos ??
      []) {
      console.log(
        '🚀 ~ getPaymentDetailPromises ~ platformName:',
        platformName
      );
      promises.push(async () => {
        const response = await fetch(getFetchUrlByPlatfrom(platformName), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            getBodyByPlatform(platformName, id, password ?? '')
          ),
        });

        const { result } = await response.json();
        return result;
      });
    }
    return promises;
  };

  const getPaymentDetails = async () => {
    const platformData = await getPlatform();

    const paymentList = await Promise.all(
      getPaymentDetailPromises(platformData.data).map((asyncFunc) =>
        asyncFunc()
      )
    );

    mutatePaymentDetails({ paymentList: paymentList.flat() });
  };

  const { mutate } = usePostSignIn(getPaymentDetails, setIsLoading);

  const signIn = useCallback(async () => {
    if (!authId || !password) {
      return;
    }

    // setIsLoading(true);
    mutate({ authId, password });

    // const response = await apiCall.post(API_ROUTE.api + '/auth/sign-in', {
    //   authId,
    //   password,
    // });
    // console.log(response);
  }, [authId, password, mutate]);

  const throttledSignIn = useThrottle(signIn, 2000);

  const registerSignIn = async (e: FormEvent) => {
    e.preventDefault();
    throttledSignIn();
    console.log('dd');
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <form className='h-screen flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center pb-10'>
        <PayAllLogo width={200} height={100} />
      </div>
      <LoginInput title='아이디' onChange={setAuthId} />
      <div className='w-full mt-11 bg-white'></div>
      <LoginInput title='비밀번호' onChange={setPassword} type='password' />
      <div className='w-full mt-7 bg-white'></div>
      <Button
        variant='basic'
        type='submit'
        disabled={authId === '' || password === ''}
        onClick={registerSignIn}
      >
        로그인
      </Button>
      <div className='mt-[1.375rem] text-right w-full text-sm'>
        <a href='/register'>회원가입</a>
      </div>
    </form>
  );
}
