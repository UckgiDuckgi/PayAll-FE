import PaymentLoadingGif from '@/public/images/payments/PaymentLoading.gif';
import Image from 'next/image';

export default function PaymentLoading() {
  return (
    <div className='flex flex-col justify-center items-center pb-10'>
      <Image src={PaymentLoadingGif} alt={'loading'} width={180}></Image>
    </div>
  );
}
