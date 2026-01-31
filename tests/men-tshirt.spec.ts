import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/MainPage.page';

const HOME_URL = 'https://automationexercise.com/';

test.describe('Add products to cart', () => {
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
  });

  test('add Men Tshirt to cart from Men category', async ({ page }) => {
    await mainPage.openHome(HOME_URL);
    await mainPage.goToCategory(' Men', 'Tshirts');
    await mainPage.openProduct('Men Tshirt');

    const productName = await page.locator('h2:has-text("Men Tshirt")').innerText();

    await mainPage.addProductToCartFromProductPage(productName);

    const cartProductName = await page.getByRole('link', { name: productName }).innerText();

    expect(cartProductName.trim()).toBe(productName.trim());
  });

  test('add Women top to cart from Women category', async ({ page }) => {
    await mainPage.openHome(HOME_URL);
    await mainPage.goToCategory(' Women', 'Tops');
    await mainPage.openProduct('Madame Top For Women');

    const productName = await page.locator('h2:has-text("Madame Top For Women")').innerText();

    await mainPage.addProductToCartFromProductPage(productName);

    const cartProductName = await page.getByRole('link', { name: productName }).innerText();

    expect(cartProductName.trim()).toBe(productName.trim());
  });
});
