'use client';

import dayjs from 'dayjs';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type NavItem = {
  name: string;
  icon: string;
  route: string;
};

export const NavIcons: NavItem[] = [
  {
    name: '홈',
    icon: '/icons/Home.svg',
    route: '',
  },
  {
    name: '최저가검색',
    icon: '/icons/Search.svg',
    route: 'search',
  },
  { name: '지출내역', icon: '/icons/List.svg', route: 'accounts' },
  {
    name: '소비분석',
    icon: '/icons/Chart.svg',
    route: `statistics?date=${dayjs().format('YYYY-MM')}`,
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
  const pathname = usePathname();
  const currentRoute = route.split('?')[0];
  const isSelected = (pathname.split('/')[1] || '') === currentRoute;

  const handleRoute = () => {
    router.push(`/${route}`);
  };

  return (
    <div
      className={`flex h-[2rem] w-[2.625rem] cursor-pointer items-center justify-center ${
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
          className={cn(
            'transition-transform duration-200',
            isSelected ? 'brightness-100 scale-110' : 'brightness-50'
          )}
        />
        {name && (
          <span
            className={cn(
              'text-[0.75rem] transition-transform duration-200',
              isSelected
                ? 'text-white font-bold scale-110'
                : 'text-[#D9D9D9] font-medium'
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
