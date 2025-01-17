'use client';

import { AccountCard } from '@/components/molecules/sion/AccountCard';
import { AccountDetailCard } from '@/components/molecules/sion/AccountDetailCard';
import { AdCarousel } from '@/components/molecules/sion/AdCarousel';
import { BenefitCard } from '@/components/molecules/sion/BenefitCard';
import { LowestProductCard } from '@/components/molecules/sion/LowestProductCard';
import { SearchInput } from '@/components/molecules/sion/SearchInput';
import { VenderCard } from '@/components/molecules/sion/VenderCard';
import { WordChip } from '@/components/molecules/sion/WordChip';
import { AccentText } from '@/components/ui/AccentText';
import { Counter } from '@/components/ui/Counter';
import { IconIndicator } from '@/components/ui/IconIndicator';
import { PayAllLogo } from '@/components/ui/PayAllLogo';
import { Checkbox } from '@/components/ui/checkbox';

export default function Sion() {
  return (
    <div className='overflow-y-scroll min-h-screen'>
      <PayAllLogo />
      <AdCarousel />
      <div className='mt-4'>
        <div className='font-bold'>가나다라끠끠끠</div>
        <div className='font-medium'>가나다라끠끠끠</div>
        <div className='font-regular'>가나다라끠끠끠</div>
      </div>
      <BenefitCard />
      <div className='mt-4'></div>
      <AccountDetailCard
        account={{
          account_id: 0,
          bank_name: 'woori',
          account_name: '신한 쌀쌀 통장',
          account_number: '123-12-1234567',
          balance: 1000000,
        }}
        expense={100000}
      />
      <div className='mt-4'></div>
      <SearchInput placeholder='검색' />
      <div className='mt-1 flex gap-2'>
        <WordChip word='삼다수' />
        <WordChip word='코카콜라' />
        <WordChip word='치토스' />
      </div>

      <div className='mt-4'></div>
      <div className='flex flex-col gap-4 mt-4'>
        <AccountCard
          account={{
            account_id: 1,
            bank_name: 'hana',
            account_name: '하나 달달 통장',
            account_number: '123-12-1234567',
            balance: 1000000,
          }}
          onClick={() => {}}
        />
        <AccountCard
          account={{
            account_id: 3,
            bank_name: 'woori',
            account_name: '우리 칼칼 통장',
            account_number: '123-12-1234567',
            balance: 1000000,
          }}
          onClick={() => {}}
        />
        <AccountCard
          account={{
            account_id: 4,
            bank_name: 'kb',
            account_name: '국민 깔깔 통장',
            account_number: '123-12-1234567',
            balance: 1000000,
          }}
          onClick={() => {}}
        />
        <AccountCard
          account={{
            account_id: 5,
            bank_name: 'sinhan',
            account_name: '신한 쌀쌀 통장',
            account_number: '123-12-1234567',
            balance: 1000000,
          }}
          onClick={() => {}}
        />
        <AccountCard
          account={{
            account_id: 2,
            bank_name: 'kakao',
            account_name: '카카오 팔팔 통장',
            account_number: '123-12-1234567',
            balance: 1000000,
          }}
          onClick={() => {}}
        />
      </div>

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
      <Counter
        pid={0}
        initialCount={0}
        onCountChange={() => {}}
        className='mt-4'
      />
    </div>
  );
}
