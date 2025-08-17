import { test, expect } from '@fixtures';

test.use({ storageState: './.auth/standard_user.json' });

test.describe('Product', () => {
	test.beforeEach(async ({ product }) => {
		await product.goto('1');
	});

	test('should allow product to be added / removed', async ({
		header,
		product
	}) => {
		await test.step('Add product to cart', async () => {
			await product.addToCart();

			expect(await header.getCartCount()).toEqual(1);
		});

		await test.step('Remove product from cart', async () => {
			await product.removeFromCart();

			expect(await header.getCartCount()).toEqual(0);
		});
	});

	test('should go back to products page on clicking back to products link', async ({
		product,
		products
	}) => {
		await product.addToCart();

		await expect(products.locators.container).toBeVisible();
	});
});
