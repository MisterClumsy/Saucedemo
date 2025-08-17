import { Page } from '@playwright/test';

const detailsLocators = (page: Page) => ({
	container: page.getByTestId('checkout-info-container'),
	firstName: page.getByTestId('firstName'),
	lastName: page.getByTestId('lastName'),
	postCode: page.getByTestId('postalCode'),
	continueButton: page.getByRole('button', { name: /continue/i }),
	cancelButton: page.getByRole('button', { name: /cancel/i })
});

const overviewLocators = (page: Page) => ({
	container: page.getByTestId('checkout-summary-container'),
	productTotal: page.getByTestId('subtotal-label'),
	taxTotal: page.getByTestId('tax-label'),
	total: page.getByTestId('total-label'),
	finishButton: page.getByRole('button', { name: /finish/i }),
	cancelButton: page.getByRole('button', { name: /cancel/i })
});

const completeLocators = (page: Page) => ({
	container: page.getByTestId('checkout-complete-container'),
	backHomeButton: page.getByRole('button', { name: /back to products/i })
});

export default class CheckoutPage {
	private readonly page: Page;
	readonly detailsLocators: ReturnType<typeof detailsLocators>;
	readonly overviewLocators: ReturnType<typeof overviewLocators>;
	readonly completeLocators: ReturnType<typeof completeLocators>;

	constructor(page: Page) {
		this.page = page;
		this.detailsLocators = detailsLocators(page);
		this.overviewLocators = overviewLocators(page);
		this.completeLocators = completeLocators(page);
	}

	// #region Step One (Fill Details)
	async fillFirstName(firstName: string): Promise<void> {
		await this.detailsLocators.firstName.fill(firstName);
	}

	async fillLastName(lastName: string): Promise<void> {
		await this.detailsLocators.lastName.fill(lastName);
	}

	async fillPostCode(postCode: string): Promise<void> {
		await this.detailsLocators.postCode.fill(postCode);
	}

	async fillCustomerDetails({
		first,
		last,
		postCode
	}: {
		first: string;
		last: string;
		postCode: string;
	}): Promise<void> {
		await this.detailsLocators.firstName.fill(first);
		await this.detailsLocators.lastName.fill(last);
		await this.detailsLocators.postCode.fill(postCode);
	}

	async continueToOverview(): Promise<void> {
		await this.detailsLocators.continueButton.click();
	}

	async cancelFromDetails(): Promise<void> {
		await this.detailsLocators.cancelButton.click();
	}
	// #endregion

	// #region Step two (overview)
	async finish() {
		await this.overviewLocators.finishButton.click();
	}
	// #endregion

	async cancelFromOverview() {
		await this.overviewLocators.cancelButton.click();
	}

	// #region Completed Order
	async backHome() {
		await this.completeLocators.backHomeButton.click();
	}
	// #endregion
}
