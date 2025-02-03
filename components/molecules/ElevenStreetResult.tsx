import { PaymentInputForm } from '../11st/paymentInputForm';
import ReCaptchaInputForm from '../11st/reCaptchaInputForm';
import PincodeInputForm from '../coupang/pincodeInputForm';
import PaymentLoading from './PaymentLoading';
import { PaymentMembershipProps } from './PaymentMebershipCard';
import PaymentSuccess from './PaymentSuccess';
import PaymentWarning from './PaymentWarning';

type CoupangResultProps = Omit<PaymentMembershipProps, 'shop' | 'onLinkClick'>;

export default function ElevenStreetResult({
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
          {response.status === '11_PINCODE' ? (
            <PincodeInputForm onClick={onButtonClick} itemList={itemList} />
          ) : response.status === '11_RECAPTCHA' ? (
            <ReCaptchaInputForm
              base64Image={response.result.base64Image}
              tableSize={response.result.tableSize}
              onClick={onButtonClick}
              itemList={itemList}
            />
          ) : response.status === '11_PAYMENT' ? (
            <PaymentInputForm
              base64Image={response.result.base64Image}
              onClick={onButtonClick}
              itemList={itemList}
            />
          ) : response.status === '11_ERROR' ? (
            <PaymentWarning />
          ) : (
            <PaymentSuccess />
          )}
        </>
      )}
    </>
  );
}
