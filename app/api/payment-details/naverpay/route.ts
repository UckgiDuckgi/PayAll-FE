import { getCookies, paymentClose } from '@/actions/payment/paymentActions';
import { NAVERPAY_SIGNIN_URL } from '@/constants/url';
import {
  NaverPayItem,
  NaverPayResponse,
  TransformedOrder,
} from '@/types/payment';
import { NextResponse } from 'next/server';
import { formatCookies } from '@/lib/utils';

export const dynamic = 'force-dynamic';

function transformNaverPayResponse(
  response: NaverPayResponse
): TransformedOrder[] {
  return response.result.items
    .filter(({ status }: NaverPayItem) => status.name !== 'CANCELLED')
    .map(({ date, product, additionalData }: NaverPayItem) => {
      return {
        paymentTime: date,
        paymentPlace: '네이버페이',
        purchaseProductList: [
          {
            productName: product.name,
            price: product.price,
            quantity: additionalData.orderQuantity,
          },
        ],
      };
    });
}

export async function POST(request: Request) {
  // Request
  const { url, id, pw } = await request.json();

  if (!url) {
    return NextResponse.json(
      { error: 'clientData is required' },
      { status: 400 }
    );
  }
  console.log('url: ', url);

  const cookies = await getCookies({
    signInUrl: NAVERPAY_SIGNIN_URL,
    idSelector: '#id',
    pwSelector: '#pw',
    buttonSelector: '#submit_btn',
    id,
    pw,
    key: 'NAVERPAY',
  });

  await paymentClose('NAVERPAY');

  // GET Naverpay Payment List
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'User-agent': 'PostmanRuntime/7.43.0',
      Cookie: formatCookies(cookies),
    },
  });
  const data = (await response.json()) as NaverPayResponse;
  console.log('🚀 ~ POST ~ data:', data.result.items);

  return NextResponse.json({
    success: true,
    result: transformNaverPayResponse(data),
  });
}
