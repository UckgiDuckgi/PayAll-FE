'use client';

import { ProductCard } from '@/components/molecules/sion/ProductCard';
import RecentSearchWords from '@/components/molecules/sion/RecentSearchWords';
import { SearchInput } from '@/components/molecules/sion/SearchInput';
import SionSion from '@/components/molecules/sion/SionSion';
import { useSearchParams } from 'next/navigation';

const recentSearch = ['커튼', '사과', '오리엔탈소스', '워셔액', '몽키스패너'];
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

export default function Search() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');
  return (
    <div className='h-full'>
      <div className='fixed top-13 w-[90%] '>
        <SearchInput placeholder='검색' defaultValue={keyword ?? ''} />
      </div>
      <div className='pt-14'>
        {keyword ? (
          <>
            <div className='flex flex-col gap-4 overflow-y-scroll h-[calc(100vh-14rem)]'>
              {searchResult.map((result, idx) => (
                <ProductCard key={idx} searchResult={result} />
              ))}
            </div>
          </>
        ) : (
          <>
            <RecentSearchWords recentSearch={recentSearch} />
            <SionSion />
          </>
        )}
      </div>
    </div>
  );
}
