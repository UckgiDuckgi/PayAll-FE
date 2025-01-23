'use client';

import { LowestProductList } from '@/components/molecules/LowestProductList';
import { ProductCard } from '@/components/molecules/sion/ProductCard';
import RecentSearchWords from '@/components/molecules/sion/RecentSearchWords';
import { SearchInput } from '@/components/molecules/sion/SearchInput';
import { SearchLoading } from '@/components/molecules/sion/SearchLoading';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericQuery } from '@/hooks/query/globalQuery';
import { recentSearchAtom } from '@/stores/atom';
import { Search } from '@/types';
import { UseQueryOptions } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { getRecommendationsProduct, getSearch } from '@/lib/api';

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');
  const [recentSearch, setRecentSearch] = useAtom(recentSearchAtom);

  const { resData: searchData, isLoading: searchLoading } = useGenericQuery<
    Search[]
  >([QUERY_KEYS.SEARCH, keyword], () => getSearch({ keyword: keyword ?? '' }), {
    enabled: !!keyword && keyword !== '',
  } as UseQueryOptions<Search[], Error, Search[], readonly unknown[]>);

  const {
    resData: recommendationsProduct,
    isLoading: recommendationsProductLoading,
  } = useGenericQuery([QUERY_KEYS.RECOMMENDATIONS_PRODUCT], () =>
    getRecommendationsProduct()
  );

  const handleSearch = (keyword: string) => {
    if (keyword !== '')
      setRecentSearch([keyword, ...recentSearch.filter((w) => w != keyword)]);
    router.push(`/search?keyword=${keyword}`);
  };

  const handleDeleteWord = (word: string) => {
    if (word === '') {
      setRecentSearch([]);
      return;
    }
    setRecentSearch(recentSearch.filter((w) => w !== word));
  };

  return (
    <div className='h-full'>
      <div className='fixed top-13 w-[90%] max-w-[460px]'>
        <SearchInput
          placeholder='검색'
          defaultValue={keyword ?? ''}
          onClick={handleSearch}
        />
      </div>
      {searchLoading || recommendationsProductLoading ? (
        <SearchLoading />
      ) : (
        <div className='pt-14'>
          {keyword ? (
            <>
              <div className='flex flex-col gap-4 overflow-auto h-[calc(100vh-14rem)]'>
                {searchData?.data?.length === 0 ? (
                  <div className='flex items-center justify-center h-full text-grey'>
                    검색결과가 없습니다.
                  </div>
                ) : (
                  searchData?.data?.map((result, idx) => (
                    <ProductCard key={idx} searchResult={result} />
                  ))
                )}
              </div>
            </>
          ) : (
            <>
              <RecentSearchWords
                recentSearch={recentSearch}
                deleteWord={handleDeleteWord}
              />
              <div className='flex flex-col mt-10 w-full'>
                <span className='text-base font-bold text-grey mb-4'>
                  최근 지출 품목의 최저가 상품
                </span>
                <LowestProductList products={recommendationsProduct?.data} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchContent />
    </Suspense>
  );
}
