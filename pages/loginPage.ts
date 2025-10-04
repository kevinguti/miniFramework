import { Page, expect } from '@playwright/test';

export class LoginPage {
  private page: Page;
  
 
  private userInp = "#_username";
  private passwordInp = "#_password";
  private loginBtn = "button[type='submit']";
  private errorMsg = ".ui.negative.message, .alert.alert-danger, .form-error";
  private loginForm = "form[action$='/login_check']";

  constructor(page: Page) {
    this.page = page;
  }

  async goto(baseUrl: string) {
    await this.page.goto(`${baseUrl}/admin/login`);
    await this.page.waitForLoadState('networkidle');
    await this.waitForLoginForm();
  }

  async waitForLoginForm(timeout = 15000) {
    // Esperar a que los campos específicos estén visibles
    await this.page.waitForSelector(this.userInp, { 
      state: 'visible', 
      timeout 
    });
  }

  async login(username: string, password: string, rememberMe: boolean = false) {
    await this.waitForLoginForm();
    
    // Llenar los campos con los selectores correctos
    await this.page.fill(this.userInp, username);
    await this.page.fill(this.passwordInp, password);
    
    if (rememberMe) {
      const rememberMeCheckbox = "#_remember_me";
      await this.page.check(rememberMeCheckbox);
    }
    
    // Hacer clic en el botón de login
    await this.page.click(this.loginBtn);
    
    // Esperar a que la navegación se complete
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
  }

  async getErrorMessage(): Promise<string> {
    try {
      const error = await this.page.locator(this.errorMsg).textContent();
      return error?.trim() || '';
    } catch {
      return '';
    }
  }

  async isLoginPage(): Promise<boolean> {
    try {
      return await this.page.locator(this.userInp).isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    // Verificar si estamos en el admin dashboard de Sylius
    try {
      return await this.page.locator('.sidebar').isVisible() || 
             this.page.url().includes('/admin/dashboard') ||
             await this.page.locator('nav.admin-menu').isVisible();
    } catch {
      return false;
    }
  }
}