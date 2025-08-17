import { test as base, Page, expect } from '@playwright/test';
import UserUtils from '@helpers/userUtils';
import LoginPage from '@pages/login';
import Products from '@pages/products';
import Product from '@pages/product';
import Checkout from '@pages/checkout';
import Cart from '@pages/cart';
import ErrorComponent from '@pages/error';
import Header from '@pages/header';
import A11y from '@helpers/a11y';

type TSaucedemo = {
	a11y: typeof A11y;
	cart: Cart;
	checkout: Checkout;
	error: ErrorComponent;
	header: Header;
	login: LoginPage;
	product: Product;
	products: Products;
	users: UserUtils;
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
	cart: async ({ page }: { page: Page }, use) => {
		await use(new Cart(page));
	},
	checkout: async ({ page }: { page: Page }, use) => {
		await use(new Checkout(page));
	},
	error: async ({ page }: { page: Page }, use) => {
		await use(new ErrorComponent(page));
	},
	header: async ({ page }: { page: Page }, use) => {
		await use(new Header(page));
	},
	login: async ({ page }: { page: Page }, use) => {
		await use(new LoginPage(page));
	},
	product: async ({ page }: { page: Page }, use) => {
		await use(new Product(page));
	},
	products: async ({ page }: { page: Page }, use) => {
		await use(new Products(page));
	}
	// #endregion
});

export { expect };
