import UsersAPI, { PasswordData, UserData } from '../api/UsersAPI';
import store from '../utils/Store';

class UsersController {
	private api: UsersAPI;

	constructor() {
		this.api = new UsersAPI();
	}

	async changeProfile(data: UserData) {
		const response = await this.api.changeProfile(data);

		store.set('currentUser', response);
	}

	async changePassword(data: PasswordData) {
		if (data.confirmPassword !== data.newPassword) {
			store.set('currentUser.error', 'Passwords are not the same');

			return;
		}

		await this.api.changePassword(data);
	}
}

export default new UsersController();
