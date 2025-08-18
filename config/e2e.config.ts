import baseConfig from '@config/base.config';
import { defineConfig, devices } from '@playwright/test';
import path from 'path';

const E2E_DIR = path.resolve(process.cwd(), 'tests', 'e2e');
const HTML_DIR = path.resolve(process.cwd(), 'test-output', 'html', 'e2e');

export default defineConfig({
	...baseConfig,
	testDir: E2E_DIR,
	reporter: [['list'], ['html', { outputFolder: HTML_DIR, open: 'never' }]],
	outputDir: path.resolve(baseConfig.outputDir!, 'e2e'),
	projects: [
		...baseConfig.projects!.filter((project) => project.name === 'Auth'),
		{
			dependencies: ['Auth'],
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		},
		{
			dependencies: ['Auth'],
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] }
		},
		{
			dependencies: ['Auth'],
			name: 'webkit',
			use: { ...devices['Desktop Safari'] }
		},
		{
			dependencies: ['Auth'],
			name: 'Mobile Chrome',
			use: { ...devices['Pixel 7'] }
		},
		{
			dependencies: ['Auth'],
			name: 'Mobile Safari',
			use: { ...devices['iPhone 15'] }
		}
	]
});
