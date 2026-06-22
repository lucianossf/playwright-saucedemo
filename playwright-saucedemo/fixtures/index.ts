import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { USERS } from '../utils/constants';

// Tipos das fixtures
type Pages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

type AuthenticatedFixtures = Pages & {
  authenticatedPage: void;
};

// Fixture base: instancia todos os Page Objects
export const test = base.extend<AuthenticatedFixtures>({

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  // Fixture que já faz login antes do teste
  authenticatedPage: async ({ page, loginPage, inventoryPage }, use) => {
    await loginPage.navigate();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.assertOnInventoryPage();
    await use();
  },
});

export { expect } from '@playwright/test';
