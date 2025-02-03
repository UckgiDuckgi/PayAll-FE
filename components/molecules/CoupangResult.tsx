import PasswordInputForm from '../coupang/passwordInputForm';
import PincodeInputForm from '../coupang/pincodeInputForm';
import PaymentLoading from './PaymentLoading';
import { PaymentMembershipProps } from './PaymentMebershipCard';
import PaymentSuccess from './PaymentSuccess';
import PaymentWarning from './PaymentWarning';

type CoupangResultProps = Omit<PaymentMembershipProps, 'shop' | 'onLinkClick'>;

export default function CoupangResult({
  isLinked,
  id,
  response,
  isLoading,
  onButtonClick,
  itemList,
}: CoupangResultProps) {
  return (
    <>
      {isLoading ? (
        <PaymentLoading />
      ) : !response ? (
        <div className='space-y-3 px-6 pb-8'>
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
      ) : (
        <>
          {response.status === 'C_PINCODE' ? (
            <PincodeInputForm onClick={onButtonClick} itemList={itemList} />
          ) : response.status === 'C_PASSWORD' ? (
            <PasswordInputForm
              base64Image={response.result}
              onClick={onButtonClick}
              itemList={itemList}
            />
          ) : response.status === 'C_ERROR' ? (
            <PaymentWarning />
          ) : (
            <PaymentSuccess />
          )}
        </>
      )}
    </>
  );
}
