'use client';

import Loading from '@/components/Loading';
import { Modal } from '@/components/molecules/ui/Modal';
import { Button } from '@/components/ui/button';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericQuery } from '@/hooks/query/globalQuery';
import { User } from '@/types';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getUserInfo } from '@/lib/api';

export default function MyPage() {
  const router = useRouter();

  const { resData: userData, isLoading } = useGenericQuery<Partial<User>>(
    [QUERY_KEYS.User],
    () => getUserInfo()
  );

  const routerPage = (route: string) => {
    router.push(route);
  };

  if (!userData || !userData.data || isLoading) return <Loading />;

  const { name, authId, phone, address } = userData.data;

  return (
    <>
      <div className='bg-deepDarkGrey px-[1.875rem] py-[2.125rem] absolute left-1/2 transform -translate-x-1/2 w-screen max-w-[512px]'>
        <div className='flex items-center mb-[1.5625rem]'>
          <Image
            src='/images/User.png'
            alt='User profile'
            width={60}
            height={60}
          />
          <span className='text-base ml-[1.125rem]'>
            <a className='text-2xl font-semibold  border-main mr-[0.375rem]'>
              {name}
            </a>
            님
          </span>
        </div>
        <div className='flex justify-center items-center'>
          <div className='w-[25rem] h-[5.8125rem] rounded-lg bg-white px-[1.6875rem] py-5'>
            <div className='flex justify-between mb-3'>
              <span className='text-[#2B2B2B] text-sm'>아이디</span>
              <span className='text-[#666666] text-sm'>{authId}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-[#2B2B2B] text-sm'>휴대폰 번호</span>
              <span className='text-[#666666] text-sm'>{phone}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='py-[1.875rem] text-white pt-72'>
        <div className='space-y-3'>
          <Modal title='배송지' description={address} btnText='확인'>
            <div className='cursor-pointer flex justify-between items-center py-[0.34375rem]'>
              <span>배송지 정보</span>
              <ChevronRight className='text-[#999999]' />
            </div>
          </Modal>

          <div
            className='cursor-pointer flex justify-between items-center py-[0.34375rem]'
            onClick={() => routerPage('/mypage/membership')}
          >
            <span>연동 계정 관리</span>
            <ChevronRight className='text-[#999999]' />
          </div>
          <hr className='border-t-1 border-[#D9D9D9]' />
          <div className='flex justify-between items-center py-[0.34375rem]'>
            <span>고객 센터</span>
            <Link href='/customer'>
              <ChevronRight className='text-[#999999]' />
            </Link>
          </div>
          <div className='flex justify-between items-center py-[0.34375rem]'>
            <span>이용 약관</span>
            <ChevronRight className='text-[#999999]' />
          </div>
        </div>
      </div>
      <p className='w-full text-right'>
        <Button type='button' onClick={() => routerPage('login')}>
          로그아웃
        </Button>
      </p>
    </>
  );
}
