import { Page } from '@playwright/test';

export async function visit(page: Page, url: string) {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
}
