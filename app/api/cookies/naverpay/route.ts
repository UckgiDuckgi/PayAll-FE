import { getCookies, paymentClose } from '@/actions/payment/paymentActions';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const SIGNIN_URL = 'https://new-m.pay.naver.com/pcpay';

export async function GET() {
  const cookies = await getCookies({
    signInUrl: SIGNIN_URL,
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
