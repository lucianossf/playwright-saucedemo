import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  private usernameInput = () => this.page.locator('[data-test="username"]');
  private passwordInput = () => this.page.locator('[data-test="password"]');
  private loginButton  = () => this.page.locator('[data-test="login-button"]');
  private errorMessage = () => this.page.locator('[data-test="error"]');
  private logo         = () => this.page.locator('.login_logo');

  async navigate() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMessage().innerText();
  }

  async assertOnLoginPage() {
    await expect(this.page).toHaveURL('/');
    await expect(this.logo()).toBeVisible();
  }

  async assertErrorVisible() {
    await expect(this.errorMessage()).toBeVisible();
  }

  async assertErrorContains(text: string) {
    await expect(this.errorMessage()).toContainText(text);
  }
}
