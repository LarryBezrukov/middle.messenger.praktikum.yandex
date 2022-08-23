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

export default class AuthAPI extends BaseAPI {
	constructor() {
		super('/auth');
	}

	signup(data: SignUpData): Promise<unknown> {
		return this.http.post('/signup', data);
	}

	signin(data: SignInData): Promise<unknown> {
		return this.http.post('/signin', data);
	}

	logout(): Promise<unknown> {
		return this.http.post('/logout');
	}

	request(): Promise<unknown> {
		return this.http.get('/user');
	}

	create = undefined;
	update = undefined;
	delete = undefined;
}
