import { test as base, Page } from '@playwright/test';
import { HomePage } from '@/pages/home.page';

export const test = base.extend<{
  homePage: HomePage;
}>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

export { expect } from '@playwright/test';
export type { Page } from '@playwright/test';
