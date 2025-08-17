import { test, expect } from '@fixtures';

test.describe('Login a11y', () => {
	test.beforeEach(async ({ login }) => {
		await login.goto();
	});

	test('should have no a11y issues for default login screen', async ({
		page,
		a11y
	}) => {
		await a11y({ page, testInfo: test.info() });
	});

	test('should have no a11y issues for user who has an error', async ({
		a11y,
		error,
		login,
		page,
		users
	}) => {
		const lockedOutUser = users.getUserByName('locked_out_user');
		await login.login(lockedOutUser);
		await expect(error.locators.error).toBeVisible();

		await a11y({ page, testInfo: test.info() });
	});
});
