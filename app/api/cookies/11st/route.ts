import {
  getCookiesWithKakaoAuth,
  paymentClose,
} from '@/actions/payment/paymentActions';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const SIGNIN_URL = 'https://buy.11st.co.kr/my11st/order/OrderList.tmall';

export async function GET() {
  const cookies = await getCookiesWithKakaoAuth({
    signInUrl: SIGNIN_URL,
    buttonKakaoAuthSelector: '.c-sns__link.c-sns__link--kakao',
    inputKakaoIdSelector: '#loginId--1',
    inputKakaoPwSelector: '#password--2',
    buttonKakaoSignInSelector: '.btn_g.highlight.submit',
    id: process.env.KAKAO_ID ?? '',
    pw: process.env.KAKAO_PW ?? '',
  });

  await paymentClose('ELEVENSTREET');
  return NextResponse.json({ success: true, result: cookies });
}
