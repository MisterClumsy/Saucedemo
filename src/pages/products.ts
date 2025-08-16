import { Page } from '@playwright/test';

const productNameToTestId = (productName: string) =>
	productName.trim().toLowerCase().replaceAll(' ', '-');

const productsLocators = (page: Page) => ({
	container: page.getByTestId('inventory-container'),
	productSort: page.getByTestId('product-sort-container'),
	productLinkByName: (name: string) =>
		page.getByRole('link', { name }).first(),
	addProductByName: (name: string) =>
		page.getByTestId(`add-to-cart-${productNameToTestId(name)}`),
	removeProductByName: (name: string) =>
		page.getByTestId(`remove-${productNameToTestId(name)}`),
	itemName: page.getByTestId('inventory-item-name'),
	itemPrice: page.getByTestId('inventory-item-price')
});

export default class ProductsPage {
	private readonly page: Page;
	readonly locators: ReturnType<typeof productsLocators>;

	constructor(page: Page) {
		this.page = page;
		this.locators = productsLocators(page);
	}

	async goto(): Promise<void> {
		await this.page.goto(`/inventory.html`);
	}

	async filterProducts(
		option:
			| 'Name (A to Z)'
			| 'Name (Z to A)'
			| 'Price (low to high)'
			| 'Price (high to low)'
	) {
		await this.locators.productSort.selectOption({ label: option });
	}

	async openProduct(name: string): Promise<void> {
		await this.locators.productLinkByName(name).click();
	}

	async addToCart(name: string): Promise<void> {
		await this.locators.addProductByName(name).click();
	}

	async removeFromCart(name: string): Promise<void> {
		await this.locators.removeProductByName(name).click();
	}
}
