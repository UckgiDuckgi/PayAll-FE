import { getCookies, paymentClose } from '@/actions/payment/paymentActions';
import { COUPANG_SIGNIN_URL } from '@/constants/url';
import {
  CoupangOrderList,
  PurchaseProduct,
  TransformedOrder,
} from '@/types/payment';
import { NextResponse } from 'next/server';
import { formatCookies } from '@/lib/utils';

export const dynamic = 'force-dynamic';

function transformCoupangOrder({
  orderedAt,
  bundleReceiptList,
}: CoupangOrderList): TransformedOrder {
  const payment_time = orderedAt;

  const payment_place = '쿠팡';

  const purchase_product_list: PurchaseProduct[] = bundleReceiptList
    .flatMap(({ vendorItems }) => vendorItems)
    .map(({ vendorItemName, unitPrice, quantity }) => ({
      product_name: vendorItemName,
      price: unitPrice,
      quantity: quantity,
    }));

  return {
    payment_time,
    payment_place,
    purchase_product_list,
  };
}

function transformCoupangOrders(
  orders: CoupangOrderList[]
): TransformedOrder[] {
  return orders.map(transformCoupangOrder);
}

export async function POST(request: Request) {
  // Request
  const { url, requestYear, pageIndex, size, id, pw } = await request.json();

  if (!url) {
    return NextResponse.json(
      { error: 'clientData is required' },
      { status: 400 }
    );
  }

  console.log('url: ', url);

  const cookies = await getCookies({
    signInUrl: COUPANG_SIGNIN_URL,
    idSelector: '._loginIdInput',
    pwSelector: '._loginPasswordInput',
    buttonSelector: '.login__button--submit',
    id,
    pw,
    key: 'COUPANG',
  });

  await paymentClose('COUPANG');

  const param = new URLSearchParams({
    requestYear,
    pageIndex,
    size,
  });

  // GET Coupang Payment List
  const response = await fetch(url + `?${param}`, {
    method: 'GET',
    headers: {
      Cookie: formatCookies(cookies),
    },
  });
  // const data = (await response.json()) as CoupangPaymentResponse;
  const data = await response.json();
  console.log('🚀 ~ POST ~ data:', data);
  const { orderList: CoupangOrderList } = data;

  return NextResponse.json({
    success: true,
    result: transformCoupangOrders(CoupangOrderList),
  });
}
