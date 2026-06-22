import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  private cartItems             = () => this.page.locator('.cart_item');
  private checkoutButton        = () => this.page.locator('[data-test="checkout"]');
  private continueShoppingBtn   = () => this.page.locator('[data-test="continue-shopping"]');
  private cartTitle             = () => this.page.locator('.title');

  removeBtn(productName: string) {
    return this.page.locator(`.cart_item:has-text("${productName}") button`);
  }

  cartItem(productName: string) {
    return this.page.locator(`.cart_item:has-text("${productName}")`);
  }

  async assertOnCartPage() {
    await expect(this.page).toHaveURL('/cart.html');
    await expect(this.cartTitle()).toHaveText('Your Cart');
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems().count();
  }

  async assertItemInCart(productName: string) {
    await expect(this.cartItem(productName)).toBeVisible();
  }

  async assertItemNotInCart(productName: string) {
    await expect(this.cartItem(productName)).not.toBeVisible();
  }

  async removeItem(productName: string) {
    await this.removeBtn(productName).click();
  }

  async proceedToCheckout() {
    await this.checkoutButton().click();
  }

  async continueShopping() {
    await this.continueShoppingBtn().click();
  }
}
