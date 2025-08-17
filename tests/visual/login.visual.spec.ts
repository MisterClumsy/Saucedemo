import { test, expect } from '@fixtures';

test.describe('Login visual', () => {
	test.beforeEach(async ({ login }) => {
		await login.goto();
	});

	test('should match screenshot for default login screen', async ({
		page
	}) => {
		await expect(page).toHaveScreenshot('login.png', { fullPage: true });
	});

	test('should match screenshot for user who is locked out', async ({
		error,
		login,
		page,
		users
	}) => {
		const lockedOutUser = users.getUserByName('locked_out_user');
		await login.login(lockedOutUser);
		await expect(error.locators.error).toBeVisible();
		await expect(page).toHaveScreenshot('login-error.png', {
			fullPage: true
		});
	});
});
