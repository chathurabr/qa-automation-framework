import { expect, test } from './fixtures/fixtures';
import credentials from './data/credentials.json';

test('should successfully login with valid credentials and redirect to dashboard', async ({ loginPage, dashboardPage }) => {
    await loginPage.goto();
    await loginPage.login(credentials.valid.email, credentials.valid.password);

    await expect(dashboardPage.getTitle()).toHaveText('Dashboard');
    await expect(dashboardPage.getWelcomeMessage()).toHaveText(`Welcome back, ${credentials.valid.email}!`); 
});

test('should display error message for invalid credentials', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(credentials.invalid.email, credentials.invalid.password);
    expect(loginPage.getErrorMessage().isVisible()).toBeTruthy();
    await expect(loginPage.getErrorMessage()).toHaveText('Invalid credentials');
});

test('should display error message for invalid email formats and login button is disabled', async ({ loginPage }) => {
 
    for (const invalidEmailObj of credentials.invalidEmailFormats) {
        console.log(`Testing invalid email: ${invalidEmailObj.email}, description: ${invalidEmailObj.description}`);
        await loginPage.goto();
        await loginPage.fillEmail(invalidEmailObj.email);
        await loginPage.fillPassword(credentials.valid.password);
        expect(loginPage.getInvalidEmailError().isVisible()).toBeTruthy();
        await expect(loginPage.getInvalidEmailError()).toHaveText('Invalid email');
        expect(loginPage.btnLogin.isDisabled()).toBeTruthy();
    }
});

