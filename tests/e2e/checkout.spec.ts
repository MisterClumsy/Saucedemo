import { test, expect } from '@fixtures';

test.use({ storageState: './.auth/standard_user.json' });

test.describe('Checkout', () => {
	test.beforeEach(async ({ products }) => {
		await products.goto();
	});

	test('should allow user to checkout successfully', async ({
		cart,
		checkout,
		header,
		product,
		products
	}) => {
		let firstProductDetails = {
			name: '',
			price: ''
		};
		await test.step('Add to cart', async () => {
			const firstProduct = await products.locators.itemName
				.first()
				.innerText();
			const firstProductPrice = await products.locators.itemPrice
				.first()
				.innerText();

			firstProductDetails = {
				name: firstProduct,
				price: firstProductPrice
			};

			await products.addToCart(firstProduct);
			await header.openCart();

			await expect(cart.locators.container).toBeVisible();
		});

		await test.step('Checkout', async () => {
			await cart.checkout();
			await checkout.fillCustomerDetails({
				first: 'Ian',
				last: 'Richards',
				postCode: 'F0O B4R'
			});
			await checkout.continueToOverview();

			await expect(checkout.overviewLocators.container).toBeVisible();
		});

		await test.step('summary', async () => {
			await expect(product.locators.name).toHaveText(
				firstProductDetails.name
			);
			await expect(product.locators.price).toHaveText(
				firstProductDetails.price
			);

			await checkout.finish();

			await expect(checkout.completeLocators.container).toBeVisible();
		});
	});
});
