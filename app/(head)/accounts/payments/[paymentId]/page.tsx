import PaymentDetailCard from '@/components/molecules/PaymentDetailCard';
import PaymentInfoCard from '@/components/molecules/sion/PaymentInfoCard';
import { PaymentData } from '@/constants/mockdata';

const paymentInfo: PaymentData = {
  payment_id: 3,
  payment_place: '쿠팡',
  category: '쇼핑',
  payment_price: 104000,
  payment_type: '온라인',
  payment_time: '2025-01-07T22:48:12',
  bank_name: 'hana',
  account_name: '하나 달달 통장',
};

const paymentDetail = [
  {
    productName: '아이폰 15',
    price: 2000000,
    lowestPrice: 1900000,
    vendorName: 'coupang',
  },
  {
    productName: '맛좋은 오렌지',
    price: 30000,
    lowestPrice: 17000,
    vendorName: '11st',
  },
  {
    productName: '시원한 물',
    price: 3000,
    lowestPrice: 500,
    vendorName: 'gmarket',
  },
  {
    productName: '인선님 집에 달린 커튼',
    price: 80000,
    lowestPrice: 70000,
    vendorName: 'ssg',
  },
];

export default function PaymentDetailPage() {
  return (
    <div>
      <PaymentInfoCard paymentInfo={paymentInfo} />
      <div className='flex flex-col items-center justify-between mt-5'>
        <div className='font-bold w-full text-left border-b-[1px] border-[#D9D9D9] py-[0.875rem]'>
          상세내역
        </div>
        {paymentDetail.map((detail, index) => (
          <PaymentDetailCard key={index} {...detail} />
        ))}
      </div>
    </div>
  );
}
