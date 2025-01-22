'use server';

import SessionBrowserManager, { MapKey } from '@/hooks/sessionBrowserManager';
import { delay } from '../playwrightActions';

type GetCookiesProps = {
  signInUrl: string;
  idSelector: string;
  pwSelector: string;
  buttonSelector: string;
  id: string;
  pw: string;
  key: MapKey;
};

type GetCookiesWithKakaoAuthProps = {
  signInUrl: string;
  buttonKakaoAuthSelector: string;
  inputKakaoIdSelector: string;
  inputKakaoPwSelector: string;
  buttonKakaoSignInSelector: string;
  id: string;
  pw: string;
};

export async function getCookies({
  signInUrl,
  idSelector,
  pwSelector,
  buttonSelector,
  id,
  pw,
  key,
}: GetCookiesProps) {
  const sessionBrowserManager = await SessionBrowserManager.getInstance(key);

  const { context, page } = sessionBrowserManager;

  await page.goto(signInUrl);

  await page.locator(idSelector).fill(id);
  await delay(Math.random() * 1000 + 500);

  await page.locator(pwSelector).fill(pw);
  await delay(Math.random() * 1000 + 500);

  await page.locator(buttonSelector).click();
  await delay(Math.random() * 3000 + 500);

  return await context.cookies();
}

export async function getCookiesWithKakaoAuth({
  signInUrl,
  buttonKakaoAuthSelector,
  inputKakaoIdSelector,
  inputKakaoPwSelector,
  buttonKakaoSignInSelector,
  id,
  pw,
}: GetCookiesWithKakaoAuthProps) {
  const sessionBrowserManager =
    await SessionBrowserManager.getInstance('ELEVENSTREET');

  const { context, page } = sessionBrowserManager;

  await page.goto(signInUrl);

  await page.locator(buttonKakaoAuthSelector).click();
  await delay(Math.random() * 1000 + 500);

  await page.locator(inputKakaoIdSelector).fill(id);
  await delay(Math.random() * 1000 + 500);

  await page.locator(inputKakaoPwSelector).fill(pw);
  await delay(Math.random() * 1000 + 500);

  await page.locator(buttonKakaoSignInSelector).click();
  await delay(Math.random() * 3000 + 500);

  return await context.cookies();
}

export async function paymentClose() {
  await SessionBrowserManager.close('ELEVENSTREET');
}
