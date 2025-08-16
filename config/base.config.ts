import { defineConfig } from '@playwright/test';
import path from 'path';
import config from './env/env';

const TESTS_DIR = path.resolve(process.cwd(), 'tests');
const ARTIFACTS_DIR = path.resolve(process.cwd(), 'test-output', 'artifacts');
const REPORT_DIR = path.resolve(process.cwd(), 'test-output', 'html');

export default defineConfig({
	outputDir: ARTIFACTS_DIR,
	timeout: 30 * 1000,
	expect: {
		timeout: 5000
	},
	fullyParallel: true,
	retries: 1,
	reporter: [['list'], ['html', { outputFolder: REPORT_DIR, open: 'never' }]],
	use: {
		baseURL: config.BASE_URL,
		testIdAttribute: 'data-test',
		screenshot: 'only-on-failure',
		trace: 'retain-on-failure',
		video: 'retain-on-failure'
	},
	projects: [
		{
			name: 'Auth',
			testDir: TESTS_DIR,
			testMatch: /auth.setup\.ts/,
			use: { storageState: undefined }
		}
	]
});
