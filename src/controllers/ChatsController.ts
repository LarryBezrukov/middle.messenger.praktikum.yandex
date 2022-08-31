import ChatsAPI from '../api/ChatsAPI';
import store from '../utils/Store';

class ChatsController {
	private api: ChatsAPI;
	// private ws: WS;
	// private activeWSConnections: WS[];

	constructor() {
		this.api = new ChatsAPI();
		// this.activeWSConnections = [];
	}

	async getChats() {
		const chats = await this.api.request();

		store.set('chats', chats);
	}

	async getToken(chatId: number) {
		const { token } = await this.api.requestToken(chatId);
		return token;
	}
}

export default new ChatsController();
