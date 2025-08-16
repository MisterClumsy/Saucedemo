import fs from 'fs';
import path from 'path';

type TUser = {
	username: string;
	password: string;
	expectLoginError: boolean;
};

export default class UserUtils {
	readonly usersDirectory: string;

	constructor() {
		this.usersDirectory = path.resolve(process.cwd(), 'src', 'users');
	}

	getUserByPath(userFile: string): TUser {
		if (!fs.existsSync(userFile)) {
			throw new Error(`${userFile} does not exist, please add the user!`);
		}
		return JSON.parse(fs.readFileSync(userFile, 'utf-8')) as TUser;
	}

	getUserByName(userName: string): TUser {
		const userFile = path.resolve(this.usersDirectory, `${userName}.json`);

		return this.getUserByPath(userFile) as TUser;
	}
}
