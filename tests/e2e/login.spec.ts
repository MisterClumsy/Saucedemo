import { test, expect } from '@fixtures';

test.describe('Login', () => {
	test.beforeEach(async ({ login }) => {
		await login.goto();
	});

	test('should error with correct message when logging in with locked out user', async ({
		error,
		login,
		users
	}) => {
		const lockedOutUser = users.getUserByName('locked_out_user');

		await login.login(lockedOutUser);

		await expect(error.locators.error).toHaveText(
			'Epic sadface: Sorry, this user has been locked out.'
		);
	});

	test('should error with correct message when logging in with incorrect details', async ({
		error,
		login
	}) => {
		await login.login({ username: 'fake_user', password: 'fake_password' });

		await expect(error.locators.error).toHaveText(
			'Epic sadface: Username and password do not match any user in this service'
		);
	});

	test('should error with correct message when logging in without password', async ({
		error,
		login,
		users
	}) => {
		const standardUser = users.getUserByName('standard_user');

		await login.login({ username: standardUser.username, password: '' });

		await expect(error.locators.error).toHaveText(
			'Epic sadface: Password is required'
		);
	});

	test('should error with correct message when logging in without username', async ({
		error,
		login,
		users
	}) => {
		const standardUser = users.getUserByName('standard_user');

		await login.login({ username: '', password: standardUser.password });

		await expect(error.locators.error).toHaveText(
			'Epic sadface: Username is required'
		);
	});
});
