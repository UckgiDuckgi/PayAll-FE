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
  const sessionBrowserManager = await SessionBrowserManager.getInstance();

  const playwrightAction = await getPlaywrightActions({
    SIGNIN_URL,
    CART_URL,
    DETAIL_BASE_URL,
    DELAY,
    RANGE,
    elementSelector,
  });
  return {
    ...playwrightAction,
    getPincode: async () => {
      const { page, status } = sessionBrowserManager;

      if (status !== 'NOT_SIGNIN') {
        return false;
      }

      const { buttonGetPincodeSelector } = elementSelector;

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
      console.log('Pay All Function!!');

      await page.goto(CART_URL);
      await delay(Math.random() * DELAY + RANGE);

      await page.locator(buttonOrderSelector).click();
      console.log('Order Button Clicked!');
      await delay(Math.random() * DELAY + RANGE);

      await page.locator(buttonPaymentSelector).click();
      console.log('Payment Button Clicked!');
      await delay(Math.random() * DELAY + RANGE);

      await delay(Math.random() * (DELAY + 2000) + RANGE);
      const screenshotBuffer = await page
        .locator(modalPaymentSelector)
        .screenshot();

      sessionBrowserManager.status = 'PAYMENT';
      return screenshotBuffer;
    },
    setCoupangPayPassword: async (password: string) => {
      const { page, status } = sessionBrowserManager;

      if (status !== 'PAYMENT') {
        return;
      }

      console.log('🚀 ~ coupangPayment ~ ', status);
      const { frameSelector } = elementSelector;

      const iframe = page.frameLocator(frameSelector);
      for (const numpad of password) {
        await iframe.locator(`[data-key="${numpad}"]`).click();
        console.log('numpad ', numpad, 'clicked!');
        await delay(Math.random() * 1000 + RANGE);
      }
      return;
    },
  };
};
