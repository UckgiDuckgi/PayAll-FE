import { QUERY_KEYS } from '@/constants/queryKey';
import { Statistics } from '@/types/table';
import { useMemo } from 'react';
import { getStatistics } from '@/lib/api';
import { useGenericQuery } from './globalQuery';

export const useStatisticsQuery = (date: string) => {
  const queryKey = useMemo(() => [QUERY_KEYS.STATISTICS, date], [date]);
  return useGenericQuery<Partial<Statistics>>(queryKey, () =>
    getStatistics({ date })
  );
};
