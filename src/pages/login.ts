import { Page } from '@playwright/test';

const loginLocators = (page: Page) => ({
	usernameInput: page.getByTestId('username'),
	passwordInput: page.getByTestId('password'),
	loginButton: page.getByRole('button', { name: /^login$/i }),
	error: page.getByTestId('error')
});

export default class LoginPage {
	private readonly page: Page;
	readonly locators: ReturnType<typeof loginLocators>;

	constructor(page: Page) {
		this.page = page;
		this.locators = loginLocators(page);
	}

	async goto(): Promise<void> {
		await this.page.goto('/');
	}

	async login({
		username,
		password
	}: {
		username: string;
		password: string;
	}): Promise<void> {
		await this.fillUsername(username);
		await this.fillPassword(password);
		await this.clickLoginButton();
	}

	async fillUsername(username: string): Promise<void> {
		await this.locators.usernameInput.fill(username);
	}

	async fillPassword(password: string): Promise<void> {
		await this.locators.passwordInput.fill(password);
	}

	async clickLoginButton(): Promise<void> {
		await this.locators.loginButton.click();
	}
}
