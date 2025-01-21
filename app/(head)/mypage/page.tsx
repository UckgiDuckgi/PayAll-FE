'use client';

import { Modal } from '@/components/molecules/ui/Modal';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type UserData = {
  name: string;
  id: string;
  phone: string;
  address: string;
};

export default function MyPage() {
  const router = useRouter();

  const toMembershipPage = () => {
    router.push('/mypage/membership');
  };

  const MOCK_USER: UserData = {
    name: '문해빈',
    id: 'slrspdla',
    phone: '010-2222-1111',
    address:
      '서울 성동구 뚝섬로1가길 17 (성수동1가, 얼리브홈 서울숲), 503호 [04779]',
  };

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
              {MOCK_USER.name}
            </a>
            님
          </span>
        </div>
        <div className='flex justify-center items-center'>
          <div className='w-[25rem] h-[5.8125rem] rounded-lg bg-white px-[1.6875rem] py-5'>
            <div className='flex justify-between mb-3'>
              <span className='text-[#2B2B2B] text-sm'>아이디</span>
              <span className='text-[#666666] text-sm'>{MOCK_USER.id}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-[#2B2B2B] text-sm'>휴대폰 번호</span>
              <span className='text-[#666666] text-sm'>{MOCK_USER.phone}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='py-[1.875rem] text-white pt-72'>
        <div className='space-y-3'>
          <Modal title='배송지' description={MOCK_USER.address} btnText='확인'>
            <div className='flex justify-between items-center py-[0.34375rem]'>
              <span>배송지 정보</span>
              <ChevronRight className='text-[#999999]' />
            </div>
          </Modal>

          <div className='flex justify-between items-center py-[0.34375rem]'>
            <span>연동 계정 관리</span>
            <ChevronRight
              className='text-[#999999]'
              onClick={toMembershipPage}
            />
          </div>
          <hr className='border-t-1 border-[#D9D9D9]' />
          <div className='flex justify-between items-center py-[0.34375rem]'>
            <span>고객 센터</span>
            <ChevronRight className='text-[#999999]' />
          </div>
          <div className='flex justify-between items-center py-[0.34375rem]'>
            <span>이용 약관</span>
            <ChevronRight className='text-[#999999]' />
          </div>
        </div>
      </div>
    </>
  );
}
