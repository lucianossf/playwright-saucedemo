import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  private inventoryItems  = () => this.page.locator('.inventory_item');
  private sortDropdown    = () => this.page.locator('[data-test="product-sort-container"]');
  private cartBadge       = () => this.page.locator('.shopping_cart_badge');
  private cartIcon        = () => this.page.locator('.shopping_cart_link');
  private burgerMenu      = () => this.page.locator('#react-burger-menu-btn');
  private logoutLink      = () => this.page.locator('#logout_sidebar_link');
  private pageTitle       = () => this.page.locator('.title');
  private itemNames       = () => this.page.locator('.inventory_item_name');

  addToCartBtn(productName: string) {
    return this.page.locator(`.inventory_item:has-text("${productName}") button`);
  }

  itemPrice(productName: string) {
    return this.page.locator(`.inventory_item:has-text("${productName}") .inventory_item_price`);
  }

  async assertOnInventoryPage() {
    await expect(this.page).toHaveURL('/inventory.html');
    await expect(this.pageTitle()).toHaveText('Products');
  }

  async getItemCount(): Promise<number> {
    return await this.inventoryItems().count();
  }

  async addItemToCart(productName: string) {
    await this.addToCartBtn(productName).click();
  }

  async getCartBadgeCount(): Promise<string> {
    return await this.cartBadge().innerText();
  }

  async isCartBadgeVisible(): Promise<boolean> {
    return await this.cartBadge().isVisible();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown().selectOption(option);
  }

  async getAllPrices(): Promise<number[]> {
    const texts = await this.page.locator('.inventory_item_price').allInnerTexts();
    return texts.map(p => parseFloat(p.replace('$', '')));
  }

  async getAllNames(): Promise<string[]> {
    return await this.itemNames().allInnerTexts();
  }

  async goToCart() {
    await this.cartIcon().click();
  }

  async logout() {
    await this.burgerMenu().click();
    await this.logoutLink().click();
  }
}
