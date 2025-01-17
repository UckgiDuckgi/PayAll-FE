'use client';

import { LoginInput } from '@/components/molecules/sion/LoginInput';
import { IconIndicator } from '@/components/ui/IconIndicator';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function MembershipDetail({
  params,
}: {
  params: { shop: string };
}) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='mt-8'>
      <IconIndicator src={`/images/${params.shop}.png`} height={30} />
      <div className='space-y-[1.375rem] my-16'>
        <LoginInput title='아이디' onChange={setId} />
        <LoginInput title='비밀번호' onChange={setPassword} type='password' />
      </div>
      <div className='fixed bottom-0 mb-[100px] max-w-[460px] w-[90%]'>
        <Button variant='basic' disabled={id === '' || password === ''}>
          등록
        </Button>
      </div>
    </div>
  );
}
