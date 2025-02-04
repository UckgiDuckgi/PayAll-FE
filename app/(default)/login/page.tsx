'use client';

import { LoginInput } from '@/components/molecules/sion/LoginInput';
import { PayAllLogo } from '@/components/ui/PayAllLogo';
import { Button } from '@/components/ui/button';
import { usePostSignIn } from '@/hooks/query/auth';
import { useThrottle } from '@/hooks/useThrottle';
import { FormEvent, useCallback, useState } from 'react';

export default function LoginPage() {
  const { mutate } = usePostSignIn();

  const [authId, setAuthId] = useState('');
  const [password, setPassword] = useState('');

  const signIn = useCallback(async () => {
    if (!authId || !password) return;
    mutate({ authId, password });
    // const response = await apiCall.post(API_ROUTE.api + '/auth/sign-in', {
    //   authId,
    //   password,
    // });
    // console.log(response);
  }, [authId, password, mutate]);

  const throttledSignIn = useThrottle(signIn, 2000);

  const registerSignIn = (e: FormEvent) => {
    e.preventDefault();
    throttledSignIn();
  };
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
