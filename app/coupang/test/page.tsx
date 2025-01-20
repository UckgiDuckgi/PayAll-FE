import Image from 'next/image';
import KbPay from './kbpay.png';

export default function PaymentInputForm() {
  return (
    <div className='flex flex-col w-full'>
      <div className='relative w-[500px] h-[496.72px] mx-auto'>
        <Image
          src={KbPay}
          alt='Coupang'
          width={500}
          height={496.72}
          unoptimized
          className='absolute'
        />
        <div className='absolute bottom-0 w-full h-[61px]'>
          <button className='bg-[#DDDDDD] text-black font-extrabold w-full h-full hover:bg-[#CCCCCC]'>
            완료
          </button>
        </div>
      </div>
    </div>
  );
}
