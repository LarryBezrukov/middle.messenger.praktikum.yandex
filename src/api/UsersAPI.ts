import BaseAPI from './BaseAPI';

export interface UserData {
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
}

export interface PasswordData {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
}

export default class UsersAPI extends BaseAPI {
	constructor() {
		super('/user');
	}

	changeProfile(data: UserData): Promise<unknown> {
		return this.http.put('/profile', data);
	}

	changePassword(data: PasswordData): Promise<unknown> {
		return this.http.put('/password', data);
	}

	request = undefined;
	create = undefined;
	update = undefined;
	delete = undefined;
}
