import { CircleCheck } from 'lucide-react';
import { IconIndicator } from '../ui/IconIndicator';

type AccountProps = {
  shop: string;
  isLinked: boolean;
  id?: string;
  onLinkClick: () => void;
};

export const LinkedMembershipCard = ({
  shop,
  isLinked,
  id,
  onLinkClick,
}: AccountProps) => {
  return (
    <>
      <div className='mb-6 bg-deepDarkGrey rounded-[1.5rem] px-6 py-8'>
        <div className='flex justify-between mb-6'>
          <IconIndicator
            src={`/images/vendors/${shop.toLowerCase()}.png`}
            height={35}
          />
          {isLinked ? (
            <div className='flex items-center space-x-2'>
              <CircleCheck className='text-main text-xs' />
              <span className='text-main font-bold text-base'>연동 완료</span>
            </div>
          ) : (
            <button
              className='text-white bg-darkGrey rounded-sm px-5 py-2 hover:bg-[#484848]'
              onClick={onLinkClick}
            >
              연동하기
            </button>
          )}
        </div>

        <div className='space-y-3'>
          <div>
            <div className='text-base font-bold text-left w-full text-darkGrey mb-[0.625rem]'>
              아이디
            </div>
            <div className='text-base outline-none font-bold'>
              {isLinked ? id : '입력 필요'}
            </div>
          </div>
          <div>
            <div className='text-base font-bold text-left w-full text-darkGrey mb-[0.625rem]'>
              비밀번호
            </div>
            <div className='text-base outline-none font-bold'>
              {isLinked ? '**********' : '입력 필요'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
