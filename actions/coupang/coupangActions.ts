'use server';

import SessionBrowserManager from '@/hooks/sessionBrowserManager';
import {
  delay,
  getPlaywrightActions,
  PlaywrightActionsProps,
  PlaywrightElementSelector,
} from '../playwrightActions';

export type CoupangElementSelector = PlaywrightElementSelector & {
  // Payment
  buttonOrderSelector: string;
  buttonPaymentSelector: string;
  modalPaymentSelector: string;
  // Payment Password
  frameSelector: string;

  buttonGetPincodeSelector: string;
  inputPincodeSelector: string;
  buttonSetPincodeSelector: string;
};

export const getCoupangActions = async ({
  SIGNIN_URL,
  CART_URL,
  DETAIL_BASE_URL,
  DELAY = 2000,
  RANGE = 2000,
  elementSelector,
}: PlaywrightActionsProps<CoupangElementSelector>) => {
  const sessionBrowserManager =
    await SessionBrowserManager.getInstance('COUPANG');

  const playwrightAction = await getPlaywrightActions({
    SIGNIN_URL,
    CART_URL,
    DETAIL_BASE_URL,
    DELAY,
    RANGE,
    elementSelector,
    key: 'COUPANG',
  });
  return {
    ...playwrightAction,
    getPincode: async () => {
      const { page, status } = sessionBrowserManager;

      if (status !== 'NOT_SIGNIN') {
        return false;
      }

      const { buttonGetPincodeSelector } = elementSelector;

      await delay(Math.random() * (DELAY + 1000) + RANGE);
      const isPresent =
        (await page.locator(buttonGetPincodeSelector).count()) > 0;

      if (!isPresent) {
        return false;
      }

      await page.locator(buttonGetPincodeSelector).click();
      await delay(Math.random() * DELAY + RANGE);

      if (isPresent) {
        sessionBrowserManager.status = 'PINCODE';
        return true;
      }
    },
    setPincode: async (pincode: string) => {
      const { page, status } = sessionBrowserManager;

      if (status !== 'PINCODE') {
        if (status === 'NOT_SIGNIN') {
          sessionBrowserManager.status = 'SIGNIN';
        }
        return;
      }

      const { inputPincodeSelector, buttonSetPincodeSelector } =
        elementSelector;
      await page.locator(inputPincodeSelector).fill(pincode);
      await delay(Math.random() * DELAY + RANGE);

      await page.locator(buttonSetPincodeSelector).click();
      await delay(Math.random() * DELAY + RANGE);
      sessionBrowserManager.status = 'SIGNIN';
    },
    payment: async () => {
      const { page, status } = sessionBrowserManager;

      if (status !== 'SIGNIN') {
        return;
      }

      const {
        buttonOrderSelector,
        buttonPaymentSelector,
        modalPaymentSelector,
      } = elementSelector;

      await page.goto(CART_URL);
      await delay(Math.random() * DELAY + RANGE);

      await page.locator(buttonOrderSelector).click();
      await delay(Math.random() * (DELAY + 1000) + RANGE);

      await page.locator(buttonPaymentSelector).click();
      await delay(Math.random() * (DELAY + 3000) + RANGE);

      const screenshotBuffer = await page
        .locator(modalPaymentSelector)
        .screenshot({ timeout: 10000, animations: 'disabled' });

      sessionBrowserManager.status = 'PAYMENT';
      return screenshotBuffer;
    },
    setCoupangPayPassword: async (password: string) => {
      const { page, status } = sessionBrowserManager;

      if (status !== 'PAYMENT') {
        return;
      }

      const { frameSelector } = elementSelector;

      const iframe = page.frameLocator(frameSelector);
      for (const numpad of password) {
        await iframe.locator(`[data-key="${numpad}"]`).click();
        await delay(Math.random() * 1000 + RANGE);
      }
      return;
    },
  };
};
