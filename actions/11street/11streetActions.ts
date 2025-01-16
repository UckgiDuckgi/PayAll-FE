'use server';

import SessionBrowserManager from '@/hooks/sessionBrowserManager';

const BASE_URL = 'https://www.11st.co.kr/main';
const DETAIL_BASE_URL = 'https://www.coupang.com/vp/products/';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const coupangSignIn = async () => {
  const { page, status } = await SessionBrowserManager.getInstance();

  if (status !== 'NOT_SIGNIN') {
    return;
  }

  await page.goto(BASE_URL);
  await delay(Math.random() * 4000 + 2000);

  await page.locator('.login').click();
  await delay(Math.random() * 4000 + 2000);

  const coupangId = process.env.COUPANG_ID;
  const coupangPw = process.env.COUPANG_PW;
  await page.locator('._loginIdInput').fill(coupangId ?? '');
  await delay(Math.random() * 4000 + 2000);

  await page.locator('._loginPasswordInput').fill(coupangPw ?? '');
  await delay(Math.random() * 3000 + 4000);

  await page.locator('.login__button--submit').click();
  await delay(Math.random() * 3000 + 4000);
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
  await delay(Math.random() * 4000 + 2000);

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
  await delay(Math.random() * 4000 + 2000);

  await page.locator('.pincode-input__button').click();
  await delay(Math.random() * 4000 + 2000);
  sessionBrowserManager.status = 'SIGNIN';
};

export const coupangAddCart = async ({
  pid,
  quantity,
}: {
  pid: string;
  quantity: number;
}) => {
  const { page, status } = await SessionBrowserManager.getInstance();

  if (status !== 'SIGNIN') {
    return;
  }
  console.log('Add Cart Function!! ~ ', status);
  await page.goto(DETAIL_BASE_URL + pid);
  await delay(Math.random() * 4000 + 2000);

  await page.locator('.prod-quantity__input').fill(quantity.toString());
  await delay(Math.random() * 4000 + 2000);

  await page.locator('.prod-cart-btn').click();
  await delay(Math.random() * 5000 + 3000);
};

export const coupangPayAll = async () => {
  const sessionBrowserManager = await SessionBrowserManager.getInstance();
  const { page, status } = sessionBrowserManager;

  if (status !== 'SIGNIN') {
    return;
  }
  console.log('Pay All Function!!');

  await page.goto(BASE_URL);
  await delay(Math.random() * 4000 + 2000);
  await page.locator('.mycart-preview-module').click();
  await delay(Math.random() * 4000 + 2000);
  await page.locator('.order-buttons').click();
  await delay(Math.random() * 4000 + 2000);
  await page.locator('.paymentBtn-v2-style').click();
  await delay(Math.random() * 4000 + 2000);

  await delay(Math.random() * 6000 + 2000);
  const screenshotBuffer = await page
    .locator('#modal-callLGPayment')
    .screenshot();
  await delay(Math.random() * 4000 + 2000);

  sessionBrowserManager.status = 'PAYMENT';
  return screenshotBuffer;
};

export const coupangInsertPassword = async (password: string) => {
  console.log('🚀 ~ coupangPayment');

  const sessionBrowserManager = await SessionBrowserManager.getInstance();
  const { page, status } = sessionBrowserManager;

  if (status != 'PAYMENT') {
    return;
  }

  const iframe = page.frameLocator('#callLGPayment');
  for (const numpad of password) {
    await iframe.locator(`[data-key="${numpad}"]`).click();
    await delay(Math.random() * 1000 + 2000);
  }
};
