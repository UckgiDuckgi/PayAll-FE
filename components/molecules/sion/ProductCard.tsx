'use client';

import { Counter } from '@/components/ui/Counter';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useGenericMutation } from '@/hooks/query/globalQuery';
import { CartBySearch, Search } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { postCartBySearch } from '@/lib/api';
import { IconIndicator } from '../../ui/IconIndicator';
import { SquareImage } from '../../ui/SquareImage';
import BottomSheet from '../ui/BottomSheet';
import { VenderCard } from './VenderCard';

export const ProductCard = ({ searchResult }: { searchResult: Search }) => {
  const [seletedProduct, setSelectedProduct] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const queryClient = useQueryClient();
  const { mutate } = useGenericMutation(
    [QUERY_KEYS.CART_BY_SEARCH],
    (data: CartBySearch) => postCartBySearch(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART_LIST] });
      },
    }
  );

  const onCountChange = (pid: number, count: number) => {
    setQuantity(count);
  };

  const handleAddCart = () => {
    mutate({
      productId: searchResult.pcode,
      productName: searchResult.productName,
      productImage: searchResult.productImage,
      shopName: searchResult.storeList[seletedProduct].shopName,
      shopUrl: searchResult.storeList[seletedProduct].shopUrl,
      price: searchResult.storeList[seletedProduct].price,
      quantity: quantity,
      prevPrice: searchResult.storeList[seletedProduct].price,
      search: true,
    });
    setQuantity(1);
  };

  return (
    <div className='flex flex-col bg-black p-4 w-full'>
      <div className='flex gap-3'>
        <SquareImage src={searchResult.productImage} alt='Logo' size={120} />
        <div className='flex flex-col gap-1 w-7/12 text-left'>
          <Link href={searchResult.storeList[seletedProduct].shopUrl}>
            <div className='text-white w-full text-xs font-medium'>
              {searchResult.productName}
            </div>
          </Link>
          <div className='text-white w-full font-bold text-base flex gap-1 items-center'>
            {searchResult.storeList[seletedProduct].price.toLocaleString()}원
            <IconIndicator
              src={`/images/vendors/${searchResult.storeList[seletedProduct].shopName.toLowerCase()}.png`}
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
                    src={`/images/vendors/${searchResult.storeList[seletedProduct].shopName.toLowerCase()}.png`}
                    height={13}
                  />
                </div>
                <Counter
                  pid={searchResult.pcode}
                  initialCount={1}
                  onCountChange={onCountChange}
                />
              </div>
            }
            btnTexts={['취소', '담기']}
            onClick={handleAddCart}
          >
            <div className='relative flex items-end justify-end w-full'>
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
