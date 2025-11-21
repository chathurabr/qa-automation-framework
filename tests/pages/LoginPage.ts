import { Page } from "@playwright/test";

export default class LoginPage {    
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(): Promise<void> {
        await this.page.goto('/');
    }
}