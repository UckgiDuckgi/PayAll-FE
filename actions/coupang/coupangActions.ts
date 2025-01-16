'use server';

import { Item } from '@/app/api/coupang/route';
import SessionBrowserManager from '@/hooks/sessionBrowserManager';

const BASE_URL = 'https://www.coupang.com/';
const DETAIL_BASE_URL = 'https://www.coupang.com/vp/products/';

const DELAY = 2000;
const RANGE = 2000;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const coupangSignIn = async () => {
  const { page, status } = await SessionBrowserManager.getInstance();

  if (status !== 'NOT_SIGNIN') {
    return;
  }

  await page.goto(BASE_URL);
  console.log('Go to Main');
  await delay(Math.random() * DELAY + RANGE);

  await page.locator('.login').click();
  console.log('Login Button Clicked!');
  await delay(Math.random() * DELAY + RANGE);

  const coupangId = process.env.COUPANG_ID;
  const coupangPw = process.env.COUPANG_PW;
  await page.locator('._loginIdInput').fill(coupangId ?? '');
  console.log('Login ID Filled!');
  await delay(Math.random() * DELAY + RANGE);

  await page.locator('._loginPasswordInput').fill(coupangPw ?? '');
  console.log('Login PWD Filled!');
  await delay(Math.random() * DELAY + RANGE);

  await page.locator('.login__button--submit').click();
  console.log('Login Button Clicked!');
  await delay(Math.random() * DELAY + RANGE);
};

export const coupangGetPincode = async () => {
  const sessionBrowserManager = await SessionBrowserManager.getInstance();
  const { page, status } = sessionBrowserManager;

  if (status !== 'NOT_SIGNIN') {
    return false;
  }

  const isPresent =
    (await page.locator('.pincode-content__button').count()) > 0;

  if (!isPresent) {
    return false;
  }

  await page.locator('.pincode-content__button').click();
  await delay(Math.random() * DELAY + RANGE);

  if (isPresent) {
    sessionBrowserManager.status = 'PINCODE';
    return true;
  }
};

export const coupangSetPincode = async (pincode: string) => {
  console.log('🚀 ~ coupangSetPincode ~ pincode:', pincode);
  const sessionBrowserManager = await SessionBrowserManager.getInstance();
  const { page, status } = sessionBrowserManager;

  if (status !== 'PINCODE') {
    if (status === 'NOT_SIGNIN') {
      sessionBrowserManager.status = 'SIGNIN';
    }
    return;
  }

  await page
    .locator('.pincode-input__pincode-input-box__pincode')
    .fill(pincode);
  await delay(Math.random() * DELAY + RANGE);

  await page.locator('.pincode-input__button').click();
  await delay(Math.random() * DELAY + RANGE);
  sessionBrowserManager.status = 'SIGNIN';
};

export const coupangAddCart = async ({ productId, itemId, quantity }: Item) => {
  const { page, status } = await SessionBrowserManager.getInstance();

  if (status !== 'SIGNIN') {
    return;
  }
  console.log('Add Cart Function!! ~ ', status);
  const url = itemId
    ? DETAIL_BASE_URL + productId + '?vendorItemId=' + itemId
    : DETAIL_BASE_URL + productId;
  await page.goto(url);
  await delay(Math.random() * DELAY + RANGE);

  await page.locator('.prod-quantity__input').fill(quantity.toString());
  console.log('Product Quantity Set');
  await delay(Math.random() * DELAY + RANGE);

  await page.locator('.prod-cart-btn').click();
  console.log('Product Cart Button Clicked!');
  await delay(Math.random() * DELAY + RANGE);
};

export const coupangPayAll = async () => {
  const sessionBrowserManager = await SessionBrowserManager.getInstance();
  const { page, status } = sessionBrowserManager;

  if (status !== 'SIGNIN') {
    return;
  }
  console.log('Pay All Function!!');

  await page.goto(BASE_URL);
  await delay(Math.random() * DELAY + RANGE);

  await page.locator('.mycart-preview-module').click();
  console.log('MyCart Button Clicked!');
  await delay(Math.random() * DELAY + RANGE);

  await page.locator('.order-buttons').click();
  console.log('Order Button Clicked!');
  await delay(Math.random() * DELAY + RANGE);

  await page.locator('.paymentBtn-v2-style').click();
  console.log('Payment Button Clicked!');
  await delay(Math.random() * DELAY + RANGE);

  await delay(Math.random() * (DELAY + 2000) + RANGE);
  const screenshotBuffer = await page
    .locator('#modal-callLGPayment')
    .screenshot();

  sessionBrowserManager.status = 'PAYMENT';
  return screenshotBuffer;
};

export const coupangInsertPassword = async (password: string) => {
  const sessionBrowserManager = await SessionBrowserManager.getInstance();
  const { page, status } = sessionBrowserManager;

  console.log('🚀 ~ coupangPayment ~ ', status);

  if (status !== 'PAYMENT') {
    return;
  }

  const iframe = page.frameLocator('#callLGPayment');
  for (const numpad of password) {
    await iframe.locator(`[data-key="${numpad}"]`).click();
    console.log('numpad ', numpad, 'clicked!');
    await delay(Math.random() * 1000 + RANGE);
  }
  return;
};

export const coupangClose = async () => {
  await SessionBrowserManager.close();
};
