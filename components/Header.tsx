'use client';

import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericQuery } from '@/hooks/query/globalQuery';
import { Cart } from '@/types';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getCart } from '@/lib/api';

function Header() {
  return (
    <header className='h-[3.75rem] z-50 mx-auto fixed top-0 w-full max-w-[512px] flex justify-between items-center pt-4 pb-3 pr-8 pl-6 bg-background'>
      <HeaderIcon />
      <HeaderCart />
    </header>
  );
}

const HeaderIcon = () => {
  const pathname = usePathname();
  const router = useRouter();

  const homeRoute = ['/', '/search', '/accounts', '/statistics', '/mypage'];
  return (
    <>
      {homeRoute.includes(pathname) ? (
        <Link href='/'>
          <Image src='/images/Logo.png' alt='logo' width={50} height={15} />
        </Link>
      ) : (
        <span onClick={() => router.back()}>
          <ChevronRight className='text-[#ffffff] rotate-180' />
        </span>
      )}
    </>
  );
};

const HeaderCart = () => {
  const { resData: cartList } = useGenericQuery<Cart[]>(
    [QUERY_KEYS.CART_LIST],
    () => getCart()
  );
  return (
    <div className='flex items-center'>
      <Link href='/cart'>
        <Image src='/icons/HeaderCart.svg' alt='cart' width={26} height={26} />
        <span className='text-black bg-white rounded-full w-[0.875rem] h-[0.875rem] flex justify-center items-center text-[0.625rem] font-bold absolute top-4 right-6'>
          {cartList?.data?.length}
        </span>
      </Link>
    </div>
  );
};

export default Header;
