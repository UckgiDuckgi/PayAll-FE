'use client';

import { LowestProductList } from '@/components/molecules/LowestProductList';
import { ProductCard } from '@/components/molecules/sion/ProductCard';
import RecentSearchWords from '@/components/molecules/sion/RecentSearchWords';
import { SearchInput } from '@/components/molecules/sion/SearchInput';
import { MOCK_LOWEST_PRODUCT } from '@/constants/mockdata';
import { recentSearchAtom } from '@/stores/atom';
import { useAtom } from 'jotai';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const searchResult: SearchResult[] = [
  {
    pcode: 12345,
    productName:
      '나드 리프레쉬 퍼퓸드 바디워시 본품, 프레쉬라벤더향, 680ml, 1개입',
    productImage:
      '//img.danawa.com/prod_img/500000/425/764/img/16764425_1.jpg?shrink=330:*&_v=20220811093922',
    storeList: [
      {
        shopName: '11st',
        price: 8800,
        shopUrl: 'https://11st.co.kr/products/12345',
      },
      {
        shopName: 'Gmarket',
        price: 9160,
        shopUrl: 'https://gmarket.co.kr/products/12345',
      },
      {
        shopName: 'Coupang',
        price: 9270,
        shopUrl: 'https://coupang.com/products/12345',
      },
    ],
  },

  {
    pcode: 12345,
    productName:
      '나드 리프레쉬 퍼퓸드 바디워시 본품, 프레쉬라벤더향, 680ml, 1개입',
    productImage:
      '//img.danawa.com/prod_img/500000/425/764/img/16764425_1.jpg?shrink=330:*&_v=20220811093922',
    storeList: [
      {
        shopName: '11st',
        price: 8800,
        shopUrl: 'https://11st.co.kr/products/12345',
      },
      {
        shopName: 'Gmarket',
        price: 9160,
        shopUrl: 'https://gmarket.co.kr/products/12345',
      },
      {
        shopName: 'Coupang',
        price: 9270,
        shopUrl: 'https://coupang.com/products/12345',
      },
    ],
  },
];

type Store = {
  shopName: string;
  price: number;
  shopUrl: string;
};
type SearchResult = {
  pcode: number;
  productName: string;
  productImage: string;
  storeList: Store[];
};

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');
  const [recentSearch, setRecentSearch] = useAtom(recentSearchAtom);

  const handleSearch = (keyword: string) => {
    if (!recentSearch.includes(keyword) && keyword !== '')
      setRecentSearch([...recentSearch, keyword]);
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
      <div className='pt-14'>
        {keyword ? (
          <>
            <div className='flex flex-col gap-4 overflow-auto h-[calc(100vh-14rem)]'>
              {searchResult.map((result, idx) => (
                <ProductCard key={idx} searchResult={result} />
              ))}
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
              <LowestProductList products={MOCK_LOWEST_PRODUCT} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
