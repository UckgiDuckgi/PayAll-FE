import { Cookie, NaverPayResponse } from '@/types/payment';
import { NextResponse } from 'next/server';

export type GetCookieResponse = {
  success: boolean;
  result: Cookie[];
};

type NaverPaymentItem = {
  name: string;
  date: string;
  price: number;
};

export type NaverPaymentList = {
  items: NaverPaymentItem[];
  totalPrice: number;
};

export async function POST(request: Request) {
  // Request
  const { url, cookie } = await request.json();

  if (!url || !cookie) {
    return NextResponse.json(
      { error: 'clientData is required' },
      { status: 400 }
    );
  }
  console.log('url: ', url);
  console.log('cookie: ', cookie);

  // GET Naverpay Payment List
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Cookie: cookie,
    },
  });
  const data = (await response.json()) as NaverPayResponse;
  const { items } = data.result;

  let totalPrice = 0;
  const naverPaymentItems: NaverPaymentItem[] = [];
  items.forEach(
    ({
      //   serviceType,
      //   status,
      //   merchantName,
      product: {
        name,
        // imgUrl, infoUrl,
        price,
      },
      date,
      //   productDetailUrl,
      //   orderDetailUrl,
    }) => {
      naverPaymentItems.push({
        name,
        date: new Date(date).toLocaleDateString(),
        price,
      });
      totalPrice += price;
    }
  );
  const naverPaymentList: NaverPaymentList = {
    items: naverPaymentItems,
    totalPrice,
  };
  return NextResponse.json({ success: true, result: naverPaymentList });
}
