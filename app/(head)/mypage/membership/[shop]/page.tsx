'use client';

import { LoginInput } from '@/components/molecules/sion/LoginInput';
import { IconIndicator } from '@/components/ui/IconIndicator';
import { Button } from '@/components/ui/button';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericMutation } from '@/hooks/query/globalQuery';
import { Platform } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { postPlatform } from '@/lib/api';

export default function MembershipDetail({
  params,
}: {
  params: { shop: string };
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const { mutate } = useGenericMutation(
    [QUERY_KEYS.POST_PLATFORM],
    ({ id, password }: { id: string; password: string }) =>
      postPlatform({ platformName: params.shop as Platform, id, password }),
    {
      onSuccess: (data) => {
        if (data.code === 200) {
          router.push(`/mypage/membership`);
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PLATFORM] });
        }
      },
    }
  );

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
          onClick={() => mutate({ id, password })}
          variant='basic'
          disabled={id === '' || password === ''}
        >
          등록
        </Button>
      </div>
    </div>
  );
}
