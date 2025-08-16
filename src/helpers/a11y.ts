import AxeBuilder from '@axe-core/playwright';
import { createHtmlReport } from 'axe-html-reporter';
import type { Page, TestInfo } from '@playwright/test';
import { expect } from '@fixtures';

export default async function runA11y({
	page,
	testInfo
}: {
	page: Page;
	testInfo: TestInfo;
}): Promise<void> {
	const results = await new AxeBuilder({ page }).analyze();

	await testInfo.attach('axe-results.json', {
		body: JSON.stringify(results, null, 4),
		contentType: 'application/json'
	});

	const html = createHtmlReport({
		results,
		options: {
			projectKey: 'SauceDemo',
			doNotCreateReportFile: true
		}
	});
	await testInfo.attach('a11y-report.html', {
		body: html,
		contentType: 'text/html'
	});

	const serious = results.violations.filter((v) =>
		['serious', 'critical'].includes(v.impact ?? 'minor')
	);

	expect(
		serious,
		`Serious/Critical a11y issues found: ${serious.length}`
	).toHaveLength(0);
}
