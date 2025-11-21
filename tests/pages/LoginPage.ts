import { Locator, Page } from "@playwright/test";

export default class LoginPage {    
    private page: Page;
    readonly txtEmail: Locator;
    readonly txtPassword: Locator;
    readonly btnLogin: Locator;
    readonly errorMessage: Locator;
    readonly invalidEmailError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.txtEmail = page.locator('#email');
        this.txtPassword = page.locator('#password');
        this.btnLogin = page.locator('#loginBtn');
        this.errorMessage = page.locator('.MuiAlert-message.css-zioonp-MuiAlert-message');
        this.invalidEmailError = page.locator('#email-helper-text');

    }

    async goto(): Promise<void> {
        await this.page.goto('/');
    }

    async fillEmail(email: string): Promise<void> {
        return this.txtEmail.fill(email);
    }

    async fillPassword(password: string): Promise<void> {
        return this.txtPassword.fill(password);
    }


    async login(email: string, password: string): Promise<void> {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.btnLogin.click();
    }
    
    getErrorMessage(): Locator {
        return this.errorMessage;
    }

    getInvalidEmailError(): Locator {
        return this.invalidEmailError;
    }

}