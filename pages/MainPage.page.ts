import { Page, expect, Locator } from '@playwright/test';
import { visit } from '../helpers/navigation';

export class MainPage {
  constructor(private readonly page: Page) {}

  async openHome(url: string) {
    await visit(this.page, url);
    await this.acceptConsentIfPresent();
  }

  async acceptConsentIfPresent() {
    const consent = this.page.getByRole('button', { name: 'Consent' });
    try {
      await consent.waitFor({ state: 'visible', timeout: 5000 });
      await consent.click();
    } catch {
      console.log('Consent not present');
    }
  }

  async goToCategory(categoryLinkName: string, subcategoryLinkName: string) {
    await this.page.getByRole('link', { name: categoryLinkName }).click();
    await this.page.getByRole('link', { name: subcategoryLinkName }).click();
  }

  getProductCard(productName: string): Locator {
    return this.page
      .locator('.product-image-wrapper')
      .filter({ hasText: productName })
      .first();
  }

  async openProduct(productName: string) {
    const card = this.getProductCard(productName);
    await expect(card).toBeVisible();
    await card.scrollIntoViewIfNeeded();
    await card.hover();
    await card.locator('.choose a:has-text("View Product")').click();
  }

  async addProductToCartFromProductPage(productName: string) {
    await expect(this.page.getByRole('heading', { name: productName })).toBeVisible();
    await this.page.getByRole('button', { name: ' Add to cart' }).click();
    await this.page.getByRole('link', { name: 'View Cart' }).click();
    await expect(this.page.getByRole('link', { name: productName })).toBeVisible();
  }
}
