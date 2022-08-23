import ChatsAPI from '../api/ChatsAPI';
import store from '../utils/Store';

class ChatsController {
	private api: ChatsAPI;

	constructor() {
		this.api = new ChatsAPI();
	}

	async getChats() {
		const chats = await this.api.request();

		store.set('chats', chats);
	}

	async requestToken(chatId: number) {
		const token = await this.api.requestToken(chatId);
		store.set('currentChat', { ...(token as Record<string, string>), id: chatId });
	}
}

export default new ChatsController();
