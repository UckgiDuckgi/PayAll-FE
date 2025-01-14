'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type NavItem = {
  name: string;
  icon: string;
  route: string;
};

export const NavIcons: NavItem[] = [
  {
    name: '홈',
    icon: '/icons/home.svg',
    route: '',
  },
  {
    name: '최저가검색',
    icon: '/icons/Search.svg',
    route: 'search',
  },
  { name: '지출내역', icon: '/icons/List.svg', route: 'list' },
  {
    name: '소비분석',
    icon: '/icons/Chart.svg',
    route: 'chart',
  },
  {
    name: '마이페이지',
    icon: '/icons/Profile.svg',
    route: 'mypage',
  },
];

type NavItemProps = {
  icon: string;
  name: string;
  route: string;
};

const Item = ({ icon: Icon, name, route }: NavItemProps) => {
  const router = useRouter();
  const selectedPath = '/';
  // location.pathname === ''
  //   ? location.pathname
  //   : location.pathname.split('/').slice(1, 3).join('/');
  const iconFill = selectedPath === route.split('?')[0] ? '#777777' : '#D9D9D9';

  const handleRoute = () => {
    router.push(`/${route}`);
  };

  return (
    <div
      className={`flex h-[2.625rem] w-[2.625rem] cursor-pointer items-center justify-center ${
        name === '' ? 'rounded-xl' : ''
      }`}
    >
      <div
        className='flex flex-col items-center gap-1 whitespace-nowrap'
        onClick={handleRoute}
      >
        <Image
          src={Icon}
          alt={name}
          width={20}
          height={20}
          className={`${iconFill ? 'fill-border' : 'fill-[#777777]'}`} // 선택 상태에 따른 스타일
        />
        {name && (
          <span
            className={cn(
              'text-[0.75rem]',
              iconFill ? 'text-white' : 'text-[#D9D9D9]',
              iconFill ? 'font-bold' : 'font-medium'
            )}
          >
            {name}
          </span>
        )}
      </div>
    </div>
  );
};

const Nav = () => {
  return (
    <nav className='fixed bottom-0 z-[50] flex items-center justify-around bg-[#2B2B2B] py-5 w-full max-w-[512px]'>
      {NavIcons.map((item) => (
        <ul key={item.name}>
          <Item icon={item.icon} name={item.name} route={item.route} />
        </ul>
      ))}
    </nav>
  );
};

export default Nav;
