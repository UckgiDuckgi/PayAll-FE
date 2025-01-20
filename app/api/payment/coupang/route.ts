import { getCookies, paymentClose } from '@/actions/payment/paymentActions';
import { NextResponse } from 'next/server';

const SIGNIN_URL = 'https://mc.coupang.com/ssr/desktop/order/list';

export async function GET() {
  const cookies = await getCookies({
    signInUrl: SIGNIN_URL,
    idSelector: '._loginIdInput',
    pwSelector: '._loginPasswordInput',
    buttonSelector: '.login__button--submit',
    id: process.env.COUPANG_ID ?? '',
    pw: process.env.COUPANG_PW ?? '',
  });

  await paymentClose();
  return NextResponse.json({ success: true, result: cookies });
}

export async function POST(request: Request) {
  // Request
  const { url, cookie, requestYear, pageIndex, size } = await request.json();

  if (!url || !cookie) {
    return NextResponse.json(
      { error: 'clientData is required' },
      { status: 400 }
    );
  }

  console.log('url: ', url);
  console.log('cookie: ', cookie);
  const param = new URLSearchParams({
    requestYear,
    pageIndex,
    size,
  });

  // GET Coupang Payment List
  const response = await fetch(url + `?${param}`, {
    method: 'GET',
    headers: {
      Cookie: cookie,
    },
  });
  // const data = (await response.json()) as CoupangPaymentResponse;
  const data = await response.json();
  console.log('🚀 ~ POST ~ data:', data);
  const { orderList: CoupangOrderList } = data;

  return NextResponse.json({ success: true, result: CoupangOrderList });
}
