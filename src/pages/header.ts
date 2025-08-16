import { Page } from '@playwright/test';

const headerLocators = (page: Page) => ({
	cartLink: page.getByTestId('shopping-cart-link'),
	cartBadge: page.getByTestId('shopping-cart-badge'),
	menuButton: page.getByRole('button', { name: /open menu/i }),
	closeMenuButton: page.getByRole('button', { name: /close menu/i }),
	allItemsLink: page.getByRole('link', { name: /all items/i }),
	aboutLink: page.getByRole('link', { name: /about/i }),
	logoutLink: page.getByRole('link', { name: /logout/i }),
	resetAppStateLink: page.getByRole('link', { name: /reset app state/i })
});

export default class InventoryHeader {
	private readonly page: Page;
	readonly locators: ReturnType<typeof headerLocators>;

	constructor(page: Page) {
		this.page = page;
		this.locators = headerLocators(page);
	}

	async openCart() {
		await this.locators.cartLink.click();
	}

	async getCartCount(): Promise<number> {
		if (!(await this.locators.cartBadge.isVisible())) {
			return 0;
		}
		const cartValueText: string =
			(await this.locators.cartBadge.textContent()) || '';
		const cartValueNumber: number = parseInt(cartValueText.trim());
		return Number.isNaN(cartValueNumber) ? 0 : cartValueNumber;
	}

	async openMenu() {
		await this.locators.menuButton.click();
	}

	async closeMenu() {
		await this.locators.closeMenuButton.click();
	}

	async goToAbout() {
		await this.openMenu();
		await this.locators.aboutLink.click();
	}

	async goToAllItems() {
		await this.openMenu();
		await this.locators.allItemsLink.click();
	}

	async resetAppState() {
		await this.openMenu();
		await this.locators.resetAppStateLink.click();
	}

	async logout() {
		await this.openMenu();
		await this.locators.logoutLink.click();
	}
}
