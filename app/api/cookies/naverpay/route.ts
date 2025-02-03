import { getCookies, paymentClose } from '@/actions/payment/paymentActions';
import { NAVERPAY_SIGNIN_URL } from '@/constants/url';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const cookies = await getCookies({
    signInUrl: NAVERPAY_SIGNIN_URL,
    idSelector: '#id',
    pwSelector: '#pw',
    buttonSelector: '#submit_btn',
    id: process.env.NAVER_ID ?? '',
    pw: process.env.NAVER_PW ?? '',
    key: 'NAVERPAY',
  });

  await paymentClose('NAVERPAY');
  return NextResponse.json({ success: true, result: cookies });
}
