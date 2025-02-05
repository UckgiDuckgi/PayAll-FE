'use server';

import SessionBrowserManager from '@/hooks/sessionBrowserManager';
import {
  delay,
  getPlaywrightActions,
  PlaywrightActionsProps,
  PlaywrightElementSelector,
} from '../playwrightActions';

export type ElevenStreetElementSelector = PlaywrightElementSelector & {
  // Kakao SignIn
  buttonKakaoAuthSelector: string;
  inputKakaoIdSelector: string;
  inputKakaoPwSelector: string;
  buttonKakaoSignInSelector: string;
  // Payment
  buttonOrderSelector: string;
  buttonPaymentSelector: string;
  buttonKbPaySelector: string;
  // ReCAPTCHA
  iframeReCaptchaSelector: string;
  buttonReCaptchaStartSelector: string;
  // ReCAPTCHA Photo
  iframeReCaptchaPhotoSelector: string;
  imageBoxSelector: string;
  buttonReCaptchaEndSelector: string;
  tableReCaptchaSelector: string;
  statusReCaptchaSelector: string;
  modalPropSelector: string;
};

function shuffleArray(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap elements at i and randomIndex
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

export const getElevenStreetActions = async ({
  SIGNIN_URL,
  CART_URL,
  DETAIL_BASE_URL,
  DELAY = 2000,
  RANGE = 2000,
  elementSelector,
}: PlaywrightActionsProps<ElevenStreetElementSelector>) => {
  const sessionBrowserManager =
    await SessionBrowserManager.getInstance('ELEVENSTREET');

  const playwrightAction = await getPlaywrightActions({
    SIGNIN_URL,
    CART_URL,
    DETAIL_BASE_URL,
    DELAY,
    RANGE,
    elementSelector,
    key: 'ELEVENSTREET',
  });
  return {
    ...playwrightAction,
    kakaoSignIn: async ({
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

      const {
        buttonKakaoAuthSelector,
        inputKakaoIdSelector,
        inputKakaoPwSelector,
        buttonKakaoSignInSelector,
      } = elementSelector;

      if (status !== 'RECAPTCHA_SUCCESS') {
        await page.goto(SIGNIN_URL);
        await delay(Math.random() * dTime + rTime);
      }

      await page.locator(buttonKakaoAuthSelector).click();
      await delay(Math.random() * dTime + rTime);

      await page.locator(inputKakaoIdSelector).fill(id);
      await delay(Math.random() * dTime + rTime);

      await page.locator(inputKakaoPwSelector).fill(pw);
      await delay(Math.random() * dTime + rTime);

      await page.locator(buttonKakaoSignInSelector).click();
      await delay(Math.random() * (dTime + 3000) + rTime);

      sessionBrowserManager.status = 'SIGNIN';
    },
    payment: async () => {
      const { context, page, status } = sessionBrowserManager;

      if (status !== 'SIGNIN') {
        return;
      }

      const {
        buttonOrderSelector,
        buttonPaymentSelector,
        buttonKbPaySelector,
      } = elementSelector;

      await page.goto(CART_URL);
      await delay(Math.random() * DELAY + RANGE);

      await page.locator(buttonOrderSelector).click();
      await delay(Math.random() * (DELAY + 1000) + RANGE);

      await page.locator('#tabPayId5').click();
      await delay(Math.random() * (DELAY + 1000) + RANGE);

      // TODO: 좀더 오래 기다리게
      const popupPromise = context.waitForEvent('page', { timeout: 5000 });

      await page.locator(buttonPaymentSelector).click();
      await delay(Math.random() * (DELAY + 1000) + RANGE);

      const popup = await popupPromise;
      await popup.waitForLoadState();

      await popup.frameLocator('#kbframe').locator(buttonKbPaySelector).click();

      await delay(Math.random() * (DELAY + 1000) + RANGE);
      const screenshotBuffer = await popup
        .frameLocator('#kbframe')
        .locator('.appcardr_window_popup')
        .screenshot();

      sessionBrowserManager.status = 'PAYMENT';

      return screenshotBuffer;
    },
    reCaptcha: async () => {
      const { page, status } = sessionBrowserManager;

      if (status === 'RECAPTCHA_SUCCESS' || status === 'RECAPTCHA_PROCESS') {
        return;
      }

      const {
        iframeReCaptchaSelector,
        buttonReCaptchaStartSelector: buttonReCaptchaSelector,
        iframeReCaptchaPhotoSelector,
        imageBoxSelector,
        tableReCaptchaSelector,
      } = elementSelector;

      page.goto(SIGNIN_URL);
      await delay(Math.random() * (DELAY + 10000) + RANGE);

      const isPresent =
        (await page
          .frameLocator(iframeReCaptchaSelector)
          .locator(buttonReCaptchaSelector)
          .count()) > 0;

      if (!isPresent) {
        sessionBrowserManager.status = 'RECAPTCHA_SUCCESS';
        return;
      }

      await page
        .frameLocator(iframeReCaptchaSelector)
        .locator(buttonReCaptchaSelector)
        .click();
      await delay(Math.random() * (DELAY + 2000) + RANGE);

      const isPhotoSelectPresent =
        (await page
          .frameLocator(iframeReCaptchaPhotoSelector)
          .locator(imageBoxSelector)
          .last()
          .count()) > 0;

      if (!isPhotoSelectPresent) {
        return;
      }

      const screenshotBuffer = await page
        .frameLocator(iframeReCaptchaPhotoSelector)
        .locator(imageBoxSelector)
        .last()
        .screenshot();

      const className = await page
        .frameLocator(iframeReCaptchaPhotoSelector)
        .locator(tableReCaptchaSelector)
        .getAttribute('class');

      const tableSize = className?.split('-')[3] === '33' ? 3 : 4;
      sessionBrowserManager.status = 'RECAPTCHA_PROCESS';
      return { screenshotBuffer, tableSize };
    },
    clickReCaptcha: async (
      selectedTileList: string,
      isReCaptchaEnd: boolean
    ) => {
      const { page, status } = sessionBrowserManager;

      if (status !== 'RECAPTCHA_PROCESS') {
        return;
      }

      const { iframeReCaptchaPhotoSelector, buttonReCaptchaEndSelector } =
        elementSelector;

      const iframe = page.frameLocator(iframeReCaptchaPhotoSelector);

      const selectedTiles = shuffleArray(selectedTileList.split(','));
      for (const selectedTile of selectedTiles) {
        if (!selectedTile) {
          break;
        }

        await iframe
          .locator(`[tabindex="${selectedTile}"].rc-imageselect-tile`)
          .click();
        await delay(Math.random() * 100 + 200);
      }
      const textContent = await iframe
        .locator(buttonReCaptchaEndSelector)
        .textContent();

      const type =
        textContent === '다음' ||
        textContent === '건너뛰기' ||
        selectedTiles[0] === ''
          ? 'ONCE'
          : 'MULTIPLE';

      if (isReCaptchaEnd) {
        await iframe.locator(buttonReCaptchaEndSelector).click();
        await delay(Math.random() * 1000 + RANGE);
      }

      await delay(
        type === 'MULTIPLE'
          ? Math.random() * 8000 + RANGE
          : Math.random() * 200 + 300
      );

      return;
    },
    retryReCaptcha: async () => {
      const { page, status } = sessionBrowserManager;

      if (status === 'RECAPTCHA_SUCCESS') {
        return;
      }

      const {
        iframeReCaptchaSelector,
        iframeReCaptchaPhotoSelector,
        imageBoxSelector,
        tableReCaptchaSelector,
        statusReCaptchaSelector,
      } = elementSelector;

      const isPhotoSelectPresent =
        (await page
          .frameLocator(iframeReCaptchaPhotoSelector)
          .locator(imageBoxSelector)
          .last()
          .count()) > 0;

      if (!isPhotoSelectPresent) {
        sessionBrowserManager.status = 'RECAPTCHA_SUCCESS';
        return;
      }

      const captchaStatus = await page
        .frameLocator(iframeReCaptchaSelector)
        .locator(statusReCaptchaSelector)
        .textContent();

      if (captchaStatus === '확인됨') {
        sessionBrowserManager.status = 'RECAPTCHA_SUCCESS';
        return;
      }

      const screenshotBuffer = await page
        .frameLocator(iframeReCaptchaPhotoSelector)
        .locator(imageBoxSelector)
        .last()
        .screenshot();

      const className = await page
        .frameLocator(iframeReCaptchaPhotoSelector)
        .locator(tableReCaptchaSelector)
        .getAttribute('class');

      const tableSize = className?.split('-')[3] === '33' ? 3 : 4;
      sessionBrowserManager.status = 'RECAPTCHA_PROCESS';
      return { screenshotBuffer, tableSize };
    },
    clickModal: async () => {
      const { page } = sessionBrowserManager;

      const { modalPropSelector } = elementSelector;

      await delay(Math.random() * DELAY + RANGE);
      const isModal = (await page.locator(modalPropSelector).count()) > 0;

      if (!isModal) {
        return;
      }

      await page.locator(modalPropSelector).click();
      await delay(Math.random() * DELAY + RANGE);
    },
  };
};
