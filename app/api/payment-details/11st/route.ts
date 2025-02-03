import {
  getCookiesWithKakaoAuth,
  paymentClose,
} from '@/actions/payment/paymentActions';
import { ELEVENSTREET_SIGNIN_URL } from '@/constants/url';
import { ElevenStreetOrderList, TransformedOrder } from '@/types/payment';
import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';
import { convertDateToTimestamp, formatCookies } from '@/lib/utils';

export const dynamic = 'force-dynamic';

function parseOrderTable(html: string): ElevenStreetOrderList[] {
  const $ = cheerio.load(html); // Load the HTML content
  const rows = $('tbody tr');
  const orders: ElevenStreetOrderList[] = [];

  rows.each((_index, row) => {
    const orderDateElement = $(row).find('td:first-child .odr_date');
    const productInfoElement = $(row).find(
      'td:nth-child(2) .cont p:nth-of-type(2) a'
    );
    const productPriceElement = $(row).find('td:nth-child(3) strong');
    const productAmountElement = $(row).find('td:nth-child(3) p.fnt_1');
    const shippingFeeElement = $(row).find('td:nth-child(4) .fnt_2');

    if (
      orderDateElement.length &&
      productInfoElement.length &&
      productPriceElement &&
      productAmountElement.length &&
      shippingFeeElement.length
    ) {
      const cleanText = (text: string): string =>
        text.replace(/\\n/g, '').replace(/\\s+/g, ' ').trim();

      const cleanProductInfo = (info: string): string =>
        cleanText(info)
          .replace(/우주패스/g, '')
          .trim();

      const quantityText = productAmountElement
        .contents()
        .filter((_i, el) => el.type === 'text')
        .text()
        .trim();
      const quantityMatch = quantityText.match(/\((\d+)개\)/);
      const quantity = quantityMatch ? parseInt(quantityMatch[1], 10) : 1;

      orders.push({
        orderId: cleanText(orderDateElement.text().split(' ')[1]),
        orderDate: cleanText(orderDateElement.text().split(' ')[0]),
        productInfo: cleanProductInfo(productInfoElement.text()),
        productPrice: productPriceElement.text(),
        productAmount: quantity,
        shippingFee: cleanText(shippingFeeElement.text()),
      });
    }
  });

  return orders;
}

function transformElevenStreetOrder({
  productPrice,
  orderDate,
  productInfo,
  productAmount,
}: ElevenStreetOrderList): TransformedOrder {
  const price = parseFloat(productPrice.replace(/,/g, ''));

  return {
    paymentTime: convertDateToTimestamp(orderDate),
    paymentPlace: '11번가', // ElevenStreet 주문은 보통 "11번가"로 표기합니다.
    purchaseProductList: [
      {
        productName: productInfo,
        price,
        quantity: productAmount,
      },
    ],
  };
}

function transformElevenStreetOrders(
  orders: ElevenStreetOrderList[]
): TransformedOrder[] {
  return orders.map(transformElevenStreetOrder);
}

export async function POST(request: Request) {
  // Request
  const { url, shDateFrom, shDateTo, pageNumber, rows, id, pw } =
    await request.json();

  if (!url) {
    return NextResponse.json(
      { error: 'clientData is required' },
      { status: 400 }
    );
  }

  const cookies = await getCookiesWithKakaoAuth({
    signInUrl: ELEVENSTREET_SIGNIN_URL,
    buttonKakaoAuthSelector: '.c-sns__link.c-sns__link--kakao',
    inputKakaoIdSelector: '#loginId--1',
    inputKakaoPwSelector: '#password--2',
    buttonKakaoSignInSelector: '.btn_g.highlight.submit',
    id,
    pw,
  });

  await paymentClose('ELEVENSTREET');

  const param = new URLSearchParams({
    method: 'getCancelRequestListAjax',
    type: 'orderList2nd',
    pageNumber,
    rows,
    shDateFrom,
    shDateTo,
  });

  // GET 11st Payment List
  const response = await fetch(url + `?${param}`, {
    method: 'GET',
    headers: {
      Cookie: formatCookies(cookies),
    },
  });
  const rawString = await response.text();
  const data = parseOrderTable(rawString);
  console.log('🚀 ~ POST ~ data:', transformElevenStreetOrders(data));

  return NextResponse.json({
    success: true,
    result: transformElevenStreetOrders(data),
  });
}
