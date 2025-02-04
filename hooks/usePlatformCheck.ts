import { platformMap, PLATFORMS } from '@/constants/category';
import { QUERY_KEYS } from '@/constants/queryKey';
import { PlatformType } from '@/types/authType';
import { useEffect, useState } from 'react';
import { getPlatform } from '@/lib/api';
import { useGenericQuery } from './query/globalQuery';

function usePlatformCheck() {
  const { resData: platformData } = useGenericQuery<PlatformType>(
    [QUERY_KEYS.PLATFORM],
    () => getPlatform()
  );
  const [platforms, setPlatforms] = useState<string[]>([]);

  useEffect(() => {
    if (platformData?.data) {
      const platforms = platformData.data.platformInfos
        .map(({ platformName }) => platformMap[platformName])
        .filter((platform) => !PLATFORMS.includes(platform ?? ''));
      setPlatforms(platforms);
    }
  }, [platformData]);

  return { platforms };
}

export default usePlatformCheck;
