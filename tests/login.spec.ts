import { test } from './fixtures/fixtures';

test('should successfully login with valid credentials and redirect to dashboard', async ({ loginPage }) => {
    await loginPage.goto();

});