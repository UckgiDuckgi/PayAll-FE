import {
  CoupangElementSelector,
  getCoupangActions,
} from '@/actions/coupang/coupangActions';
import { PlaywrightActionsProps } from '@/actions/playwrightActions';
import { NextResponse } from 'next/server';

export type Item = {
  productId: string;
  itemId?: string;
  quantity: number;
};

export type CoupangRequest = {
  pincode: string;
  password: string;
  itemList: Item[];
  init: boolean;
};

export type CoupangResponse = {
  success: boolean;
  status: 'PINCODE' | 'PASSWORD' | 'COMPLETED' | 'ERROR';
  result: string;
};

export async function POST(request: Request) {
  const { pincode, password, itemList } =
    (await request.json()) as CoupangRequest;

  const playwrightActionsProps: PlaywrightActionsProps<CoupangElementSelector> =
    {
      SIGNIN_URL: 'https://login.coupang.com/login/login.pang',
      CART_URL: 'https://cart.coupang.com/cartView.pang',
      DETAIL_BASE_URL: 'https://www.coupang.com/vp/products/',

      elementSelector: {
        //SignIn
        inputIdSelector: '._loginIdInput',
        inputPwSelector: '._loginPasswordInput',
        buttonSignInSelector: '.login__button--submit',
        //AddCart
        inputQuantitySelector: '.prod-quantity__input',
        buttonCartSelector: '.prod-cart-btn',
        //Payment
        buttonOrderSelector: '.order-buttons',
        buttonPaymentSelector: '.paymentBtn-v2-style',
        modalPaymentSelector: '#modal-callLGPayment',
        //Set PWD
        frameSelector: '#callLGPayment',
        //Get Pincode
        buttonGetPincodeSelector: '.pincode-content__button',
        //Set Pincode
        inputPincodeSelector: '.pincode-input__pincode-input-box__pincode',
        buttonSetPincodeSelector: '.pincode-input__button',
      },
      key: 'COUPANG',
    };

  try {
    const coupangActions = await getCoupangActions(playwrightActionsProps);

    const id = process.env.COUPANG_ID ?? '';
    const pw = process.env.COUPANG_PW ?? '';

    await coupangActions.signIn({ id, pw });
    // await coupangSignIn();

    const isPincodePage = await coupangActions.getPincode();
    if (isPincodePage) {
      return NextResponse.json({
        success: true,
        status: 'PINCODE',
        result: 'PINCODE',
      });
    }

    await coupangActions.setPincode(pincode);

    for (const item of itemList) {
      await coupangActions.addCart(item);
    }
    // await coupangAddCart(itemList[1]);

    const screenshotBuffer = await coupangActions.payment();
    if (screenshotBuffer) {
      const base64Image = `data:image/png;base64,${screenshotBuffer.toString('base64')}`;
      return NextResponse.json({
        success: true,
        status: 'PASSWORD',
        result: base64Image,
      });
    }

    await coupangActions.setCoupangPayPassword(password);

    await coupangActions.close();

    return NextResponse.json({
      success: true,
      status: 'COMPLETED',
      result: '',
    });
  } catch {
    console.log('error');
    return NextResponse.json({
      success: true,
      status: 'ERROR',
      result: '',
    });
  }
}
