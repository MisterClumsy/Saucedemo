import { test, expect } from '@fixtures';
import AxeBuilder from '@axe-core/playwright';

test.describe('Login a11y', () => {
	test.beforeEach(async ({ login }) => {
		await login.goto();
	});

	// eslint-disable-next-line playwright/expect-expect
	test('should have no a11y issues for default login screen', async ({
		page,
		a11y
	}) => {
		await a11y({ page, testInfo: test.info() });
	});

	test('should have no a11y issues for user who has an error', async ({
		login,
		users,
		page,
		a11y
	}) => {
		const lockedOutUser = users.getUserByName('locked_out_user');
		await login.login(lockedOutUser);
		await expect(login.locators.error).toBeVisible();

		await a11y({ page, testInfo: test.info() });
	});
});
