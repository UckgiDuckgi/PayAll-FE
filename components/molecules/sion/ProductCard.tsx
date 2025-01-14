'use client';

import Image from 'next/image';
import { useState } from 'react';
import { IconIndicator } from '../../ui/IconIndicator';
import { SquareImage } from '../../ui/SquareImage';
import { VenderCard } from './VenderCard';

type PriceShop = {
  price: number;
  shop: string;
  link: string;
  image: string;
};
export const ProductCard = ({
  name,
  priceShop,
}: {
  name: string;
  priceShop: PriceShop[];
}) => {
  const [seletedProduct, setSelectedProduct] = useState<number>(0);
  return (
    <div className='flex flex-col bg-black p-4 w-full'>
      <div className='flex gap-3'>
        <SquareImage src='/images/Logo.png' alt='Logo' size={120} />
        <div className='flex flex-col gap-1 w-7/12 text-left'>
          <div className='text-white w-full text-xs font-medium'>{name}</div>
          <div className='text-white w-full font-bold text-base flex gap-1 items-center'>
            {priceShop[seletedProduct].price.toLocaleString()}원
            <IconIndicator
              src={`/images/${priceShop[seletedProduct].shop}.png`}
              height={16}
            />
          </div>
          <div className='flex justify-end items-end'>
            <div className='relative'>
              <button
                className='w-9 h-9 rounded-full bg-darkGrey flex items-center justify-center'
                onClick={() => {
                  setSelectedProduct((seletedProduct + 1) % 5);
                  console.log('장바구니 모달 열기');
                }}
              >
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
          </div>
        </div>
      </div>
      <div className='flex gap-[0.3125rem] mt-6'>
        {priceShop.map((price, index) => (
          <VenderCard
            key={index}
            shop={price.shop}
            price={price.price}
            onClick={() => setSelectedProduct(index)}
            selected={index === seletedProduct}
          />
        ))}
      </div>
    </div>
  );
};
