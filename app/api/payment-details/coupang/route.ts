import { NextResponse } from 'next/server';

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
