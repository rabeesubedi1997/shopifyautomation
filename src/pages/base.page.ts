import { Page, expect } from '@playwright/test';
import { BasePage as IBasePage } from '@/types/page.types';

export abstract class BasePage implements IBasePage {
  public readonly page: Page;
  public abstract readonly url: string;
  public abstract readonly title: string;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    try {
      await this.page.goto(this.url, { timeout: 30000 });
      await this.waitForPageLoad();
    } catch {
      // Fallback for Firefox with longer timeout
      try {
        await this.page.goto(this.url, { timeout: 45000 });
        await this.page.waitForTimeout(2000);
      } catch {
        // Last resort - just wait and continue
        await this.page.waitForTimeout(3000);
      }
    }
  }

  async waitForPageLoad(): Promise<void> {
    // Wait for DOM content to be loaded instead of networkidle
    try {
      await this.page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    } catch {
      // Fallback for slower browsers like Firefox
      await this.page.waitForTimeout(2000);
    }
    await this.page.waitForTimeout(1000);
  }

  async verifyPageTitle(): Promise<void> {
    await expect(this.page).toHaveTitle(new RegExp(this.title, 'i'));
  }

  async verifyUrl(): Promise<void> {
    expect(this.page.url()).toContain(this.url);
  }

  async takeScreenshot(fileName: string): Promise<void> {
    await this.page.screenshot({ 
      path: `reports/screenshots/${fileName}-${Date.now()}.png`,
      fullPage: true 
    });
  }

  async waitForElement(selector: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }

  async clickElement(selector: string): Promise<void> {
    await this.waitForElement(selector);
    await this.page.click(selector);
  }

  async fillInput(selector: string, value: string): Promise<void> {
    await this.waitForElement(selector);
    await this.page.fill(selector, value);
  }

  async getElementText(selector: string): Promise<string> {
    await this.waitForElement(selector);
    return await this.page.textContent(selector) || '';
  }

  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  async waitForElementToDisappear(selector: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'detached', timeout });
  }

  async scrollToElement(selector: string): Promise<void> {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  async hoverElement(selector: string): Promise<void> {
    await this.page.hover(selector);
  }

  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  async waitForNetworkIdle(timeout: number = 10000): Promise<void> {
    // Use a shorter timeout and fallback
    try {
      await this.page.waitForLoadState('networkidle', { timeout });
    } catch {
      // Fallback to domcontentloaded if networkidle times out
      await this.page.waitForLoadState('domcontentloaded');
    }
  }

  async verifyElementContainsText(selector: string, expectedText: string): Promise<void> {
    const element = this.page.locator(selector);
    await expect(element).toContainText(expectedText);
  }

  async verifyElementCount(selector: string, expectedCount: number): Promise<void> {
    const elements = this.page.locator(selector);
    await expect(elements).toHaveCount(expectedCount);
  }
}
