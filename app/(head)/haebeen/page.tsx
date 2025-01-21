'use client';

import CardInfoCard from '@/components/molecules/CardInfoCard';
import CategoryCarouselItem from '@/components/molecules/CategoryCarouselItem';
import CategorySubCard from '@/components/molecules/CategorySubCard';
import DeliveryFeeProgress from '@/components/molecules/DeliveryFeeProgress';
import FixedExpensesCard from '@/components/molecules/FixedExpensesCard';
import PaymentCard from '@/components/molecules/PaymentCard';
import PaymentDetailCard from '@/components/molecules/PaymentDetailCard';
import { Modal } from '@/components/molecules/ui/Modal';
import CartContainer from '@/components/ui/CartContainer';
import { CATEGORY } from '@/constants/category';
import { COLORS } from '@/constants/color';
import {
  MOCK_PAYMENT,
  MOCK_PAYMENT_DETAIL,
  MOCK_STAT,
} from '@/constants/mockdata';
import { Category } from '@/types/table';
import Image from 'next/image';

function Page() {
  return (
    <div className='w-full pb-20'>
      {/* <Tabs
        tabs={tabs}
        selectedIdx={selectedIdx}
        handleSelectedIdx={handleSelectedIdx}
        /> */}

      {/* <div className='mt-10'>
        <CategoryChart
        categoryExpenses={MOCK_STAT.category_expenses}
        totalSpent={MOCK_STAT.total_spent}
        />
        </div> */}

      <div>
        <div className='font-bold'>가나다라마바상앙앙앙</div>
        <div className='font-regular'>가나다라마바상앙앙앙</div>
        <div className='font-medium'>가나다라마바상앙앙앙</div>
      </div>

      <PaymentCard showAccount={true} paymentInfo={MOCK_PAYMENT} />

      <Image
        src='/images/animations/check.gif'
        alt='check'
        width={100}
        height={100}
      />

      <Image
        src='/images/animations/documentCheck.gif'
        alt='documentCheck'
        width={100}
        height={100}
      />

      <Image
        src='/images/animations/ReceiptLoading.gif'
        alt='ReceiptLoading'
        width={100}
        height={100}
      />

      <Image
        src='/images/documentList.svg'
        alt='documentList'
        width={100}
        height={100}
        className='float-animation'
      />

      <Image
        src='/images/documentList1.svg'
        alt='documentList1'
        width={100}
        height={100}
        className='float-animation'
      />

      <CardInfoCard
        cardImg='/images/Logo.png'
        cardName='card name'
        cardDescription='card description'
      />

      <ul>
        {MOCK_PAYMENT_DETAIL.payment_detail.map(
          ({ product_name, price, lowest_price, vendor_name }) => (
            <li key={product_name}>
              <PaymentDetailCard
                productName={product_name}
                price={price}
                lowestPrice={lowest_price}
                vendorName={vendor_name}
              />
            </li>
          )
        )}
      </ul>

      {/* 가로 스크롤 캐러셀 컴포넌트로 분리 */}
      <ul className='w-full overflow-x-scroll flex space-x-3 px-2 py-6 scrollbar-hide snap-x'>
        {MOCK_STAT.category_expenses.map(({ category, amount }, idx) => (
          <li key={idx} className='flex-shrink-0 snap-center'>
            <CategoryCarouselItem
              percent={+((amount / MOCK_STAT.total_spent) * 100).toFixed(0)}
              color={COLORS[idx]}
              categoryName={CATEGORY[category as Category][0]}
              categoryIconName={category}
              amount={amount}
            />
          </li>
        ))}
      </ul>

      <ul className='space-y-3 my-5'>
        {MOCK_STAT.fixed_expenses.map(({ fixed_name, amount, due_date }) => (
          <li key={fixed_name}>
            <FixedExpensesCard
              expensesName={fixed_name}
              expensesPrice={amount}
              date={due_date}
            />
          </li>
        ))}
      </ul>

      <Modal
        title='배송지 정보'
        description='서울 성동구 뚝섬로1가길 17 (성수동1가, 얼리브홈 서울숲), 503호 [04779]'
        btnText='확인'
      >
        <span>배송지 정보</span>
      </Modal>

      <DeliveryFeeProgress fee={17600} totalFee={19900} />

      <CategorySubCard
        img={'/images/subscribes/T.svg'}
        category='외식'
        color='#B77DF1'
        paymentName='롯데리아'
        amount={23870}
      />

      <CartContainer title='배송 정보' bgColor='#1b1b1b'>
        <div className='flex flex-col items-start justify-center gap-1 mt-1 mb-20'>
          <div className='flex items-center justify-center gap-1 text-[.75rem]'>
            <span className='text-grey'>문해빈</span>
            <span className='w-[2px] h-[2px] rounded-full bg-grey' />
            <span className='text-grey'>010-7330-9731</span>
          </div>
          <div className='font-medium text-[.8125rem]'>
            서울 성동구 뚝섬로1가길 17 (성수동1가, 얼리브홈 서울숲), 503호
            [04779]
          </div>
        </div>
      </CartContainer>
    </div>
  );
}

export default Page;
