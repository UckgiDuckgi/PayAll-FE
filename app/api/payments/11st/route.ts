import {
  ElevenStreetElementSelector,
  getElevenStreetActions,
} from '@/actions/11st/elevenStreetActions';
import { PlaywrightActionsProps } from '@/actions/playwrightActions';
import { ElevenStreetResponse } from '@/types/payment';
import { NextResponse } from 'next/server';

export type Item = {
  productId: string;
  itemId?: string;
  quantity: number;
};

export type ElevenStreetRequest = {
  id: string;
  pw: string;
  selectedTileList: string;
  itemList: Item[];
  isReCaptchaEnd: boolean;
};

export async function POST(request: Request) {
  const { id, pw, itemList } = (await request.json()) as ElevenStreetRequest;

  const playwrightActionsProps: PlaywrightActionsProps<ElevenStreetElementSelector> =
    {
      SIGNIN_URL: 'https://login.11st.co.kr/auth/v2/login',
      CART_URL:
        'https://buy.11st.co.kr/cart/CartAction.tmall?method=getCartList',
      DETAIL_BASE_URL: 'https://www.11st.co.kr/products/',

      elementSelector: {
        // SignIn
        inputIdSelector: '#memId',
        inputPwSelector: '#memPwd',
        buttonSignInSelector: '#loginButton',
        // KakaoSignIn
        buttonKakaoAuthSelector: '.c-sns__link.c-sns__link--kakao',
        inputKakaoIdSelector: '#loginId--1',
        inputKakaoPwSelector: '#password--2',
        buttonKakaoSignInSelector: '.btn_g.highlight.submit',
        // AddCart
        inputQuantitySelector: '[name="prdcAmount"]',
        buttonCartSelector: '.btn_cart',
        // Payment
        buttonOrderSelector: '#doOrderBt',
        buttonPaymentSelector: '.btn_order',
        buttonKbPaySelector: '.btn-kbpay.btn-kbpay-list',
        // ReCaptcha
        iframeReCaptchaSelector: '[title="reCAPTCHA"]',
        buttonReCaptchaStartSelector: '.recaptcha-checkbox-border',
        // ReCaptcha Photo
        iframeReCaptchaPhotoSelector: '[title^="reCAPTCHA"]:not([role])',
        imageBoxSelector: '#rc-imageselect',
        buttonReCaptchaEndSelector: '#recaptcha-verify-button',
        tableReCaptchaSelector: 'table[class^="rc-imageselect-table"]',
        statusReCaptchaSelector: '#recaptcha-accessible-status',
        // Modal
        modalPropSelector: '[modal-auto-action="close"]',
      },
      key: 'ELEVENSTREET',
    };

  try {
    const elevenStreetActions = await getElevenStreetActions(
      playwrightActionsProps
    );

    // const reCaptchaResponse = await elevenStreetActions.reCaptcha();
    // if (reCaptchaResponse) {
    //   const { screenshotBuffer, tableSize } = reCaptchaResponse;
    //   const base64Image = `data:image/png;base64,${screenshotBuffer.toString('base64')}`;
    //   return NextResponse.json({
    //     success: true,
    //     status: '11_RECAPTCHA',
    //     result: { base64Image, tableSize },
    //   } as ElevenStreetResponse);
    // }

    // await elevenStreetActions.clickReCaptcha(selectedTileList, isReCaptchaEnd);

    // const retryReCaptchaResponse = await elevenStreetActions.retryReCaptcha();
    // if (retryReCaptchaResponse) {
    //   const { screenshotBuffer, tableSize } = retryReCaptchaResponse;
    //   const base64Image = `data:image/png;base64,${screenshotBuffer.toString('base64')}`;
    //   return NextResponse.json({
    //     success: true,
    //     status: '11_RECAPTCHA',
    //     result: { base64Image, tableSize },
    //   } as ElevenStreetResponse);
    // }
    // const id = process.env.ELEVEN_STREET_ID ?? '';
    // const pw = process.env.ELEVEN_STREET_PW ?? '';
    // await elevenStreetActions.signIn({ id, pw });

    await elevenStreetActions.kakaoSignIn({ id, pw });

    await elevenStreetActions.clickModal();

    for (const item of itemList) {
      await elevenStreetActions.addCart(item);
    }

    const paymentResponse = await elevenStreetActions.payment();
    if (paymentResponse) {
      const base64Image = `data:image/png;base64,${paymentResponse.toString('base64')}`;
      return NextResponse.json({
        success: true,
        status: '11_PAYMENT',
        result: { base64Image },
      } as ElevenStreetResponse);
    }

    await elevenStreetActions.close();

    return NextResponse.json({
      success: true,
      status: '11_COMPLETED',
      result: {},
    } as ElevenStreetResponse);
  } catch {
    return NextResponse.json({
      success: false,
      status: '11_ERROR',
      result: {},
    } as ElevenStreetResponse);
  }
}
