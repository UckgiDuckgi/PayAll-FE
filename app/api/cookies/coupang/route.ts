import { getCookies, paymentClose } from '@/actions/payment/paymentActions';
import { COUPANG_SIGNIN_URL } from '@/constants/url';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const cookies = await getCookies({
    signInUrl: COUPANG_SIGNIN_URL,
    idSelector: '._loginIdInput',
    pwSelector: '._loginPasswordInput',
    buttonSelector: '.login__button--submit',
    id: process.env.NEXT_PUBLIC_COUPANG_ID ?? '',
    pw: process.env.NEXT_PUBLIC_COUPANG_PW ?? '',
    key: 'COUPANG',
  });

  await paymentClose('COUPANG');
  return NextResponse.json({ success: true, result: cookies });
}
