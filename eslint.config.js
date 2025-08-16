import playwright from 'eslint-plugin-playwright';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';

export default [
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				project: './tsconfig.json'
			}
		},
		plugins: {
			'@typescript-eslint': typescript,
			playwright: playwright
		},
		rules: {
			...typescript.configs.recommended.rules,
			...playwright.configs['flat/recommended'].rules,
			...prettier.rules,
			'playwright/no-skipped-test': 'off',
			'playwright/no-conditional-in-test': 'off',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': 'warn',
			'no-duplicate-imports': 'error',
			'no-trailing-spaces': 'error',
			'no-var': 'error',
			'prefer-const': 'warn',
			curly: 'error',
			eqeqeq: ['error', 'always']
		},
		settings: {
			playwright: {
				globalAliases: {
					test: ['setup']
				}
			}
		},
		ignores: ['node_modules', 'test-output']
	}
];
