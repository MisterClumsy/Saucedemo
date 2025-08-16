import { test, expect } from '@fixtures';

test.use({ storageState: './.auth/standard_user.json' });

test.describe('Product', () => {
	// test('should allow product to be added / removed', async ({
	// 	inventory
	// }) => {
	// 	await inventory.goto();
	// 	await inventory.openItem('Sauce Labs Backpack');
	// 	await product.assertOnPage();
	// 	const info = await product.getInfo();
	// 	expect(info.name).toBeTruthy();
	// 	expect(info.price).toMatch(/^\$/);
	// 	expect(info.description.length).toBeGreaterThan(0);
	// 	await product.addToCart();
	// 	await product.goBackToInventory();
	// 	let count = await inventory.getCartCount();
	// 	expect(count).toBe(1);
	// 	await inventory.openItem('Sauce Labs Backpack');
	// 	await product.removeFromCart();
	// 	await product.goBackToInventory();
	// 	count = await inventory.getCartCount();
	// 	expect(count).toBe(0);
	// });
});
