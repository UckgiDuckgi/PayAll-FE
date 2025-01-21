'use client';

import { Counter } from '@/components/ui/Counter';
import Image from 'next/image';
import { useState } from 'react';
import { IconIndicator } from '../../ui/IconIndicator';
import { SquareImage } from '../../ui/SquareImage';
import BottomSheet from '../ui/BottomSheet';
import { VenderCard } from './VenderCard';

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
export const ProductCard = ({
  searchResult,
}: {
  searchResult: SearchResult;
}) => {
  const [seletedProduct, setSelectedProduct] = useState<number>(0);
  return (
    <div className='flex flex-col bg-black p-4 w-full'>
      <div className='flex gap-3'>
        <SquareImage src='/images/Logo.png' alt='Logo' size={120} />
        <div className='flex flex-col gap-1 w-7/12 text-left'>
          <div className='text-white w-full text-xs font-medium'>
            {searchResult.productName}
          </div>
          <div className='text-white w-full font-bold text-base flex gap-1 items-center'>
            {searchResult.storeList[seletedProduct].price.toLocaleString()}원
            <IconIndicator
              src={`/images/${searchResult.storeList[seletedProduct].shopName}.png`}
              height={16}
            />
          </div>
          <BottomSheet
            title='해당 상품을 장바구니에 담으시겠습니까?'
            description={searchResult.productName}
            desciptionFooter={
              <div className='flex items-center justify-between'>
                <div className='flex items-center justify-between gap-2'>
                  <span className='text-white font-bold'>
                    {searchResult.storeList[
                      seletedProduct
                    ].price.toLocaleString()}
                    원
                  </span>
                  <IconIndicator
                    src={`/images/${searchResult.storeList[seletedProduct].shopName}.png`}
                    height={13}
                  />
                </div>
                <Counter
                  pid={searchResult.pcode}
                  initialCount={1}
                  onCountChange={() => {}}
                  className=''
                />
              </div>
            }
            btnTexts={['취소', '담기']}
          >
            <div className='relative cursor-pointer flex items-end justify-end w-full'>
              <button className='w-9 h-9 rounded-full bg-darkGrey flex items-center justify-center'>
                <Image
                  src='/icons/HeaderCart.svg'
                  alt='cart'
                  width={20}
                  height={20}
                />
              </button>
              <div className='absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#D9D9D9] flex items-center justify-center text-xs font-bold text-darkGrey'>
                +
              </div>
            </div>
          </BottomSheet>
        </div>
      </div>
      <div className='flex gap-[0.3125rem] mt-6'>
        {searchResult.storeList.map((store, index) => (
          <VenderCard
            key={index}
            shop={store.shopName}
            price={store.price}
            onClick={() => setSelectedProduct(index)}
            selected={index === seletedProduct}
          />
        ))}
      </div>
    </div>
  );
};
