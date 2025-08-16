import { Page } from '@playwright/test';

const checkoutLocators = (page: Page) => ({});

export default class CheckoutPage {
	private readonly page: Page;
	readonly locators: ReturnType<typeof checkoutLocators>;

	constructor(page: Page) {
		this.page = page;
		this.locators = checkoutLocators(page);
	}

	async goto(): Promise<void> {
		await this.page.goto(`/cart.html`);
	}
}
