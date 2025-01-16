import SessionBrowserManager, {
  BrowserStatus,
} from '@/hooks/sessionBrowserManager';
import { Page } from 'playwright';

export type ActionType = 'GOTO' | 'FILL' | 'CLICK' | 'CHECK';

type PlaywrightGotoAction = {
  actionType: 'GOTO';
  url: string;
};

type PlaywrightClickAction = {
  actionType: 'CLICK';
  selector: string;
};

type PlaywrightFillAction = {
  actionType: 'FILL';
  selector: string;
  content: string;
};

type PlaywrightCheckAction = {
  actionType: 'CHECK';
  selector: string;
};

export type PlaywrightAction = {
  action:
    | PlaywrightGotoAction
    | PlaywrightClickAction
    | PlaywrightFillAction
    | PlaywrightCheckAction;
  time?: number;
  range?: number;
};

const DELAY = 4000;
const RANGE = 2000;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function excutePlaywrightActions({
  playwrightActions,
  expectStatus,
}: {
  playwrightActions: PlaywrightAction[];
  expectStatus?: BrowserStatus;
}) {
  const { page, status } = await SessionBrowserManager.getInstance();
  if (expectStatus && status !== expectStatus) {
    return;
  }

  for (const playwrightAction of playwrightActions) {
    await excutePlaywrightAction(playwrightAction, page);
  }
}

export async function excutePlaywrightAction(
  { action, time = DELAY, range = RANGE }: PlaywrightAction,
  page: Page
) {
  const { actionType } = action;
  switch (actionType) {
    case 'GOTO': {
      const { url } = action;
      await page.goto(url);
      await delay(Math.random() * time + range);
      break;
    }
    case 'CLICK': {
      const { selector } = action;
      await page.locator(selector).click();
      await delay(Math.random() * time + range);
      break;
    }
    case 'FILL': {
      const { selector, content } = action;
      await page.locator(selector).fill(content);
      await delay(Math.random() * time + range);
      break;
    }
  }
}

export async function playwrightGoto({
  page,
  url,
  time = DELAY,
  range = RANGE,
}: {
  page: Page;
  url: string;
  time?: number;
  range?: number;
}) {
  await page.goto(url);
  await delay(Math.random() * time + range);
}

export async function playwrightClick({
  page,
  selector,
  time = DELAY,
  range = RANGE,
}: {
  page: Page;
  selector: string;
  time?: number;
  range?: number;
}) {
  await page.locator(selector).click();
  await delay(Math.random() * time + range);
}

export async function playwrightFill({
  page,
  selector,
  content,
  time = DELAY,
  range = RANGE,
}: {
  page: Page;
  selector: string;
  content: string;
  time?: number;
  range?: number;
}) {
  await page.locator(selector).fill(content);
  await delay(Math.random() * time + range);
}

export async function playwrightCheck({
  page,
  selector,
}: {
  page: Page;
  selector: string;
}) {
  return (await page.locator(selector).count()) > 0;
}

export async function playwrightScreenShot({
  page,
  selector,
}: {
  page: Page;
  selector: string;
}) {
  return await page.locator(selector).screenshot();
}
