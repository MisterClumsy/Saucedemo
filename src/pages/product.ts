import { Page } from '@playwright/test';

const productLocators = (page: Page) => ({
	name: page.getByTestId('inventory-item-name'),
	price: page.getByTestId('inventory-item-price'),
	description: page.locator('inventory-item-desc'),
	addButton: page.getByRole('button', { name: /add to cart/i }),
	removeButton: page.getByRole('button', { name: /remove/i }),
	backButton: page.getByRole('button', { name: /back to products/i })
});

export default class ProductPage {
	private readonly page: Page;
	readonly locators: ReturnType<typeof productLocators>;

	constructor(page: Page) {
		this.page = page;
		this.locators = productLocators(page);
	}

	async goto(productId: string): Promise<void> {
		await this.page.goto(`/inventory-item.html?id=${productId}`);
	}

	async addToCart(): Promise<void> {
		await this.locators.addButton.click();
	}

	async removeFromCart(): Promise<void> {
		await this.locators.removeButton.click();
	}
}
