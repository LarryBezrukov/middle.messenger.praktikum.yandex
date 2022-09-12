import UsersAPI, { PasswordData, UserData } from '../api/UsersAPI';
import store from '../utils/Store';
import AuthController from './AuthController';

class UsersController {
	private api: UsersAPI;

	constructor() {
		this.api = new UsersAPI();
	}

	async changeProfile(data: UserData) {
		await this.api.changeProfile(data);

		AuthController.fetchUser();
	}

	async changePassword(data: PasswordData) {
		if (data.confirmPassword !== data.newPassword) {
			store.set('currentUser.error', 'Passwords are not the same');

			return;
		}

		await this.api.changePassword(data);
	}

	async changeAvatar(data: FormData) {
		await this.api.changeAvatar(data);

		AuthController.fetchUser();
	}
}

export default new UsersController();
