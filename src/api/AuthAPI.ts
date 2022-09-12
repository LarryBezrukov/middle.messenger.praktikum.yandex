import BaseAPI from './BaseAPI';

export interface SignUpData {
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	password: string;
	phone: string;
}

export interface SignInData {
	login: string;
	password: string;
}

export interface UserData {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	avatar: string;
	email: string;
	phone: string;
}

export default class AuthAPI extends BaseAPI {
	constructor() {
		super('/auth');
	}

	signup(data: SignUpData): Promise<SignUpData> {
		return this.http.post('/signup', data);
	}

	signin(data: SignInData): Promise<SignInData> {
		return this.http.post('/signin', data);
	}

	logout(): Promise<void> {
		return this.http.post('/logout');
	}

	request(): Promise<UserData> {
		return this.http.get('/user');
	}

	create = undefined;
	update = undefined;
	delete = undefined;
}
