import {
  getCookiesWithKakaoAuth,
  paymentClose,
} from '@/actions/payment/paymentActions';
import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';

const SIGNIN_URL = 'https://buy.11st.co.kr/my11st/order/OrderList.tmall';

export async function GET() {
  const cookies = await getCookiesWithKakaoAuth({
    signInUrl: SIGNIN_URL,
    buttonKakaoAuthSelector: '.c-sns__link.c-sns__link--kakao',
    inputKakaoIdSelector: '#loginId--1',
    inputKakaoPwSelector: '#password--2',
    buttonKakaoSignInSelector: '.btn_g.highlight.submit',
    id: process.env.KAKAO_ID ?? '',
    pw: process.env.KAKAO_PW ?? '',
  });

  await paymentClose();
  return NextResponse.json({ success: true, result: cookies });
}

export type OrderInfo = {
  orderId: string;
  orderDate: string;
  productInfo: string;
  productPrice: string;
  productAmount: number;
  shippingFee: string;
};

function parseOrderTable(html: string): OrderInfo[] {
  const $ = cheerio.load(html); // Load the HTML content
  const rows = $('tbody tr');
  const orders: OrderInfo[] = [];

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

export async function POST(request: Request) {
  // Request
  const { url, cookie, shDateFrom, shDateTo, pageNumber, rows } =
    await request.json();

  if (!url || !cookie) {
    return NextResponse.json(
      { error: 'clientData is required' },
      { status: 400 }
    );
  }

  const param = new URLSearchParams({
    method: 'getCancelRequestListAjax',
    type: 'orderList2nd',
    pageNumber,
    rows,
    shDateFrom,
    shDateTo,
  });

  // GET Coupang Payment List
  const response = await fetch(url + `?${param}`, {
    method: 'GET',
    headers: {
      Cookie: cookie,
    },
  });
  // const data = (await response.json()) as CoupangPaymentResponse;
  const rawString = await response.text();
  // console.log('🚀 ~ POST ~ rawString:', rawString);
  const data = parseOrderTable(rawString);
  // writeFileSync('output.txt', rawString, 'utf8');
  // console.log('🚀 ~ POST ~ data111:', data);

  return NextResponse.json({ success: true, result: data });
}
