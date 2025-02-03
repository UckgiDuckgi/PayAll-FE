import PaymentSuccessGif from '@/public/images/payments/PaymentSuccess.gif';
import Image from 'next/image';

export default function PaymentSuccess() {
  return (
    <div className='flex flex-col justify-center items-center pb-10 gap-3'>
      <Image src={PaymentSuccessGif} alt={'success'} width={75}></Image>
      <span>결제가 완료되었습니다.</span>
    </div>
  );
}
