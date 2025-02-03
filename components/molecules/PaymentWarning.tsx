import PaymentWarningGif from '@/public/images/payments/PaymentWarningGif.gif';
import Image from 'next/image';

export default function PaymentWarning() {
  return (
    <div className='flex flex-col justify-center items-center pb-10'>
      <Image src={PaymentWarningGif} alt={'warning'} width={100}></Image>
      <span>오류가 발생하였습니다.</span>
    </div>
  );
}
