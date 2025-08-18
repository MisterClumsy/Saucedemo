import baseConfig from '@config/base.config';
import { defineConfig, devices } from '@playwright/test';
import path from 'path';

const A11Y_DIR = path.resolve(process.cwd(), 'tests', 'a11y');
const HTML_DIR = path.resolve(process.cwd(), 'test-output', 'html', 'a11y');

export default defineConfig({
	...baseConfig,
	testDir: A11Y_DIR,
	use: { ...baseConfig.use, video: 'off' },
	retries: 0,
	reporter: [['list'], ['html', { outputFolder: HTML_DIR, open: 'never' }]],
	projects: [
		...baseConfig.projects!.filter((project) => project.name === 'Auth'),
		{
			dependencies: ['Auth'],
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		}
	]
});
