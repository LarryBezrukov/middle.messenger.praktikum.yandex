import AuthAPI, { SignInData, SignUpData } from '../api/AuthAPI';
import store from '../utils/Store';
import Router from '../utils/Router';
import { apiHasError } from '../utils/apiHasError';
import ChatsController from './ChatsController';

export interface ControllerSignUpData extends SignUpData {
	confirm_password: string;
}

class AuthController {
	private api: AuthAPI;

	constructor() {
		this.api = new AuthAPI();
	}

	async signUp(data: ControllerSignUpData) {
		if (data.confirm_password !== data.password) {
			store.set('currentUser.error', 'Passwords are not the same');

			return;
		}

		const { confirm_password, ...signUpData } = data;

		store.set('currentUser.isLoading', true);

		const response = await this.api.signup(signUpData);

		if (apiHasError(response)) {
			store.set('currentUser.error', response.reason);
			store.set('currentUser.isLoading', false);
			return;
		}

		await this.fetchUser();

		const router = new Router();
		router.go('/profile');
	}

	async signIn(data: SignInData) {
		await this.api.signin(data);

		await this.fetchUser();

		const router = new Router();
		router.go('/chat');
	}

	async logOut() {
		await this.api.logout();

		store.set('currentUser', null);
		store.set('chats', null);

		const router = new Router();
		router.go('/signin');
	}

	async fetchUser() {
		const user = await this.api.request();
		await ChatsController.getChats();

		const userWithAvatar = { ...user, avatar: `${process.env.ENDPOINT}/resources${user.avatar}` };

		store.set('currentUser', user.avatar ? userWithAvatar : user);
	}
}

export default new AuthController();
