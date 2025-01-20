import Image from 'next/image';
import { ElevenStreetInputFormProps } from './reCaptchaInputForm';

export function PaymentInputForm({
  base64Image,
  onClick,
  itemList,
}: { base64Image: string } & ElevenStreetInputFormProps) {
  const handleOnclick = () => {
    onClick({ itemList });
  };

  return (
    <div className='flex flex-col w-full'>
      <div className='relative w-[500px] h-[496.72px] mx-auto'>
        <Image
          src={base64Image}
          alt='KbPay'
          width={500}
          height={496.72}
          unoptimized
          className='absolute'
        />
        <div className='absolute bottom-0 w-full h-[61px]'>
          <button
            className='bg-[#DDDDDD] text-black font-extrabold w-full h-full hover:bg-[#CCCCCC]'
            onClick={handleOnclick}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}
