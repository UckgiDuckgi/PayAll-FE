'use server';

import { Item } from '@/app/api/payments/coupang/route';
import SessionBrowserManager, { MapKey } from '@/hooks/sessionBrowserManager';

export type PlaywrightElementSelector = {
  //SignIn
  inputIdSelector: string;
  inputPwSelector: string;
  buttonSignInSelector: string;
  //AddCart
  inputQuantitySelector: string;
  buttonCartSelector: string;
};

export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export type PlaywrightActionsProps<T> = {
  SIGNIN_URL: string;
  CART_URL: string;
  DETAIL_BASE_URL: string;
  DELAY?: number;
  RANGE?: number;
  elementSelector: T;
  key: MapKey;
};

export const getPlaywrightActions = async ({
  SIGNIN_URL,
  DETAIL_BASE_URL,
  DELAY = 2000,
  RANGE = 2000,
  elementSelector,
  key,
}: PlaywrightActionsProps<PlaywrightElementSelector>) => {
  const sessionBrowserManager = await SessionBrowserManager.getInstance(key);

  return {
    signIn: async ({
      id,
      pw,
      dTime = DELAY,
      rTime = RANGE,
    }: {
      id: string;
      pw: string;
      dTime?: number;
      rTime?: number;
    }) => {
      const { page, status } = sessionBrowserManager;

      if (status !== 'NOT_SIGNIN' && status !== 'RECAPTCHA_SUCCESS') {
        return;
      }

      const { inputIdSelector, inputPwSelector, buttonSignInSelector } =
        elementSelector;

      if (status !== 'RECAPTCHA_SUCCESS') {
        await page.goto(SIGNIN_URL);
        await delay(Math.random() * dTime + rTime);
      }

      await page.locator(inputIdSelector).fill(id);
      await delay(Math.random() * dTime + rTime);

      await page.locator(inputPwSelector).fill(pw);
      await delay(Math.random() * dTime + rTime);

      await page.locator(buttonSignInSelector).click();
      await delay(Math.random() * (dTime + 3000) + rTime);

      if (status === 'RECAPTCHA_SUCCESS') {
        sessionBrowserManager.status = 'SIGNIN';
      }
    },
    addCart: async ({ productId, itemId, quantity }: Item) => {
      const { page, status } = sessionBrowserManager;
      if (status !== 'SIGNIN') {
        return;
      }

      const { inputQuantitySelector, buttonCartSelector } = elementSelector;
      const url = itemId
        ? DETAIL_BASE_URL + productId + '?vendorItemId=' + itemId
        : DETAIL_BASE_URL + productId;
      await page.goto(url);
      await delay(Math.random() * DELAY + RANGE);

      await page.locator(inputQuantitySelector).fill(quantity.toString());
      await delay(Math.random() * DELAY + RANGE);

      await page.locator(buttonCartSelector).click();
      await delay(Math.random() * (DELAY + 1000) + RANGE);
    },
    close: async () => {
      await SessionBrowserManager.close(key);
    },
  };
};
