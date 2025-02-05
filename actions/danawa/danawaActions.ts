'use server';

import SessionBrowserManager from '@/hooks/sessionBrowserManager';
import { delay } from '../playwrightActions';

export type DanawaProps = {
  url: string;
};

export const getDanawaActions = async ({ url }: DanawaProps) => {
  const sessionBrowserManager =
    await SessionBrowserManager.getInstance('DANAWA');

  return {
    getPcode: async () => {
      const { page } = sessionBrowserManager;
      await page.goto(url);
      await delay(Math.random() * 5000 + 500);

      const html = await page.content();
      return html;
    },
    close: async () => {
      await SessionBrowserManager.close('DANAWA');
    },
  };
};
