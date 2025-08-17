import { test, expect } from '@fixtures';

test.use({ storageState: './.auth/standard_user.json' });

test.describe('Products', () => {
	test.beforeEach(async ({ products }) => {
		await products.goto();
	});

	test('should allow adding multiple items to the cart', async ({
		products,
		header
	}) => {
		const productNames = await products.locators.itemName.allInnerTexts();
		expect(productNames.length).toBeGreaterThanOrEqual(2);

		await test.step('Add first product', async () => {
			await products.addToCart(productNames[0]);

			expect(await header.getCartCount()).toEqual(1);
		});

		await test.step('Add second product', async () => {
			await products.addToCart(productNames[1]);

			expect(await header.getCartCount()).toEqual(2);
		});
	});

	test('should allow removing an item from the cart', async ({
		products,
		header
	}) => {
		const firstProduct = await products.locators.itemName
			.first()
			.innerText();

		await test.step('Add product to cart', async () => {
			await products.addToCart(firstProduct);

			expect(await header.getCartCount()).toEqual(1);
		});

		await test.step('Remove product from cart', async () => {
			await products.removeFromCart(firstProduct);

			expect(await header.getCartCount()).toEqual(0);
		});
	});

	test('should sort products by price low to high', async ({ products }) => {
		await products.filterProducts('Price (low to high)');

		const allPrices = await products.locators.itemPrice.allInnerTexts();
		const prices = allPrices.map((price) => Number(price.replace('$', '')));
		const sorted = [...prices].sort(
			(productA, productB) => productA - productB
		);

		expect(prices).toEqual(sorted);
	});

	test('should sort products by price High to Low', async ({ products }) => {
		await products.filterProducts('Price (high to low)');

		const allPrices = await products.locators.itemPrice.allInnerTexts();
		const prices = allPrices.map((price) => Number(price.replace('$', '')));
		const sorted = [...prices].sort(
			(productA, productB) => productA + productB
		);

		expect(prices).toEqual(sorted);
	});

	test('should sort products by name A to Z', async ({ products }) => {
		await products.filterProducts('Name (A to Z)');

		const allNames = await products.locators.itemName.allInnerTexts();
		const sorted = [...allNames].sort((productA, productB) =>
			productA.localeCompare(productB)
		);

		expect(allNames).toEqual(sorted);
	});

	test('should sort products by name Z to A', async ({ products }) => {
		await products.filterProducts('Name (Z to A)');

		const allNames = await products.locators.itemName.allInnerTexts();
		const sorted = [...allNames].sort((productA, productB) =>
			productB.localeCompare(productA)
		);

		expect(allNames).toEqual(sorted);
	});

	test('should navigate to detail page on clicking product name', async ({
		products,
		product
	}) => {
		const firstProduct = await products.locators.itemName
			.first()
			.innerText();

		await products.openProduct(firstProduct);

		await expect(product.locators.name).toHaveText(firstProduct);
	});
});
