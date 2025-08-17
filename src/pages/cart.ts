import { Page } from '@playwright/test';

export const cartLocators = (page: Page) => ({
	container: page.getByTestId('cart-contents-container'),
	checkoutButton: page.getByRole('button', { name: /checkout/i }),
	continueShoppingButton: page.getByRole('button', {
		name: /continue shopping/i
	})
});

export default class CartPage {
	private readonly page: Page;
	readonly locators: ReturnType<typeof cartLocators>;

	constructor(page: Page) {
		this.page = page;
		this.locators = cartLocators(page);
	}

	async goto(): Promise<void> {
		await this.page.goto(`/cart.html`);
	}

	async continueShopping(): Promise<void> {
		await this.locators.continueShoppingButton.click();
	}

	async checkout(): Promise<void> {
		await this.locators.checkoutButton.click();
	}
}
