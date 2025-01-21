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

const setPageHeader = async (page: Page) =>
  await page.setExtraHTTPHeaders({
    'sec-ch-ua-platform': '"Windows"',
    'accept-language': 'ko,en-US;q=0.9,en;q=0.8',
    'sec-ch-ua':
      '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    'sec-fetch-site': 'same-origin',
    'sec-ch-ua-mobile': '?0',
    // 'sec-fetch-mode': 'cors',
    // 'sec-fetch-dest': 'empty',
    'accept-encoding': 'gzip, deflate, br, zstd',
    'user-agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    // 'x-requested-with': '',
  });

class SessionBrowserManager {
  private static instance: SessionBrowserManager | null;
  public browser!: Browser;
  public context!: BrowserContext;
  public page!: Page;
  public status: BrowserStatus = 'NOT_SIGNIN';

  constructor({ browser, context, page, status }: SessionBrowser) {
    if (SessionBrowserManager.instance) {
      console.log('Not Created!');
      return SessionBrowserManager.instance;
    }
    console.log('Created!');
    this.browser = browser;
    this.context = context;
    this.page = page;
    this.status = status;
    SessionBrowserManager.instance = this;
  }

  public static async getInstance() {
    if (!this.instance) {
      console.log('New Browser Created!');
      process.env.DISPLAY = ':99';
      const browser = await chromium.launch({
        executablePath: '/opt/google/chrome/chrome',
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
      const context = await browser.newContext({
        javaScriptEnabled: true,
        viewport: { width: 1280, height: 720 },
        deviceScaleFactor: 1, // 기본 스케일 설정
      });

      await context.addInitScript(() => {
        Object.defineProperty(navigator, 'plugins', {
          get: () => [1, 2, 3], // 임의의 플러그인 값 추가
        });
        Object.defineProperty(navigator, 'mimeTypes', {
          get: () => ['application/pdf'], // PDF MIME 타입 추가
        });
        // window.chrome 속성 정의
        Object.defineProperty(window, 'chrome', {
          get: () => ({ runtime: {} }),
        });
      });

      const page = await context.newPage();
      await setPageHeader(page);

      this.instance = new this({
        browser,
        context,
        page,
        status: 'NOT_SIGNIN',
      });
    }
    console.log('Get Instance Excuted!');
    return this.instance;
  }

  public static async close(): Promise<void> {
    if (this.instance) {
      const { browser, page } = this.instance;
      await page.close();
      await browser.close();
      this.instance = null;
    }
  }
}

export default SessionBrowserManager;
