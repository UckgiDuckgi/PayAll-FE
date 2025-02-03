import {
  getCookiesWithKakaoAuth,
  paymentClose,
} from '@/actions/payment/paymentActions';
import { ELEVENSTREET_SIGNIN_URL } from '@/constants/url';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const cookies = await getCookiesWithKakaoAuth({
    signInUrl: ELEVENSTREET_SIGNIN_URL,
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
