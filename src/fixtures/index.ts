import { test as base, Page, expect } from '@playwright/test';
import UserUtils from '@helpers/userUtils';
import LoginPage from '@pages/login';
import Products from '@pages/products';
import Product from '@pages/product';
import Checkout from '@pages/checkout';
import Header from '@pages/header';
import A11y from '@helpers/a11y';

type TSaucedemo = {
	a11y: typeof A11y;
	users: UserUtils;
	login: LoginPage;
	products: Products;
	product: Product;
	checkout: Checkout;
	header: Header;
};

export const test = base.extend<TSaucedemo>({
	// #region Helpers
	users: async ({}, use) => {
		await use(new UserUtils());
	},
	a11y: async ({}, use) => {
		await use(A11y);
	},
	// #endregion

	// #region Pages
	login: async ({ page }: { page: Page }, use) => {
		await use(new LoginPage(page));
	},
	product: async ({ page }: { page: Page }, use) => {
		await use(new Product(page));
	},
	products: async ({ page }: { page: Page }, use) => {
		await use(new Products(page));
	},
	checkout: async ({ page }: { page: Page }, use) => {
		await use(new Checkout(page));
	},
	header: async ({ page }: { page: Page }, use) => {
		await use(new Header(page));
	}
	// #endregion
});

export { expect };
