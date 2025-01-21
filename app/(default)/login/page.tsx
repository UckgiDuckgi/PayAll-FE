'use client';

import { LoginInput } from '@/components/molecules/sion/LoginInput';
import { IconIndicator } from '@/components/ui/IconIndicator';
import { Button } from '@/components/ui/button';
import { usePostSignIn } from '@/hooks/query/auth';
import { FormEvent, useEffect, useState } from 'react';

export default function LoginPage() {
  const { mutate } = usePostSignIn();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {}, [id, password]);

  const registerSignIn = (e: FormEvent) => {
    e.preventDefault();
    if (id === '' || password === '') return;
    mutate({ authId: id, password });
  };
  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center justify-center mt-40'>
        <IconIndicator src='/images/Logo.png' width={130} />
      </div>
      <LoginInput title='아이디' onChange={setId} />
      <div className='w-full mt-11 bg-white'></div>
      <LoginInput title='비밀번호' onChange={setPassword} type='password' />
      <div className='w-full mt-7 bg-white'></div>
      <Button
        variant='basic'
        disabled={id === '' || password === ''}
        onClick={registerSignIn}
      >
        로그인
      </Button>
      <div className='mt-[1.375rem] text-right w-full text-sm'>
        <a href='/register'>회원가입</a>
      </div>
    </div>
  );
}
