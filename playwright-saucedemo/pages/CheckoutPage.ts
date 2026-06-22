import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  private firstNameInput  = () => this.page.locator('[data-test="firstName"]');
  private lastNameInput   = () => this.page.locator('[data-test="lastName"]');
  private postalCodeInput = () => this.page.locator('[data-test="postalCode"]');
  private continueButton  = () => this.page.locator('[data-test="continue"]');
  private finishButton    = () => this.page.locator('[data-test="finish"]');
  private completeHeader  = () => this.page.locator('.complete-header');
  private completeText    = () => this.page.locator('.complete-text');
  private errorMessage    = () => this.page.locator('[data-test="error"]');
  private totalLabel      = () => this.page.locator('.summary_total_label');
  private subtotalLabel   = () => this.page.locator('.summary_subtotal_label');
  private taxLabel        = () => this.page.locator('.summary_tax_label');
  private backHomeButton  = () => this.page.locator('[data-test="back-to-products"]');

  async assertOnStep1() {
    await expect(this.page).toHaveURL('/checkout-step-one.html');
  }

  async assertOnStep2() {
    await expect(this.page).toHaveURL('/checkout-step-two.html');
  }

  async fillShippingInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput().fill(firstName);
    await this.lastNameInput().fill(lastName);
    await this.postalCodeInput().fill(postalCode);
  }

  async continue() {
    await this.continueButton().click();
  }

  async finish() {
    await this.finishButton().click();
  }

  async getTotalPrice(): Promise<string> {
    return await this.totalLabel().innerText();
  }

  async getSubtotal(): Promise<string> {
    return await this.subtotalLabel().innerText();
  }

  async assertOrderComplete() {
    await expect(this.page).toHaveURL('/checkout-complete.html');
    await expect(this.completeHeader()).toHaveText('Thank you for your order!');
  }

  async assertErrorVisible() {
    await expect(this.errorMessage()).toBeVisible();
  }

  async assertErrorContains(text: string) {
    await expect(this.errorMessage()).toContainText(text);
  }

  async backToHome() {
    await this.backHomeButton().click();
  }
}
