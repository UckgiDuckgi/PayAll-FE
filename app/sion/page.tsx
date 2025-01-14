'use client';

import { ProductCard } from '@/components/molecules/sion/ProductCard';
import { VenderCard } from '@/components/molecules/sion/VenderCard';
import { AccentText } from '@/components/ui/AccentText';
import { Counter } from '@/components/ui/Counter';
import { IconIndicator } from '@/components/ui/IconIndicator';
import { Checkbox } from '@/components/ui/checkbox';

export default function Sion() {
  return (
    <div>
      <ProductCard
        name='나드 리프레쉬 퍼퓸드 바디워시 본품,
프레쉬라벤더향, 680ml, 1개입 '
        priceShop={[
          { price: 8900, shop: '11st', image: '/', link: '/' },
          { price: 9160, shop: 'Gmarket', image: '/', link: '/' },
          { price: 9270, shop: 'Coupang', image: '/', link: '/' },
          //   { price: 9270, shop: 'SSG', image: '/', link: '/' },
          //   { price: 9270, shop: 'Auction', image: '/', link: '/' },
        ]}
      />
      <div className='flex w-full justify-around'>
        <VenderCard
          shop='11st'
          price={8900}
          onClick={() => console.log('click')}
        />
        <VenderCard
          shop='Gmarket'
          price={9160}
          onClick={() => console.log('click')}
        />
        <VenderCard
          shop='Auction'
          price={9270}
          onClick={() => console.log('click')}
        />
      </div>
      <div className='mt-4'>
        <Checkbox className=''></Checkbox>
      </div>
      <AccentText
        prefix='목표 달성을 위해서는 하루 평균 '
        accent='10,000원'
        suffix='을 아껴야해요.'
        className='mt-4'
      />
      <AccentText
        prefix='지난달 대비 '
        accent='▼ 31,710 '
        suffix='원 지출했어요.'
        className='mt-4'
      />
      <AccentText
        prefix='지난달 대비 '
        accent='▲ 53,400'
        suffix='원 지출했어요.'
        className='mt-4'
        accentColor='text-red'
      />
      <AccentText
        prefix='하루 평균 '
        accent='53,400원'
        suffix=' 썼어요.'
        className='mt-4 text-[#AAAAAAs]'
        accentColor='text-white'
      />
      <IconIndicator src='/images/11st.png' height={16} />
      <IconIndicator src='/images/Gmarket.png' height={16} />
      <IconIndicator src='/images/Coupang.png' height={16} />
      <IconIndicator src='/images/SSG.png' height={16} />
      <IconIndicator src='/images/Auction.png' height={16} />
      <Counter pid={1} className='mt-4' />
    </div>
  );
}
