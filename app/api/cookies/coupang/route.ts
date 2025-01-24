import { getCookies, paymentClose } from '@/actions/payment/paymentActions';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const SIGNIN_URL = 'https://mc.coupang.com/ssr/desktop/order/list';

export async function GET() {
  const cookies = await getCookies({
    signInUrl: SIGNIN_URL,
    idSelector: '._loginIdInput',
    pwSelector: '._loginPasswordInput',
    buttonSelector: '.login__button--submit',
    id: process.env.COUPANG_ID ?? '',
    pw: process.env.COUPANG_PW ?? '',
    key: 'COUPANG',
  });

  await paymentClose('COUPANG');
  return NextResponse.json({ success: true, result: cookies });
}
