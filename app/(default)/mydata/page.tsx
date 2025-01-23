'use client';

import { PayAllLogo } from '@/components/ui/PayAllLogo';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { cn } from '@/lib/utils';

function MyDataContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const complete = searchParams.get('complete');

  const handleTerms = () => {
    if (!complete) {
      alert('약관을 동의해주세요.');
      return;
    }
    router.push(`/mydata/terms?complete=${true}`);
  };

  return (
    <div className='h-[100dvh] flex flex-col items-center justify-center'>
      <PayAllLogo width={200} height={120} />
      <div className='space-y-3 text-center font-bold mt-10 text-[1rem]'>
        <p>더 원활한 서비스 이용을 위해</p>
        <p>마이데이터를 연동할게요.</p>
      </div>
      <div className='fixed bottom-8 w-[90%] max-w-[460px]'>
        <Link
          href='/mydata/terms'
          className='space-x-2 mb-5 flex items-center justify-start w-fit mx-4'
        >
          <Checkbox checked={!!complete} />
          <span className='rounded-full'>약관 동의하기</span>
        </Link>
        <div className='flex items-center justify-between'>
          <Button
            disabled={!complete}
            className={cn(
              'w-full text-white',
              complete ? 'bg-main hover:bg-[#476BE3]' : 'bg-grey'
            )}
            onClick={handleTerms}
          >
            <span>연동하기</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyDataContent />
    </Suspense>
  );
}
