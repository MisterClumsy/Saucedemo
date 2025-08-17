import { Page } from '@playwright/test';

const errorLocators = (page: Page) => ({
	error: page.getByTestId('error')
});

export default class ErrorComponent {
	private readonly page: Page;
	readonly locators: ReturnType<typeof errorLocators>;

	constructor(page: Page) {
		this.page = page;
		this.locators = errorLocators(page);
	}

	async closeError(): Promise<void> {
		await this.locators.error.getByRole('button').click();
	}
}
