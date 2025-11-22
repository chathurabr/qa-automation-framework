import { Locator, Page } from "@playwright/test";

export default class DashboardPage {    
    private page: Page;
    readonly welcomeMessage: Locator;
    readonly title: Locator;
    constructor(page: Page) {
        this.page = page;
        this.welcomeMessage = page.getByText(/Welcome back/);
        this.title = page.locator('h1');
    }

    getTitle(): Locator {
        return this.title;
    }

    getWelcomeMessage(): Locator {
        return this.welcomeMessage;
    }

    waitForLoadState(): Promise<void> {
        return this.page.waitForLoadState('networkidle');
    }

}