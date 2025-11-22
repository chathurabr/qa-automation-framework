import { expect, test } from './fixtures/fixtures';
import credentials from './data/credentials.json';

test.describe('Login tests', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('should successfully login with valid credentials and redirect to dashboard', async ({ loginPage, dashboardPage }) => {
        await loginPage.login(credentials.valid.email, credentials.valid.password);
        await dashboardPage.waitForLoadState();
        await expect(dashboardPage.getTitle()).toHaveText('Dashboard');
        await expect(dashboardPage.getWelcomeMessage()).toHaveText(`Welcome back, ${credentials.valid.email}!`); 
    });

    test('should display error message for invalid credentials', async ({ loginPage }) => { 
        await loginPage.login(credentials.invalid.email, credentials.invalid.password);
        await expect(loginPage.getErrorMessage()).toBeVisible();
        await expect(loginPage.getErrorMessage()).toHaveText('Invalid credentials');
    });

    test('should validate invalid email formats and keep login button disabled', async ({ loginPage }) => {

        for (const { email, description } of credentials.invalidEmailFormats) {
      
          await test.step(`Validate invalid email: ${email} (${description})`, async () => {
      
            await loginPage.fillEmail(email);
            await loginPage.fillPassword(credentials.valid.password);
      
            await expect(loginPage.getInvalidEmailError()).toBeVisible();
            await expect(loginPage.getInvalidEmailError()).toHaveText('Invalid email');
            await expect(loginPage.btnLogin).toBeDisabled();
            
          });
      
        }
      });

    test('should keep login button disabled when email and password are both empty', async ({ loginPage }) => {
        await loginPage.fillEmail('');
        await loginPage.fillPassword('');
        await expect(loginPage.btnLogin).toBeDisabled();
    });

    test('should keep login button disabled when only email is filled and password is empty', async ({ loginPage }) => {
        await loginPage.fillEmail(credentials.valid.email);
        await loginPage.fillPassword('');
        await expect(loginPage.btnLogin).toBeDisabled();
    });

    test('should keep login button disabled when only password is filled and email is empty', async ({ loginPage }) => {
        await loginPage.fillEmail('');
        await loginPage.fillPassword(credentials.valid.password);
        await expect(loginPage.btnLogin).toBeDisabled();
    });

    test('should successfully login with trimmed leading/trailing spaces in email and password', async ({ loginPage, dashboardPage }) => {

        const emailWithSpaces = `   ${credentials.valid.email}   `;
        const passwordWithSpaces = `   ${credentials.valid.password}   `;

        await loginPage.fillEmail(emailWithSpaces);
        await loginPage.txtPassword.focus();

        await expect(loginPage.getInvalidEmailError()).toBeHidden();
        await expect(loginPage.btnLogin).toBeDisabled();

        await loginPage.fillPassword(passwordWithSpaces);
        await loginPage.btnLogin.focus();

        await expect(loginPage.btnLogin).toBeEnabled();
        await loginPage.btnLogin.click();

        // Dashboard should appear with the welcome message
        await dashboardPage.waitForLoadState();
        await expect(dashboardPage.getTitle()).toHaveText('Dashboard');
        await expect(dashboardPage.getWelcomeMessage()).toHaveText(`Welcome back, ${credentials.valid.email}!`); 
    });


});


