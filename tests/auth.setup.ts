import { test as setup, expect } from '@fixtures';
import path from 'path';
import fs from 'fs';
import LoginPage from '@pages/login';
import ProductsPage from '@pages/products';

// Allows us to run setup tests to create storage states for each user in parallel
// Will show up in report as "Auth" project and give us reports for each user
const USERS_DIRECTORY_PATHS = path.resolve(process.cwd(), 'src', 'users');
const STORAGE_STATE_PATH = path.resolve(process.cwd(), '.auth');
if (!fs.existsSync(STORAGE_STATE_PATH)) {
	fs.mkdirSync(STORAGE_STATE_PATH, { recursive: true });
}
const userFiles = fs.readdirSync(USERS_DIRECTORY_PATHS);

for (const userFile of userFiles) {
	setup(
		`login and create storage states for ${path.basename(userFile, '.json')}`,
		async ({ users, browser }) => {
			const userDetails = users.getUserByPath(
				path.resolve(users.usersDirectory, userFile)
			);

			setup.skip(
				userDetails.expectLoginError,
				`Skipping login for ${userDetails.username} due to expected login error`
			);

			const context = await browser.newContext();
			try {
				// Create a new context for each user to save their storage state
				const page = await context.newPage();

				const login = new LoginPage(page);
				const products = new ProductsPage(page);

				await login.goto();
				await login.login(userDetails);
				await expect(products.locators.container).toBeVisible();

				const statePath = path.resolve(
					STORAGE_STATE_PATH,
					`${userDetails.username}.json`
				);
				await context.storageState({ path: statePath });
			} finally {
				await context.close();
			}
		}
	);
}
