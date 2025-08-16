import baseConfig from '@config/base.config';
import { defineConfig, devices } from '@playwright/test';
import path from 'path';

const VISUAL_DIR = path.resolve(process.cwd(), 'tests', 'visual');

export default defineConfig({
	...baseConfig,
	testDir: VISUAL_DIR,
	use: { ...baseConfig.use, video: 'off' },
	snapshotPathTemplate:
		'{testDir}/__screenshots__{/projectName}/{testFilePath}/{arg}{ext}',
	expect: {
		toHaveScreenshot: {
			maxDiffPixelRatio: 0.01,
			scale: 'device'
		}
	},
	projects: [
		...baseConfig.projects!.filter((project) => project.name === 'Auth'),
		{
			dependencies: ['Auth'],
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		}
	]
});
