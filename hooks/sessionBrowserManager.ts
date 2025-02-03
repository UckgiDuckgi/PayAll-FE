import { Browser, BrowserContext, chromium, Page } from 'playwright';

export type BrowserStatus =
  | 'NOT_SIGNIN'
  | 'PINCODE'
  | 'SIGNIN'
  | 'PAYMENT'
  | 'RECAPTCHA'
  | 'RECAPTCHA_PROCESS'
  | 'RECAPTCHA_SUCCESS';

export type SessionBrowser = {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  status: BrowserStatus;
};

export type MapKey = 'COUPANG' | 'ELEVENSTREET' | 'NAVERPAY';

const setPageHeader = async (page: Page) =>
  await page.setExtraHTTPHeaders({
    'sec-ch-ua-platform': '"Windows"',
    'accept-language': 'ko,en-US;q=0.9,en;q=0.8',
    // 'sec-ch-ua':
    //   '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    'sec-fetch-site': 'same-origin',
    'sec-ch-ua-mobile': '?0',
    'accept-encoding': 'gzip, deflate, br, zstd',
    'user-agent': process.env.USER_AGENT ?? '',
  });

class SessionBrowserManager {
  private static instance: Record<MapKey, SessionBrowserManager | null> = {
    COUPANG: null,
    ELEVENSTREET: null,
    NAVERPAY: null,
  };
  public browser!: Browser;
  public context!: BrowserContext;
  public page!: Page;
  public status: BrowserStatus = 'NOT_SIGNIN';

  constructor({ browser, context, page, status }: SessionBrowser, key: MapKey) {
    if (SessionBrowserManager.instance[key]) {
      console.log('Not Created! ~ ', key);
      return SessionBrowserManager.instance[key];
    }
    console.log('Created! ~ ', key);
    this.browser = browser;
    this.context = context;
    this.page = page;
    this.status = status;
    SessionBrowserManager.instance[key] = this;
  }

  public static async getInstance(key: MapKey) {
    if (
      !this.instance[key] ||
      !this.instance[key].browser ||
      !this.instance[key].context ||
      !this.instance[key].page
    ) {
      console.log('New Browser Created! ~ ', key);

      if (this.instance[key]) {
        this.instance[key].browser.close();
      }

      const browser = await chromium.launch({
        executablePath: process.env.CHROME_PATH,
        headless: false,
        args: [
          // '--window-position=-10000,-10000',
          '--window-position=0,0',
          '--disable-quic',
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-blink-features=AutomationControlled',
          '--disable-machine-learning',
          '--disable-speech-api',
          '--disable-voice-input',
          '--disable-translate',
          '--start-minimized',
          '--log-level=3',
        ],
      });

      console.log('New Context Created! ~ ', key);
      const context = await browser.newContext({
        javaScriptEnabled: true,
        viewport: { width: 1280, height: 720 },
        deviceScaleFactor: 1, // 기본 스케일 설정
      });

      console.log('Add Init Script!!');
      await context.addInitScript(() => {
        Object.defineProperty(navigator, 'plugins', {
          get: () => [1, 2, 3], // 임의의 플러그인 값 추가
        });
        Object.defineProperty(navigator, 'mimeTypes', {
          get: () => ['application/pdf'], // PDF MIME 타입 추가
        });
      });

      console.log('New Page Created! ~ ', key);
      const page = await context.newPage();
      await setPageHeader(page);

      this.instance[key] = new this(
        {
          browser,
          context,
          page,
          status: 'NOT_SIGNIN',
        },
        key
      );
    } else {
      try {
        this.instance[key].page.content();
      } catch {
        const page = await this.instance[key].context.newPage();
        await setPageHeader(page);

        this.instance[key] = new this(
          {
            ...this.instance[key],
            page,
            status: 'NOT_SIGNIN',
          },
          key
        );
      }
    }
    console.log('Get Instance Excuted!');
    return this.instance[key];
  }

  public static async close(key: MapKey): Promise<void> {
    if (this.instance[key]) {
      const { browser, page } = this.instance[key];
      await page.close();
      await browser.close();
      this.instance[key] = null;
    }
  }
}

export default SessionBrowserManager;
