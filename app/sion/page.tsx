'use client';

import { AccountCard } from '@/components/molecules/sion/AccountCard';
import { AccountDetailCard } from '@/components/molecules/sion/AccountDetailCard';
import { AdCarousel } from '@/components/molecules/sion/AdCarousel';
import { BenefitCard } from '@/components/molecules/sion/BenefitCard';
import { CartProductCard } from '@/components/molecules/sion/CartProductCard';
import { LowestProductCard } from '@/components/molecules/sion/LowestProductCard';
import { ProductCard } from '@/components/molecules/sion/ProductCard';
import { SearchInput } from '@/components/molecules/sion/SearchInput';
import { VenderCard } from '@/components/molecules/sion/VenderCard';
import { WordChip } from '@/components/molecules/sion/WordChip';
import { AccentText } from '@/components/ui/AccentText';
import { Counter } from '@/components/ui/Counter';
import { IconIndicator } from '@/components/ui/IconIndicator';
import { Checkbox } from '@/components/ui/checkbox';

export default function Sion() {
  return (
    <div className='overflow-y-scroll min-h-screen'>
      <AdCarousel />
      <div className='mt-4'></div>
      <BenefitCard />
      <div className='mt-4'></div>
      <AccountDetailCard
        index={0}
        account={{
          bank_name: 'woori',
          account_name: '신한 쌀쌀 통장',
          account_number: '123-12-1234567',
          balance: 1000000,
        }}
        expense={100000}
      />
      <div className='mt-4'></div>
      <SearchInput placeholder='검색' submit={() => {}} />
      <div className='mt-1 flex gap-2'>
        <WordChip word='삼다수' />
        <WordChip word='코카콜라' />
        <WordChip word='치토스' />
      </div>

      <div className='mt-4'></div>
      <div className='flex flex-col gap-4 mt-4'>
        <AccountCard
          index={1}
          account={{
            bank_name: 'hana',
            account_name: '하나 달달 통장',
            account_number: '123-12-1234567',
            balance: 1000000,
          }}
        />
        <AccountCard
          index={3}
          account={{
            bank_name: 'woori',
            account_name: '우리 칼칼 통장',
            account_number: '123-12-1234567',
            balance: 1000000,
          }}
        />
        <AccountCard
          index={4}
          account={{
            bank_name: 'kb',
            account_name: '국민 깔깔 통장',
            account_number: '123-12-1234567',
            balance: 1000000,
          }}
        />
        <AccountCard
          index={0}
          account={{
            bank_name: 'sinhan',
            account_name: '신한 쌀쌀 통장',
            account_number: '123-12-1234567',
            balance: 1000000,
          }}
        />
        <AccountCard
          index={2}
          account={{
            bank_name: 'kakao',
            account_name: '카카오 팔팔 통장',
            account_number: '123-12-1234567',
            balance: 1000000,
          }}
        />
      </div>
      <CartProductCard
        imageUrl='/images/Logo.png'
        pid={1}
        title='나드 리프레쉬 퍼퓸드 바디워시 본품,프레쉬라벤더향, 680ml, 1개입 '
        price={8900}
        shop='11st'
      />
      <div className='flex gap-2 overflow-x-scroll'>
        <LowestProductCard
          imageUrl='/images/Logo.png'
          title='나드 리프레쉬 퍼퓸드 바디워시 본품,프레쉬라벤더향, 680ml, 1개입 '
          discount={10}
          price={8900}
        />
        <LowestProductCard
          imageUrl='/images/Logo.png'
          title='나드 리프레쉬 퍼퓸드 바디워시 본품,프레쉬라벤더향, 680ml, 1개입 '
          discount={20}
          price={500000}
        />
        <LowestProductCard
          imageUrl='/images/Logo.png'
          title='나드 리프레쉬 퍼퓸드 바디워시 본품,프레쉬라벤더향, 680ml, 1개입 '
          discount={30}
          price={500000}
        />
        <LowestProductCard
          imageUrl='/images/Logo.png'
          title='나드 리프레쉬 퍼퓸드 바디워시 본품,프레쉬라벤더향, 680ml, 1개입 '
          discount={40}
          price={500000}
        />
      </div>
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
      <Counter className='mt-4' />
    </div>
  );
}
