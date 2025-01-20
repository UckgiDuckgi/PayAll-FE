'use client';

import { LinkedAccount } from '@/components/molecules/LinkedMembership';
import { useRouter } from 'next/navigation';

export default function Membership() {
  const router = useRouter();

  const MOCK_ACCOUNT_LIST = [
    {
      shop: 'Coupang',
      isLinked: true,
      accountInfo: {
        id: 'hanaro@hanaro.com',
        password: '**********',
      },
    },
    {
      shop: '11st',
      isLinked: false,
    },
    {
      shop: 'Gmarket',
      isLinked: false,
    },
    {
      shop: 'SSG',
      isLinked: false,
    },
    {
      shop: 'Auction',
      isLinked: false,
    },
  ];

  const handleLinking = (shop: string) => {
    router.push(`/mypage/membership/${shop}`);
  };

  return (
    <div className='mt-[2.625rem]'>
      {MOCK_ACCOUNT_LIST.map((account, index) => (
        <LinkedAccount
          key={index}
          shop={account.shop}
          isLinked={account.isLinked}
          accountInfo={account.accountInfo}
          onLinkClick={() => handleLinking(account.shop)}
        />
      ))}
    </div>
  );
}
