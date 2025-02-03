'use client';

import Loading from '@/components/Loading';
import { LinkedMembershipCard } from '@/components/molecules/LinkedMembershipCard';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericQuery } from '@/hooks/query/globalQuery';
import { PlatformType } from '@/types/authType';
import { useRouter } from 'next/navigation';
import { getPlatform } from '@/lib/api';

export default function Membership() {
  const router = useRouter();

  const { resData: platformData, isLoading } = useGenericQuery<PlatformType>(
    [QUERY_KEYS.PLATFORM],
    () => getPlatform()
  );

  if (!platformData || !platformData.data || isLoading) return <Loading />;

  const PLATFORM_LIST = ['COUPANG', '11ST', 'NAVER'];

  const handleLinking = (shop: string) => {
    router.push(`/mypage/membership/${shop}`);
  };

  return (
    <div className='mt-[2.625rem]'>
      {PLATFORM_LIST.map((platform, idx) => {
        const isContain =
          platformData.data?.platformInfos?.some(
            ({ platformName }) => platformName === platform
          ) ?? false;
        return (
          <LinkedMembershipCard
            key={idx}
            shop={platform}
            isLinked={isContain}
            id={
              platformData.data?.platformInfos?.find(
                ({ platformName }) => platformName === platform
              )?.id
            }
            onLinkClick={() => handleLinking(platform)}
          />
        );
      })}
    </div>
  );
}
