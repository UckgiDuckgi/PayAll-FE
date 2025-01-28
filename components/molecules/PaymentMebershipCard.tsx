import { OnClick } from '@/app/(head)/payments/page';
import {
  CoupangPostResponse,
  ElevenStreetResponse,
  Item,
} from '@/types/payment';
import { CircleCheck } from 'lucide-react';
import { IconIndicator } from '../ui/IconIndicator';
import CoupangResult from './CoupangResult';
import ElevenStreetResult from './ElevenStreetResult';

export type PaymentMembershipProps = {
  shop: string;
  isLinked: boolean;
  id?: string;
  onLinkClick: () => void;
  response?: CoupangPostResponse | ElevenStreetResponse | null;
  isLoading: boolean;
  onButtonClick: OnClick;
  itemList: Item[];
};

export const PaymentMebershipCard = ({
  shop,
  isLinked,
  id,
  onLinkClick,
  response,
  isLoading,
  onButtonClick,
  itemList,
}: PaymentMembershipProps) => {
  return (
    <>
      <div className='mb-6 bg-deepDarkGrey rounded-[1.5rem] w-full'>
        <div className='flex justify-between mb-6 px-6 pt-8'>
          <IconIndicator src={`/images/${shop}.png`} height={35} />
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

        <div className='w-full'>
          {shop === 'COUPANG' ? (
            <CoupangResult
              id={id}
              isLinked={isLinked}
              isLoading={isLoading}
              onButtonClick={onButtonClick}
              itemList={itemList}
              response={response}
            ></CoupangResult>
          ) : (
            <ElevenStreetResult
              id={id}
              isLinked={isLinked}
              isLoading={isLoading}
              onButtonClick={onButtonClick}
              itemList={itemList}
              response={response}
            ></ElevenStreetResult>
          )}
        </div>
      </div>
    </>
  );
};
