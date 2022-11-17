import ChatsAPI, { AddUsersData, ChatData } from '../api/ChatsAPI';
import store, { ChatInterface } from '../utils/Store';

class ChatsController {
	private api: ChatsAPI;

	constructor() {
		this.api = new ChatsAPI();
	}

	async getChats() {
		const chats = await this.api.request();

		const sortedChats = (chats as ChatInterface[]).sort((a, b) => {
			if (a.last_message && !b.last_message) return -1;

			if (a.last_message && b.last_message)
				return Date.parse(b.last_message.time) - Date.parse(a.last_message.time);

			return 0;
		});

		const chatsWithAvatars = sortedChats.map((chat) => {
			if (chat.avatar) {
				return { ...chat, avatar: `${process.env.ENDPOINT}/resources${chat.avatar}` };
			}
			return chat;
		});

		store.set('chats', chatsWithAvatars);
	}

	async getToken(chatId: number) {
		const { token } = await this.api.requestToken(chatId);
		return token;
	}

	async createChat(data: ChatData) {
		await this.api.createChat(data);
	}

	async addUsersToChat(data: AddUsersData) {
		await this.api.addUsers(data);
	}
}

export default new ChatsController();
