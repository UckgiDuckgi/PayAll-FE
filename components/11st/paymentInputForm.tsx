import Image from 'next/image';
import { ElevenStreetInputFormProps } from './reCaptchaInputForm';

export function PaymentInputForm({
  base64Image,
  onClick,
  itemList,
}: { base64Image: string } & ElevenStreetInputFormProps) {
  const handleOnclick = () => {
    onClick({ elevenStreetItemList: itemList });
  };

  return (
    <div className='flex flex-col w-full'>
      <div className='relative w-full h-auto mx-auto'>
        <Image
          src={base64Image}
          alt='KbPay'
          width={500}
          height={496.72}
          unoptimized
        />
        <div className='absolute bottom-0 w-full h-[12%]'>
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
