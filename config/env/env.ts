import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const envName = process.env.PW_ENV;
const envPath = path.resolve(__dirname, `.env.${envName}`);

if (!envName) {
	throw new Error(
		'PW_ENV environment variable is required (e.g. "PW_ENV=prod")'
	);
}

// Check that the env file exists
if (!fs.existsSync(envPath)) {
	throw new Error(
		`Environment file "${envPath}" not found in config/env. Please create missing file.`
	);
}

dotenv.config({ path: envPath });

// Add more required environment variables here to ensure they are set
['BASE_URL'].forEach((key) => {
	if (!process.env[key]) {
		throw new Error(
			`Missing required environment variable "${key}" in ${envPath}`
		);
	}
});

export default {
	BASE_URL: process.env.BASE_URL
};
